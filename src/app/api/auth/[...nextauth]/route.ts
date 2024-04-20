import prisma from "@/lib/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
        })
        // ...add more providers here
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ }) {
            return true
        },
        async jwt({ token }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })

            token.id = dbUser?.id ?? 'no uuid';

            return token;
        },
        async session({ session, token }) {

            if (session && session.user) {
                session.user.id = token.id
            }
            // retornar session modificada
            return session
        },

    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 