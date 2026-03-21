import 'dotenv/config';
import { PrismaClient } from './prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import express from 'express';
import path from 'path';
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";
import { logRoutes } from './middleware/logging';
import { isAdmin } from './middleware/is-admin';
import { handleSessions } from './middleware/handle-sessions';


const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const app = express();

app.use(logRoutes);
// This /api/auth/* is magic, if you change it, make sure to update the client route
app.all('/api/auth/{*any}', logRoutes, toNodeHandler(auth)); // must go before .json()
app.use(express.json());
app.use('/api', handleSessions);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', async (req, res) => {
  res.json({ result: 'OK' })
})

app.get('/api/health-auth', isAdmin, async (req, res) => {
  res.json({ result: 'OK', session: req.session })
})

app.get('/api/users', async (req, res) => {
  const headers = fromNodeHeaders(req.headers);
  const session = (await auth.api.getSession({ headers }));
  if (session?.user.role !== 'admin') return res.sendStatus(401);

  const users = await prisma.user.findMany();
  res.json({ result: users });
});

// remember v5 updated wildcards, they must have names
app.get('/*splat', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


const server = app.listen(3000, () => {
  console.log(`Server ready at: http://localhost:3000`);
})