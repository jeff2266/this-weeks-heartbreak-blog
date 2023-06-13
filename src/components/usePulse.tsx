'use client'

import { useEffect, useRef } from 'react'

export type PulseCallback = (isUp: boolean) => void

export function usePulse(period: number, pulseWidth: number) {
	if (!(pulseWidth < period)) throw 'Exception creating pulse, width must be less than period'
	const subscribers = useRef<Map<number, { callback: PulseCallback; abort: boolean }>>(new Map())

	useEffect(() => {
		let pulseUp: NodeJS.Timer | null = null
		let pulseDown: NodeJS.Timer | null = null
		pulseUp = setInterval(() => {
			subscribers.current.forEach(value => {
				if (!value.abort) value.callback(true)
			})
			pulseDown = setTimeout(() => {
				subscribers.current.forEach(value => {
					if (!value.abort) value.callback(false)
				})
			}, pulseWidth)
		}, period)

		return () => {
			if (pulseUp !== null) clearInterval(pulseUp)
			if (pulseDown !== null) clearTimeout(pulseDown)
		}
	}, [])

	const subscribe = (subId: number, callback: PulseCallback) => {
		subscribers.current.set(subId, { callback, abort: false })
	}

	const unsubscribe = (subId: number) => {
		const subscriber = subscribers.current.get(subId)
		if (subscriber) subscriber.abort = true
		subscribers.current.delete(subId)
	}

	return { subscribe, unsubscribe }
}
