import { AuthOptions } from 'next-auth/core/types'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db'
import { Adapter } from 'next-auth/adapters'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
			session.user.userId = token.userId
			return session
		},
		async jwt({ token, user }) {
			if (user) {
				const dbUser = await prisma.user.findUnique({
					where: { id: user.id }
				})
				if (dbUser) {
					token.role = dbUser.role
					token.userId = dbUser.id
				}
			}
			return token
		},
		async signIn({ account, profile }) {
			if (account?.provider === 'google') {
				return !!profile?.email_verified
			}
			return true
		}
	},
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout'
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
