"use server"

import { getServerSession } from "next-auth";
import bcrypt from 'bcrypt'

import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  password: string;
}

export async function getUser() {
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

export async function createUser({ email, firstName, lastName, bio, password }: User) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      bio,
      hashedPassword,
    }
  });

  return user;
}