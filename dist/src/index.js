"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("./prisma/generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const express_1 = __importDefault(require("express"));
const pool = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter: pool });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
const server = app.listen(3000, () => console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`));
//# sourceMappingURL=index.js.map