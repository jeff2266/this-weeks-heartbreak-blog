'use client'

import Cursor from './cursor'
import { Noto_Sans_Mono } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { PulseCallback, usePulse } from '../usePulse'

const notoSansMono = Noto_Sans_Mono({ subsets: ['latin'] })

const bank = [
	'heartbreak',
	'distraction',
	'lunch date',
	'sing-a-long♫',
	'word is: dysphoria',
	'shallow gesture',
	'fork in the road',
	'going to be better'
]

const enum TypeState {
	SHOWING,
	TYPING,
	DELETING
}

function getSlice(word: String, index: number) {
	return word.slice(0, index)
}

export default function DynamicTitle() {
	const [iBank, setIBank] = useState(0)
	const [typeState, setTypeState] = useState<{ value: TypeState }>({ value: TypeState.SHOWING })
	const pulseCt = useRef(0)
	const { subscribe, unsubscribe } = usePulse(100, 50)

	useEffect(() => {
		subscribe(1, onPulse)
		return () => unsubscribe(1)
	})

	const onPulse: PulseCallback = isUp => {
		switch (typeState.value) {
			case TypeState.SHOWING:
				if (isUp) pulseCt.current++
				if (pulseCt.current > 64 + bank[iBank].length / 4) {
					setTypeState({ value: TypeState.DELETING })
					pulseCt.current = bank[iBank].length
				}
				break
			case TypeState.TYPING:
				pulseCt.current++
				if (pulseCt.current === bank[iBank].length) {
					pulseCt.current = 0
					setTypeState({ value: TypeState.SHOWING })
					break
				}
				setTypeState({ value: TypeState.TYPING })
				break
			case TypeState.DELETING:
				pulseCt.current--
				if (pulseCt.current === 0) {
					let iNext = Math.floor(Math.random() * bank.length)
					if (iNext === iBank) iNext = (iBank + 1) % bank.length
					setIBank(iNext)
					setTypeState({ value: TypeState.TYPING })
					break
				}
				setTypeState({ value: TypeState.DELETING })
				break
		}
	}

	return (
		<div className="animate-[flicker_2s_ease_infinite]">
			<h1 className={`${notoSansMono.className} animate-[textShadow_0.7s_infinite] select-none my-4`}>
				This week's&nbsp;
				<>{typeState.value === TypeState.SHOWING ? bank[iBank] : getSlice(bank[iBank], pulseCt.current)}</>
				<Cursor period={1000} blink={typeState.value === TypeState.SHOWING} />
			</h1>
		</div>
	)
}
