import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";
import ChatInput from "./input";
import ChatOuput from "./output";
import { sendChatMessage } from "@/lib/api";

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

      const response = await sendChatMessage(id, values);

      setMessages((previousMessages) => [...previousMessages, response]);

      setIsSendingMessage();
    },
    [id]
  );

  return (
    <Stack {...properties} justifyContent="space-between" minHeight="100vh">
      <ChatOuput isLoading={isSendingMessage} messages={messages} />
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
