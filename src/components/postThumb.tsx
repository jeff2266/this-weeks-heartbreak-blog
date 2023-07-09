'use client'

import { usePlayerContext } from './player/playerContext'
import Image from 'next/image'
import pause from 'public/img/pause.svg'
import play from 'public/img/play.svg'
import defaultImage from 'public/img/post-thumb-image-default.jpg'

type Params = {
	id: string
	title: string
	author?: string
	date: Date
	thumbUrl?: string
	mediaUrl?: string
}

export default function PostThumb({ post: { id, title, author, date, thumbUrl, mediaUrl } }: { post: Params }) {
	const { track, setTrack, isPlaying, setIsPlaying } = usePlayerContext()

	const onClick = () => {
		if (track?.id === id) {
			setIsPlaying(prev => !prev)
		} else {
			setTrack({ id, title, url: mediaUrl ?? null, duration: null })
			setIsPlaying(true)
		}
	}

	return (
		<div className="w-full md:w-1/2 lg:1/3 xl:w-3/12 p-2">
			<div className="border-2 rounded-sm p-2">
				<div className="flex flex-col">
					{mediaUrl ? (
						<button className="w-full pb-[55%] relative group hover:cursor-pointer" onClick={onClick}>
							<Image
								src={thumbUrl ?? defaultImage}
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
						<div className="w-full pb-[55%] relative group">
							<Image
								src={thumbUrl ?? defaultImage}
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
							<p>{new Date(date).toLocaleDateString('en-US', { dateStyle: 'short' })}</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
