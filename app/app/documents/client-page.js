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
  Input,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Textarea,
  Text,
  Tr,
  Td,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { TbPlus, TbTrashX } from "react-icons/tb";
import { useAsync } from "react-use";
import { useForm } from "react-hook-form";
import PageHeader from "@/components/page-header";
import { useSidebar } from "@/lib/sidebar";
import { useDocuments } from "@/lib/documents";
import {
  createPromptTemplate,
  getPrompTemplates,
  getPromptVariables,
  removePromptTemplateById,
} from "@/lib/api";

export default function DocumentsClientPageClientPage() {
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");
  const borderBottomColor = useColorModeValue("gray.50", "#333");
  const menu = useSidebar();
  const { options } = useDocuments();
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
    watch,
  } = useForm({ values: { type: "csv" } });

  const type = watch("type");

  const onSubmit = useCallback(async (values) => {
    console.log(values);
  }, []);

  const handleRemovePromptTemplate = useCallback(async (promptTemplateId) => {
    await removePromptTemplateById(promptTemplateId);

    setPromptTemplates((prev) =>
      prev.filter(({ id }) => id !== promptTemplateId)
    );
  }, []);

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={menu.find(({ id }) => id === "documents").icon}
        title="Documents"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={buttonColorScheme}
            backgroundColor={buttonBackgroundColor}
            size="sm"
            onClick={() => setShowForm(true)}
          >
            New document
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
                      onClick={() => handleRemovePromptTemplate(id)}
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
            <Stack spacing={6}>
              <Stack spacing={1}>
                <Icon
                  fontSize="2xl"
                  as={menu.find(({ id }) => id === "documents").icon}
                />
                <Text>New document</Text>
                <Text fontSize="sm" color="gray.500">
                  Combining language models with your own text data is a
                  powerful way to differentiate them. The first step in doing
                  this is to load the data into “documents” for later use in
                  your chat apps.
                </Text>
              </Stack>
              <Stack>
                <FormControl isInvalid={errors?.name}>
                  <Input
                    size="sm"
                    placeholder="My document..."
                    {...register("name", { required: true })}
                  />
                </FormControl>
                <FormControl isInvalid={errors?.type}>
                  <Select {...register("type", { required: true })} size="sm">
                    {options.map(({ id, label, type }) => (
                      <option key={id} value={type}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  as={
                    options.find(({ type: type_ }) => type_ === type).component
                  }
                />
              </Stack>
              <HStack justifyContent="flex-end">
                <Button variant="ghost" size="sm" onClick={() => setShowForm()}>
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
            </Stack>
          </Container>
        </Center>
      )}
    </Stack>
  );
}
