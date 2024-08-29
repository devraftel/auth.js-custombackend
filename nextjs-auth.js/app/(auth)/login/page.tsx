import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { Session } from "@/lib/types";

import LoginForm from "./login-form";

export default async function LoginPage() {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex h-[calc(100vh_-_theme(spacing.16))] flex-col items-center justify-center p-4">
      <div className="w-full space-y-4 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md dark:bg-zinc-950 md:w-96">
        <h1 className="text-2xl font-bold">To continue, please log in.</h1>
        <LoginForm />
      </div>
    </main>
  );
}
