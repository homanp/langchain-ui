import ky from "ky";

export const createApiKey = async (data) =>
  ky.post("/api/api-keys", { json: data }).json();

export const createChatbot = async (data) =>
  ky.post("/api/chatbots", { json: data }).json();

export const createChatbotMessage = async (id, data) =>
  ky
    .post(`/api/chatbots/${id}/messages`, {
      json: { ...data },
      timeout: 60000,
    })
    .json();

export const createPromptTemplate = (data) =>
  ky.post("/api/prompt-templates", { json: data }).json();

export const getApiKeys = async () => ky.get("/api/api-keys").json();

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

export const removeApiKeyById = async (id) =>
  ky.delete(`/api/api.keys/${id}`).json();

export const removePromptTemplateById = async (id) =>
  ky.delete(`/api/prompt-templates/${id}`).json();

export const removeChatbotById = async (id) =>
  ky.delete(`/api/chatbots/${id}`).json();

export const sendChatMessage = async ({ id, message, history }) =>
  ky
    .post(`/api/v1/chatbots/${id}`, {
      json: { message, history },
      timeout: 60000,
    })
    .json();

export const updateChatbotById = async (id, data) =>
  ky
    .patch(`/api/chatbots/${id}`, {
      json: { ...data },
    })
    .json();
