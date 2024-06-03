import { BACKEND_URL } from "@/app/lib/Constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        //POST THE REQUEST FOR AUTHENTICATION
        const resp = await fetch(BACKEND_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (resp.status == 401) {
          return null;
        }
        const user = await resp.json();
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token, user);
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = session.backendTokens;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
