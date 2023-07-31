import { s3 } from '@/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextRequest, NextResponse } from 'next/server'
import { URL } from 'url'

// Get presigned upload url
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const key = searchParams.get('key')
	if (key === null) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
	const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key }), {
		expiresIn: 3600
	})
	return NextResponse.json(url)
}
