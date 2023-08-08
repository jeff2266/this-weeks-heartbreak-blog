import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/db'
import { Prisma } from '@prisma/client'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '@/s3'

export type SignedPosts = {
	id: number
	title: string
	authorName: string | undefined
	date: Date
	thumbUrl: string | undefined
	mediaUrl: string | undefined
}[]

export type PostRequestBody = Prisma.PostGetPayload<{
	select: { title: true; authorId: true; date: true; content: true; thumb: true; media: true }
}>

// Get posts
export async function GET(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	const { searchParams } = new URL(req.url)
	const filter = searchParams.get('filter')
	const cursor = parseInt(searchParams.get('cursor') ?? '')
	const take = parseInt(searchParams.get('take') ?? '')

	if (Number.isNaN(take)) return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

	let posts: Prisma.PostGetPayload<{ include: { author: true } }>[]
	if (filter === 'liked') {
		if (!token?.userId) return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 })
		posts = (
			await prisma.like.findMany({
				take,
				cursor: cursor ? { postId_userId: { postId: cursor, userId: token.userId } } : undefined,
				skip: cursor ? 1 : undefined,
				include: { post: { include: { author: true } } },
				orderBy: { postId: 'desc' }
			})
		).map(res => res.post)
	} else if (filter === 'authored') {
		if (!token?.userId || !(token.role === 'ADMIN' || token.role === 'AUTHOR'))
			return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 })
		posts = await prisma.post.findMany({
			take,
			cursor: cursor ? { id: cursor } : undefined,
			where: { authorId: token.userId },
			skip: cursor ? 1 : undefined,
			include: { author: true },
			orderBy: { id: 'desc' }
		})
	} else {
		posts = await prisma.post.findMany({
			take,
			cursor: cursor ? { id: cursor } : undefined,
			skip: cursor ? 1 : undefined,
			include: { author: true },
			orderBy: { id: 'desc' }
		})
	}

	const signedPosts: SignedPosts = await Promise.all(
		posts.map(async ({ id, title, author, date, thumb, media }) => ({
			id,
			title,
			authorName: author.name ?? undefined,
			date,
			thumbUrl: thumb
				? await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbs/${thumb}` }), {
						expiresIn: 3600
				  })
				: undefined,
			mediaUrl: media
				? await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `media/${media}` }), {
						expiresIn: 28800
				  })
				: undefined
		}))
	)

	return NextResponse.json(JSON.stringify(signedPosts))
}

// Author a new post
export async function POST(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
	const postRequest = (await req.json()) as PostRequestBody
	if (!postRequest || !postRequest.title || !postRequest.authorId || !postRequest.date)
		return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })

	if (!token?.userId || token.userId !== postRequest.authorId)
		return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 })

	const post = await prisma.post.create({ data: postRequest })
	return NextResponse.json(JSON.stringify(post))
}
