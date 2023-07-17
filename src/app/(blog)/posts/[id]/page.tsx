import { prisma } from '@/db'
import { s3 } from '@/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Image from 'next/image'
import Link from 'next/link'
import defaultImage from 'public/img/post-thumb-image-default.jpg'
import heartEmpty from 'public/img/heart-empty.svg'
import heartFilled from 'public/img/heart-filled.svg'

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
		<main className="flex-col items-center justify-between">
			{post ? (
				<>
					<div className="absolute flex justify-center w-full h-full -z-10">
						<Image alt="post image" src={imageUrl} fill={true} style={{ objectFit: 'cover' }} sizes="100vw" />
					</div>
					<div className="flex w-full px-6 md:px-12">
						<div className="flex flex-col w-1/2 justify-end">
							<Link href="/">Home</Link>
							<div className="bg-white text-black">
								<h2>{post.title}</h2>
								<div className="w-5">
									<Image src={heartEmpty} alt="like" />
								</div>
								<div className="w-5">
									<Image src={heartFilled} alt="like" />
								</div>
								<p>{post.content}</p>
							</div>
							<div className="flex">
								<p>{post.author.name}</p>
								<p>&nbsp;{'♡'}&nbsp;</p>
								<p>{post.date.toLocaleString()}</p>
							</div>
						</div>
					</div>
				</>
			) : (
				<p>Post not found...</p>
			)}
		</main>
	)
}
