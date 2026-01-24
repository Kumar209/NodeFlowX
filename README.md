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
-- Test Prisma API

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