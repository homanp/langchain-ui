import ky from "ky";

export const createPromptTemplate = (data) =>
  ky.post("/api/prompt-templates", { json: data }).json();

export const getPromptVariables = (string) => {
  let variables = [];
  let regex = /{{(.*?)}}/g;
  let match;

  while ((match = regex.exec(string))) {
    variables.push(match[1].trim());
  }

  return variables;
};

export const getPrompTemplates = async () =>
  ky.get("/api/prompt-templates").json();
