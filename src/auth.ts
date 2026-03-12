// This file needs to be here, or utils/ or lib/ (in src/ or root)
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  ...(isDev ? { trustedOrigins: ["http://localhost:5173"] } : null),

  // Authentication methods allowed
  emailAndPassword: { enabled: true },

  // DB Settings
  // Otherwise it will use uuid for users and I don't want that
  advanced: {
    database: { generateId: 'serial' },
  },
});