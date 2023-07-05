import { Role } from '@prisma/client'
import NextAuth from 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
	interface JWT {
		userId: string
		role: Role
	}
}

declare module 'next-auth' {
	// Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	interface Session {
		user: {
			// Google token sub, unique to google user
			userId: string
			role: Role
		}
	}
}
