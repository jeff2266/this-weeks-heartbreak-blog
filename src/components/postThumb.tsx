'use client'

import { useSession } from 'next-auth/react'
import { usePlayerContext } from './playerContext'

export default function PostThumb({ title }: { title: string }) {
	const { data: session } = useSession()
	const { setTitle } = usePlayerContext()
	return (
		<div>
			<h2>{title}</h2>
			<button
				onClick={() => {
					console.log(JSON.stringify(session))
					setTitle(title)
				}}
			>
				play
			</button>
		</div>
	)
}
