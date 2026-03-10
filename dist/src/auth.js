"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
// This file needs to be here, or utils/ or lib/ (in src/ or root)
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const client_1 = require("./prisma/generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter: pool });
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    // Override the default singular table names
    user: { modelName: "users" },
    session: { modelName: "sessions" },
    account: { modelName: "accounts" },
    verification: { modelName: "verifications" },
    emailAndPassword: {
        enabled: true,
    },
    // Otherwise it will use uuid for users and I don't want that
    advanced: {
        database: {
            generateId: false,
        },
    },
});
//# sourceMappingURL=auth.js.map