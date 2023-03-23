"use client";
import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center>
      <Spinner size="sm" />
    </Center>
  );
}
