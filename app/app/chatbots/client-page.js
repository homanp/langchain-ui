"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync, useAsyncFn } from "react-use";
import PageHeader from "@/components/page-header";
import { useSidebar } from "@/lib/sidebar";
import { createChatbot, getChatbots, removeChatbotById } from "@/lib/api";

export default function ChatbotsClientPage() {
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const borderBottomColor = useColorModeValue("gray.50", "#333");
  const router = useRouter();
  const menu = useSidebar();
  const [chatbots, setChatbots] = useState([]);

  const { loading: isLoading } = useAsync(async () => {
    const { data } = await getChatbots();
    setChatbots(data);

    return data;
  }, [getChatbots]);

  const [{ loading: isCreatingChatbot }, handleCreateChatbot] =
    useAsyncFn(async () => {
      const payload = {
        name: "Untitled",
      };
      const { data: chatbot } = await createChatbot(payload);

      router.push(`/app/chatbots/${chatbot.id}`);
    }, [createChatbot, router]);

  const handleRemoveChatbot = useCallback(async (chatbotId) => {
    await removeChatbotById(chatbotId);

    setChatbots((prev) => prev.filter(({ id }) => id !== chatbotId));
  }, []);

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "chatbots").icon}
        title="Chatbots"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={handleCreateChatbot}
            isLoading={isCreatingChatbot}
            loadingText="Creating..."
          >
            New chatbot
          </Button>
        </HStack>
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && (
        <TableContainer>
          <Table size="sm">
            <Tbody>
              {chatbots.map(({ id, name }) => (
                <Tr key={id}>
                  <Td
                    cursor="pointer"
                    _hover={{ opacity: 0.5 }}
                    borderBottomColor={borderBottomColor}
                  >
                    {name}
                  </Td>
                  <Td textAlign="right" borderBottomColor={borderBottomColor}>
                    <IconButton
                      size="sm"
                      icon={<Icon as={TbTrashX} fontSize="lg" />}
                      variant="ghost"
                      onClick={() => handleRemoveChatbot(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}
