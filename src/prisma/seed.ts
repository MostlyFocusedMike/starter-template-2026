import { PrismaClient, Prisma } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Mike Admin',
    email: 'mostlyfocusedmike+admin@gmail.com',
    emailVerified: false,
    // Example relationship
    // posts: {
    //   create: [
    //     {
    //       title: 'Join the Prisma Discord',
    //       content: 'https://pris.ly/discord',
    //       published: true,
    //     },
    //   ],
    // },
  },
  {
    name: 'Another User',
    email: 'mostlyfocusedmike+user1@gmail.com',
    emailVerified: false,
  },
]

async function main() {
  console.log(`Start seeding ...`)

  // Clear existing data
  await prisma.user.deleteMany()

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })