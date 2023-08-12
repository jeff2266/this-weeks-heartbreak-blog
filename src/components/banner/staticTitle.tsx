'use client'

import { Noto_Sans_Mono } from 'next/font/google'
import Link from 'next/link'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

export default function StaticTitle({ animate }: { animate: boolean }) {
	return (
		<Link
			href="/"
			className={`min-w-max lg:min-w-min my-2 lg:my-4 self-center ${notoSansMono.className} ${
				animate && 'animate-[flicker_2s_ease_infinite]'
			}`}>
			<span
				className={`flex items-center text-xl lg:text-2xl ${
					animate ? 'animate-[dropShadow_2s_infinite] select-none' : ''
				}`}>
				<p className="text-center">{"This week's heartbreak"}</p>
			</span>
		</Link>
	)
}
