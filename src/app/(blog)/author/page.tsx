import { s3 } from '@/s3'
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AuthorForm, FileDescription } from '@/components/authorForm'

export default async function Author() {
	const bucketObjects = await s3.send(
		new ListObjectsV2Command({
			Bucket: process.env.BUCKET_NAME
		})
	)

	const thumbInfos = bucketObjects.Contents?.filter(obj => obj.Key?.match(/thumbs\/.+/))
	const thumbUrls = thumbInfos
		?.filter(thumb => thumb.Key)
		.map(async thumb => ({
			key: thumb.Key?.split('/').at(1),
			url: await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: thumb.Key }), {
				expiresIn: 3600
			})
		}))
	const thumbs = thumbUrls
		? ((await Promise.all(thumbUrls)).filter(thumb => thumb.key !== undefined) as FileDescription[])
		: []

	return (
		<>
			<h2 className="mt-12 mb-2">Post</h2>
			<AuthorForm thumbs={thumbs} />
			<div className="h-16"></div>
		</>
	)
}
