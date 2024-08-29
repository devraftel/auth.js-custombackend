import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    isSuperuser: boolean;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
