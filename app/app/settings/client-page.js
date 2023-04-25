"use client";
import React, { useCallback, useState } from "react";
import {
  Button,
  HStack,
  Icon,
  Stack,
  Spinner,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PageHeader from "@/components/page-header";
import { useAsync } from "react-use";
import { useSidebar } from "@/lib/sidebar";
import { createApiKey, getApiKeys } from "@/lib/api";
import { TbPlus } from "react-icons/tb";

export default function SettingsClientPage() {
  const menu = useSidebar();
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const [apiKeys, setApiKeys] = useState([]);
  const [isCreatingApiKey, setIsCreatingApiKey] = useState();
  const { loading: isLoadingApiKeys } = useAsync(async () => {
    const { data } = await getApiKeys();

    setApiKeys(data);

    return data;
  }, [getApiKeys, setApiKeys]);

  const handleCreateApiKey = useCallback(async () => {
    setIsCreatingApiKey(true);
    const { data } = await createApiKey();
    console.log(data);
    setApiKeys((previous) => [...previous, data]);
    setIsCreatingApiKey();
  }, []);

  return (
    <Stack minHeight="100vh" flex={1} padding={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "settings").icon}
        title="Settings"
      />
      <Stack maxWidth="lg" spacing={4}>
        <Stack>
          <Text fontSize="sm" as="strong">
            API keys
          </Text>
          {isLoadingApiKeys && <Spinner size="sm" />}
          <Stack divider={<StackDivider />}>
            {!isLoadingApiKeys &&
              apiKeys.map(({ id, name }) => (
                <HStack key={id}>
                  <Text noOfLines={1} fontSize="sm">
                    {name}
                  </Text>
                </HStack>
              ))}
          </Stack>
        </Stack>
        <Button
          alignSelf="flex-start"
          leftIcon={<Icon as={TbPlus} />}
          colorScheme={buttonColorScheme}
          backgroundColor={buttonBackgroundColor}
          size="sm"
          onClick={handleCreateApiKey}
          isLoading={isCreatingApiKey}
        >
          New api key
        </Button>
      </Stack>
    </Stack>
  );
}
