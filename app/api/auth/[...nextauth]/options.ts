import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'

import prisma from '@/lib/prisma'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: "Password",
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Please enter both fields")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials")
        };

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error("Password is incorrect")
        };

        return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}