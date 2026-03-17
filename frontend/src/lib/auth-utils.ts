import { type Session } from "./auth-client";

export function isAdmin(data: Session | null): boolean {
  return data?.user.role === "admin";
}