import 'dotenv/config';
import { PrismaClient } from './prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import express from 'express';
import path from 'path';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";


const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const app = express();

// This /api/auth/* is magic, if you change it, make sure to update the client route
app.all('/api/auth/{*any}', toNodeHandler(auth)); // must go before .json()
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// remember v5 updated wildcards, they must have names
app.get('/*splat', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


const server = app.listen(3000, () => {
  console.log(`Server ready at: http://localhost:3000`);
})