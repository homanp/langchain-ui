import { NextResponse } from "next/server";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { MessagesPlaceholder } from "langchain/prompts";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { DEFAULT_PROMPT_TEMPLATE } from "@/lib/prompt-template";
import { prismaClient } from "@/lib/prisma";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  const { chatbotId } = params;
  const { message } = await request.json();
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const [{ promptTemplateId }, messages] = await Promise.all([
    prismaClient.chatbot.findUnique({
      where: { id: parseInt(chatbotId) },
    }),
    prismaClient.chatbotMessage.findMany({
      where: { chatbotId: parseInt(chatbotId) },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const promptTemplate = promptTemplateId
    ? await prismaClient.promptTemplate.findUnique({
        where: { id: promptTemplateId },
      })
    : undefined;

  const history = messages.map(({ agent, message }) =>
    agent === "ai" ? new AIChatMessage(message) : new HumanChatMessage(message)
  );

  const memory = new BufferMemory({
    memoryKey: "history",
    chatHistory: new ChatMessageHistory(history),
    returnMessages: true,
  });

  const llm = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken: async (token) => {
        await writer.ready;
        await writer.write(encoder.encode(`data: ${token}\n\n`));
      },
      handleLLMEnd: async () => {
        await writer.ready;
        await writer.close();
      },
      handleLLMError: async (e) => {
        await writer.ready;
        await writer.abort(e);
      },
    }),
  });

  const prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      promptTemplate?.prompt || DEFAULT_PROMPT_TEMPLATE
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{message}"),
  ]);

  const chain = new ConversationChain({
    memory,
    prompt,
    llm,
  });

  chain.call({ message });

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
