import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PopoverContext({
  title,
  triggerTitle,
  children,
  onOpen,
  onClose,
  isOpen,
  ...properties
}) {
  const popoverBackgroundColor = useColorModeValue("gray.100", "#2F3239");

  return (
    <Popover
      closeOnBlur={true}
      onClose={onClose}
      isOpen={isOpen}
      {...properties}
    >
      <PopoverTrigger>
        <Button
          onClick={() => onOpen()}
          fontWeight="normal"
          size="sm"
          variant="link"
          color="gray.500"
        >
          {triggerTitle}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        backgroundColor={popoverBackgroundColor}
        overflow="hidden"
      >
        <PopoverCloseButton />
        <PopoverHeader fontSize="sm" fontWeight="500">
          {title}
        </PopoverHeader>
        <PopoverBody
          fontSize="sm"
          paddingX={1}
          maxHeight="200px"
          overflowY="scroll"
        >
          <Stack>{children}</Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

PopoverContext.propTypes = {
  title: PropTypes.string,
  triggerTitle: PropTypes.string,
  children: PropTypes.node,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
