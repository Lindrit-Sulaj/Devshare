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

export async function getPosts({ tag, query = "" }: { tag?: string; query?: string; } = {}) {
  if (tag) {
    return await prisma.post.findMany({
      where: {
        tags: {
          has: tag
        }
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "asc"
      }
    })
  } else if (query) {
    return await prisma.post.findMany({
      where: {
        title: {
          contains: query
        }
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "asc"
      }
    })
  }

  return await prisma.post.findMany({
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