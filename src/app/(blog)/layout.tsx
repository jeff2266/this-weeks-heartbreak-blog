import '@/app/globals.css'
import { PlayerContextProvider } from '@/components/player/playerContext'
import Player from '@/components/player/player'

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<PlayerContextProvider baseUrl={process.env.VERCEL_URL ?? ''}>
			<main className={`flex-col items-center`}>
				<div className="px-6 py-2 md:px-12">{children}</div>
			</main>
			<Player />
		</PlayerContextProvider>
	)
}
