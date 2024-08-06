import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as props on the `SessionProvider`
   */
  interface Session {
    user: DefaultSession["user"] & { id?: string };
  }
}
