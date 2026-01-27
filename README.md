This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Step 1 Setup :
--Environment : Node.js (min 18.18)
--Setup Next.js app
--Setup Shadcn/UI (3.3.1 and installed all component -- npx shadcn@3.3.1 add --all)
--Create Github respository


Step 2 Database & ORM 
-- Setup Prisma ORM (Guide - https://www.prisma.io/docs/guides/nextjs?ref=codewithantonio   & https://www.prisma.io/docs/guides/nextjs)
-- Setup Postgres database (Neon)
-- Explore Prisma studio
-- Test Prisma API ( If you add new schema then you have use npx prisma generate for updating migration in vscode and for reset in db is npx prisma migrate reset and for saving new schema in db is npx prisma migrate dev )

-- Push to GitHub 
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 3 tRPC Setup (Data access layer)
-- Setup tRPC v11 (First - https://trpc.io/docs/client/tanstack-react-query/server-components )
-- Create a procedure with Prisma API
-- Explore tRPC client-side
-- Explore tRPC server-side
-- Explore tRPC server + client (prefetch)

-- Push to Github
  -- Create a new branch
  -- Create a new PR 
  -- Review & merge


Step 4 Authentication
-- Setup BetterAuth (https://www.better-auth.com/?ref=codewithantonio)
-- Add auth screens
-- Add auth utils
-- Add auth procedures (tRPC)

-- Push to Github
  -- Create a new branch
  -- Create a new PR
  -- Review & merge

Step 5 Theme & styling (using tweakcn for shadcn)
-- Apply new theme (changed global.css & added logos from logoipsum)
-- Improve auth screens
-- Add logos

-- Push to Github
  -- Create a new branch
  -- Create a new PR
  -- Review & merge

Step 6 Background Jobs
-- Setup Inngest
-- Create a background Job
-- Add mprocs (Used for development helper to run multiple cmd its not related to project) (https://github.com/pvolok/mprocs?ref=codewithantonio)

-- Push to Github
  -- Create a new branch
  -- Create a new PR
  -- Review & merge

Step 7 AI providers
-- Choose your AI model(s)
   -- Gemini (Free) (Using) (API Key - https://ai.google.dev/api)
   -- OpenAI (min. $5)
   -- Anthropic (min. $5)

-- Setup AI SDK (https://ai-sdk.dev/?ref=codewithantonio)
-- Use AI SDK with Inngest

-- Push to Github
  -- Create a new branch
  -- Creat a new PR
  -- Review & merge

Step 8 Error tracking
-- Setup Sentry (free trail of 14 days and after that free plan developer mode)
-- Demonstrate
   -- Session replays
   -- Logs
   -- AI monitoring

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 9 Sidebar layout
-- Improve file structure
-- Create placeholder routes
-- Create sidebar layout

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 10 Payments
-- Setup Polar
-- Integrate with Better Auth
-- Create Checkout
-- Create billing portal
-- Sandbox development testing (card - 4242 4242 4242 4242)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 11 Workflows CRUD
-- Update Workflow schema
-- Create Workflows API
   -- Create
   -- Read
   -- Update
   -- Delete

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 12 Workflows pagination
-- Update "getMany" procedure
-- Add NUQS for param handling
   -- client side
   -- server side
-- Add "Entity" components
-- Add UI for pagination
-- Add UI for search

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 13 Workflows UI (Used superjson package for handling error which caused by missed type from server that is date type and in client that type become string and also installed date-fns package)
-- Create UI components
   -- Loading
   -- Error
   -- Empty
   -- List
   -- Item

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 14 Workflow page
-- Load workflow page by ID
   -- Prefetch
   -- useSuspenseQuery
   -- Loading
   -- Error
--Create "WorkflowHeader" component
  -- Update workflow name (you can first go to any workflow and on top left there is workflow>{{workflowName}}  you can just click on the workflowName and change after changing it will automatically update the name)
--Create "Editor" component (not done in this git branch)
  -- Add react-flow

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 15 Editor
-- Create "Editor" component
   -- Add react-flow ( https://reactflow.dev/ )
   -- Add initial nodes
-- Update Schema
   -- Add "Node" table
   -- Add "Connection" table
-- Load Default editor state 
   (Note: for adding node registry we add place holder from custome nodes form react flow which added two files in component/react-flow folder. In placeholder node component we customize onClick so that it can trigger sidetoolbar for that node from outside)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 16 Node Selector
-- Add "manual trigger" node
-- Add "http request" node
-- Create node selector component
(Note: added Base Handle for styling from react flow)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 17 
-- CodeRabbit bugs:
   -- Empty onClick handlers
   -- Type casts
-- Add save functionality
-- Add delete functionality
-- Add settings functionality
(Node: Installed Jotai state management package/library for managing state of save workflow - created store and Installed statusIndicator package from reactflow it added a new file)
(Example of http request node:
   endpoint: https://codewithnodeflowx.com or https://jsonplaceholder.typicode.com/todos/1
   requestbody: {
      "userId" : "123"
   }
)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 18 Node execution
-- Improve props for dialog
-- Show "execute" button (executeworkflowbutton)
-- Create "execute" Inngest function
   {
      1- Define background job - src/inngest/functions.ts
      2- Do changes according to job created in inngest route.ts - src/app/api/inngest/route.ts
      3- Create a protected procedure for that background job -- src/features/workflows/server/routers.ts
      4- Create a workflow hook to execute that procedure -- src/feature/workflows/hooks/use-workflows.ts
      5- Now you can use that hook to trigger background job
   }
-- Topological sort (toposort -- package installed & npm i --save-dev @types/toposort for types installation) (we need to sort all nodes in workflow in background job to handle branching of http request node to two other http request nodes)
-- Create executor registry (Used to manage all executors for each node , it might be http executor , manual executor , gemini executor , google form executor)
(Note: installed ky package for handling http request for node execution and its lightweight similar to axios)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 19 Node variables
-- Fix codeRabbit issues 
   -- Content-Type header
   -- "Cyclic" error message

-- Fix key collision (suppose you have two http execution nodes connected A->B now both uses same post request to fetch data using ID 1 for A and 2 for B , now if we execute it both fetches data but in finalize step last http execution node B replaces data of execution node A due to key collision , we need to fetch both data at finalize)
   -- Add "variableName" to UI
   -- Use "variableName" in context

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 20 Node templating (handlebars package)
-- Refactor "variableName" in executor
-- Implement templating syntax (Used to dynamically pass data from one node response to other node input)
(Example: one http node calling api/todo/1 - it will fetch todo details and userId. Now i want to pass the userId from previous node to other node which calling api/user/{userId} to fetch userDetails ---- endpoint point url for 2nd node be like -- api/users/{{todo.httpResponse.data.userId}} same for dynamic body)
   -- Allow dynamic body
      (test: url: https://jsonplaceholder.typicode.com/todos, 
             body: {
               "title": "userId - {{todo.httpResponse.data.userId}}",
               "body": "bar",
               "userId": 1
             }
      )
      (
         test: to create identical todos you can pass only object with name of handlebars -- {{json todo.httpResponse.data}}
      )

   -- Allow dynamic endpoint
      (test -- api/users/{{todo.httpResponse.data.userId}})

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge