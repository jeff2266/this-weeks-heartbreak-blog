import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db'
import { Adapter } from 'next-auth/adapters'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
		})
	],
	session: { strategy: 'jwt' },
	callbacks: {
		// Called whenever a session is checked. Add user unique id from token to session
		session({ session, token }) {
			session.user.role = token.role
			return session
		},
		async jwt({ token, user }) {
			if (user) {
				const dbAccount = await prisma.user.findUnique({
					where: {
						id: user.id
					}
				})

				if (dbAccount) {
					token.role = dbAccount.role
				}
			}

			return token
		}
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
