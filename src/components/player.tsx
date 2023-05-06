'use client'

import { useEffect, useRef, useState } from 'react'
import PlayToggle from './playToggle'
import ProgressBar from './progressBar'

export default function Player() {
	const [playing, setPlaying] = useState<boolean>(false)
	const [playTime, setPlayTime] = useState<{ currentTime: number; duration: number } | null>(null)
	const audio = useRef<HTMLMediaElement>(null)
	const btnTogglePlay = useRef<HTMLButtonElement>(null)
	const volume = useRef<HTMLInputElement>(null)
	const audioContext = useRef<AudioContext | null>(null)
	const gainNode = useRef<GainNode | null>(null)
	const track = useRef<MediaElementAudioSourceNode | null>(null)

	const togglePlay = async () => {
		if (!audioContext.current || !audio.current) return
		if (audioContext.current.state === 'suspended') await audioContext.current.resume()
		playing ? audio.current.pause() : audio.current.play()
	}

	const changeVolume = () => {
		if (!gainNode.current || !volume.current) return
		gainNode.current.gain.value = Number(volume.current.value)
	}

	const seekTo = (target: number) => {
		if (!audio.current) return
		audio.current.currentTime = target
	}

	const convertToMinSec = (time: number) => {
		const sec = `${parseInt(`${time % 60}`)}`.padStart(2, '0')
		const min = parseInt(`${(time / 60) % 60}`)
		return `${min}:${sec}`
	}

	useEffect(() => {
		audioContext.current = new window.AudioContext()
		gainNode.current = audioContext.current.createGain()
		track.current = audio.current ? audioContext.current.createMediaElementSource(audio.current) : null

		track.current && track.current.connect(gainNode.current).connect(audioContext.current.destination)
		audio.current && setPlayTime({ currentTime: audio.current.currentTime, duration: audio.current.duration })
	}, [])

	return (
		<div>
			<audio
				ref={audio}
				src='/untitled_Master.wav'
				controls
				controlsList='play nodownload noplaybackrate'
				onPlay={() => {
					setPlaying(true)
				}}
				onPause={() => {
					setPlaying(false)
				}}
				onLoadedMetadata={e => {
					console.log('loaded metadata')
					setPlayTime({ currentTime: e.currentTarget.currentTime, duration: e.currentTarget.duration })
				}}
				onCanPlay={() => console.log('can play')}
				onTimeUpdate={e => {
					audio.current && setPlayTime({ currentTime: audio.current.currentTime, duration: audio.current.duration })
				}}
				onEnded={() => {
					setPlaying(false)
				}}
				onError={() => {
					setPlayTime(null)
				}}
			/>
			<button ref={btnTogglePlay} onClick={togglePlay} disabled={!playTime}>
				<PlayToggle playState={playing} size={30} darkTheme={true} />
			</button>
			<input ref={volume} type='range' min='0' max='1.2' step='0.01' defaultValue='1' onMouseUp={changeVolume} />
			<span className='flex items-center'>
				<ProgressBar playTime={playTime} seekTo={seekTo} />
				<div className='grid grid-rows-1 grid-cols-5'>
					<div className='col-span-2 text-center'>
						{playTime !== null ? convertToMinSec(playTime.currentTime) : '--'}
					</div>
					<div className='text-center'>{' / '}</div>
					<div className='col-span-2 text-center'>{playTime !== null ? convertToMinSec(playTime.duration) : '--'}</div>
				</div>
			</span>
		</div>
	)
}
