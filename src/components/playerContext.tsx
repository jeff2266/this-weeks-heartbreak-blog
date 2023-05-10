'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'

type PlayerContextState = {
	title: string | null
	setTitle: Dispatch<SetStateAction<string | null>>
}

const PlayerContext = createContext<PlayerContextState>({ title: null, setTitle: () => {} })

export const PlayerContextProvider = ({ children }: { children?: ReactNode }) => {
	const [title, setTitle] = useState<string | null>('fsm-team-racing.mp3')
	return <PlayerContext.Provider value={{ title, setTitle }}>{children}</PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext)
