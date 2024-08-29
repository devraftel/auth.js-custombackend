import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { LoginRequest } from "@/lib/schemas";
import { getCurrentUser, login } from "@/app/actions";

import { authConfig } from "./auth.config"; // Importing the shared auth configuration

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig, // Spread the shared configuration to include general settings and callbacks
  debug: false, // Enable debug mode for detailed logging
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        const loginRequest = {
          grant_type: "",
          client_id: "",
          client_secret: "",
          username: email,
          password: password,
        } satisfies LoginRequest;

        const result = await login(undefined, loginRequest);

        console.log("NextAuth authorization result: ", result);

        if (result.type === "error") {
          console.log("NextAuth authorization error: ");
          console.log("NextAuth authorization error: ", result.message);
          throw new Error(result.message);
        }

        if (result.type === "success" && result.data) {
          const user = await getCurrentUser(result.data.access_token);
          console.log("NextAuth authorization success: ", user);

          if (user.type === "success" && user.data) {
            return {
              id: user.data.id.toString(),
              email: user.data.email,
              name: user.data.full_name,
              image: "",
              accessToken: result.data.access_token,
              isSuperuser: user.data.is_superuser,
            } satisfies User;
          }
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_ID, // Google Client ID from environment variable
      clientSecret: process.env.GOOGLE_SECRET, // Google Client Secret from environment variable
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth', // Google authorization endpoint
        params: {
          scope: "openid email profile", // Requested scopes
          access_type: "offline", // To get a refresh token
          prompt: "consent", // Forces user to consent even if they previously accepted
          redirect_uri: 'http://localhost:3000/api/auth/callback/google', // Hardcoded redirect_uri
        },
      },
    }),
  ],
});
