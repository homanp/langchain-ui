import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
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
      spacing={6}
      position="relative"
    >
      <ChatOuput
        isLoading={isSendingMessage}
        messages={messages}
        overflowY="auto"
        paddingBottom={40}
      />
      <ChatInput
        position="absolute"
        bottom="0"
        width="100%"
        isLoading={isSendingMessage}
        onSubmit={onSubmit}
        paddingY={6}
      />
    </Stack>
  );
}

Chat.propTypes = {
  id: PropTypes.string,
};
