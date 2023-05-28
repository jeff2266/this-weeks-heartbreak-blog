'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

export type Track = {
	title: string
	url: string | null
}

type PlayerContextState = {
	currentTrack: Track | null
	setTrack: Dispatch<SetStateAction<Track | null>>
}

const PlayerContext = createContext<PlayerContextState>({ currentTrack: null, setTrack: () => {} })

export const PlayerContextProvider = ({ children }: { children?: ReactNode }) => {
	const [track, setTrack] = useState<Track | null>({ title: '-', url: null })
	return <PlayerContext.Provider value={{ currentTrack: track, setTrack }}>{children}</PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext)
