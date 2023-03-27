import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const prismaClient = new PrismaClient();

const promptTemplatesHander = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);

  if (request.method === "GET") {
    try {
      response.stats(200).json({
        success: true,
        data: await prismaClient.promptTemplate.findMany({
          where: {
            userId: {
              equals: session.user.id,
            },
          },
        }),
      });
    } catch (error) {
      response.status(500).json({ succes: false, error });
    }
  }
};

export default promptTemplatesHander;
