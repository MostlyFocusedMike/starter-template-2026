// This file needs to be here, or utils/ or lib/ (in src/ or root)
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // Authentication methods allowed
  emailAndPassword: { enabled: true },

  // DB Settings
  // Override the default singular table names
  user: { modelName: "users" },
  session: { modelName: "sessions" },
  account: { modelName: "accounts" },
  verification: { modelName: "verifications" },
  // Otherwise it will use uuid for users and I don't want that
  advanced: {
    database: { generateId: false },
  },
});