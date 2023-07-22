import { s3 } from '@/s3'
import { prisma } from '@/db'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import PostThumb from '@/components/postThumb'
import SearchBar from '@/components/searchBar'
import StaticTitle from '@/components/banner/staticTitle'
import UserSignIn from '@/components/userSignIn'
import Link from 'next/link'
import HamburgerMenu from '@/components/hamburgerMenu'

const POSTS_PER_PAGE = 8

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const totalPages = Math.ceil((await prisma.post.count()) / POSTS_PER_PAGE)
	const pageParamStr = searchParams['page']
	let pageParamNum = 1
	if (typeof pageParamStr === 'string') pageParamNum = parseInt(pageParamStr)
	const page = Number.isSafeInteger(pageParamNum) && pageParamNum > 0 && pageParamNum <= totalPages ? pageParamNum : 1

	const dbPosts = await prisma.post.findMany({
		orderBy: {
			date: 'desc'
		},
		include: {
			author: true
		},
		skip: POSTS_PER_PAGE * (page - 1),
		take: POSTS_PER_PAGE
	})
	const signedPosts = await Promise.all(
		dbPosts.map(async dbPost => ({
			id: dbPost.id,
			title: dbPost.title,
			authorName: dbPost.author.name ?? undefined,
			date: dbPost.date,
			thumbUrl: dbPost.thumb
				? await getSignedUrl(
						s3,
						new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `thumbs/${dbPost.thumb}` }),
						{ expiresIn: 3600 }
				  )
				: undefined,
			mediaUrl: dbPost.media
				? await getSignedUrl(
						s3,
						new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: `media/${dbPost.media}` }),
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
