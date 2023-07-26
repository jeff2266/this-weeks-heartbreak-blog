import { s3 } from '@/s3'
import { prisma } from '@/db'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SearchBar from '@/components/searchBar'
import StaticTitle from '@/components/banner/staticTitle'
import UserSignIn from '@/components/userSignIn'
import Link from 'next/link'
import HamburgerMenu from '@/components/hamburgerMenu'
import PostThumbImage from '@/components/postThumbImage'
import LikeButton from '@/components/likeButton'

const POSTS_PER_PAGE = 16

export default async function Likes({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const session = await getServerSession(authOptions)
	const totalPages = Math.ceil((await prisma.post.count()) / POSTS_PER_PAGE)
	const pageParamStr = searchParams['page']
	let pageParamNum = 1
	if (typeof pageParamStr === 'string') pageParamNum = parseInt(pageParamStr)
	const page = Number.isSafeInteger(pageParamNum) && pageParamNum > 0 && pageParamNum <= totalPages ? pageParamNum : 1

	const dbLikedPosts = await prisma.like.findMany({
		where: {
			userId: {
				equals: session?.user.userId
			}
		},
		orderBy: {
			post: {
				date: 'desc'
			}
		},
		include: {
			post: {
				include: {
					author: true
				}
			}
		},
		skip: POSTS_PER_PAGE * (page - 1),
		take: POSTS_PER_PAGE
	})
	const signedPosts = await Promise.all(
		dbLikedPosts.map(async ({ post }) => ({
			id: post.id,
			title: post.title,
			authorName: post.author.name ?? undefined,
			date: post.date,
			thumbUrl: post.thumb
				? await getSignedUrl(
						s3,
						new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbs/${post.thumb}` }),
						{ expiresIn: 3600 }
				  )
				: undefined,
			mediaUrl: post.media
				? await getSignedUrl(
						s3,
						new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `media/${post.media}` }),
						{ expiresIn: 28800 }
				  )
				: undefined
		}))
	)

	return (
		<>
			<div className="flex justify-center lg:justify-between">
				<StaticTitle animate={true} />
				<nav className="hidden lg:flex items-center justify-end">
					<SearchBar />
					<UserSignIn />
				</nav>
			</div>
			<HamburgerMenu />
			<div className="flex justify-center w-full">
				<div className="flex flex-col items-center w-full max-w-screen-sm">
					<h2 className="my-4">Liked Posts</h2>
					{signedPosts?.map(post => (
						<div className="flex w-full p-2 border rounded-sm mb-2 min-w-max" key={post.id}>
							<div className="w-1/3">
								<PostThumbImage params={{ post, responsive: false }} />
							</div>
							<div className="grow flex flex-col mx-2">
								<div className="w-full flex justify-between items-center mb-2">
									<Link href={`posts/${post.id}`}>
										<h3>{post.title}</h3>
									</Link>
									<LikeButton
										params={{
											fill: '#FFF',
											like: !!session
												? { postId: post.id, userId: session.user.userId, isLike: true }
												: undefined
										}}
									/>
								</div>
								<div className="flex text-sm">
									<p>{`${post.authorName} • ${new Date(post.date).toLocaleDateString('en-US', {
										dateStyle: 'short'
									})}`}</p>
								</div>
							</div>
						</div>
					))}
					<div className="flex my-2">
						{page > 1 && <Link href={`/?page=${page - 1}`}>{'< Prev'}</Link>}
						<div className="grow"></div>
						{page < totalPages && <Link href={`/?page=${page + 1}`}>{'Next >'}</Link>}
					</div>
				</div>
				<div className="h-16"></div>
			</div>
		</>
	)
}
