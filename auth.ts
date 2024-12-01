import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import prisma from "./utils/db"
import bcrypt from "bcrypt"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
      Credentials({
        credentials: {
          email: { name: "email", label: "Email" },
          password: { name: "password", label: "Password" },
        },
        authorize: async (credentials) => {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email as string },
          })
  
          if (!user) {
            console.log("invalid creds")
          }
          console.log(user)
          return user
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile }) {
        if (account?.provider === "google") {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          })
  
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email as string,
                name: user.name as string,
              },
            })
          }
        }
  
        return true
      },
  
      async session({ session, user }) {
        session.user.id = user.id
        return session
      },
    },
  })