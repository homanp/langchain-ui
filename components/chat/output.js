import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import remarkGfm from "remark-gfm";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TbCopy } from "react-icons/tb";
import { BeatLoader } from "react-spinners";
import { MemoizedReactMarkdown } from "@/lib/markdown";

export default function ChatOuput({
  messages,
  newMessage,
  isLoading,
  ...properties
}) {
  const loaderColor = useColorModeValue("gray.100", "white");
  const unevenBackgroundColor = useColorModeValue("gray.100", "gray.600");
  const lastMessageReference = useRef();

  useEffect(() => {
    if (lastMessageReference?.current) {
      lastMessageReference?.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <Stack flex={1} maxWidth="100%" {...properties}>
      <Stack spacing={0}>
        {messages.map(({ agent, data: { response } }, index) => (
          <Box
            ref={
              index + 1 === messages.length ? lastMessageReference : undefined
            }
            padding={4}
            key={index}
            backgroundColor={index % 2 !== 0 && unevenBackgroundColor}
          >
            <HStack
              spacing={6}
              maxWidth="4xl"
              marginX="auto"
              alignItems="flex-start"
            >
              <Avatar src={agent ? "/chatbot.png" : "/user.png"} size="xs" />
              <Stack spacing={4} fontSize="sm">
                <MemoizedReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const value = String(children).replace(/\n$/, "");
                      const match = /language-(\w+)/.exec(className || "");

                      const handleCopyCode = () => {
                        navigator.clipboard.writeText(value);
                      };

                      return !inline ? (
                        <Box position="relative">
                          <HStack position="absolute" top={2} right={2}>
                            <Text fontSize="sm">{match && match[1]}</Text>
                            <IconButton
                              size="sm"
                              icon={<Icon as={TbCopy} fontSize="lg" />}
                              onClick={() => handleCopyCode()}
                            />
                          </HStack>

                          <SyntaxHighlighter
                            customStyle={{
                              fontSize: "12px",
                            }}
                            codeTagProps={{
                              style: {
                                lineHeight: "inherit",
                                fontSize: "inherit",
                              },
                            }}
                            style={dracula}
                            language={(match && match[1]) || ""}
                          >
                            {value}
                          </SyntaxHighlighter>
                        </Box>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                  remarkPlugins={[remarkGfm]}
                >
                  {newMessage}
                </MemoizedReactMarkdown>
              </Stack>
            </HStack>
          </Box>
        ))}
        {isLoading && (
          <Box padding={4} backgroundColor={unevenBackgroundColor}>
            <HStack
              spacing={6}
              maxWidth="4xl"
              marginX="auto"
              alignItems="flex-start"
            >
              <Avatar src="/chatbot.png" size="xs" />
              <Stack spacing={4} fontSize="sm">
                {newMessage ? (
                  <MemoizedReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const value = String(children).replace(/\n$/, "");
                        const match = /language-(\w+)/.exec(className || "");

                        const handleCopyCode = () => {
                          navigator.clipboard.writeText(value);
                        };

                        return !inline ? (
                          <Box position="relative">
                            <HStack position="absolute" top={2} right={2}>
                              <Text fontSize="sm">{match && match[1]}</Text>
                              <IconButton
                                size="sm"
                                icon={<Icon as={TbCopy} fontSize="lg" />}
                                onClick={() => handleCopyCode()}
                              />
                            </HStack>

                            <SyntaxHighlighter
                              customStyle={{
                                fontSize: "12px",
                              }}
                              codeTagProps={{
                                style: {
                                  lineHeight: "inherit",
                                  fontSize: "inherit",
                                },
                              }}
                              style={dracula}
                              language={(match && match[1]) || ""}
                            >
                              {value}
                            </SyntaxHighlighter>
                          </Box>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                    remarkPlugins={[remarkGfm]}
                  >
                    {newMessage}
                  </MemoizedReactMarkdown>
                ) : (
                  <BeatLoader color={loaderColor} size={8} />
                )}
              </Stack>
            </HStack>
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

ChatOuput.propTypes = {
  messages: PropTypes.array,
  newMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};
