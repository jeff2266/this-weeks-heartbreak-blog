'use client'

import { usePlayerContext } from './player/playerContext'
import { SignedPosts } from '@/app/api/post/route'
import { useEffect, useRef, useState } from 'react'
import PostThumb from './postThumb'
import HeartLoader from './heartLoader'

type Params = {
	take: number
}

export default function MainPostsList({ take }: Params) {
	const { baseUrl } = usePlayerContext()
	const [signedPosts, setSignedPosts] = useState<SignedPosts>([])
	const [atBottom, setAtBottom] = useState(false)
	const [loading, setLoading] = useState(false)
	const cursor = useRef<number | null | 'DONE'>(null)

	useEffect(() => {
		if (cursor.current === 'DONE') return
		if (!loading) {
			setAtBottom(isAtBottom())
			if (atBottom) {
				// Get more posts
				setLoading(true)
				const url =
					`${baseUrl}/api/post?liked=false&take=${take}` + (cursor.current ? `&cursor=${cursor.current}` : '')
				fetch(url)
					.then(async res => {
						const val = await res.json()
						const newSignedPosts = JSON.parse(val) as SignedPosts
						cursor.current =
							newSignedPosts.length >= take ? newSignedPosts[newSignedPosts.length - 1].id : 'DONE'
						setSignedPosts(prev => [...prev, ...newSignedPosts])
					})
					.finally(() => {
						setLoading(false)
					})
			}
		}
	}, [atBottom, loading, cursor])

	function isAtBottom() {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
		return Math.abs(height - winScroll) < 5
	}

	function onScroll() {
		setAtBottom(isAtBottom())
	}

	useEffect(() => {
		document.addEventListener('scroll', onScroll)

		return () => {
			document.removeEventListener('scroll', onScroll)
		}
	}, [])

	return (
		<>
			<div className="flex flex-wrap justify-start -mx-2 mt-2">
				{signedPosts?.map(post => (
					<PostThumb key={post.id} post={post} />
				))}
			</div>
			{loading && (
				<div className="flex w-full justify-center">
					<div className="w-16">
						<HeartLoader pulseKey={1} />
					</div>
				</div>
			)}
		</>
	)
}
