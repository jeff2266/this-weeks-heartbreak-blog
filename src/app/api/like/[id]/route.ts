import { prisma } from '@/db'
import { getToken } from 'next-auth/jwt'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Get if user liked a post
export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	console.log(req.nextUrl.pathname)

	if (!token?.userId) return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 })

	const like = await prisma.like.findUnique({
		where: { postId_userId: { postId: id, userId: token.userId } }
	})

	revalidatePath(req.nextUrl.pathname)
	return NextResponse.json(!!like ? JSON.stringify(like) : null)
}
