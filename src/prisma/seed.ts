import { auth } from '../auth'
import { PrismaClient, Prisma } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

async function main() {
  console.log(`Start seeding ...`)

  // Clear existing data
  await prisma.account.deleteMany();
  await prisma.user.deleteMany()

  await auth.api
    .signUpEmail({
      body: {
        email: process.env.ADMIN_EMAIL as string,
        password: process.env.ADMIN_PW as string,
        name: "Admin Primary",
      },
      asResponse: false
    })
    .then(console.log);


  await auth.api
    .signUpEmail({
      body: {
        email: 'joe@gmail.com',
        password: 'secret123',
        name: "Joe Schmoe",
      },
      asResponse: false
    })
    .then(console.log);


  console.log(`Seeding finished.`)
}

main()
  .then(() => {
    console.log('Disconnecting...');
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
