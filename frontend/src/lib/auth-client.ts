import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // todo: see if this is proxyable in package.json
  baseURL: "http://localhost:5173",
  plugins: [
    adminClient()
  ]
});

// Also export the main methods directly
export const { signIn, signUp, signOut, useSession } = authClient;

export type Session = typeof authClient.$Infer.Session