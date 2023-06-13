'use client'

import { usePlayerContext } from './player/playerContext'
import { Database } from '@/lib/schema'
import Image from 'next/image'
import pause from 'public/img/pause.svg'
import play from 'public/img/play.svg'

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
								sizes="100vw"
							/>
							<div className="w-full h-full invisible group-hover:visible flex justify-center align-middle absolute filter backdrop-blur-md bg-black/10 opacity-95 z-10">
								<div className="w-1/4 relative">
									{isPlaying && track?.id === id ? (
										<Image src={pause} alt="pause" fill={true} />
									) : (
										<Image src={play} alt="play" fill={true} />
									)}
								</div>
							</div>
						</button>
					) : (
						<div className="w-full pb-[55%] relative group hover:cursor-pointer">
							<Image
								src={imageUrl ?? '/img/post-thumb-image-default.jpg'}
								alt="thumb image"
								fill={true}
								style={{ objectFit: 'cover' }}
								sizes="100vw"
							/>
						</div>
					)}
					<a href={`posts/${id}`}>
						<h3>{title}</h3>
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
