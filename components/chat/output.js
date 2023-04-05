import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";

export default function ChatOuput({ messages, isLoading }) {
  const loaderColor = useColorModeValue("gray.100", "white");

  return (
    <Stack flex={1}>
      {messages.map(({ agent, data: { response } }, index) => (
        <HStack key={index}>
          <Text>{agent}</Text>
          <Text>{response}</Text>
        </HStack>
      ))}
      {isLoading && (
        <HStack>
          <Avatar size="sm" src="/chatbot.png" />
          <Stack borderRadius="full" borderWidth="1px" padding={2}>
            <BeatLoader color={loaderColor} size={8} />
          </Stack>
        </HStack>
      )}
    </Stack>
  );
}

ChatOuput.propTypes = {
  messages: PropTypes.array,
  isLoading: PropTypes.bool,
};
