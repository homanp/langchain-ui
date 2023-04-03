import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Stack } from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import ChatInput from "./input";
import ChatOuput from "./output";
import { sendChatMessage } from "@/lib/api";

export default function Chat({ id, ...properties }) {
  const [{ loading: isSendingMessage }, onSubmit] = useAsyncFn(
    async (values) => {
      const response = await sendChatMessage(id, values);
      console.log(response);
    },
    []
  );

  return (
    <Stack
      {...properties}
      padding={4}
      justifyContent="space-between"
      minHeight="100vh"
    >
      <ChatOuput />
      <ChatInput isLoading={isSendingMessage} onSubmit={onSubmit} />
    </Stack>
  );
}

Chat.propTypes = {
  id: PropTypes.string,
};
