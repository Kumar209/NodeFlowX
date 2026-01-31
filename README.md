# 🚀 NodeFlowX

> **A powerful, open-source workflow automation platform built with modern web technologies**

<div align="center">

<table>
  <tr>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/Node.js-18.18+-43853d?style=flat&logo=node.js&logoColor=white" />
    </td>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/Next.js-Latest-000000?style=flat&logo=next.js&logoColor=white" />
    </td>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/React-18+-61dafb?style=flat&logo=react&logoColor=black" />
    </td>
    <td align="center" width="120">
      <img src="https://img.shields.io/badge/TypeScript-Latest-3178c6?style=flat&logo=typescript&logoColor=white" />
    </td>
  </tr>

  <tr>
    <td align="center" width="120">
      <img src="https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat&logo=postgresql&logoColor=white" />
    </td>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/tRPC-11+-398ccb?style=flat&logo=trpc&logoColor=white" />
    </td>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/Prisma-Latest-0c344b?style=flat&logo=prisma&logoColor=white" />
    </td>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/Inngest-Latest-000000?style=flat&logo=inngest&logoColor=white" />
    </td>
  </tr>

  <tr>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat" />
    </td>
    <td align="center" width="100">
      <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat" />
    </td>
  </tr>
</table>

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Setup & Installation](#setup--installation)
- [Development Workflow](#development-workflow)
- [Core Packages](#core-packages)
- [Key Features Implementation](#key-features-implementation)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

**NodeFlowX** is a cutting-edge workflow automation platform that allows users to create, manage, and execute complex automation workflows without writing code. With support for multiple trigger types (HTTP, Google Forms, Stripe), AI integration (Gemini, OpenAI, Anthropic), and notification channels (Discord, Slack), NodeFlowX enables seamless automation across your favorite tools and services.

### Why NodeFlowX?

✨ **Visual Workflow Builder** - Drag-and-drop interface for creating complex workflows  
🔄 **Multiple Triggers** - HTTP requests, Google Forms, Stripe events, and more  
🤖 **AI-Powered** - Integrate Gemini, OpenAI, or Anthropic for intelligent automation  
💬 **Notification Channels** - Send updates via Discord, Slack, and more  
📊 **Real-time Monitoring** - Live execution status tracking with Inngest  
🛡️ **Secure Credentials** - AES encryption for sensitive data storage  
💳 **Payment Integration** - Built-in Polar integration for monetization  
📈 **Production-Ready** - Deployed on Vercel with enterprise-grade error tracking (Sentry)

---

## ✨ Features

### 🎨 Core Features

- **Visual Workflow Editor** - Intuitive react-flow based node editor
- **Multiple Trigger Types**
  - Manual triggers
  - HTTP request endpoints
  - Google Forms responses
  - Stripe webhook events
  
- **Node Types**
  - HTTP Request nodes (with templating)
  - AI nodes (Gemini, OpenAI, Anthropic)
  - Discord message nodes
  - Slack message nodes
  - Form submission handlers

- **Advanced Capabilities**
  - Dynamic data templating with Handlebars
  - Real-time execution status tracking
  - Topological sort for workflow optimization
  - Variable passing between nodes
  - Nested node connections

### 🔐 Security & Authentication

- Multi-provider authentication (Email, GitHub, Google)
- BetterAuth integration for session management
- AES encryption for credential storage
- JWT token-based API security
- Secure webhook endpoints

### 💰 Monetization

- Polar payment integration
- Flexible pricing plans
- Billing portal for customers
- Sandbox testing environment

### 📊 Monitoring & Analytics

- Sentry error tracking and monitoring
- Session replay capabilities
- Real-time execution logs
- Execution history with detailed records
- Performance analytics

---

## 🛠 Tech Stack

### Frontend
- **Next.js 14+** - React framework with App Router
- **React 18+** - UI library
- **Shadcn/UI 3.3.1** - Component library
- **React Flow** - Visual node editor
- **TanStack React Query** - Data fetching and caching
- **Jotai** - Lightweight state management
- **Zod** - Schema validation

### Backend
- **Node.js 18.18+** - JavaScript runtime
- **tRPC v11** - Type-safe RPC framework
- **Prisma ORM** - Database ORM
- **BetterAuth** - Authentication system
- **Inngest** - Background job processing
- **AI SDK** - Unified AI model integration

### Database & Services
- **PostgreSQL (Neon)** - Primary database
- **Prisma Studio** - Database visualization

### External Services
- **Gemini API** - Free AI model
- **OpenAI API** - Premium AI option
- **Anthropic API** - Advanced AI model
- **Stripe** - Payment processing
- **Polar** - Payment gateway
- **Discord API** - Messaging integration
- **Slack API** - Workspace notifications
- **Google Forms API** - Form automation
- **Sentry** - Error tracking
- **ngrok** - Local webhook testing

### Utilities & Libraries
- **cryptr** - AES encryption/decryption
- **ky** - Lightweight HTTP client
- **handlebars** - Template engine
- **toposort** - Topological sorting
- **date-fns** - Date utilities
- **superjson** - Enhanced JSON serialization
- **html-entities** - HTML entity parsing
- **NUQS** - URL state management
- **Jotai** - State management
- **mprocs** - Development process manager (dev-only)
- **dotenv-cli** - Environment variable CLI
- **status-indicator** - React Flow status UI

---


## 📸 Project Preview

### Dashboard & Workflows
> **Visual workflow editor with drag-and-drop node interface**

![Workflow](public/preview/workflow.png)
![Configuration](public/preview/configuration.png)
![Credentials](public/preview/credential.png)
![Executions](public/preview/executions.png)

---

## 🏗 Project Architecture

```
NodeFlowX/
│
├── src/
│   ├── app/                                 # Next.js App Router
│   │   ├── (auth)/                          # Authentication routes
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/                     # Protected dashboard routes
│   │   │   ├── (rest)/
│   │   │   │   ├── credentials/             # Credential management
│   │   │   │   │   ├── [credentialId]/
│   │   │   │   │   └── new/
│   │   │   │   ├── executions/              # Execution history
│   │   │   │   │   └── [executionId]/
│   │   │   │   └── workflows/               # Workflow management
│   │   │   │       └── [workflowId]/        # Individual workflow editor
│   │   │   └── (editor)/
│   │   ├── api/
│   │   │   ├── auth/                        # Authentication endpoints
│   │   │   ├── inngest/                     # Background job processing
│   │   │   ├── sentry-example-api/
│   │   │   ├── trpc/                        # tRPC API routes
│   │   │   └── webhooks/
│   │   │       ├── google-form/             # Google Forms webhook
│   │   │       └── stripe/                  # Stripe webhook
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx
│   │
│   ├── components/                          # Reusable components
│   │   ├── react-flow/                      # React Flow components
│   │   │   ├── base-handle.tsx              # Styled handles
│   │   │   ├── base-node.tsx                # Base node component
│   │   │   ├── node-status-indicator.tsx
│   │   │   └── placeholder-node.tsx
│   │   ├── ui/                              # Shadcn UI components
│   │   ├── entity-components.tsx
│   │   ├── initial-node.tsx
│   │   ├── node-selector.tsx
│   │   ├── upgrade-modal.tsx
│   │   └── workflow-node.tsx
│   │
│   ├── config/
│   │   ├── constants.ts                     # App constants
│   │   └── node-components.ts               # Node type mapping
│   │
│   ├── features/                            # Feature modules
│   │   ├── auth/                            # Authentication
│   │   │   ├── components/
│   │   │   │   ├── auth-layout.tsx
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── register-form.tsx
│   │   │   └── server/
│   │   │       └── routers.ts
│   │   │
│   │   ├── credentials/                     # Credential management
│   │   │   ├── components/
│   │   │   │   ├── credential.tsx
│   │   │   │   └── credentials.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-credentials-params.ts
│   │   │   │   └── use-credentials.ts
│   │   │   ├── server/
│   │   │   │   ├── params-loader.ts
│   │   │   │   ├── params.ts
│   │   │   │   ├── prefetch.ts
│   │   │   │   └── routers.ts
│   │   │   └── lib/
│   │   │       └── (credential utilities)
│   │   │
│   │   ├── editor/                          # Workflow editor
│   │   │   ├── components/
│   │   │   │   ├── add-node-button.tsx
│   │   │   │   ├── editor-header.tsx
│   │   │   │   ├── editor.tsx
│   │   │   │   └── execute-workflow-button.tsx
│   │   │   └── store/
│   │   │       └── atoms.ts
│   │   │
│   │   ├── executions/                      # Execution history
│   │   │   ├── components/
│   │   │   │   ├── anthropic/
│   │   │   │   ├── discord/
│   │   │   │   ├── gemini/
│   │   │   │   ├── http-request/
│   │   │   │   ├── openai/
│   │   │   │   ├── slack/
│   │   │   │   ├── base-execution-node.tsx
│   │   │   │   ├── execution.tsx
│   │   │   │   └── executions.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-executions-params.ts
│   │   │   │   ├── use-executions.ts
│   │   │   │   └── use-node-status.ts
│   │   │   ├── lib/
│   │   │   │   ├── executor-registry.ts
│   │   │   │   └── template-handlebars.ts
│   │   │   ├── server/
│   │   │   │   ├── params-loader.ts
│   │   │   │   ├── params.ts
│   │   │   │   ├── prefetch.ts
│   │   │   │   └── routers.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── triggers/                        # Trigger nodes
│   │   │   ├── components/
│   │   │   │   ├── google-form-trigger/
│   │   │   │   │   ├── actions.ts
│   │   │   │   │   ├── dialog.tsx
│   │   │   │   │   ├── executor.tsx
│   │   │   │   │   ├── node.tsx
│   │   │   │   │   └── utils.ts
│   │   │   │   ├── manual-trigger/
│   │   │   │   │   ├── actions.ts
│   │   │   │   │   ├── dialog.tsx
│   │   │   │   │   ├── executor.tsx
│   │   │   │   │   └── node.tsx
│   │   │   │   └── stripe-trigger/
│   │   │   │       ├── base-trigger-node.tsx
│   │   │   │       └── (other files)
│   │   │   └── (other trigger types)
│   │   │
│   │   ├── workflows/                       # Workflow management
│   │   │   ├── components/
│   │   │   │   └── workflows.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-workflows-params.ts
│   │   │   │   └── use-workflows.ts
│   │   │   ├── server/
│   │   │   │   ├── params-loader.ts
│   │   │   │   ├── params.ts
│   │   │   │   ├── prefetch.ts
│   │   │   │   └── routers.ts
│   │   │   └── (workflow utilities)
│   │   │
│   │   └── (other feature modules)
│   │
│   ├── inngest/                             # Background jobs
│   │   ├── channels/                        # Real-time event channels
│   │   │   ├── anthropic.ts
│   │   │   ├── discord.ts
│   │   │   ├── gemini.ts
│   │   │   ├── google-form-trigger.ts
│   │   │   ├── http-request.ts
│   │   │   ├── manual-trigger.ts
│   │   │   ├── openai.ts
│   │   │   ├── slack.ts
│   │   │   └── stripe-trigger.ts
│   │   ├── client.ts                        # Inngest client setup
│   │   ├── functions.ts                     # Background job definitions
│   │   └── utils.ts                         # Helper functions
│   │
│   ├── lib/                                 # Utilities & helpers
│   │   ├── encryption.ts                    # Credential encryption
│   │   ├── executor-registry.ts
│   │   ├── template-handlebars.ts
|   |
│   ├── trpc/
│   │   │   ├── _app.ts                      # tRPC app setup
│   │   │   ├── client.ts                    # Client configuration
│   │   │   ├── init.ts
│   │   │   ├── query-client.ts
│   │   │   └── server.ts                    # Server configuration
│   │   └── utils.ts
│   │
│   ├── prisma/                              # Database
│   │   ├── schema.prisma                    # Data schema
│   │   └── migrations/
│   │
│   ├── public/
│   │   └── logos/                           # Brand logos
│   │
│   └── (configuration files)
│
├── .env.local                               # Environment variables (local)
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md
```


---

## ⚡ Setup & Installation

### Prerequisites

- **Node.js** v18.18 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** database (Neon recommended)
- Git for version control

### Step 1: Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd NodeFlowX

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
```

### Step 2: Configure Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@neon.tech/nodeflowx"

# NextAuth / BetterAuth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-secret"

# Payment
POLAR_ACCESS_TOKEN="polar_ot_exampleaccesstoken"
POLAR_SUCCESS_URL="http://localhost:3000"

# Services
SENTRY_AUTH_TOKEN="your-sentry-token""

# Webhooks
NGROK_URL="your-ngrok-url"  # For local development
```

### Step 3: Setup Next.js & Shadcn/UI

```bash
# Initialize Shadcn components
npx shadcn@3.3.1 add --all

# This will install all essential UI components
```

### Step 4: Database Setup with Prisma

```bash
# Generate Prisma client
npx prisma generate

# Run initial migration
npx prisma migrate dev --name init

# Access Prisma Studio (optional)
npx prisma studio
```

**Prisma Commands Reference:**
```bash
# After schema changes
npx prisma generate          # Update Prisma client
npx prisma migrate dev       # Create and run migration
npx prisma migrate reset     # Reset database (⚠️ destructive)
npx prisma studio           # Open database GUI
```

### Step 5: Setup tRPC

tRPC is already configured for type-safe API routes. Key files:
- `lib/trpc/server.ts` - Server configuration
- `lib/trpc/client.ts` - Client configuration
- `features/*/server/routers.ts` - Feature routers

### Step 6: Initialize BetterAuth

BetterAuth provides authentication. Configuration is in:
- `lib/auth.ts` - Auth configuration
- Supports: Email, GitHub, Google providers

### Step 7: Development Server

```bash
# Start development server
npm run dev

# With mprocs (run multiple processes)
npm run dev:all

# Access at http://localhost:3000
```

---

## 🔄 Development Workflow

### Git Workflow

All features follow a structured branching strategy:

```bash
# Create feature branch
git checkout -b feature/feature-name

# After implementation
git add .
git commit -m "feat: add feature description"
git push origin feature/feature-name

# Create Pull Request on GitHub
# Review, request changes if needed
# Merge to main branch
```

### Creating a New Feature

**Example: Adding a new node type**

1. **Create Node Component**
   ```typescript
   // features/eceution/components/yournode/node.tsx
   export const YourNode = ({ data }) => {
     return <Handle position={Position.Top} />;
   };
   ```

2. **Create Dialog Component**
   ```typescript
   // features/eceution/components/yournode/dialog.tsx
   export const YourNodeDialog = ({ node, onUpdate }) => {
     return <Dialog>{/* your form */}</Dialog>;
   };
   ```

3. **Create Executor**
   ```typescript
   // features/eceution/components/yournode/executor.tsx
   export const executeYourNode = async (context) => {
     // node execution logic
   };
   ```

4. **Update Database Schema**
   ```prisma
   // schema.prisma
   enum NodeType {
     YOUR_NODE
   }
   ```

5. **Run Migration**
   ```bash
   npx prisma migrate dev --name add_your_node_type
   ```

6. **Register in Components**
   - Add to `node-component.tsx`
   - Add to `node-selector.tsx`
   - Add to executor registry

---

## 📦 Core Packages

### Essential Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **next** | Latest | React framework |
| **react** | 18+ | UI library |
| **shadcn/ui** | 3.3.1 | Component library |
| **@trpc/client** | 11+ | Type-safe RPC client |
| **@trpc/server** | 11+ | Type-safe RPC server |
| **prisma** | Latest | ORM and migrations |
| **better-auth** | Latest | Authentication |
| **inngest** | Latest | Background jobs |
| **ai** | Latest | AI SDK integration |
| **react-flow-renderer** | Latest | Node editor |
| **jotai** | Latest | State management |
| **zod** | Latest | Schema validation |

### Security & Encryption

| Package | Purpose |
|---------|---------|
| **cryptr** | AES encryption for credentials |
| **html-entities** | Parse HTML entities safely |

### Utilities

| Package | Purpose |
|---------|---------|
| **ky** | Lightweight HTTP client |
| **handlebars** | Template engine for dynamic data |
| **toposort** | Topological sorting for workflows |
| **date-fns** | Date manipulation utilities |
| **superjson** | Enhanced JSON serialization |
| **nuqs** | URL state management |
| **status-indicator** | React Flow status UI |

### Development Tools

| Package | Purpose |
|---------|---------|
| **mprocs** | Run multiple processes simultaneously |
| **dotenv-cli** | Environment variable CLI |
| **@types/toposort** | TypeScript types for toposort |

---

## 🎯 Key Features Implementation

### 1️⃣ Authentication Flow (Step 4)

**BetterAuth Integration:**
```typescript
// Login with multiple providers
- Email & Password
- GitHub OAuth
- Google OAuth
- Automatic account linking for same email
```

### 2️⃣ Workflow Management (Steps 11-12)

**CRUD Operations:**
- Create new workflows
- Read workflow details
- Update workflow name and configuration
- Delete workflows
- Pagination and search with NUQS

### 3️⃣ Visual Editor (Step 15)

**React Flow Integration:**
- Drag-and-drop node placement
- Connection lines between nodes
- Custom node styling
- Real-time preview

### 4️⃣ Trigger Types (Steps 22-23)

**Multiple Trigger Support:**

**HTTP Requests**
```json
{
  "endpoint": "https://api.example.com/data",
  "method": "POST",
  "headers": { "Content-Type": "application/json" },
  "body": { "userId": "123" }
}
```

**Google Forms**
- Automatically triggered on form submission
- Access to all form responses
- Variable templating support

**Stripe Webhooks**
- Payment event triggers
- Sandbox testing with card: `4242 4242 4242 4242`
- Multiple event types support

### 5️⃣ Dynamic Templating (Step 20)

**Handlebars Syntax for Data Passing:**
```handlebars
# Access previous node data
{{todo.httpResponse.data.userId}}

# Nested data access
{{json todo.httpResponse.data}}

# In request bodies
{
  "title": "Task {{todo.httpResponse.data.title}}",
  "userId": "{{user.data.id}}"
}

# Google Forms specific
{{googleForm.respondentEmail}}
{{googleForm.responses.email}}
{{googleForm.responses.['Question Name']}}
{{json googleForm}}

# Discord & Slack
{{previous.message}}
```

### 6️⃣ Node Execution (Step 18)

**Execution Pipeline:**
1. Define background job in `inngest/functions.ts`
2. Configure Inngest route in `app/api/inngest/route.ts`
3. Create tRPC procedure for execution
4. Create React hook for client-side trigger
5. Topological sort for multi-node workflows
6. Real-time status updates via Inngest channels

### 7️⃣ AI Integration (Step 24)

**Supported AI Models:**
```typescript
// Gemini (Free)
- Use for: Content generation, data analysis
- API: https://ai.google.dev/api

// OpenAI (min. $5)
- Use for: Advanced reasoning, complex tasks
- API: https://platform.openai.com

// Anthropic (min. $5)
- Use for: Long-context analysis, safety
- API: https://www.anthropic.com
```

**AI Node Usage:**
```handlebars
# Pass context to AI
Analyze this data: {{previous.httpResponse.data}}

# Use AI output in next node
{{ai.content}}
```

### 8️⃣ Credential Management (Step 25)

**Encrypted Storage:**
```typescript
// Store credentials securely
- Database encryption with AES
- Decrypt only during execution
- Never expose in client code
- Dropdown selection in nodes
```

### 9️⃣ Notification Channels (Steps 26)

**Discord Messages**
- Create webhook in Discord server
- Format messages with markdown
- Include workflow status

**Slack Messages**
- Create Slack app webhook
- Rich message formatting
- Channel targeting

### 🔟 Execution History (Step 27)

**Track Workflow Executions:**
- Execution start/end times
- Node-by-node status
- Variable values at each step
- Error logs and stack traces
- Pagination and filtering

### 1️⃣1️⃣ Error Tracking (Step 8)

**Sentry Integration:**
- Real-time error monitoring
- Session replay for debugging
- Performance monitoring
- Custom event tracking
- Free plan for development

---

## 🚀 Development Guides

### Adding a New Node Type

**Complete Example: Custom HTTP Node**

```typescript
// Step 1: Define Node Type
// schema.prisma
enum NodeType {
  HTTP_REQUEST
  // ...ADD_HERE
}

// Step 2: Create Node Files
// features/eceution/components/custom/node.tsx
export const CustomNode = ({ data }) => {
  const { setSelectedNodeId } = useNodeStore();
  
  return (
    <div onClick={() => setSelectedNodeId(data.id)}>
      <Handle position={Position.Top} type="target" />
      <div>Custom Node</div>
      <Handle position={Position.Bottom} type="source" />
    </div>
  );
};

// Step 3: Create Executor
// features/eceution/components/custom/executor.tsx
export const executeCustomNode = async (context) => {
  const { inputs, variables } = context;
  // Your logic here
  return { output: "result" };
};

// Step 4: Initialize Node
// components/react-flow/node-component.tsx
case NodeType.CUSTOM:
  return <CustomNode data={data} />;
```

### Setting Up Webhooks

**Google Forms Integration:**
```bash
# 1. Create Google Form
# 2. Create App Script
# 3. Deploy as webhook
# 4. Copy deployment URL to env

GOOGLE_APP_SCRIPT_DEPLOYMENT_URL="https://script.google.com/macros/..."
```

**Stripe Webhooks (Local Testing):**
```bash
# Terminal 1: Start ngrok
ngrok http 3000

# Terminal 2: Listen to Stripe events
stripe login
stripe listen --forward-to {NGROK_URL}/api/webhooks

# Terminal 3: Trigger events
stripe trigger payment_intent.succeeded
```

### Testing Node Execution

**HTTP Request Node Test:**
```json
Endpoint: https://jsonplaceholder.typicode.com/todos/1
Method: GET
Expected Response: { "userId": 1, "id": 1, "title": "...", "completed": false }
```

**Dynamic Body Test:**
```json
URL: https://jsonplaceholder.typicode.com/todos
Body: {
  "title": "User {{user.data.name}}",
  "completed": false,
  "userId": "{{user.data.id}}"
}
```

---

## 🔐 Security Best Practices

### Credential Encryption

```typescript
// Encryption is automatic when saving credentials
const encrypted = await encryptCredential(apiKey, encryptionKey);
await prisma.credential.create({ data: { value: encrypted } });

// Decryption happens only during execution
const decrypted = await decryptCredential(encrypted, encryptionKey);
```

### API Security

- All tRPC endpoints require authentication
- Webhook endpoints verify signatures
- Rate limiting on execution endpoints
- CORS properly configured
- HTTPS enforced in production

### Environment Variables

- Never commit `.env.local`
- Use `.env.example` template
- Rotate secrets regularly
- Different keys for dev/prod

---

## 📊 Real-time Updates with Inngest

### Channel System

```typescript
// Create custom channel
const nodeStatusChannel = Inngest.Channel.Object({
  name: "node.status",
  schema: z.object({
    nodeId: z.string(),
    status: z.enum(["loading", "success", "error"]),
    result: z.any().optional(),
  }),
});

// Publish status
await inngest.emit({
  name: "node.status",
  data: { nodeId: "node-1", status: "success" }
});

// Subscribe in React
const { data: status } = useNodeStatus(nodeId);
```

---

## 💳 Monetization with Polar

### Setup Payment Integration

```typescript
// 1. Create subscription tiers
const tiers = [
  { name: "Basic", price: 29, features: [...] },
  { name: "Pro", price: 99, features: [...] },
];

// 2. Implement checkout
const { checkout } = usePolarCheckout();
checkout(tierId);

// 3. Manage subscriptions
const { subscriptions } = useSubscriptions();
```

### Testing Payments (Sandbox)

```
Card Number: 4242 4242 4242 4242
Expiry: 12/25
CVC: 123
```

---

## 📈 Monitoring & Debugging

### Sentry Setup

```typescript
// Errors automatically tracked
try {
  await executeWorkflow();
} catch (error) {
  Sentry.captureException(error);
}

// Custom events
Sentry.captureEvent({
  message: "Workflow executed",
  level: "info",
  tags: { workflowId: "123" }
});
```

### Prisma Studio

```bash
# Visual database inspector
npx prisma studio

# Accessible at http://localhost:5555
```

### Inngest Dashboard

```
https://inngest.com/dashboard

- View function executions
- Debug failures
- Replay events
- Monitor performance
```

---


### Monitoring Production

- **Sentry Dashboard** - Error tracking and performance
- **Inngest Dashboard** - Background job monitoring
- **Vercel Dashboard** - Deployment and logs
- **Database Backups** - Neon automated backups

---

## 📚 Additional Resources

### Official Documentations

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [tRPC Documentation](https://trpc.io)
- [React Flow Documentation](https://reactflow.dev)
- [BetterAuth Documentation](https://www.better-auth.com)
- [Inngest Documentation](https://www.inngest.com/docs)
- [AI SDK Documentation](https://ai-sdk.dev)
- [Sentry Documentation](https://docs.sentry.io)

### Tutorials & Guides

- [Setting up PostgreSQL with Neon](https://neon.tech/docs/get-started-with-neon/signing-up)
- [Google OAuth Setup](https://console.developers.google.com)
- [GitHub OAuth Setup](https://github.com/settings/developers)
- [Stripe Integration Guide](https://stripe.com/docs/payments/setup-intent)
- [Discord Webhooks](https://discord.com/developers/docs/resources/webhook)
- [Slack API Reference](https://api.slack.com)

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Prisma migration fails**
```bash
# Reset and try again
npx prisma migrate reset
npx prisma migrate dev --name fix
```

**Issue: tRPC types not updating**
```bash
# Regenerate client types
npm run trpc:generate
```

**Issue: Environment variables not loading**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Issue: Database connection timeout**
```bash
# Check DATABASE_URL in .env.local
# Verify Neon connection string format
# Test connection: psql <DATABASE_URL>
```

**Issue: Node execution not triggering**
```bash
# Check Inngest subscription
# Verify webhook endpoint is accessible
# Check logs in Inngest dashboard
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create feature branch** - `git checkout -b feature/amazing-feature`
3. **Make changes** - Follow code style and conventions
4. **Commit messages** - Use conventional commits
   ```
   feat: add new AI node type
   fix: resolve credential encryption issue
   docs: update authentication guide
   ```
5. **Push branch** - `git push origin feature/amazing-feature`
6. **Create Pull Request** - Describe changes and testing

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include JSDoc comments for functions
- Test before submitting PR

---

<div align="center">

**Made with ❤️ by the Prashant Kumar Verma**

[⭐ Star us on GitHub](https://github.com/Kumar209/NodeFlowX) | [Visit Website](https://nodeflowx.dev)

</div>