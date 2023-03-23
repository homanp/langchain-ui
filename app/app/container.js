"use client";
import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./sidebar";

export default function AppContainer({ children }) {
  const backgroundColor = useColorModeValue("white", "#111");
  return (
    <Flex height="100vh" backgroundColor={backgroundColor}>
      <Sidebar />
      {children}
    </Flex>
  );
}
