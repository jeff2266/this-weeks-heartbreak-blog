'use client'

import { usePlayerContext } from './player/playerContext'
import Image, { StaticImageData } from 'next/image'
import pause from 'public/img/pause.svg'
import play from 'public/img/play.svg'
import defaultImage from 'public/img/post-thumb-image-default.jpg'

type Params = {
	id: string
	title: string
	thumbUrl?: string | StaticImageData
	mediaUrl?: string
}

export default function PostThumbImage({ params: { id, title, thumbUrl, mediaUrl } }: { params: Params }) {
	const { track, setTrack, isPlaying, setIsPlaying } = usePlayerContext()

	const onClick = () => {
		if (track?.id === id) {
			setIsPlaying(prev => !prev)
		} else {
			setTrack({ id, title, url: mediaUrl ?? null, duration: null })
			setIsPlaying(true)
		}
	}
	return mediaUrl ? (
		<div className="w-full pb-[55%] relative group hover:cursor-pointer" onClick={onClick}>
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
						<Image src={pause} alt="pause" fill={true} sizes="100vw" />
					) : (
						<Image src={play} alt="play" fill={true} sizes="100vw" />
					)}
				</div>
			</div>
		</div>
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
	)
}
