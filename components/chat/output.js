import React, { useEffect, useRef } from "react";
import { Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Message from "./message";

export default function ChatOuput({
  messages,
  newMessage,
  isLoading,
  ...properties
}) {
  const lastMessageReference = useRef();

  useEffect(() => {
    if (lastMessageReference?.current) {
      lastMessageReference?.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <Stack flex={1} maxWidth="100%" {...properties}>
      <Stack spacing={0}>
        {messages.map(({ agent, data: { response } }, index) => (
          <Message
            key={index}
            agent={agent}
            message={response}
            isLastMessage={index + 1 === messages.length}
          />
        ))}
        {newMessage && (
          <Message agent="ai" message={newMessage} isLastMessage={true} />
        )}
      </Stack>
    </Stack>
  );
}

ChatOuput.propTypes = {
  messages: PropTypes.array,
  newMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};
