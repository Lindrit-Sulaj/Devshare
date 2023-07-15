import { Post, Topics } from "@/components"
import prisma from "@/lib/prisma";

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="mt-[67px] w-full h-screen bg-neutral-100">
      <Post />
      <Topics />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  )
}
