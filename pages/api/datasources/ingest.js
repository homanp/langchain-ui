import ky from "ky";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import Metal from "@getmetal/metal-sdk";

const datasourceIngestHandler = async (request, response) => {
  const { url, type } = request.body;
  const blob = await ky(url).blob();
  const loader = new CSVLoader(blob);
  const docs = await loader.load();
  const texts = docs.map((doc) => doc.pageContent);

  const {
    data: { id },
  } = await ky
    .post(
      `https://api.getmetal.io/v1/apps/${process.env.METAL_APP_ID}/indexes`,
      {
        headers: {
          "x-metal-api-key": process.env.METAL_API_KEY,
          "x-metal-client-id": process.env.METAL_CLIENT_ID,
        },
        json: {
          model: "text-embedding-ada-002",
          name: "langchain-ui",
          dimensions: 1536,
        },
      }
    )
    .json();

  const metal = new Metal(
    process.env.METAL_API_KEY,
    process.env.METAL_CLIENT_ID,
    id
  );

  console.log(metal);

  await Promise.all(texts.map((text) => metal.index({ text })));

  response.status(200).json({ success: true, data: { indexId: id } });
};

export default datasourceIngestHandler;
