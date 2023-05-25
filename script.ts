import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = (await prisma.user.findFirst({
    include: {
      Post: true,
    },
  }))!;
  console.log(user);

  const post = await prisma.post.create({
    data: {
      autherId: user.id,
      title: "My first Post",
      published: false,
    },
  });
}

main()
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
