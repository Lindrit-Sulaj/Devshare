"use server"

import prisma from "@/lib/prisma"
import { getPost } from "./posts"

export async function likePost(postId: string, userId: string) {
  return await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      likedBy: {
        push: userId
      }
    }
  })
}

export async function removeLikeFromPost(postId: string, userId: string) {
  const post = await getPost(postId);
  const likes = post?.likedBy.filter(like => like !== userId);

  return await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedBy: likes
    }
  })
}