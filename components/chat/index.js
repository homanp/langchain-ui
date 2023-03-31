import React from "react";
import { Stack } from "@chakra-ui/react";
import { useAsyncFn } from "react-use";
import ChatInput from "./input";
import ChatOuput from "./output";

export default function Chat({ ...properties }) {
  const [{ loading: isSendingMessage }, onSubmit] = useAsyncFn(
    async (values) => {
      console.log(values);
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
