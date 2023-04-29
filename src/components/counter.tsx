'use client'

import { usePlayerContext } from './playerContext'

export default function Counter({ parent }: { parent: string }) {
	const { count, setCount } = usePlayerContext()

	const incrementHandler = () => {
		setCount(count + 1)
	}

	return (
		<div className='border p-2'>
			<div>
				<h4>{`Counter from ${parent}:`}</h4>
				<p>{count}</p>
			</div>
			<button onClick={incrementHandler}>Increment</button>
		</div>
	)
}
