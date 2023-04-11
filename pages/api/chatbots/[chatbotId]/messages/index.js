import { prismaClient } from "@/lib/prisma";

export const chatbotMessagesHandler = async (request, response) => {
  const { chatbotId } = request.query;

  if (request.method === "POST") {
    const message = await prismaClient.chatbotMessage.create({
      data: {
        chatbotId: parseInt(chatbotId),
        ...request.body,
      },
    });

    return response.status(200).json({ sucess: true, data: message });
  }
};

export default chatbotMessagesHandler;
