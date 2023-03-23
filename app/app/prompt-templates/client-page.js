"use client";
import {
  Button,
  Icon,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbPlus } from "react-icons/tb";
import PageHeader from "@/components/page-header";
import { SIDEBAR_MENU } from "@/lib/sidebar";

export default function PromptTemplatesClientPage() {
  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={SIDEBAR_MENU.find(({ id }) => id === "prompt_templates").icon}
        title="Prompt templates"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
            backgroundColor={useColorModeValue("black", "white")}
            size="sm"
          >
            New template
          </Button>
        </HStack>
      </PageHeader>
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
    </Stack>
  );
}
