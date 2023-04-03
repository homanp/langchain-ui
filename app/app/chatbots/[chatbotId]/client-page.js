"use client";
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  Center,
  GridItem,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useAsync } from "react-use";
import { getChatbotById } from "@/lib/api";
import Chat from "@/components/chat";
import CodeBlock from "@/components/code-block";
import AssignPromptTemplate from "@/components/chat/prompt-templates";

import { API_DOCS } from "@/lib/api-docs";

export default function ChatbotClientPage({ chatbotId }) {
  const [chatbot, setChatbot] = useState();
  const { loading: isLoading } = useAsync(async () => {
    const { data } = await getChatbotById(chatbotId);

    setChatbot(data);
  }, [chatbotId, getChatbotById]);

  const handleChange = useCallback(
    (values) => setChatbot((prev) => ({ ...prev, ...values })),
    []
  );

  return (
    <Stack flex={1} spacing={4}>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && (
        <SimpleGrid columns={3} flex={1}>
          <GridItem colSpan={2} borderRightWidth={0.5}>
            <Chat id={chatbotId} />
          </GridItem>
          <GridItem>
            <Stack divider={<StackDivider />} spacing={0}>
              <Text paddingY={4} paddingX={6} fontSize="sm" fontWeight={500}>
                {chatbot.name}
              </Text>
              <Stack paddingY={4} paddingX={6}>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Provider
                  </Text>
                  <Text fontSize="sm">Coming soon...</Text>
                </Stack>
                <AssignPromptTemplate
                  chatbot={chatbot}
                  onChange={handleChange}
                />
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Datasources
                  </Text>
                  <Text fontSize="sm">Coming soon...</Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Plugins
                  </Text>
                  <Text fontSize="sm">Coming soon...</Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Tools
                  </Text>
                  <Text fontSize="sm">Coming soon...</Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    API
                  </Text>
                  <Text fontSize="sm">
                    Interact with your chatbot using the following API call
                  </Text>
                  <CodeBlock items={API_DOCS} />
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Embed
                  </Text>
                  <Text fontSize="sm">Coming soon...</Text>
                </Stack>
              </Stack>
            </Stack>
          </GridItem>
        </SimpleGrid>
      )}
    </Stack>
  );
}

ChatbotClientPage.propTypes = {
  chatbotId: PropTypes.string,
};
