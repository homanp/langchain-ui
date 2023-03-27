import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const prismaClient = new PrismaClient();

const promptTemplatesHander = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);

  if (request.method === "GET") {
    try {
      const data = await prismaClient.promptTemplate.findMany({
        where: {
          userId: {
            equals: session.user.id,
          },
        },
      });

      response.stats(200).json({
        success: true,
        data,
      });
    } catch (error) {
      response.status(500).json({ succes: false, error });
    }
  }

  if (request.method === "POST") {
    try {
      const promptTemplate = await prismaClient.promptTemplate.create({
        data: {
          userId: session.user.id,
          ...request.body,
        },
      });

      response.status(200).json({ sucess: true, data: promptTemplate });
    } catch (error) {
      response.status(500).json({ succes: false, error });
    }
  }
};

export default promptTemplatesHander;
