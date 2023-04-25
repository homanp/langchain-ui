import ky from "ky";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

const datasourceIngestHandler = async (request, response) => {
  const { url, type } = request.body;

  response.status(200).json({ success: true, data: null });
};

export default datasourceIngestHandler;
