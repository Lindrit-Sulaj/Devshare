import { Post, Topics } from "@/components"
import { getServerSession } from 'next-auth/next'
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="">
      <Post />
      <Topics />
      <pre>
        { JSON.stringify(session, null, 2)}
      </pre>
    </main>
  )
}
