import { defineConfig, env } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: 'src/prisma/schema.prisma',
  migrations: {
    path: 'src/prisma/migrations',
    // obviously you'll need tsx installed
    seed: 'tsx src/prisma/seed.ts',
  },
  datasource: {
    // This is the name of the process.env variable that has the connect string
    url: env('DATABASE_URL'),
  },
})