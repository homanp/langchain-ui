import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";
import AppContainer from "./container";

export const metadata = {
  title: "LangChain UI",
  description: "The open source Chat AI builder",
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/user/login");
  }

  return <AppContainer>{children}</AppContainer>;
}
