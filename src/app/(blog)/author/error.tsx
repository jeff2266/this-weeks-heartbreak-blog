'use client'

import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<main>
			<h2>Something went wrong!</h2>
			<p>{error.message}</p>
			<div className="flex">
				<Link href="/" className="me-2">
					<div className="bg-white hover:bg-slate-100 text-black hover:text-sky-800 p-2 rounded-sm">Home</div>
				</Link>
				<button className="rounded-sm p-2 bg-white text-black hover:bg-slate-100 hover:text-sky-800" onClick={reset}>
					Back
				</button>
			</div>
		</main>
	)
}
