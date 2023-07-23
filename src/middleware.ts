import { Role } from '@prisma/client'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ token, req }) => {
			return req.nextUrl.pathname === '/author'
				? token?.role === Role.ADMIN || token?.role === Role.AUTHOR
				: req.nextUrl.pathname === '/likes'
				? !!token
				: true
		}
	}
})

export const config = { matcher: ['/author', '/likes'] }
