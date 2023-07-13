import { Post, Topics } from "@/components"

export default async function Home() {
  return (
    <main className="bg-neutral-100 h-screen">
      <Post />
      <Topics />
    </main>
  )
}
