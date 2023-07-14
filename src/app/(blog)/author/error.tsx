'use client'

import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<main>
			<h2>Something went wrong!</h2>
			<p>{error.message}</p>
			<div className="flex">
				<Link href="/">Home</Link>
				<button onClick={reset}>Back</button>
			</div>
		</main>
	)
}
