import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export default async function getUser() {
  const session = await getServerSession(options);
  
  if (!session?.user) throw new Error("Couldn't find user")

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email!
    }
  });

  if (!user) throw new Error("User doesn't exist");
  return user;
}