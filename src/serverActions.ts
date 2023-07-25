'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './db'

export async function handleLike(like: { userId: string; postId: string; isLike: boolean }, callback: string) {
	if (like.isLike) {
		await prisma.like.delete({
			where: {
				postId_userId: { postId: like.postId, userId: like.userId }
			}
		})
	} else {
		await prisma.like.create({
			data: { postId: like.postId, userId: like.userId }
		})
	}
	revalidatePath(callback)
}
