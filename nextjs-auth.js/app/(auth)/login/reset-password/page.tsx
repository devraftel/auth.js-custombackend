import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { Session } from "@/lib/types";

import ResetPasswordForm from "./reset-password-form";

export default async function ResetPassword() {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex h-[70vh] w-full flex-col items-center justify-center space-y-4 p-4">
      <ResetPasswordForm />
    </main>
  );
}
