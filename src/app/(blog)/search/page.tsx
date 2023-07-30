import { prisma } from '@/db'
import { s3 } from '@/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import StaticTitle from '@/components/banner/staticTitle'
import HamburgerMenu from '@/components/hamburgerMenu'
import PostThumbImage from '@/components/postThumbImage'
import SearchBar from '@/components/searchBar'
import UserSignIn from '@/components/userSignIn'
import Link from 'next/link'

const POSTS_PER_PAGE = 16

export default async function Search({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const queryString = typeof searchParams['query'] === 'string' ? searchParams['query'] : ''
	const dbQueryString = queryString.match(/^[a-zA-Z0-9\s]+$/)
		? queryString
				.split(/\s+/)
				.filter(term => term.match(/^[a-zA-Z0-9]+$/))
				.map(term => '+'.concat(term))
				.join(' | ')
		: ''
	const dbSearchedPosts =
		dbQueryString.length > 0
			? await prisma.post.findMany({
					where: {
						OR: [
							{ title: { search: dbQueryString, mode: 'insensitive' } },
							{ author: { name: { search: dbQueryString, mode: 'insensitive' } } },
							{ content: { search: dbQueryString, mode: 'insensitive' } }
						]
					},
					include: {
						author: true
					},
					take: POSTS_PER_PAGE
			  })
			: []
	const signedPosts = await Promise.all(
		dbSearchedPosts.map(async post => ({
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
					<h2 className="my-4">Search Results</h2>
					{signedPosts.length > 0 ? (
						signedPosts?.map(post => (
							<div className="flex w-full p-2 border rounded-sm mb-2 min-w-max" key={post.id}>
								<div className="w-1/3">
									<PostThumbImage post={post} responsive={false} />
								</div>
								<div className="grow flex flex-col mx-2">
									<div className="w-full flex justify-between items-center mb-2">
										<Link href={`posts/${post.id}`}>
											<h3>{post.title}</h3>
										</Link>
									</div>
									<div className="flex text-sm">
										<p>{`${post.authorName} • ${new Date(post.date).toLocaleDateString('en-US', {
											dateStyle: 'short'
										})}`}</p>
									</div>
								</div>
							</div>
						))
					) : (
						<p className="italic">No matching posts...</p>
					)}
				</div>
				<div className="h-16"></div>
			</div>
		</>
	)
}
