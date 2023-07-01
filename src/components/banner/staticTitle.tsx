'use client'

import Cursor from './cursor'
import { Noto_Sans_Mono } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { PulseCallback, usePulse } from '../usePulse'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

export default function StaticTitle({ animate }: { animate: boolean }) {
	const [iBank, setIBank] = useState(0)
	const [cursorShow, setCursorShow] = useState(true)
	const pulseCt = useRef(0)
	const { subscribe, unsubscribe } = usePulse(2000, 1000)

	useEffect(() => {
		subscribe(1, onPulse)
		return () => unsubscribe(1)
	})

	const onPulse: PulseCallback = isUp => {
		setCursorShow(isUp)
	}

	return (
		<div className="animate-[flicker_2s_ease_infinite]">
			<h1 className={`${notoSansMono.className} animate-[textShadow_0.7s_infinite] select-none my-4`}>
				This week's heartbreak
				{animate && <Cursor period={1000} blink={cursorShow} />}
			</h1>
		</div>
	)
}
