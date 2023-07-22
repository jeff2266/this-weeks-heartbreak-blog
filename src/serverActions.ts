'use server'

import { Like } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { prisma } from './db'

export async function handleLike(isLike: boolean, like: Like) {
	if (isLike) {
		await prisma.like.delete({
			where: {
				postId_userId: { ...like }
			}
		})
	} else {
		await prisma.like.create({
			data: { ...like }
		})
	}
	revalidatePath('/posts/[id]')
}
