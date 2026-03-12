import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // todo: see if this is proxyable in package.json
  baseURL: "http://localhost:3000"
})

// Also export the main methods directly
export const { signIn, signUp, useSession } = authClient;