'use client'

import { Noto_Sans_Mono } from 'next/font/google'
import Cursor from './cursor'
import { useEffect, useRef, useState } from 'react'
import { PulseCallback, usePulse } from '../usePulse'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

const bank = [
	'heartbreak',
	'distraction',
	'$100 lunch date',
	'sing-a-long♫',
	'word is: dysphoria',
	'mix to drive to',
	'time to shine',
	'shallow gesture',
	'fork in the road'
]

export default function Banner() {
	const [iBank, setIBank] = useState(0)
	const pulseCt = useRef(0)
	const { subscribe, unsubscribe } = usePulse(200, 100)

	useEffect(() => {
		subscribe(1, onPulse)
		return () => unsubscribe(1)
	})

	const onPulse: PulseCallback = isUp => {
		if (isUp) pulseCt.current++
		if (pulseCt.current > 8) {
			let iNext = Math.floor(Math.random() * bank.length)
			if (iNext === iBank) iNext = (iBank + 1) % bank.length
			console.log(iNext)
			setIBank(iNext)
			pulseCt.current = 0
		}
	}

	return (
		<h1 className={`${notoSansMono.className} animate-[textShadow_0.7s_infinite] select-none my-4`}>
			This week's&nbsp;
			{bank[iBank]}
			<Cursor period={1000} blink={true} />
		</h1>
	)
}
