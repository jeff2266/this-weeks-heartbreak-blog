import { prisma } from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { revalidatePath } from 'next/cache'

type Body = {
	postId?: string
	callback?: string
}

// Like a post
export async function POST(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	const postRequest = (await req.json()) as Body

	if (!postRequest || !postRequest.postId || !token?.userId)
		return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

	const like = await prisma.like.create({ data: { postId: postRequest.postId, userId: token.userId } })
	revalidatePath('/posts/[id]')
	return NextResponse.json(!!like ? JSON.stringify(like) : null)
}

// Unlike a post
export async function DELETE(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	const deleteRequest = (await req.json()) as Body

	if (!deleteRequest || !deleteRequest.postId || !token?.userId)
		return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

	const like = await prisma.like.delete({
		where: { postId_userId: { postId: deleteRequest.postId, userId: token.userId } }
	})
	revalidatePath('/posts/[id]')
	return NextResponse.json(!!like ? JSON.stringify(like) : null)
}
