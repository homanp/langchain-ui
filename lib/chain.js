import { ChatOpenAI } from "langchain/chat_models";
import { ConversationChain } from "langchain/chains";
import { CallbackManager } from "langchain/callbacks";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { DEFAULT_PROMPT_TEMPLATE } from "@/lib/prompt-template";

export const makeChain = ({ onTokenStream = () => {} }) => {
  const llm = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken(token) {
        onTokenStream(token);
      },
    }),
  });

  const prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(DEFAULT_PROMPT_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{message}"),
  ]);

  return new ConversationChain({
    prompt,
    llm,
  });
};
