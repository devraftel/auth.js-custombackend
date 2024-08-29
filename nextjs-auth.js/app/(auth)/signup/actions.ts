"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function googleAuthenticate() {
  try {
    const response = await signIn("google");

    console.log("Google login response: ", response);

    // return response;
  } catch (error) {
    if (error instanceof AuthError) {
      return "Google authentication failed";
    }
    throw error;
  }
}
