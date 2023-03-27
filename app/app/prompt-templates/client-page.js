"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Textarea,
  Tr,
  Td,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { TbPlus } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/page-header";
import { SIDEBAR_MENU } from "@/lib/sidebar";
import {
  createPromptTemplate,
  getPrompTemplates,
  getPromptVariables,
} from "@/lib/api";

export default function PromptTemplatesClientPage() {
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const router = useRouter();
  const { loading: isLoading, value: promptTemplates } = useAsync(
    async () => getPrompTemplates,
    [getPrompTemplates]
  );

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = useCallback(
    async ({ name, prompt }) => {
      const payload = {
        name,
        prompt,
        inputs: getPromptVariables(prompt),
      };

      await createPromptTemplate(payload);
      router.refresh();
    },
    [router]
  );

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={SIDEBAR_MENU.find(({ id }) => id === "prompt_templates").icon}
        title="Prompt templates"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
          >
            New template
          </Button>
        </HStack>
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && promptTemplates.length !== 0 && (
        <TableContainer>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {!isLoading && promptTemplates.length === 0 && (
        <Center flex={1}>
          <Container as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormControl isInvalid={errors?.name}>
                <Input
                  size="sm"
                  placeholder="My custom prompt..."
                  {...register("name", { required: true })}
                />
              </FormControl>
              <FormControl isInvalid={errors?.prompt}>
                <Box
                  borderRadius="md"
                  borderWidth="1px"
                  padding={3}
                  spacing={0}
                >
                  <Textarea
                    minHeight="250px"
                    variant="unstyled"
                    fontSize="sm"
                    {...register("prompt", { required: true })}
                  />
                  <HStack justifyContent="flex-end">
                    <Button
                      colorScheme={buttonColorScheme}
                      backgroundColor={buttonBackgroundColor}
                      type="sumbit"
                      fontSize="sm"
                      isLoading={isSubmitting}
                    >
                      Save
                    </Button>
                  </HStack>
                </Box>
                <FormHelperText>
                  Type <Tag size="sm">{`{{myVariable}}`}</Tag> to insert
                  variables into your template.
                </FormHelperText>
              </FormControl>
            </Stack>
          </Container>
        </Center>
      )}
    </Stack>
  );
}
