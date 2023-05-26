import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
import { User } from "@prisma/client";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000",
    }),
  ],
});

interface createUserInterface {
  email: string;
  username: string;
}

async function getAllUsers(): Promise<User[]> {
  const users = await trpc.getAllUser.query();
  console.log(users);
  return users;
}

async function getUserById(id: number): Promise<User> {
  const user = await trpc.getUserById.query(id);
  return user;
}

async function createUser(
  userCreateOption: createUserInterface
): Promise<User> {
  const user = await trpc.createUser.mutate(userCreateOption);
  return user;
}

const userDetail: createUserInterface = {
  email: "boysmall300@gmail.com",
  username: "smallBoy101",
};

getAllUsers();
getUserById(1);
createUser(userDetail);
