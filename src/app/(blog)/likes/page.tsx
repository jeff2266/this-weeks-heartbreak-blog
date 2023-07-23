import { s3 } from '@/s3'
import { prisma } from '@/db'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getServerSession } from 'next-auth'
import { POSTS_PER_PAGE } from '../page'
import PostThumb from '@/components/postThumb'
import SearchBar from '@/components/searchBar'
import StaticTitle from '@/components/banner/staticTitle'
import UserSignIn from '@/components/userSignIn'
import Link from 'next/link'
import HamburgerMenu from '@/components/hamburgerMenu'

export default async function Likes({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const session = await getServerSession()
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
			<main className={`flex-col items-center`}>
				<div className="px-6 py-2 md:px-12">
					<div className="flex justify-center lg:justify-between">
						<StaticTitle animate={true} />
						<nav className="hidden lg:flex items-center justify-end">
							<SearchBar />
							<UserSignIn />
						</nav>
					</div>
				</div>
				<HamburgerMenu />
				<div className="px-6 md:px-12">
					<h2>Liked Posts</h2>
					<div className="flex flex-wrap justify-start -mx-2">
						{signedPosts?.map(post => (
							<PostThumb key={post.id} post={post} />
						))}
					</div>
					<div className="flex my-2">
						{page > 1 && <Link href={`/?page=${page - 1}`}>{'< Prev'}</Link>}
						<div className="grow"></div>
						{page < totalPages && <Link href={`/?page=${page + 1}`}>{'Next >'}</Link>}
					</div>
					<div className="h-16"></div>
				</div>
			</main>
		</>
	)
}
