import NextAuth from 'next-auth'

declare module 'next-auth' {
	// Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	interface Session {
		user: {
			// Google token sub, unique to google user
			id?: string
		}
	}
}
