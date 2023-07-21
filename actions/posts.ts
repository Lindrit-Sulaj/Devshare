"use server"

import prisma from "@/lib/prisma";
import { getUser } from "./user";

export interface Post {
  title: string;
  body: string;
  tags: string[];
}

export async function createPost({ title, body, tags }: Post) {
  const user = await getUser();
  return await prisma.post.create({
    data: {
      title,
      tags,
      body,
      userId: user.id,
      createdAt: new Date().getTime()
    }
  })
}

interface GetPost {
  userId?: string;
}

export async function getPosts({ userId }: GetPost = {}) {
  return await prisma.post.findMany({
    where: {
      ...(userId && { userId: userId })
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: "asc"
    }
  })
}

export async function getPost(postId: string) {
  return await prisma.post.findUnique({
    where: {
      id: postId
    }
  })
}