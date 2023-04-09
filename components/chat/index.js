import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";
import ChatInput from "./input";
import ChatOuput from "./output";
import { createChatbotMessage, sendChatMessage } from "@/lib/api";

export default function Chat({ id, ...properties }) {
  const [messages, setMessages] = useState([]);
  const [isSendingMessage, setIsSendingMessage] = useState();

  const onSubmit = useCallback(
    async (values) => {
      setIsSendingMessage(true);
      setMessages((previousMessages) => [
        ...previousMessages,
        { data: { response: values } },
      ]);

      await createChatbotMessage(id, {
        message: values,
        agent: "user",
      });

      const response = await sendChatMessage({
        id,
        message: values,
      });

      createChatbotMessage(id, {
        message: response.data.response,
        agent: "ai",
      });

      setMessages((previousMessages) => [...previousMessages, response]);

      setIsSendingMessage();
    },
    [id]
  );

  return (
    <Stack
      {...properties}
      minHeight="100vh"
      maxHeight="100vh"
      justifyContent="space-between"
      spacing={6}
    >
      <ChatOuput
        isLoading={isSendingMessage}
        messages={messages}
        overflowY="auto"
      />
      <ChatInput
        isLoading={isSendingMessage}
        onSubmit={onSubmit}
        paddingBottom={6}
      />
    </Stack>
  );
}

Chat.propTypes = {
  id: PropTypes.string,
};
