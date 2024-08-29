import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { Session } from "@/lib/types";

import { ForgotPasswordForm } from "./forgot-password-form";

export default async function LoginPage() {
  const session = (await auth()) as Session;

  if (session) {
    redirect("/");
  }

  return (
    <main className="flex h-[70vh] w-full flex-col items-center justify-center space-y-4 p-4">
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-semibold">Lost Password</h2>
        <p>Enter your email to retrieve your lost password.</p>
      </div>
      <ForgotPasswordForm />
    </main>
  );
}
