"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter: pool });
const userData = [
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
];
async function main() {
    console.log(`Start seeding ...`);
    // Clear existing data
    await prisma.user.deleteMany();
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map