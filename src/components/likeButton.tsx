'use client'

import { handleLike } from '@/serverActions'
import { Like } from '@prisma/client'
import Image from 'next/image'
import heartEmpty from 'public/img/heart-empty.svg'
import heartFilled from 'public/img/heart-filled.svg'
import { useState } from 'react'

export default function LikeButton({ isLike, like }: { isLike: boolean; like: Like }) {
	const [pending, setPending] = useState(false)
	return (
		<button
			className={`w-5 mx-2 ${pending ? 'animate-[smallPing_0.6s_ease-in_alternate_infinite]' : ''}`}
			onClick={async () => {
				setPending(true)
				await handleLike(isLike, like)
				setPending(false)
			}}
			disabled={pending}>
			{isLike ? <Image src={heartFilled} alt="like" /> : <Image src={heartEmpty} alt="like" />}
		</button>
	)
}
