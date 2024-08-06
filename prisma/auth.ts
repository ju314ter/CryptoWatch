import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";
import { AuthOptions, getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (session?.user) session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
