"use client";
import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  IconButton,
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
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/page-header";
import { useSidebar } from "@/lib/sidebar";
import {
  createPromptTemplate,
  getPrompTemplates,
  getPromptVariables,
} from "@/lib/api";

export default function PromptTemplatesClientPage() {
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const menu = useSidebar();
  const [promptTemplates, setPromptTemplates] = useState([]);

  const { loading: isLoading } = useAsync(async () => {
    const { data } = await getPrompTemplates();
    setPromptTemplates(data);

    return data;
  }, [getPrompTemplates, setPromptTemplates]);
  const [showForm, setShowForm] = useState(
    !isLoading && promptTemplates.length === 0
  );

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const onSubmit = useCallback(
    async ({ name, prompt }) => {
      const payload = {
        name,
        prompt,
        inputs: getPromptVariables(prompt),
      };

      const { data: promptTemplate } = await createPromptTemplate(payload);

      setPromptTemplates((prev) => [promptTemplate, ...prev]);
      setShowForm();
      reset();
    },
    [reset, setPromptTemplates]
  );

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "prompt_templates").icon}
        title="Prompt templates"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={() => setShowForm(true)}
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
      {!isLoading && !showForm && (
        <TableContainer>
          <Table size="sm">
            <Tbody>
              {promptTemplates.map(({ id, name }) => (
                <Tr key={id}>
                  <Td cursor="pointer" _hover={{ opacity: 0.5 }}>
                    {name}
                  </Td>
                  <Td textAlign="right">
                    <IconButton
                      size="sm"
                      icon={<Icon as={TbTrashX} fontSize="lg" />}
                      variant="ghost"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {showForm && (
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
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowForm()}
                    >
                      Cancel
                    </Button>
                    <Button
                      colorScheme={buttonColorScheme}
                      backgroundColor={buttonBackgroundColor}
                      type="sumbit"
                      size="sm"
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
