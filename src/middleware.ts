import { Role } from '@prisma/client'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
	callbacks: {
		authorized: ({ token, req }) => {
			return req.nextUrl.pathname.startsWith('/author')
				? token?.role === Role.ADMIN || token?.role === Role.AUTHOR
				: req.nextUrl.pathname.startsWith('/likes')
				? !!token
				: req.nextUrl.pathname.startsWith('/api/like')
				? !!token
				: req.nextUrl.pathname.startsWith('/api/post')
				? req.nextUrl.pathname.startsWith('/api/post/presign')
					? true
					: req.method === 'GET'
					? req.nextUrl.searchParams.get('liked') === 'true'
						? !!token
						: true
					: req.method === 'POST'
					? token?.role === Role.ADMIN || token?.role === Role.AUTHOR
					: true
				: true
		}
	}
})
