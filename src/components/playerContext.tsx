'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type PlayerContextState = {
	count: number
	setCount: (color: number) => void
}

const PlayerContext = createContext<PlayerContextState>({ count: 0, setCount: () => {} })

export const PlayerContextProvider = ({ children }: { children?: ReactNode }) => {
	const [count, setCount] = useState(0)
	return <PlayerContext.Provider value={{ count, setCount }}>{children}</PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext)
