"use server"

import prisma from "@/lib/prisma";
import { getUser } from "./user";
import type { Post } from "./posts";

export async function saveAsDraft({ title, body, tags }: Post) {
  const user = await getUser();

  const res = await prisma.draft.create({
    data: {
      title,
      body,
      tags,
      createdAt: new Date().getTime(),
      userId: user.id
    }
  });

  return res;
}