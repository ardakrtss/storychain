import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      nickname: string
      email?: string
      name?: string
      image?: string
    }
  }

  interface User {
    id: string
    nickname: string
    email?: string
    name?: string
    image?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    nickname: string
    email?: string
    name?: string
    image?: string
  }
}
