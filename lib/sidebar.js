import {
  TbDatabase,
  TbHeadset,
  TbFileText,
  TbLanguage,
  TbMessage,
  TbPrompt,
  TbSettings,
  TbMoon,
  TbSun,
} from "react-icons/tb";

const PLACEMENT = {
  top: "top",
  bottom: "bottom",
};

export const SIDEBAR_MENU = [
  {
    id: "documents",
    label: "Documents",
    href: "/app/documents",
    icon: TbFileText,
    placement: PLACEMENT.top,
  },
  {
    id: "prompt_templates",
    label: "Prompt templates",
    href: "/app/prompt-templates",
    icon: TbPrompt,
    placement: PLACEMENT.top,
  },
  {
    id: "indexes",
    label: "Indexes",
    href: "/app/indexes",
    icon: TbDatabase,
    placement: PLACEMENT.top,
  },
  {
    id: "llm",
    label: "LLMs",
    href: "/app/llm",
    icon: TbLanguage,
    placement: PLACEMENT.top,
  },
  {
    id: "agents",
    label: "Agents",
    href: "/app/agents",
    icon: TbHeadset,
    placement: PLACEMENT.top,
  },
  {
    id: "chatbots",
    label: "Chatbots",
    href: "/app/chatbots",
    icon: TbMessage,
    placement: PLACEMENT.top,
  },
  {
    id: "dark_mode",
    label: "Dark",
    labelDark: "Light",
    href: "/app/settings",
    icon: TbMoon,
    iconDark: TbSun,
    placement: PLACEMENT.bottom,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/app/settings",
    icon: TbSettings,
    placement: PLACEMENT.bottom,
  },
];
