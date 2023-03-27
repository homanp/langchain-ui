import ky from "ky";

export const getPrompTemplates = async () =>
  ky.get("/api/promp-templates").json();
