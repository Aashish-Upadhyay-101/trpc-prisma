import { router, publicProcedure } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const appRouter = router({
  getAllUser: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),

  getUserById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    console.log(opts);
    console.log(input);
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: input,
      },
    });
    return user;
  }),

  createUser: publicProcedure
    .input(z.object({ email: z.string(), username: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await prisma.user.create({
        data: input,
      });
      return user;
    }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(8000);

export type AppRouter = typeof appRouter;
