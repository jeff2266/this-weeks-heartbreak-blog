import PostThumb from '@/components/postThumb'
import Link from 'next/link'
import { S3Client, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const s3 = new S3Client({
	region: process.env.AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? ''
	}
})

const listObjectsCommand = new ListObjectsCommand({
	Bucket: process.env.BUCKET_NAME
})
const listObjectsResult = await s3.send(listObjectsCommand)
// console.log(listObjectsResult.Contents)

const getObjectCommand = new GetObjectCommand({
	Bucket: process.env.BUCKET_NAME,
	Key: 'fsm-team-racing.mp3'
})
const getObjectResult = await s3.send(getObjectCommand)
// console.log(getObjectResult)

export default function Home() {
	return (
		<main className="flex-col items-center justify-between p-24">
			<p>main page</p>
			<Link href="/posts">posts</Link>
			<PostThumb title="fsm-team-racing.mp3" />
			<PostThumb title="untitled_Master.wav" />
		</main>
	)
}
