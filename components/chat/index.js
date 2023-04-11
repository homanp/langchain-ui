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

      await fetchEventSource(`/api/v1/chatbot/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: values,
        }),
        onmessage: (event) => {
          console.log(event);
        },
        onclose() {
          // if the server closes the connection unexpectedly, retry:
          console.log("closed");
        },
      });

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
