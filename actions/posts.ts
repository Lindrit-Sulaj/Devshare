"use server"

import prisma from "@/lib/prisma";
import {getUser} from "./user";

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