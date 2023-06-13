import '@/app/globals.css'
import { PlayerContextProvider } from '@/components/player/playerContext'
import Player from '@/components/player/player'

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<PlayerContextProvider>
			{children}
			<Player />
		</PlayerContextProvider>
	)
}
