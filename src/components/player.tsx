'use client'

import { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { usePlayerContext } from './playerContext'
import PlayToggle from './playToggle'
import ProgressBar from './progressBar'
import Volume from './volume'

export default function Player() {
	const { track, setTrack, isPlaying, setIsPlaying, playTime, setPlayTime } = usePlayerContext()
	const [volume, setVolume] = useState({ value: 1, mute: false })
	const audio = useRef<HTMLMediaElement>(null)
	const audioContext = useRef<AudioContext | null>(null)
	const gainNode = useRef<GainNode | null>(null)
	const trackNode = useRef<MediaElementAudioSourceNode | null>(null)

	const togglePlay = async () => {
		if (!audioContext.current || !audio.current) return
		if (audioContext.current.state === 'suspended') await audioContext.current.resume()
		setIsPlaying(prev => !prev)
		isPlaying ? audio.current.pause() : await audio.current.play()
	}

	const seekTo = (target: number) => {
		if (!audio.current) return
		audio.current.currentTime = target
	}

	const convertToMinSec = (time: number) => {
		if (isNaN(time) || time < 0) return '0:00'
		const sec = `${parseInt(`${time % 60}`)}`.padStart(2, '0')
		const min = parseInt(`${(time / 60) % 60}`)
		return `${min}:${sec}`
	}

	const trackLoaded: ReactEventHandler<HTMLAudioElement> = () => {
		if (!audioContext.current || !audio.current) return
		setTrack(prev => (prev ? { ...prev, duration: audio.current?.duration ?? 0 } : null))
		setPlayTime(0)
		if (audioContext.current.state === 'suspended') {
			audioContext.current.resume().then(() => {
				isPlaying && audio.current?.play()
			})
		} else {
			isPlaying && audio.current?.play()
		}
	}

	useEffect(() => {
		if (audioContext.current !== null) return
		audioContext.current = new window.AudioContext()
		gainNode.current = audioContext.current.createGain()
		trackNode.current = audio.current ? audioContext.current.createMediaElementSource(audio.current) : null

		trackNode.current && trackNode.current.connect(gainNode.current).connect(audioContext.current.destination)
	}, [])

	useEffect(() => {
		if (!gainNode.current) return
		gainNode.current.gain.value = volume.mute ? 0 : volume.value
	}, [volume])

	useEffect(() => {
		if (audio.current) isPlaying ? audio.current?.play() : audio.current.pause()
	}, [isPlaying])

	return (
		<>
			<audio
				ref={audio}
				style={{ display: 'none' }}
				src={track?.url ?? undefined}
				controls
				controlsList="play nodownload noplaybackrate"
				crossOrigin="anonymous"
				onPlay={() => {
					setIsPlaying(true)
				}}
				onPause={() => {
					setIsPlaying(false)
				}}
				onLoadedMetadata={trackLoaded}
				onCanPlay={() => console.log('can play')}
				onTimeUpdate={() => {
					audio.current && setPlayTime(audio.current.currentTime)
				}}
				onEnded={() => {
					setIsPlaying(false)
				}}
				onChange={e => {
					console.log(e)
				}}
			/>
			{track && (
				<span className="w-full flex flex-nowrap justify-center text-xs md:text-sm 2xl:text-base py-1.5 md:py-2 px-1 fixed bottom-0 select-none bg-inherit">
					<div className="grid grid-rows-4 grid-cols-12 w-full md:w-3/4 lg:w-1/2">
						<div className="row-start-2 col-start-1 row-span-3 col-span-1 md:mx-2 place-items-center flex justify-end">
							<PlayToggle playState={isPlaying} togglePlay={togglePlay} darkTheme={true} />
						</div>
						<div className="row-start-1 col-start-2 row-span-2 col-span-8 sm:col-span-7 md:col-span-8 place-items-center flex flex-col-reverse">
							<p>{track?.title}</p>
						</div>
						<div className="row-start-3 col-start-2 row-span-1 col-span-8 sm:col-span-7 md:col-span-8 place-items-center flex justify-around">
							<ProgressBar
								className="h-1.5 mx-1 w-full bg-gray-200 rounded cursor-pointer"
								playTime={playTime}
								duration={track?.duration ?? 0}
								seekTo={seekTo}
							/>
						</div>
						<div className="row-start-2 col-start-10 sm:col-start-9 md:col-start-10 row-span-3 col-span-3 md:col-span-2 place-items-stretch flex justify-end md:mx-1.5 items-center min-w-[6em]">
							<div className="mx-1 sm:mx-2 grid grid-rows-1 grid-cols-7">
								<div className="col-span-3 text-center">{convertToMinSec(playTime)}</div>
								<div className="text-center">{' / '}</div>
								<div className="col-span-3 text-center">{convertToMinSec(track?.duration ?? 0)}</div>
							</div>
						</div>
						<div className="hidden sm:flex row-start-2 col-start-12 row-span-3 col-span-1 place-items-stretch items-center">
							<Volume volume={volume} setVolume={setVolume} />
						</div>
					</div>
				</span>
			)}
		</>
	)
}
