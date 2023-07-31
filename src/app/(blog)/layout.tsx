import '@/app/globals.css'
import { PlayerContextProvider } from '@/components/player/playerContext'
import { ClientContextProvider } from '@/components/clientContext'
import Player from '@/components/player/player'

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClientContextProvider baseUrl={process.env.VERCEL_URL ?? ''}>
			<PlayerContextProvider>
				<main className={`w-full flex justify-center`}>
					<div className="flex-col w-full max-w-screen-xl px-6 py-2 md:px-12">{children}</div>
				</main>
				<Player />
			</PlayerContextProvider>
		</ClientContextProvider>
	)
}
