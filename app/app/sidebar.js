"use client";
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Icon,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SIDEBAR_MENU } from "@/lib/sidebar";
import UserMenu from "@/components/user-menu";

function SidebarItem({ id, href, label, icon, ...properties }) {
  const router = useRouter();

  return (
    <Button
      key={id}
      width="full"
      size="sm"
      variant="ghost"
      justifyContent="flex-start"
      leftIcon={<Icon as={icon} fontSize="lg" />}
      onClick={() => router.push(href)}
      {...properties}
    >
      {label}
    </Button>
  );
}

SidebarItem.propTypes = {
  id: PropTypes.string,
  href: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.func,
};

export default function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <Stack
      width="200px"
      height="100vh"
      borderRightWidth={0.5}
      justifyContent="space-between"
      paddingBottom={4}
    >
      <Stack spacing={4}>
        <UserMenu padding={2} />
        <Box paddingX={1}>
          {SIDEBAR_MENU.filter(({ placement }) => placement === "top").map(
            ({ id, label, href, icon, iconDark }) => (
              <SidebarItem
                key={id}
                id={id}
                label={label}
                icon={isLight ? icon : iconDark || icon}
                href={href}
              />
            )
          )}
        </Box>
      </Stack>
      <Stack paddingX={1} spacing={0}>
        {SIDEBAR_MENU.filter(({ placement }) => placement === "bottom").map(
          ({ id, label, labelDark, href, icon, iconDark }) => (
            <SidebarItem
              key={id}
              id={id}
              label={isLight ? label : labelDark || label}
              icon={isLight ? icon : iconDark || icon}
              href={href}
              onClick={id === "dark_mode" && toggleColorMode}
            />
          )
        )}
      </Stack>
    </Stack>
  );
}
