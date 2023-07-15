import './globals.css'
import { Rubik } from 'next/font/google'
// import ClientProvider from '@/components/clientProvider'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
	title: "This Week's Heartbreak",
	description: 'A music blog',
	icons: '/img/favicon.ico'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth antialiased">
			{/* <ClientProvider> */}
			<body className={rubik.className}>{children}</body>
			{/* </ClientProvider> */}
		</html>
	)
}
