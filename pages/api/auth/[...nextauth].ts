// import { env } from "@/lib/env";
import { authOptions } from "@/prisma/auth";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
