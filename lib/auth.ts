import NextAuth from "next-auth"
import { db } from "./db"
import Credentials from "next-auth/providers/credentials"
import { verify } from "argon2"
import { z } from "zod"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        nickname: { label: "Rumuz", type: "text" },
        pin: { label: "PIN", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ nickname: z.string().min(1), pin: z.string().min(1) })
          .safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const { nickname, pin } = parsedCredentials.data

        const user = await db.user.findUnique({
          where: { nickname }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await verify(user.pinHash, pin)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          nickname: user.nickname,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.nickname = user.nickname
      }
      return token
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string
      }
      if (token.nickname) {
        session.user.nickname = token.nickname as string
      }
      return session
    }
  },
  pages: {
    signIn: "/giris",
  },
  secret: process.env.NEXTAUTH_SECRET,
})
