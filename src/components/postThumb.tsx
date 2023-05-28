'use client'

import { useEffect, useState } from 'react'
import { usePlayerContext } from './playerContext'
import { Database } from '@/lib/schema'
import { useBrowserSupabase } from './browserSupabaseProvider'

type Post = Database['public']['Tables']['posts']['Row']

export default function PostThumb({ post }: { post: Post }) {
	const { supabase } = useBrowserSupabase()
	const { setTrack } = usePlayerContext()
	const [url, setUrl] = useState<string | null>(null)
	const [playing, setPlaying] = useState<boolean>(false)

	useEffect(() => {
		console.log(post.audio)
		if (playing && url) setTrack({ title: post.title, url: url })
	}, [playing, url])

	const play = () => {
		setPlaying(true)
		supabase.storage
			.from('audio')
			.createSignedUrl(post.audio, 60 * 60 * 2)
			.then(res => setUrl(res.data?.signedUrl ?? null))
	}

	const pause = () => {}

	return (
		<div className="w-full md:w-4/12 lg:3/12 xl:w-2/12 border-2 rounded-sm p-2">
			<h2>{post.title}</h2>
			{playing ? url ? <p>playing</p> : <p>...</p> : <button onClick={play}>play</button>}
		</div>
	)
}
