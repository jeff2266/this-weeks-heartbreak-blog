import { prisma } from '@/db'
import { s3 } from '@/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import defaultImage from 'public/img/post-thumb-image-default.jpg'
import StaticTitle from '@/components/banner/staticTitle'
import LikeButton from '@/components/likeButton'
import PostThumbImage from '@/components/postThumbImage'

export default async function Post({ params: { id } }: { params: { id: string } }) {
	const session = await getServerSession(authOptions)

	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: true
		}
	})

	const thumbId = post?.thumb
	const thumbUrl = thumbId
		? await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbs/${thumbId}` }), {
				expiresIn: 3600
		  })
		: defaultImage

	const mediaId = post?.media
	const mediaUrl = mediaId
		? await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `media/${mediaId}` }), {
				expiresIn: 28800
		  })
		: undefined

	return (
		<div className="flex flex-col px-2 lg:p-6 w-full min-h-[65svh] max-w-screen-2xl">
			{post ? (
				<>
					<div className="flex flex-col lg:flex-row items-center justify-between w-full py-2">
						<div className="mx-6">
							<StaticTitle animate={true} />
						</div>
						<div className="w-2/3 grow my-4">
							<div className="border rounded-sm p-2 lg:p-4">
								<div className="relative w-full">
									<PostThumbImage post={{ ...post, thumbUrl, mediaUrl }} responsive={true} />
								</div>
							</div>
						</div>
					</div>
					<div className="grow w-full bg-white text-black px-2 md:px-4 py-4">
						<div className="flex min-w-fit items-center mb-2">
							<h2 className="font-semibold">{post.title}</h2>
							<LikeButton fill="#000" postId={post.id} isSignedIn={!!session} />
						</div>
						<p>{post.content}</p>
					</div>
					<div className="flex py-1 text-sm">
						<p>{`${post.author.name} • ${post.date.toLocaleString()}`}</p>
					</div>
				</>
			) : (
				<p>Post not found...</p>
			)}
			<div className="h-16"></div>
		</div>
	)
}
