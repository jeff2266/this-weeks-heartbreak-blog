import { Role } from '@prisma/client'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ token }) => token?.role === Role.ADMIN || token?.role === Role.AUTHOR
	}
})

export const config = { matcher: ['/author'] }
