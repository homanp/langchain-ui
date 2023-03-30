import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

const prismaClient = new PrismaClient();

const chatbotHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);
  const { chatbotId } = request.query;

  if (!session) {
    return response
      .status(403)
      .json({ success: false, error: "Not authenticated" });
  }

  if (request.method === "DELETE") {
    const data = await prismaClient.chatbot.delete({
      where: {
        id: parseInt(chatbotId),
      },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }

  if (request.method === "GET") {
    const data = await prismaClient.chatbot.findUnique({
      where: {
        id: parseInt(chatbotId),
      },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }
};

export default chatbotHandler;
