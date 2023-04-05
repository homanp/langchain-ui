import { ChatOpenAI } from "langchain/chat_models";
import { ConversationChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
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

  const chatbot = await prismaClient.chatbot.findUnique({
    where: { id: parseInt(chatbotId) },
  });

  const promptTemplate = await prismaClient.promptTemplate.findUnique({
    where: { id: chatbot.promtTemplateId },
  });

  const llm = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken(token) {
        handleNewToken(token);
      },
    }),
  });

  const prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(DEFAULT_PROMPT_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{message}"),
  ]);

  function handleNewToken(token) {
    console.log(`${token}`);
  }

  const chain = new ConversationChain({
    prompt,
    llm,
  });

  return response
    .status(200)
    .json({ success: true, data: await chain.call({ message }), agent: "ai" });
};

export default chatbotHandler;
