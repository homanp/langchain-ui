<!-- Title -->

# 🧬 LangChain UI

The no-code open source chat-ai toolkit built on top of [LangChain](https://github.com/hwchase17/langchain).

<p>
<img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/homanp/langchain-ui" />
<img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/homanp/langchain-ui" />
<img alt="" src="https://img.shields.io/github/repo-size/homanp/langchain-ui" />
<img alt="GitHub Issues" src="https://img.shields.io/github/issues/homanp/langchain-ui" />
<img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/homanp/langchain-ui" />
<img alt="Github License" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

## About the project

LangChain UI enables anyone to create and host chatbots using a no-code type of inteface.

Features:

👉 Create custom chatGPT like Chatbot.

👉 Give context to the chatbot using external datasources, chatGPT plugins and prompts.

👉 Dedicated API endpoint for each Chatbot.

👉 Bring your own DB

👉 Bring your own Auth provider (defaults to Github)

👉 Usage quoutas

👉 Embed Chatbots to any site or application

👉 Chatbot themes

... and more

## Roadmap

- [x] Bring your own db
- [x] Bring your own Auth provider
- [x] Chatbots
- [x] Prompt templates
- [-] API endpoints to chatbot
- [ ] External datasources
- [ ] chatGPT plugins
- [ ] Chatbots themes
- [ ] Chatbot embedding

## Stack

- [Next.js](https://nextjs.org/?ref=langchain-ui)
- [Chakra UI](https://chakra-ui.com/?ref=langchain-ui)
- [Prisma](https://prisma.io/?ref=langchain-ui)
- [NextAuth](https://next-auth.js.org/?ref=langchain-ui)

LangChain UI utilizes NextJS 13 `appDir`. Read more about it [here](https://nextjs.org/blog/next-13#new-app-directory-beta)

## Getting started

### Langchain UI API

We have migrated all agent functionality from LangChain Typescript to LangChain Python. Thus you will need to run the (Langchain UI API)[https://github.com/homanp/langchain-ui] in order to interact with the chatbot. In the future when the TS package is on par with the Python package we will migrate to only using Javascript.

### Installation

1. Setup the (Langchain UI API)[https://github.com/homanp/langchain-ui]

1. Clone the repo into a public GitHub repository (or fork https://github.com/homanp/langchain-ui/fork). If you plan to distribute the code, keep the source code public.

   ```sh
   git clone https://github.com/homanp/langchain-ui.git
   ```

1. Go to the project folder

   ```sh
   cd langchain-ui
   ```

1. Install packages with npm

   ```sh
   npm install
   ```

1. Set up your .env file

   - Duplicate `.env.example` to `.env`

1. Run the project

   ```sh
   npm run dev
   ```

1. Run the linter

   ```sh
   npm run lint
   ```

1. Build the project

   ```sh
   npm run build
   ```

## Contributions

Our mission is to make it easy for anyone to create and run LLM apps in the cloud. We are super happy for any contributions you would like to make. Create new features, fix bugs or improve on infra.

You can read more on how to contribute [here](https://github.com/homanp/langchain-ui/blob/main/.github/CONTRIBUTING.md).
