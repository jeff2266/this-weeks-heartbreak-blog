import { prisma } from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { revalidatePath } from 'next/cache'

type Body = {
	postId?: string
	callback?: string
}

// Get posts
export async function GET(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	const postRequest = (await req.json()) as Body

	if (!postRequest || !postRequest.postId || !token?.userId)
		return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

	const like = await prisma.like.create({ data: { postId: postRequest.postId, userId: token.userId } })
	revalidatePath('/posts/[id]')
	return NextResponse.json(!!like ? JSON.stringify(like) : null)
}
