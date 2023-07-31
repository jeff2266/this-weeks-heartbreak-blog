'use client'

import { ReactNode, createContext, useContext } from 'react'

type ClientContextState = {
	baseUrl: string
}

const ClientContext = createContext<ClientContextState>({ baseUrl: '' })

export function ClientContextProvider({ baseUrl, children }: { baseUrl: string; children?: ReactNode }) {
	return <ClientContext.Provider value={{ baseUrl }}>{children}</ClientContext.Provider>
}

export function useClientContext() {
	return useContext(ClientContext)
}
