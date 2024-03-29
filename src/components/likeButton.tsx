'use client'

import { useEffect, useState } from 'react'
import { useClientContext } from './clientContext'
import Link from 'next/link'

type Params = {
	fill: string
	postId: number
	isSignedIn: boolean
	onDone?: (isLike: boolean) => void
}

async function handleClick(route: string, method: 'POST' | 'DELETE', postId: number) {
	return await fetch(route, { method, body: JSON.stringify({ postId }) })
}

export default function LikeButton({ fill, postId, onDone, isSignedIn }: Params) {
	const { baseUrl } = useClientContext()
	const [like, setLike] = useState<boolean | null>(null)
	useEffect(() => {
		fetch(`${baseUrl}/api/like/${encodeURIComponent(postId)}`)
			.then(async res => {
				setLike((await res.json()) !== null)
			})
			.catch()
	}, [])
	const path = `M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
		c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
		l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
		C471.801,124.501,458.301,91.701,433.601,67.001z ${
			!like
				? `M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
		s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
		c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
		C444.801,187.101,434.001,213.101,414.401,232.701z`
				: ``
		}`

	return isSignedIn ? (
		<button
			className={`w-5 mx-2 ${like === null ? 'animate-[smallPing_0.6s_ease-in_alternate_infinite]' : ''}`}
			onClick={async () => {
				if (like === null) return
				setLike(null)
				const res = like
					? (await handleClick(`${baseUrl}/api/like`, 'DELETE', postId)).ok
					: (await handleClick(`${baseUrl}/api/like`, 'POST', postId)).ok
				if (res) {
					setLike(!like)
					if (onDone !== undefined) onDone(!like)
				}
			}}
			disabled={like === null}>
			<svg fill={fill} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.701 471.701">
				<path d={path} />
			</svg>
		</button>
	) : (
		<Link href="/api/auth/signin" className="w-5 mx-2">
			<svg fill={fill} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.701 471.701">
				<path d={path} />
			</svg>
		</Link>
	)
}
