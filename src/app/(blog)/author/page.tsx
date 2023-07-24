import { s3 } from '@/s3'
import { prisma } from '@/db'
import { ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import crypto from 'crypto'
import AuthorForm from '@/components/authorForm'

export default async function Author() {
	const session = await getServerSession(authOptions)

	const bucketObjects = await s3.send(
		new ListObjectsV2Command({
			Bucket: process.env.BUCKET_NAME
		})
	)

	const thumbInfos = bucketObjects.Contents?.filter(obj => obj.Key?.match(/thumbs\/.+/))
	const thumbUrls = thumbInfos?.map(async thumb => ({
		key: thumb.Key?.split('/').at(1),
		url: await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: thumb.Key }), {
			expiresIn: 3600
		})
	}))
	const thumbs = thumbUrls ? await Promise.all(thumbUrls) : []

	async function submit(data: FormData) {
		'use server'

		if (!session) throw new Error('Invalid session...')

		// Required
		const title = data.get('title') as string | null
		const authorId = session.user.userId

		if (!title) throw new Error('Invalid session...')

		// Optional
		const content = data.get('content') as string | null
		const thumbSelect = data.get('thumb-select') as string | null
		const thumbFile = data.get('thumb-file') as File | null
		const mediaFile = data.get('media-file') as File | null

		let thumb = thumbSelect
		if (thumbFile && thumbFile.size > 0) {
			if (!thumbFile.type.startsWith('image')) throw new Error('Invalid image file...')
			// Must be smaller than 1 MB
			if (thumbFile.size > 1048576) throw new Error('Image file too large...')
			const res = await s3.send(
				new PutObjectCommand({
					Bucket: process.env.BUCKET_NAME,
					Key: `thumbs/${thumbFile.name}`,
					Body: Buffer.from(await thumbFile.arrayBuffer()),
					ContentType: thumbFile.type
				})
			)
			if (res.$metadata.httpStatusCode !== 200)
				throw new Error(`Error when saving image file, status ${res.$metadata.httpStatusCode}`)
			thumb = thumbFile.name
		}

		let media: string | null = null
		if (mediaFile && mediaFile.size > 0) {
			if (!mediaFile.type.startsWith('audio/mpeg')) throw new Error('Invalid media file...')
			// Must be smaller than 128 MB
			if (mediaFile.size > 134217728) throw new Error('Media file too large...')

			const mediaId = `${crypto.randomUUID()}.${mediaFile.name.split('.').pop()}`
			const res = await s3.send(
				new PutObjectCommand({
					Bucket: process.env.BUCKET_NAME,
					Key: `media/${mediaId}`,
					Body: Buffer.from(await mediaFile.arrayBuffer()),
					ContentType: mediaFile.type
				})
			)
			if (res.$metadata.httpStatusCode !== 200)
				throw new Error(`Error when saving media file, status ${res.$metadata.httpStatusCode}`)
			media = mediaId
		}

		let post
		try {
			post = await prisma.post.create({
				data: {
					title,
					authorId,
					date: new Date(),
					content,
					thumb,
					media
				}
			})
		} catch (e) {
			console.log(e)
			if (e instanceof Error) throw new Error(`Error saving new post record, ${e.message}`)
			throw e
		}
		await new Promise(resolve => setTimeout(resolve, 3000))
		redirect(`/posts/${post.id}`)
	}

	return (
		<>
			<h2 className="my-8">Post</h2>
			<AuthorForm params={{ thumbs, submit }} />
		</>
	)
}
