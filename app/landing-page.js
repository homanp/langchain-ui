"use client";
import { Inter } from "next/font/google";
import {
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const backgroundColor = useColorModeValue("white", "#131416");

  return (
    <Flex height="100vh" backgroundColor={backgroundColor}>
      <Container className={inter.className} maxWidth="7xl">
        <Stack alignItems="center" justifyContent="center" paddingY="200px">
          <Heading fontSize="5xl" fontWeight={600} textAlign="center">
            The open source chat-ai toolkit
          </Heading>
        </Stack>
      </Container>
    </Flex>
  );
}
