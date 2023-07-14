import { Post, Topics } from "@/components"
import { getServerSession } from 'next-auth/next'
import { options } from "./api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export default async function Home() {
  return (
    <main className="mt-[67px] w-full h-screen bg-neutral-100">
      <Post />
      <Topics />
    </main>
  )
}
