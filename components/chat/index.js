import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbSend } from "react-icons/tb";
import autosize from "autosize";
import { useAsyncFn } from "react-use";

export default function Chat({ ...properties }) {
  const backgroundColor = useColorModeValue("gray.100", "#131313");
  const iconColor = useColorModeValue("gray.500", "white");
  const [message, setMessage] = useState();
  const textareaReference = useRef();
  const [{ loading: isSendingMessage }, onSubmit] = useAsyncFn(async () => {
    console.log(message);
  }, [message]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();

        onSubmit();
        setMessage("");
      }
    },
    [onSubmit]
  );

  useEffect(() => {
    const ref = textareaReference?.current;

    autosize(ref);

    return () => {
      autosize.destroy(ref);
    };
  }, []);

  return (
    <Stack
      {...properties}
      padding={4}
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Stack flex={1}>
        <Text fontSize="sm">Loading chat...</Text>
      </Stack>
      <HStack
        backgroundColor={backgroundColor}
        borderWidth="1px"
        padding={4}
        borderRadius="md"
        alignItems="center"
      >
        <Textarea
          ref={textareaReference}
          variant="unstyled"
          value={message}
          placeholder="Send a message"
          onKeyDown={handleKeyDown}
          backgroundColor="transparent"
          onChange={(event) => setMessage(event.target.value)}
          flex={1}
          rows={1}
          size="sm"
          outline="none"
          resize="none"
        />
        <IconButton
          alignSelf="flex-end"
          variant="ghost"
          size="sm"
          isLoading={isSendingMessage}
          onClick={() => onSubmit()}
          icon={<Icon as={TbSend} color={iconColor} fontSize="lg" />}
        />
      </HStack>
    </Stack>
  );
}
