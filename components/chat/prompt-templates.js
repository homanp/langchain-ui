import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import {
  Button,
  Center,
  HStack,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAsync } from "react-use";
import { getPrompTemplates, updateChatbotById } from "@/lib/api";
import PopoverContext from "../popover-context";

export default function AssignPromptTemplate({ chatbot, onChange }) {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { loading: isLoading, value: promptTemplates } = useAsync(async () => {
    const { data } = await getPrompTemplates();

    return data;
  }, []);

  const handleSelect = useCallback(
    async (id) => {
      const { data } = await updateChatbotById(chatbot.id, {
        ...chatbot,
        promtTemplateId: id,
      });

      onChange(data);
      onClose();

      router.refresh();
    },
    [chatbot, onChange, onClose, router]
  );

  return (
    <Stack spacing={0}>
      <Text fontSize="sm" fontWeight={500} color="gray.500">
        Prompt templates
      </Text>
      <HStack spacing={1}>
        <Text fontSize="sm">{chatbot.promtTemplateId}</Text>
        <Text>-</Text>
        <PopoverContext
          title="Prompt templates"
          triggerTitle="assign template"
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
        >
          {isLoading && (
            <Center marginY={10}>
              <Spinner size="sm" />
            </Center>
          )}
          {!isLoading &&
            promptTemplates.map(({ id, name }) => (
              <Button
                key={id}
                size="sm"
                variant="ghost"
                fontWeight="normal"
                justifyContent="flex-start"
                onClick={() => handleSelect(id)}
              >
                {name}
              </Button>
            ))}
        </PopoverContext>
      </HStack>
    </Stack>
  );
}

AssignPromptTemplate.propTypes = {
  chatbot: PropTypes.object,
  onChange: PropTypes.func,
};
