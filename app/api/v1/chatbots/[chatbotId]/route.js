import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { useChain } from "@/lib/chain";

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
    onLLMNewToken: handleNewToken,
    onLLMEnd: handleTokenEnd,
    onLLMError: handleTokenError,
  });

  chain.call({ message });

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
