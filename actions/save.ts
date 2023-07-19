"use server"

import { getUser } from "./user";
import { getSession } from "./user";
import prisma from "@/lib/prisma";

export async function savePost(postId: string) {
  const session = await getSession();

  const saved = await prisma.user.update({
    where: {
      email: session?.user?.email!
    },
    data: {
      saved: {
        push: postId
      }
    }
  })
}

export async function unsavePost(postId: string) {
  const user = await getUser();
  const savedPosts = user.saved.filter(post => post !== postId);

  return await prisma.user.update({
    where: {
      email: user.email
    },
    data: {
      saved: savedPosts
    }
  })
}