'use server'

import { Like } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { prisma } from './db'

export async function handleLike({ postId, userId }: Like, like: boolean) {
	if (like) {
		await prisma.like.delete({
			where: {
				postId_userId: { postId, userId }
			}
		})
	} else {
		await prisma.like.create({
			data: { postId, userId }
		})
	}
	revalidatePath('/posts/[id]')
}
