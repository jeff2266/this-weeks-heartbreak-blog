import { useEffect, useState } from 'react'

export default function Cursor({ period, blink }: { period: number; blink: boolean }) {
	const [isShowing, setIsShowing] = useState(false)
	useEffect(() => {
		const timer = setInterval(() => setIsShowing(prev => !prev), period)
		return () => clearInterval(timer)
	})
	return !blink ? <>_</> : isShowing ? <>_</> : <></>
}
