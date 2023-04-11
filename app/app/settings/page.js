import { Inter } from "next/font/google";
import SettingsClientPage from "./client-page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Settings",
  description: "Manage your settings",
};

export default function Home() {
  return <SettingsClientPage />;
}
