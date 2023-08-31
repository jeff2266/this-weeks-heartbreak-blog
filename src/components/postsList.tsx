'use client'

import { useClientContext } from './clientContext'
import { SignedPosts } from '@/app/api/post/route'
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import PostThumb from './postThumb'
import HeartLoader from './heartLoader'
import PostThumbImage from './postThumbImage'
import Link from 'next/link'
import LikeButton from './likeButton'

type Params = {
	type: 'MAIN' | 'LIKES' | 'AUTHORED'
	take: number
}

export default function PostsList({ type, take }: Params) {
	const { baseUrl } = useClientContext()
	const { data: session } = useSession()
	const [signedPosts, setSignedPosts] = useState<SignedPosts>([])
	const [atBottom, setAtBottom] = useState(false)
	const [loading, setLoading] = useState(false)
	const cursor = useRef<number | null | 'DONE'>(null)

	useEffect(() => {
		window.addEventListener('scroll', onScroll)
		// document.addEventListener('scroll', onScroll)

		return () => {
			window.removeEventListener('scroll', onScroll)
			// document.removeEventListener('scroll', onScroll)
		}
	}, [])

	useEffect(() => {
		setAtBottom(isAtBottom())
		setLoading(false)
	}, [signedPosts])

	useEffect(() => {
		if (cursor.current === 'DONE' || loading) return
		if (atBottom) {
			// Get more posts
			setLoading(true)
			const url =
				`${baseUrl}/api/post?filter=${
					type === 'LIKES' ? 'liked' : type === 'AUTHORED' ? 'authored' : 'none'
				}&take=${take}` + (cursor.current ? `&cursor=${cursor.current}` : '')
			fetch(url)
				.then(async res => {
					try {
						if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
						const val = await res.json()
						const newSignedPosts = JSON.parse(val) as SignedPosts
						cursor.current =
							newSignedPosts.length >= take ? newSignedPosts[newSignedPosts.length - 1].id : 'DONE'
						setSignedPosts(prev => [...prev, ...newSignedPosts])
					} catch (e) {
						cursor.current = 'DONE'
					} finally {
						setLoading(false)
					}
				})
				.catch(e => {
					setLoading(false)
					cursor.current = 'DONE'
				})
		}
	}, [atBottom, loading, cursor])

	function isAtBottom() {
		const windowHeight = window.innerHeight
		const windowBottomPosition = windowHeight + Math.ceil(window.scrollY)
		const documentTotalHeight = document.body.offsetHeight
		return windowBottomPosition >= documentTotalHeight
	}

	function onScroll() {
		setAtBottom(isAtBottom())
	}

	return type === 'LIKES' ? (
		<>
			<div className="flex w-full justify-center">
				<div className="flex flex-col w-full max-w-screen-sm">
					{signedPosts?.map(post => (
						<div className="flex w-full items-center p-1 border rounded-sm mb-2" key={post.id}>
							<div className="w-1/3">
								<PostThumbImage post={post} responsive={false} />
							</div>
							<div className="grow flex flex-col mx-2">
								<div className="w-full flex justify-between items-center mb-2">
									<Link href={`posts/${post.id}`}>
										<h3>{post.title}</h3>
									</Link>
									<LikeButton
										fill="#FFF"
										postId={post.id}
										isSignedIn={!!session}
										onDone={isLike => {
											if (!isLike) {
												setSignedPosts(prev => prev.filter(filtering => filtering.id !== post.id))
											}
										}}
									/>
								</div>
								<div className="text-sm">
									<p className="whitespace-nowrap">{`${post.authorName} • ${new Date(
										post.date
									).toLocaleDateString('en-US', {
										dateStyle: 'short'
									})}`}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{loading && (
				<div className="flex w-full justify-center">
					<div className="w-16">
						<HeartLoader pulseKey={1} />
					</div>
				</div>
			)}
		</>
	) : type === 'AUTHORED' ? (
		<>
			<div className="flex w-full justify-center">
				<div className="flex flex-col w-full max-w-screen-sm">
					{signedPosts?.map(post => (
						<div className="flex w-full items-center p-1 border rounded-sm mb-2 min-w-max" key={post.id}>
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
					))}
				</div>
			</div>
			{loading && (
				<div className="flex w-full justify-center">
					<div className="w-16">
						<HeartLoader pulseKey={1} />
					</div>
				</div>
			)}
		</>
	) : (
		<>
			<div className="flex flex-wrap justify-start -mx-2 mt-2">
				{signedPosts?.map(post => (
					<PostThumb key={post.id} post={post} />
				))}
			</div>
			{loading && (
				<div className="flex justify-center w-full">
					<div className="w-full md:w-1/2 lg:1/3 xl:w-3/12 py-7 flex justify-center">
						<div className="w-16 pb-[55%]">
							<HeartLoader pulseKey={1} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
