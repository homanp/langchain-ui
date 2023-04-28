import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import { ConversationChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { MessagesPlaceholder } from "langchain/prompts";
import { DEFAULT_PROMPT_TEMPLATE } from "@/lib/prompt-template";

export const useChain = ({
  messages = [],
  promptTemplate,
  onLLMNewToken = () => {},
  onLLMEnd = () => {},
  onLLMError = () => {},
}) => {
  const history = messages.map(({ agent, message }) =>
    agent === "ai" ? new AIChatMessage(message) : new HumanChatMessage(message)
  );

  const memory = new BufferMemory({
    memoryKey: "history",
    chatHistory: new ChatMessageHistory(history),
    returnMessages: true,
  });

  const chat_llm = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken(token) {
        onLLMNewToken(token);
      },
      handleLLMEnd: async () => {
        onLLMEnd();
      },
      handleLLMError: async (error) => {
        onLLMError(error);
      },
    }),
  });

  const qa_llm = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken(token) {
        onLLMNewToken(token);
      },
      handleLLMEnd: async () => {
        onLLMEnd();
      },
      handleLLMError: async (error) => {
        onLLMError(error);
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

  return new ConversationChain({
    memory,
    prompt,
    llm: chat_llm,
  });
};
