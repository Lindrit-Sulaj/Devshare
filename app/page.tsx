import { Post, Topics } from "@/components"
import { getServerSession } from 'next-auth/next'
import { options } from "./api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await getServerSession(options);
  const data = await prisma.user.findUnique({
    where: {
      email: 'johndoe@gmail.com'
    }
  })

  return (
    <main className="mt-[67px] w-full h-screen bg-neutral-100">
      <Post />
      <Topics />
      <pre>
        { JSON.stringify(session, null, 2)}
        {/* { JSON.stringify(data, null, 2) } */}
      </pre>
    </main>
  )
}
