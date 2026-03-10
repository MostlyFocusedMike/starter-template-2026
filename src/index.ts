import 'dotenv/config';
import { PrismaClient } from './prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import express from 'express';
import path from 'path';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const app = express();

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
});

// remember v5 updated wildcards, they must have names
app.get('/*splat', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: https://github.com/prisma/prisma-examples/blob/latest/orm/express/README.md#using-the-rest-api`),
)