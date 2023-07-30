import { s3 } from '@/s3'
import { prisma } from '@/db'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import SearchBar from '@/components/searchBar'
import StaticTitle from '@/components/banner/staticTitle'
import UserSignIn from '@/components/userSignIn'
import HamburgerMenu from '@/components/hamburgerMenu'
import MainPostsList from '@/components/mainPostsList'

const POSTS_PER_PAGE = 1

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
		dbPosts.map(async ({ id, title, author, date, thumb, media }) => ({
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
			<MainPostsList take={POSTS_PER_PAGE} />
			<div className="h-16"></div>
		</>
	)
}
