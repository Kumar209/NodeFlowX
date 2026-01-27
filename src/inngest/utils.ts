/**
 * WORKFLOW TOPOLOGICAL SORT UTILITY
 * ===================================
 * 
 * PURPOSE: Determines the execution order of nodes in an AI workflow
 * 
 * WHY THIS IS NECESSARY:
 * 1. AI workflows often have dependencies between nodes (e.g., Node B needs output from Node A)
 * 2. Nodes must execute in correct order to ensure data flows properly
 * 3. Prevents executing dependent nodes before their prerequisites
 * 4. Detects cycles (circular dependencies) which would cause infinite loops
 * 
 * USE CASES:
 * - When executing an AI agent workflow
 * - When validating workflow structure
 * - When displaying workflow execution order
 * - When optimizing workflow performance
 */

import { Connection, Node } from "@/generated/prisma/client";
import toposort from "toposort";

/**
 * Sorts workflow nodes in topological order based on their connections
 * 
 * @param nodes - Array of workflow nodes (AI processing steps)
 * @param connections - Array of connections between nodes (data flow dependencies)
 * @returns Array of nodes sorted in execution order
 * @throws Error if workflow contains a cycle (circular dependency)
 * 
 * EXAMPLE:
 *   Nodes: [A, B, C]
 *   Connections: A → B, B → C
 *   Result: [A, B, C] (A executes first, then B, then C)
 */

export const topologicalSort = (
    nodes: Node[],
    connections: Connection[]
): Node[] => {
    //If no connections, return node as-is (they're all independent)
    if(connections.length === 0){
        return nodes;
    }

    // STEP 1: Create edges array for topological sort
    // Each edge represents a dependency: [fromNodeId, toNodeId]
    // Means: "toNode" depends on "fromNode" (fromNode must execute first)
    const edges: [string , string][] = connections.map((conn) => [
        conn.fromNodeId,
        conn.toNodeId
    ]);

    // STEP 2: Track which nodes are connected to others
    // This helps identify isolated/disconnected nodes
    const connectedNodeIds = new Set<string>();

    // Add both source and target nodes to the connected set
    // EXAMPLE:
    // Input connections: [
    //   { fromNodeId: "A", toNodeId: "B" },
    //   { fromNodeId: "B", toNodeId: "C" }
    // ]
    // After loop, connectedNodeIds = Set {"A", "B", "C"}
    // RESULT: We know nodes A, B, and C are part of the connected graph
    for(const conn of connections){
        connectedNodeIds.add(conn.fromNodeId);
        connectedNodeIds.add(conn.toNodeId);
    }

    // STEP 3: Handle disconnected nodes (nodes with no connections)
    // Add self-edges so they appear in the sorted result
    // Self-edge: [node.id, node.id] - doesn't create dependency, just includes node
    // 
    // WHY SELF-EDGES?
    // Toposort library only includes nodes that appear in edges
    // Without self-edges, disconnected nodes would be excluded from sorted result
    //
    // EXAMPLE SCENARIO:
    // Input nodes: ["A", "B", "C", "D", "E"]
    // Input connections: [A→B, B→C] (so D and E are disconnected)
    // connectedNodeIds = {"A", "B", "C"}
    // 
    // Without self-edges: edges = [["A","B"], ["B","C"]]
    // After toposort: sortedNodeIds = ["A", "B", "C"] ← D and E are missing!
    //
    // With self-edges: edges = [["A","B"], ["B","C"], ["D","D"], ["E","E"]]
    // After toposort: sortedNodeIds = ["A", "B", "C", "D", "E"] ← All nodes include
    for(const node of nodes){
        if(!connectedNodeIds.has(node.id)){
            edges.push([node.id, node.id]);
        }
    }

    //Perform topological sort
    let sortedNodeIds: string[];
    try{
        // This calculates the order where no node comes before its dependencies
        sortedNodeIds = toposort(edges);
        
        // Remove duplicates that might come from self-edges
        sortedNodeIds= [...new Set(sortedNodeIds)];
    }
    catch(error){
        // Handle cyclic dependency error specifically
        if(error instanceof Error && error.message.includes("Cyclic")){
            throw new Error("Workflow contains a cycle");
        }

        // Re-throw any other unexpected errors
        throw error;
    }

    // STEP 5: Convert sorted node IDs back to full node objects
    // Create a map for O(1) lookup: nodeId → Node object
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    // Map each sorted ID to its corresponding node object
    // The ! asserts the node exists (should always be true)
    // filter(Boolean) removes any undefined/null values (safety check)
    return sortedNodeIds.map((id) => nodeMap.get(id)!).filter(Boolean);

};


/**
 * COMPLETE WORKFLOW EXAMPLE:
 * ==========================
 * 
 * INPUT:
 *   nodes: [
 *     { id: "A", name: "Fetch Data", ... },
 *     { id: "B", name: "Process Data", ... },
 *     { id: "C", name: "Generate Report", ... },
 *     { id: "D", name: "Send Email", ... },
 *     { id: "E", name: "Log Analytics", ... }
 *   ]
 *   
 *   connections: [
 *     { fromNodeId: "A", toNodeId: "B" },
 *     { fromNodeId: "B", toNodeId: "C" }
 *   ]
 * 
 * EXECUTION:
 *   1. connectedNodeIds becomes {"A", "B", "C"}
 *   2. D and E are disconnected → add self-edges
 *   3. edges = [["A","B"], ["B","C"], ["D","D"], ["E","E"]]
 *   4. toposort returns ["A", "B", "C", "D", "E"]
 *   5. Map back to full node objects
 * 
 * OUTPUT: [NodeA, NodeB, NodeC, NodeD, NodeE]
 * 
 * EXECUTION ORDER:
 *   Step 1: Execute Node A (Fetch Data)
 *   Step 2: Execute Node B (Process Data) ← needs output from A
 *   Step 3: Execute Node C (Generate Report) ← needs output from B
 *   Step 4: Execute Node D and E in parallel (they have no dependencies)
 */