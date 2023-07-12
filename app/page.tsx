import prisma from "@/lib/prisma"

export default async function Home() {
  const user = await prisma.user.findMany()
  
  return (
    <main>
      <pre>
        { JSON.stringify(user, null, 2) }
      </pre>
    </main>
  )
}
