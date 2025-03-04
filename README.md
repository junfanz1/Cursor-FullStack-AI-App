
<!-- TOC --><a name="prompting-cursor-to-develop-full-stack-ai-application"></a>
# Prompting Cursor to develop Full-Stack AI Application

<!-- TOC --><a name="content"></a>
## Content

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->
   * [1. Project Overview](#1-project-overview)
   * [2. Cursor Tips](#2-cursor-tips)
   * [3. Create SaaS Application by Next.js](#3-create-saas-application-by-nextjs)
   * [4. Backend functionality `Github Summarizer` with LangChain](#4-backend-functionality-github-summarizer-with-langchain)
   * [5. Authentication Flow for user login](#5-authentication-flow-for-user-login)
   * [6. Landing Page UI Web development with Shadcn and V0(Vercel)](#6-landing-page-ui-web-development-with-shadcn-and-v0vercel)
   * [7. RESTful API for API keys management](#7-restful-api-for-api-keys-management)
   * [8. Deployment](#8-deployment)
   * [Acknowledgement](#acknowledgement)

<!-- TOC end -->

<!-- TOC --><a name="1-project-overview"></a>
## 1. Project Overview

- Build E2E Micro SaaS AI application, takes in Github urls, generate json reports with AI powered insights and repo stats, similar to Gitingest
- Next.js to write full stack app, v0 to generate UI components, shadcn/ui for UI components, Supabase to store data with PostgreSQL, Vercel to deploy code, LangChain.js to write backend code to interact with LLM

![image](https://github.com/user-attachments/assets/f5c8ae6f-3f86-49f0-831f-5404840f6350)

<!-- TOC --><a name="2-cursor-tips"></a>
## 2. Cursor Tips
- Chat, Composer
- Inline editing coding (Command + K), will open a prompt bar to fill in snippets, can add follow up instructions (debug…)
- (Control + I): refactor code and break down a few files 
- `.cursorrules` file, can prompt every time the rules (coding style, conventions, etc.) based on LLM sent to the cursor. Go to [Cursor website cursor.directory](https://cursor.directory/), find TypeScript, copy paste, it’s local to our codebase, different contexts for different stack.
- Cursor notepad for prompt engineering: can add context which changes when you’re doing. (See below: RESTful API for API keys management)
- Input Modal with Cursor tag, just like chatting with teammate
![image](https://github.com/user-attachments/assets/ebacbf2f-dde2-403f-8535-f34de0aca05d)

- Break down huge prompts into smaller tasks, otherwise debugging will be a huge pain, don’t put one big feature in a single prompt.
- Bolt vs. Windsurf vs. Cursor copilots

<!-- TOC --><a name="3-create-saas-application-by-nextjs"></a>
## 3. Create SaaS Application by Next.js

```bash
npx create-next-app@latest
cd junfan (project name)
npm run dev
```

Cursor Prompt:
- `@page.js   Create a button that will redirect to /dashboards that will be the dashboard for managing api keys. it'll have a UI for CRUD API for api keys. Then implement a UI for CRUD for managing user api keys.`
- Give a screenshot to Cursor and say: `i like this design, make the UI like this. make when clicking "create" open a modal like this, make when clicking the eye icon to show the api key. when clicking on the copy icon, it is copied to the clipboard. add popups when I create and delete and edit api keys. add the sidebar like screenshot. change the title on the left sidebar from "Tavily" to "Junfan AI", and use my logo image.`

Connect to Supabase:
- `@page.js connect this CRUD API to a real database which is hosted on Supabase`
- Create a project and then table in Supabase, add columns: `{id: uuid, created_at: timestamp, "name": text, "value": text, "usage": int8}`, in Supabase/Settings/Data API, copy anon key and project url, and add file in `cursor-project/.env.local`, in this file input

```bash
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon key
NEXT_PUBLIC_SUPABASE_URL=project url
```
Now we can create API keys and see their storage on Supabase.

Next, create API playground. Cursor Prompt:
- `@Sidebar.js when clicking on "API playground", go into a new page /playground where it will have a form to submit an API key. When submitting the form, it will go to /protected page and there we will validate that this is a valid api key. if it is  we will notify with @Notification.js a green popup of "valid api key, /protected can be assessed"; if api key is not valid we will popup a red popup saying "invalid api key". if it's not a valid api key, pop up red window "invalid api key", if it's a valid api key which is matching the supabase record, pop up green window "valid api key"`

![image](https://github.com/user-attachments/assets/47bfe6c5-cd9c-4a6f-bd05-1f0483a94c14)

Now we have a SaaS application that can be used via API keys and can be validated. 

Next, build the app in cloud which is scalable, deploy on Vercel.
- import the project from Github, and enter the Framework and Environment variables.

<img src="https://github.com/user-attachments/assets/151cc71d-a350-4a58-b07d-b16ccb2d71db" width="50%" height="50%">

- https://github.com/junfanz1/CursorApptest
- https://cursor-apptest.vercel.app/ 

<!-- TOC --><a name="4-backend-functionality-github-summarizer-with-langchain"></a>
## 4. Backend functionality `Github Summarizer` with LangChain

- Use Postman for backend SaaS service, to validate API key, `{input: url, process raw message: api_key = xxx, output: “valid api key”.}`.
- Cursor prompt: `generate LangChain chain from @LangChain-JS that will generate the prompt of “summarize this github repository from readme file content”, then inject readme content to the prompt. The chain will invoke an LLM, we want to get structured output to an object with field “summary”: str and “cool facts”: List[str]`
- Coding style: Python to Pydantic is what Java to Zod, using these tools can output more strictly with a schema, we can use function schema, function calling, output parsing to make our code robust. Cursor prompt: `use withStructuredOutput from @LangChain-JS and bind it to the model`, to make LangChain model return structured data.

<!-- TOC --><a name="5-authentication-flow-for-user-login"></a>
## 5. Authentication Flow for user login

- Download NextAuth.js, Cursor prompt: `implement entire Google SSO flow, show me step by step what I need to configure. Add a login button @page.js`
- Go to Google Cloud, right up Console, Build Project, left sidebar APIs & Services/OAuth consent screen, fill in and then left side Credentials/Create OAuth client ID, get Google_Client_ID, GOOGLE_CLIENT_SECRET, then put in `.env.local`, configure all variables
- Add profile pic, and Google SSO for user to sign in and sign out
- Supabase authentication. Create a matching supabase migration script to add the table ‘users’

<!-- TOC --><a name="6-landing-page-ui-web-development-with-shadcn-and-v0vercel"></a>
## 6. Landing Page UI Web development with Shadcn and V0(Vercel)

- V0 website prompt: `a landing page for junfan github analyzer. It’s a SasS application with a free tier which gives you an api and you will output with AI github open source repositories summaries, analyses, starts, important pull requests, etc. The landing page should have a sign up / login button and a pricing with free tier.` It’ll generate the web preview and tsx code. Then prompt: `show me how to install it and use it step by step.` It’ll guide you to install all packages and configs. On the right side, it shows Preview webpage and .tsx code.
- Shadcn UI, has many reusable components to add to our API demo component and intergrate into our landing page, beautifully designed and can do copy paste into our apps. Go to Blocks, click on Lift Mode, click on the black button below to open it, it opens the V0 chat window, we can customize our needs. 

![image](https://github.com/user-attachments/assets/02289376-6d0d-4b0e-8fb6-c17efcf91a69)

<!-- TOC --><a name="7-restful-api-for-api-keys-management"></a>
## 7. RESTful API for API keys management

- Create Cursor notepad “CRUD”, prompt: `implement a CRUD API for managing API keys, the original code is in @apiKeyOperations.js`. If we tag this notepad, notepad will be attached to every request Cursor is going to make with LLM with our prompt. We can write a lot of high-level descriptions, product requirements, for the task. (e.g. We can copy the Jira ticket screenshot to give context to LLM).
![image](https://github.com/user-attachments/assets/239e3d1b-15cb-4a85-9af0-9c75eb17e022)

- CRUD REST API, integrating with UI. `update @page.js to use CRUD rest endpoints in @api-keys, get the current logged in user JWT in the client and send it to the server to perform all CRUD operations. Remove the usage from @apiKeyOperation.js and delete this file.`
- Adding retaliating and quota enforcement. `implement rate limit protection to /github-summarizer api in route.js. Each time a user invokes an api key, we want to increment the api key usage column of the corresponding api key in supabase. Check if the user is lower than the limit of api key, if larger, return 429 response and say there’s a rate limit. Make code usable and easy to maintain by splitting CheckApiKeyUsage() and UpdateApiKeyUsage() functions.`
 
<!-- TOC --><a name="8-deployment"></a>
## 8. Deployment

- Configure a custom production domain, buy from GoDaddy, setup domain with Vercel in Project Settings/Domains, add domain `www.junfan.cloud`, add A Record (copy this configure IP, go to GoDaddy Domain/Manage DNS to add new DNS records, then go back to refresh) and CNAME, then the web is online. Go to Google Cloud console/APIs Services/Credentials to add in URIs the new domain to allow list in authentication client.
- Patching Vulnerability handling. Because the application is vulnerable to cache poisoning, `sudo yarn audit` will find 1 vulnerability, prompt: `how to upgrade next version with yarn, need to upgrade what packages`. Then `sudo yarn audit –fix` should fix it.

<!-- TOC --><a name="acknowledgement"></a>
## Acknowledgement

> [Eden Marco: Cursor Course: FullStack development with Cursor AI Copilot](https://www.udemy.com/course/cursor-ai-ide/)
