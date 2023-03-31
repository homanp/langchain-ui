const cURL = `\`\`\`bash
# cURL request to chatbot API endpoint.
curl -X POST https://langchain-ui.vercel.app/api/v1/chatbot/{{id}}
   -H "Content-Type: application/json"
   -H "Authorization: Bearer {token}"
   -d '{"message": "Hello!"}'
\`\`\``;

const javascript = `\`\`\`jsx
# Javascript request to chatbot API endpoint.
const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json'
        'Authorization': 'Bearer {token}'
    },
    body: JSON.stringify({ message: 'Hello!' })
};

const response = await fetch(
    'https://langchain-ui.vercel.app/api/v1/chatbot/{{id}}', 
    requestOptions
);
const data = await response.json();
\`\`\``;

const python = `\`\`\`python
# Python request to chatbot API endpoint using the requests library.
import requests

url = 'https://langchain-ui.vercel.app/api/v1/chatbot/{{id}}'
headers = {'Authorization': 'Bearer {token}'}
payload = {'messsage': 'Hello!'}

response = requests.post(url, data = payload, headers = headers)

print(response.text)
\`\`\``;

export const API_DOCS = [
  {
    id: "curl",
    label: "cURL",
    code: cURL,
  },
  {
    id: "javascript",
    label: "Javascript",
    code: javascript,
  },
  {
    id: "python",
    label: "Python",
    code: python,
  },
];
