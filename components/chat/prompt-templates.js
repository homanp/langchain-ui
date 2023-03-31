import React from "react";
import PropTypes from "prop-types";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";

export default function AssignPromptTemplate({ chatbot }) {
  return (
    <Stack spacing={0}>
      <Text fontSize="sm" fontWeight={500} color="gray.500">
        Prompt template
      </Text>
      <HStack>
        <Text fontSize="sm">No template</Text>
        <Text>-</Text>
        <Button fontWeight={500} size="sm" variant="link" color="orange">
          assign template
        </Button>
      </HStack>
    </Stack>
  );
}

AssignPromptTemplate.propTypes = {
  chatbot: PropTypes.object,
};
