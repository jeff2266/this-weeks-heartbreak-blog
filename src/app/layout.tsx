import './globals.css'
import { Instrument_Sans } from 'next/font/google'
import ClientSessionProvider from '@/components/clientSessionProvider'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

export const metadata = {
	title: "This Week's Heartbreak",
	description: 'A music blog',
	icons: '/img/favicon.ico'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth antialiased">
			<ClientSessionProvider>
				<body className={instrumentSans.className}>{children}</body>
			</ClientSessionProvider>
		</html>
	)
}
