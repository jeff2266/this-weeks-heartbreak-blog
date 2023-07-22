'use client'

import { handleLike } from '@/serverActions'
import { Like } from '@prisma/client'
import Image from 'next/image'
import heartEmpty from 'public/img/heart-empty.svg'
import heartFilled from 'public/img/heart-filled.svg'

export default function LikeButton({ isLike, like }: { isLike: boolean; like: Like }) {
	return (
		<button className="w-5 mx-2" onClick={async () => await handleLike(isLike, like)}>
			{isLike ? <Image src={heartFilled} alt="like" /> : <Image src={heartEmpty} alt="like" />}
		</button>
	)
}
