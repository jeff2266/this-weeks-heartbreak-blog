import { S3Client } from '@aws-sdk/client-s3'

const globalForS3 = globalThis as unknown as {
	s3: S3Client | undefined
}

export const s3 =
	globalForS3.s3 ??
	new S3Client({
		credentials: {
			accessKeyId: process.env.AWS_USER_KEY ?? '',
			secretAccessKey: process.env.AWS_USER_SECRET ?? ''
		},
		region: process.env.BUCKET_REGION
	})

if (process.env.NODE_ENV !== 'production') globalForS3.s3 = s3
