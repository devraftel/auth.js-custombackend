import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/signup",
    signOut: "http://localhost:3000", // Hardcoded absolute URL for sign-out
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const isOnSignupPage = nextUrl.pathname.startsWith("/signup");

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("\n\n/auth.config.ts // jwt // user: ", user);

        token = {
          ...token,
          id: user.id,
          accessToken: user.accessToken,
          isSuperuser: user.isSuperuser,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("\n\n/auth.config.ts // session // token: ", token);

        const { id, accessToken, isSuperuser } = token as {
          id: string;
          accessToken: string;
          isSuperuser: boolean;
        };
        const { user } = session;

        session = {
          ...session,
          user: { ...user, id, accessToken, isSuperuser },
        };
      }

      return session;
    },
    async signIn({ account, user, credentials, email, profile }) {
      if (account?.provider === "google" && profile) {
        const payload = {
          email: profile.email as string,
          full_name: profile.name as string,
          provider: "google",
        };

        // const response = await fetch(
        //   `${process.env.SERVICE_AUTH_URL}/api/v1/google-auth/access-token`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        //   },
        // );

        // if (!response.ok) {
        //   return false;
        // }

        try {
          const response = await fetch(
            `http://localhost:8000/api/v1/google-auth/access-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          );

          if (!response.ok) {
            console.error("Failed to fetch access token from custom service:", await response.text());
            return false; // Change return to false if access token cannot be fetched
          }

          const data = (await response.json()) as {
            access_token: string;
            token_type: string;
            user_id: number;
          };

          user.accessToken = data.access_token;
          user.id = data.user_id.toString();
          console.log("/auth.config.ts // signIn // account: ", account, "user:", user);

          return true;
        } catch (error) {
          console.error("Error during custom Google sign-in:", error);
          return false; // Ensure to return false in case of error
        }
 
      //   const data = (await response.json()) as {
      //     access_token: string;
      //     token_type: string;
      //     user_id: number;
      //   };

      //   // account.access_token = data.access_token;
      //   user.accessToken = data.access_token;
      //   user.id = data.user_id.toString();
      //   console.log("\n\n/auth.config.ts // signIn // account: ", account);

      //   return true;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
