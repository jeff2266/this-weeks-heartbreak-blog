import { prisma } from '@/db'
import { s3 } from '@/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Image from 'next/image'
import defaultImage from 'public/img/post-thumb-image-default.jpg'

export default async function Post({ params }: { params: { id: string } }) {
	const post = await prisma.post.findUnique({
		where: {
			id: params.id
		},
		include: {
			author: true
		}
	})

	const imageId = post?.thumb
	const imageUrl = imageId
		? await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbs/${imageId}` }), {
				expiresIn: 3600
		  })
		: defaultImage

	return (
		<main className="flex-col items-center justify-between p-24">
			{post ? (
				<>
					<h2>{post.title}</h2>
					<Image src={imageUrl} alt="post image" width="800" height="600" />
					<p>{post.content}</p>
					<p>{post.author.name}</p>
					<p>{post.date.toLocaleString()}</p>
				</>
			) : (
				<p>Post not found...</p>
			)}
		</main>
	)
}
