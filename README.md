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

Step 21 Node realtime (https://www.inngest.com/docs/features/realtime?ref=codewithantonio)
-- Add "@inngest/realtime" (after installing , add realtime middleware to inngest client)
-- Create "httpRequest" channel (status - "loading" | "success" | "error")
-- Publish events (loading, error, success)
-- Capture events "useNodeStatus"

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Step 22 Google Form trigger
-- Add Google Form trigger node
   -- node
   -- dialog
   -- executor
   -- realtime channel
   -- webhook

-- Create a google Form
   -- create a new "App Script"

-- Installed npm i dotenv-cli -D for using dynamic names value stored in env file to package.json file

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

   Goole form trigger creation flow = {
      1- Created googleformtrigger folder with files action.ts, dialog.tsx, executor.tsx, node.tsx
      2- Updated the node.tsx file 
      3- Initialized that node.tsx component to the node-component.tsx component (added new nodetype to enum in schema.prisma and used npx prisma migrate dev and npx prisma generate)
      4- Add new selector -- google form selector in node-selector.tsx component so that we can se it on sidebar of node selection.
      5- Created Dialog component
      6 - Create goolge form trigger channel in inngest/channels folder then we have to register this channel to function - execute workflow
      7- Create Executor component
      8- Create action component
      9- Update the node.tsx for nodestatus
      10- Initialize the executor in executor registry component
      10- Create webhook for that I created a new route.ts in src/app/api/webhooks/route.ts
      11- In http execution node , i created a template-handlebars.ts file to handle helper functions to pass data to http request node
         (Example - {{googleForm.respondentEmail}}- Respondent's email address
{{googleForm.responseId}}- Unique response ID
{{googleForm.responses.email}}- Question named "email"
{{googleForm.responses.['What is your name?']}}- Question with spaces (bracket notation)
{{json googleForm.responses}}- All responses as formatted JSON
{{json googleForm}}- Complete form data as JSON
{{todo.httpResponse.data.userId}}- Nested data from previous nodes)
   }

   test-{
      1- created google form with app scripted pasted and url would https and ngrok url
      2- Question - url
      3- Person response of url - ""
      5- After submit it will trigger form submit node then http node execution
   }

Step 23 Strip trigger
-- Add Stripe trigger node
   -- Node
   -- Dialog
   -- Executor
   -- Realtime channel
   -- Webhook

-- Trigger a stripe event

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

   (e
      Test stripe hit webhook : Go to developer mode in stripe
      1- stripe login
      2- stripe listen --forward-to localhost:4242/webhook    // use full webhook url copy it from dialog box in trigger from localhost
      3- hit stripe trigger form other terminal: stripe trigger payment_intent.succeeded

      Test with live site:
      1- Create a destination (your account)
      2- Select your stripe trigger events and continue (example - payment_intent.succeeded)
      3- Select Destination type as webhook endpoint
      4- Create name , and copy paste the webhook url from our stripe trigger dialog box to endpoint url of destination
   )

Step 24 AI nodes (Using AI sdk which all ready setup completed above steps on project)
-- Add AI Nodes
   -- Gemini (Free)  -- (https://aistudio.google.com/u/7/api-keys)
   -- OpenAI (min. $5)
   -- Anthropic (min. $5)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

Note: routers -> functions (function will initialize the context data which may come from previous node and also fetch the executor for that node and also execute it with managing context for each node)

25 Credentials
-- Add schema
-- Add router and also initialzed it in _app.ts of trpc
-- Add hooks (created hook folder containing use-credentials.ts, use-credentials-params.ts and outside folder params.ts)
-- Add page (Server loader) (worked on src/app/dashboard/credentials/page.tsx and created new params-loader.ts in feature/credential/server and prefetch.ts file in feature/credential/server)
-- Add client (client hydration) (created credentials.tsx in features/credentials/components and also worked on /src/app/dashboard/credentials/credentialId/page.tsx and also added new/page.tsx for form to create new credentials )
-- Add entity components
   -- Pagination
   -- Search
   -- ...

-- Add credential dropdown (AI node)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

26 Discord & Slack nodes (more can be added later like whatsapp, telegram)
-- Fix CodeRabbit issues
   -- Missing channel events
   -- Invalid node names in logs
   -- Credentials ID injection

-- Add Discord node (Installed html-entities package to parse and use the raw data with context using handlebars in executor)
   -- node, dialog, executor, channel
   -- create Discord webhook
   -- test Discord node

-- Add Slack node
   -- node, dialog, executor, channel
   -- create Discord webhook
   -- test Slack node



27 Executions history
-- Add schema
-- Add router (created router.ts in executions/server/router.ts and initialized it to _app.ts of trpc and added prefetch with params-loader and also added params.ts outside of server folder)
-- Add hooks (added use-excutions.ts and use-executions-params)
-- Add page (server loader) (added page.tsx in src/app/dashboard/rest/executions/page.tsx)
-- Add client (client hydration) (added added executions.tsx in features/execution/component)
-- Add entity components
   -- Pagination
   -- Loading
   -- Error
   -- Empty
-- Add Execution records in inngest (updated functions.ts - added inngestId(updated in sendWorkflowExecution in src/inngest/utils) , created new step(create-execution , update-execution), added executionView for single execution and updated component ExecutionId/page.tsx)

-- Push to Github
   -- Create a new branch
   -- Create a new PR
   -- Review & merge

