import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { ChatMessageHistory } from "langchain/memory";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { useChain } from "@/lib/chain";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  const { chatbotId } = params;
  const { message } = await request.json();
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  //TODO: Move to separate endpoint to suppor the edge runtime.
  const [{ promptTemplate, datasource }, messages] = await Promise.all([
    prismaClient.chatbot.findUnique({
      where: { id: parseInt(chatbotId) },
      include: {
        datasource: true,
        promptTemplate: true,
      },
    }),
    prismaClient.chatbotMessage.findMany({
      where: { chatbotId: parseInt(chatbotId) },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const history = messages.map(({ agent, message }) =>
    agent === "ai" ? new AIChatMessage(message) : new HumanChatMessage(message)
  );

  const handleNewToken = async (token) => {
    const match = /\r|\n/.exec(token);
    await writer.ready;
    await writer.write(encoder.encode(`data: ${token}\n\n`));
  };

  const handleTokenEnd = async () => {
    await writer.ready;
    await writer.write(encoder.encode(`data: CLOSE\n\n`));
    await writer.close();
  };

  const handleTokenError = async (error) => {
    await writer.ready;
    await writer.abort(error);
  };

  const chain = useChain({
    messages,
    promptTemplate,
    datasource,
    onLLMNewToken: handleNewToken,
    onLLMEnd: handleTokenEnd,
    onLLMError: handleTokenError,
  });

  chain.call(
    datasource
      ? { question: message, chat_history: new ChatMessageHistory(history) }
      : { message }
  );

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
