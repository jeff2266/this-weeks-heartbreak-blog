import './globals.css'
import { Instrument_Sans } from 'next/font/google'
import ClientProvider from '@/components/clientProvider'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

export const metadata = {
	title: "This Week's Heartbreak",
	description: 'A music blog',
	icons: '/img/favicon.ico'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth antialiased">
			<ClientProvider>
				<body className={instrumentSans.className}>{children}</body>
			</ClientProvider>
		</html>
	)
}
