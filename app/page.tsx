import { Post, Topics } from "@/components"
import { getPosts } from "@/actions/posts"

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="mt-[67px] w-full h-screen bg-neutral-900 px-4">
      <div className="max-w-screen-xl mx-auto flex">
        <section className="feed w-full lg:w-3/4">
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </section>
        <Topics />
      </div>
    </main>
  )
}
