import { ChatOpenAI } from "langchain/chat_models";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { MessagesPlaceholder } from "langchain/prompts";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { PrismaClient } from "@prisma/client";
import { DEFAULT_PROMPT_TEMPLATE } from "@/lib/prompt-template";

const prismaClient = new PrismaClient();

const chatbotHandler = async (request, response) => {
  const { chatbotId } = request.query;
  const { message } = request.body;

  if (!message) {
    return response
      .status(400)
      .json({ success: false, error: "Required field {message} is missing" });
  }

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

  return response.status(200).json({
    success: true,
    data: await chain.call({
      message,
    }),
    agent: "ai",
  });
};

export default chatbotHandler;
