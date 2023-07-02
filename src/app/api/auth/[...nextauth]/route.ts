import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth/core/types'

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
		})
	],
	callbacks: {
		// Called whenever a session is checked. Add user unique id from token to session
		session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub
			}
			return session
		}
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
