import { router, publicProcedure } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const appRouter = router({
  getAllUser: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),

  getUserById: publicProcedure.input(z.number()).query(async (id) => {
    const { input } = id;
    console.log(id);
    console.log(input);
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: input,
      },
    });
    return user;
  }),
});

export type AppRouter = typeof appRouter;
