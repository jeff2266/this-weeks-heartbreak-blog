'use client'

import { Noto_Sans_Mono } from 'next/font/google'
import Link from 'next/link'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

export default function StaticTitle({ animate }: { animate: boolean }) {
	return (
		<Link
			href="/"
			className={`${notoSansMono.className} min-w-max lg:min-w-min mx-6 my-2 lg:my-4 ${
				animate && 'animate-[flicker_2s_ease_infinite]'
			}`}>
			<span
				className={`flex items-baseline text-xl lg:text-2xl ${
					animate ? 'animate-[textShadow_0.7s_infinite] select-none' : ''
				}`}>
				<p className="block lg:hidden">{'♡'}&nbsp;</p>
				<p className="text-center">{"This week's heartbreak"}</p>
				<p className="block lg:hidden">&nbsp;{'♡'}</p>
			</span>
		</Link>
	)
}
