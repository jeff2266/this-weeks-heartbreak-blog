'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

export type Track = {
	id: string
	title: string
	url: string | null
	duration: number | null
}

type PlayerContextState = {
	track: Track | null
	setTrack: Dispatch<SetStateAction<Track | null>>
	isPlaying: boolean
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	playTime: number
	setPlayTime: Dispatch<SetStateAction<number>>
}

const defaultPlayerContext: PlayerContextState = {
	track: null,
	setTrack: () => {},
	isPlaying: false,
	setIsPlaying: () => {},
	playTime: 0,
	setPlayTime: () => {}
}

const PlayerContext = createContext<PlayerContextState>(defaultPlayerContext)

export const PlayerContextProvider = ({ children }: { children?: ReactNode }) => {
	const [track, setTrack] = useState<Track | null>(null)
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [playTime, setPlayTime] = useState<number>(0)
	return (
		<PlayerContext.Provider
			value={{
				track,
				setTrack,
				isPlaying,
				setIsPlaying,
				playTime,
				setPlayTime
			}}>
			{children}
		</PlayerContext.Provider>
	)
}

export const usePlayerContext = () => useContext(PlayerContext)
