import React from "react";
import { Stack, Text } from "@chakra-ui/react";

export default function CsvUpload() {
  return (
    <Stack
      borderWidth="1px"
      borderRadius="sm"
      padding={10}
      borderStyle="dashed"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="gray.500" fontSize="sm" textDecoration="underline">
        Upload a CVS file
      </Text>
    </Stack>
  );
}
