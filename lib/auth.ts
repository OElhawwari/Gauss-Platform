import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  /**
   * trustHost:  true  – If NEXTAUTH_URL is not set (or you’re previewing on
   * http://localhost:3000 while the env still points to production) NextAuth
   * will trust the incoming Host header instead of throwing a 500 and sending
   * back HTML that the client cannot parse.
   */
  trustHost: true,

  /** Enable verbose error output while coding */
  debug: process.env.NODE_ENV === "development",

  // IMPORTANT: a fixed secret prevents JWT verification errors across lambda/edge invocations
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
}
