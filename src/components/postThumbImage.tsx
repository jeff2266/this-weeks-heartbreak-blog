'use client'

import { usePlayerContext } from './player/playerContext'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import loading from 'public/img/loading.svg'
import pause from 'public/img/pause.svg'
import play from 'public/img/play.svg'
import defaultImage from 'public/img/post-thumb-image-default.jpg'

type Params = {
	post: { id: string; title: string; thumbUrl?: string | StaticImageData; mediaUrl?: string }
	responsive: boolean
}

export default function PostThumbImage({ post: { id, title, thumbUrl, mediaUrl }, responsive }: Params) {
	const { track, setTrack, isPlaying, setIsPlaying } = usePlayerContext()
	const [imageLoading, setImageLoading] = useState(true)

	const onClick = () => {
		if (track?.id === id) {
			setIsPlaying(prev => !prev)
		} else {
			setTrack({ id, title, url: mediaUrl ?? null, duration: null })
			setIsPlaying(true)
		}
	}
	return (
		<div className="w-full pb-[55%] relative group">
			<Image
				src={thumbUrl ?? defaultImage}
				alt="thumb image"
				fill={true}
				style={{ objectFit: 'cover' }}
				sizes="100vw"
				onLoad={() => setImageLoading(false)}
			/>
			{mediaUrl ? (
				<div
					className={
						imageLoading
							? 'flex w-full h-full justify-center align-middle absolute filter backdrop-blur-md bg-black/20 opacity-95 z-10'
							: responsive
							? 'flex w-1/6 md:w-full h-1/5 md:h-full md:invisible hover:cursor-pointer md:group-hover:visible justify-center align-middle rounded-tl-sm md:rounded-none absolute bottom-0 right-0 filter backdrop-blur-md bg-black/20 opacity-95 z-10'
							: 'flex w-1/3 md:w-full h-1/2 md:h-full md:invisible hover:cursor-pointer md:group-hover:visible justify-center align-middle rounded-tl-sm md:rounded-none absolute bottom-0 right-0 filter backdrop-blur-md bg-black/20 opacity-95 z-10'
					}
					onClick={onClick}>
					<div className="w-1/4 relative">
						{imageLoading ? (
							<Image alt="loading" src={loading} fill={true} sizes="100vw" />
						) : isPlaying && track?.id === id ? (
							<Image src={pause} alt="pause" fill={true} sizes="100vw" />
						) : (
							<Image src={play} alt="play" fill={true} sizes="100vw" />
						)}
					</div>
				</div>
			) : (
				imageLoading && (
					<div className="flex w-full h-full justify-center align-middle absolute filter backdrop-blur-md bg-black/20 opacity-95 z-10">
						<div className="w-1/4 relative">
							<Image alt="loading" src={loading} fill={true} sizes="100vw" />
						</div>
					</div>
				)
			)}
		</div>
	)
}
