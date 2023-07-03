'use client'

import { Noto_Sans_Mono } from 'next/font/google'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

export default function StaticTitle({ animate }: { animate: boolean }) {
	return (
		<div className="animate-[flicker_2s_ease_infinite]">
			<h1 className={`${notoSansMono.className} animate-[textShadow_0.7s_infinite] select-none my-4`}>
				This week's heartbreak
			</h1>
		</div>
	)
}
