import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { PlayerContextProvider } from '@/components/playerContext'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Player from '@/components/player'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
	icons: '/img/favicon.ico'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth antialiased">
			<body className={inter.className}>
				<PlayerContextProvider>
					{children}
					<Player />
				</PlayerContextProvider>
			</body>
		</html>
	)
}
