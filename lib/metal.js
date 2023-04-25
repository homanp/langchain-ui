import Metal from "@getmetal/metal-sdk";
import { MetalRetriever } from "langchain/retrievers/metal";

const MetalSDK = Metal.default;

export const useMetal = ({ index }) => {
  const client = new MetalSDK(
    process.env.METAL_API_KEY,
    process.env.METAL_CLIENT_ID,
    index
  );

  const retriever = new MetalRetriever({ client });

  return { retriever };
};
