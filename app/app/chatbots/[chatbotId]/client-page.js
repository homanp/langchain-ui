"use client";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";
import { useAsync } from "react-use";
import { getChatbotById } from "@/lib/api";

export default function ChatbotClientPage({ chatbotId }) {
  const { loading: isLoading, value: chatbot } = useAsync(
    async () => getChatbotById(chatbotId),
    [chatbotId, getChatbotById]
  );

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <p>OK</p>
    </Stack>
  );
}

ChatbotClientPage.propTypes = {
  chatbotId: PropTypes.number,
};
