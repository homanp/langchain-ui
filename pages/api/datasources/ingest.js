const datasourceIngestHandler = async (request, response) => {
  response.status(200).json({ success: true, data: null });
};

export default datasourceIngestHandler;
