'use client'

import { usePlayerContext } from './playerContext'
import { Database } from '@/lib/schema'
import Image from 'next/image'

type Params = Database['public']['Tables']['posts']['Row'] & {
	author: string
	imageUrl: string | null
	audioUrl: string | null
}

export default function PostThumb({ params: { id, title, author, created_at, imageUrl, audioUrl } }: { params: Params }) {
	const { track, setTrack, isPlaying, setIsPlaying } = usePlayerContext()

	const onClick = () => {
		if (track?.id === id) {
			setIsPlaying(prev => !prev)
		} else {
			setTrack({ id, title, url: audioUrl, duration: null })
			setIsPlaying(true)
		}
	}

	return (
		<div className="w-full md:w-1/2 lg:1/3 xl:w-3/12 p-2">
			<div className="border-2 rounded-sm p-2">
				<div className="flex flex-col">
					{audioUrl ? (
						<button className="w-full pb-[55%] relative group hover:cursor-pointer" onClick={onClick}>
							<Image
								src={imageUrl ?? '/img/post-thumb-image-default.jpg'}
								alt="thumb image"
								fill={true}
								style={{ objectFit: 'cover' }}
							/>
							<div className="w-full h-full invisible group-hover:visible flex justify-center align-middle absolute filter backdrop-blur-md bg-black/10 opacity-95 z-10">
								{isPlaying && track?.id === id ? (
									<svg
										width="25%"
										fill="#fff"
										viewBox="-6.5 -1 34 34"
										className="drop-shadow-md"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg">
										<title>pause</title>
										<path d="M0 6.563v18.875c0 0.531 0.438 0.969 0.969 0.969h6.625c0.5 0 0.906-0.438 0.906-0.969v-18.875c0-0.531-0.406-0.969-0.906-0.969h-6.625c-0.531 0-0.969 0.438-0.969 0.969zM12.281 6.563v18.875c0 0.531 0.438 0.969 0.938 0.969h6.625c0.531 0 0.969-0.438 0.969-0.969v-18.875c0-0.531-0.438-0.969-0.969-0.969h-6.625c-0.5 0-0.938 0.438-0.938 0.969z" />
									</svg>
								) : (
									<svg
										width="25%"
										fill="#FFF"
										viewBox="-7 0 32 32"
										className="drop-shadow-md"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg">
										<title>play</title>
										<path d="M0 6.688v18.906c0 0.344 0.156 0.625 0.469 0.813 0.125 0.094 0.344 0.125 0.5 0.125s0.281-0.031 0.438-0.125l16.375-9.438c0.313-0.219 0.5-0.5 0.5-0.844 0-0.313-0.188-0.594-0.5-0.813l-16.375-9.438c-0.563-0.406-1.406 0.094-1.406 0.813z" />
									</svg>
								)}
							</div>
						</button>
					) : (
						<div className="w-full pb-[55%] relative group hover:cursor-pointer">
							<Image
								src={imageUrl ?? '/img/post-thumb-image-default.jpg'}
								alt="thumb image"
								fill={true}
								style={{ objectFit: 'cover' }}
							/>
						</div>
					)}
					<a href={`posts/${id}`}>
						<h2>{title}</h2>
						<div className="flex justify-between text-sm">
							<p>{author}</p>
							<p>{new Date(created_at).toLocaleDateString('en-US', { dateStyle: 'short' })}</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
