'use client'

import { Noto_Sans_Mono } from 'next/font/google'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

export default function StaticTitle({ animate }: { animate: boolean }) {
	return (
		<div className={`${notoSansMono.className} min-w-max my-2 lg:my-4 animate-[flicker_2s_ease_infinite]`}>
			<span className="flex items-baseline text-xl lg:text-2xl animate-[textShadow_0.7s_infinite] select-none">
				<p className="block lg:hidden">{'♡'}&nbsp;</p>
				<p>{"This week's heartbreak"}</p>
				<p className="block lg:hidden">&nbsp;{'♡'}</p>
			</span>
		</div>
	)
}
