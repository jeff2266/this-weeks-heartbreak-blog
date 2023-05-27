'use client'

import { usePlayerContext } from './playerContext'
import { useSupabase } from './browserSupabaseProvider'

export default function PostThumb({ title }: { title: string }) {
	const { supabase } = useSupabase()
	const { setTitle } = usePlayerContext()
	return (
		<div>
			<h2>{title}</h2>
			<button
				onClick={() => {
					console.log(JSON.stringify(supabase))
					setTitle(title)
				}}>
				play
			</button>
		</div>
	)
}
