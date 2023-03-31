"use client";
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

export default function ChatbotClientPage({ chatbotId }) {
  const { loading: isLoading, value: chatbot } = useAsync(async () => {
    const { data } = await getChatbotById(chatbotId);

    return data;
  }, [chatbotId, getChatbotById]);

  console.log(chatbot);

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
            <Chat />
          </GridItem>
          <GridItem>
            <Stack divider={<StackDivider />} spacing={0}>
              <Text padding={4} fontWeight={500}>
                {chatbot.name}
              </Text>
              <Stack padding={4}>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Prompt template
                  </Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Documents
                  </Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Tools
                  </Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Plugins
                  </Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    API
                  </Text>
                </Stack>
                <Stack>
                  <Text fontSize="sm" fontWeight={500} color="gray.500">
                    Embed
                  </Text>
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
