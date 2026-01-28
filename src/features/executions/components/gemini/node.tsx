"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import {  GeminiDialog, GeminiFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchGeminiRealtimeToken } from "./actions";
import { GEMINI_CHANNEL_NAME } from "@/inngest/channels/gemini";
import { Image as ImageIcon, Type as TextIcon } from "lucide-react";

// Extract the size type from the form schema
type ImageSize = "1024x1024" | "768x1024" | "1024x768" | "1280x720" | "1920x1080" | "custom";
type AspectRatio = "1:1" | "3:4" | "2:3" | "4:3" | "3:2" | "16:9" | "21:9" | "custom";
type OutputFormat = "png" | "jpeg" | "webp";


type GeminiNodeData = {
    variableName?: string;
    mode?: 'text' | 'image';
    // model?: string;
    systemPrompt?: string; 
    userPrompt?: string;
    imageCount?: number;
    size?: ImageSize;
    aspectRatio?: AspectRatio;
    outputFormat?: OutputFormat;
    style?: string;
    temperature?: number;
    maxTokens?: number;
};

type GeminiNodeType = Node<GeminiNodeData>;

export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();

    const nodeStatus = useNodeStatus({
        nodeId: props.id,
        channel: GEMINI_CHANNEL_NAME,
        topic: "status",
        refreshToken: fetchGeminiRealtimeToken,
    });

    const handleOpenSettings = () => setDialogOpen(true);

    const handleSubmit = (values: GeminiFormValues) => {
        setNodes((nodes) => nodes.map((node) => {
            if(node.id === props.id){
                // Use custom size/ratio if specified
                const finalSize = values.size === "custom" ? values.customSize : values.size;
                const finalAspectRatio = values.aspectRatio === "custom" ? values.customAspectRatio : values.aspectRatio;


                return {
                    ...node,
                    data: {
                        ...node.data,
                        ...values,
                        size: finalSize as ImageSize,
                        aspectRatio: finalAspectRatio as AspectRatio,
                        // Clean up custom fields
                        customSize: undefined,
                        customAspectRatio: undefined
                    }
                }
            }

            return node;
        }))
    }

    const nodeData = props.data;
    // const description = nodeData?.userPrompt
    //    ? `${nodeData.model || AVAILABLE_MODELS[0] } : ${nodeData.userPrompt.slice(0, 50)}...`
    //    : "Not configured";
    const mode = nodeData?.mode || 'text';

    const description = nodeData?.userPrompt
       ? `gemini-2.5-flash : ${nodeData.userPrompt.slice(0, 50)}...`
       : "Not configured";

    const getDescription = () => {
        if (!nodeData?.userPrompt) return "Not configured";
        
        const promptPreview = nodeData.userPrompt.length > 40 
        ? `${nodeData.userPrompt.substring(0, 40)}...` 
        : nodeData.userPrompt;
        
        if (mode === 'image') {
            const count = nodeData.imageCount ? ` ×${nodeData.imageCount}` : '';
            const size = nodeData.size ? ` (${nodeData.size})` : '';
            return `🖼️${count}: ${promptPreview}${size}`;
        } 

        else {
            return `📝: ${promptPreview}`;
        }
    };

    const getIcon = () => {
        if (mode === 'image') {
            return "/gemini.svg"; // You might want to use a different icon
        }

        return "/gemini.svg"; // Your existing Gemini icon
    };

    // Prepare default values for dialog
    const getDefaultValues = () => {
        if (!nodeData) return {};
        
        return {
            variableName: nodeData.variableName || "",
            mode: nodeData.mode || "text",
            systemPrompt: nodeData.systemPrompt || "",
            userPrompt: nodeData.userPrompt || "",
            temperature: nodeData.temperature || 0.7,
            maxTokens: nodeData.maxTokens || 1024,
            imageCount: nodeData.imageCount || 1,
            size: nodeData.size || "1024x1024",
            aspectRatio: nodeData.aspectRatio || "1:1",
            outputFormat: nodeData.outputFormat || "png",
            style: nodeData.style || undefined,
        };
    };

    return (
        <>
            <GeminiDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onSubmit={handleSubmit}
              defaultValues={getDefaultValues()}
            />
            <BaseExecutionNode
              {...props}
              id={props.id}
              icon="/gemini.svg"
              name={mode === 'image' ? "Gemini Image" : "Gemini"}
              status={nodeStatus}
              description={getDescription()}
              onSettings={handleOpenSettings}
              onDoubleClick={handleOpenSettings}
            >
                {/* Add a small indicator for mode */}
                 <div className="absolute top-1 right-1">
                    {mode === 'image' ? (
                        <ImageIcon className="size-3 text-blue-500" />
                    ) : (
                        <TextIcon className="size-3 text-green-500" />
                    )}
                </div>
            </BaseExecutionNode>
        </>
       )
});

GeminiNode.displayName = "GeminiNode";