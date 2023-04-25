import { getServerSession } from "next-auth/next";
import jwt from "jsonwebtoken";
import { authOptions } from "../auth/[...nextauth]";
import { prismaClient } from "@/lib/prisma";

const apiKeysHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response
      .status(403)
      .json({ success: false, error: "Not authenticated" });
  }

  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
  });

  if (request.method === "GET") {
    const data = await prismaClient.accessToken.findMany({
      where: {
        userId: {
          equals: user.id,
        },
      },
    });

    return response.status(200).json({ success: true, data });
  }

  if (request.method === "POST") {
    const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET);
    const apiKey = await prismaClient.accessToken.create({
      data: {
        userId: user.id,
        token,
        name: token,
      },
    });

    return response.status(200).json({ success: true, data: apiKey });
  }
};

export default apiKeysHandler;
