'use client'

import { usePlayerContext } from './playerContext'

export default function PostThumb({ title }: { title: string }) {
	const { setTitle } = usePlayerContext()
	return (
		<div>
			<h2>{title}</h2>
			<button
				onClick={() => {
					setTitle(title)
				}}
			>
				play
			</button>
		</div>
	)
}
