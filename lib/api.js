import ky from "ky";

export const createChatbot = (data) =>
  ky.post("/api/chatbots", { json: data }).json();

export const createPromptTemplate = (data) =>
  ky.post("/api/prompt-templates", { json: data }).json();

export const getChatbotById = async (id) =>
  ky.get(`/api/chatbots/${id}`).json();

export const getChatbots = async () => ky.get("/api/chatbots").json();

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

export const removePromptTemplateById = async (id) => {
  ky.delete(`/api/prompt-templates/${id}`).json();
};

export const removeChatbotById = async (id) => {
  ky.delete(`/api/chatbots/${id}`).json();
};
