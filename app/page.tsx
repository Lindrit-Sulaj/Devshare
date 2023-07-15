import { Post, Topics } from "@/components"

async function getUsers() {
  const res = await fetch('http://localhost:3000/api/users');

  if (!res.ok) {
    throw new Error("Something went wrong");
  };

  return res.json();
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
