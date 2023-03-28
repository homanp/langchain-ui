"use client";
import { Inter } from "next/font/google";
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbBrandGithub, TbLink } from "react-icons/tb";
import { signIn } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const backgroundColor = useColorModeValue("white", "#131416");
  const buttonColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const buttonBackgroundColor = useColorModeValue("black", "white");

  return (
    <Flex
      height="100vh"
      backgroundColor={backgroundColor}
      className={inter.className}
    >
      <Container maxWidth="7xl">
        <Stack
          alignItems="center"
          justifyContent="center"
          paddingY="200px"
          spacing={8}
        >
          <Heading fontSize="4xl" fontWeight={700} textAlign="center">
            The open source chat-ai toolkit
          </Heading>
          <Stack>
            <Button
              leftIcon={<Icon as={TbBrandGithub} />}
              colorScheme={buttonColorScheme}
              backgroundColor={buttonBackgroundColor}
              size="sm"
              onClick={() => signIn("github", { callbackUrl: "/app" })}
            >
              Sign in with Github
            </Button>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Icon as={TbLink} fontSize="xs" color="gray.500" />
              <Link
                fontSize="xs"
                href="https://github.com/homanp/langchain-ui"
                target="_blank"
                color="gray.500"
              >
                homanp/langchain-ui
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
