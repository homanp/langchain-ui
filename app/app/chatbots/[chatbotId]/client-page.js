"use client";
import PropTypes from "prop-types";
import { GridItem, SimpleGrid, Stack } from "@chakra-ui/react";
import { useAsync } from "react-use";
import { getChatbotById } from "@/lib/api";
import Chat from "@/components/chat";

export default function ChatbotClientPage({ chatbotId }) {
  const { loading: isLoading, value: chatbot } = useAsync(
    async () => getChatbotById(chatbotId),
    [chatbotId, getChatbotById]
  );

  return (
    <Stack flex={1} spacing={4}>
      <SimpleGrid columns={3} flex={1}>
        <GridItem colSpan={2} borderRightWidth={0.5}>
          <Chat />
        </GridItem>
        <GridItem></GridItem>
      </SimpleGrid>
    </Stack>
  );
}

ChatbotClientPage.propTypes = {
  chatbotId: PropTypes.number,
};
