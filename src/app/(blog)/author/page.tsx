import { prisma } from '@/db'
import { s3 } from '@/s3'
import { ListObjectsV2Command, GetObjectCommand, _Object } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import Link from 'next/link'
import ImagePreview from '@/components/imagePreview'

export default async function Author() {
	const bucketObjects = await s3.send(
		new ListObjectsV2Command({
			Bucket: process.env.BUCKET_NAME
		})
	)

	const thumbInfos = bucketObjects.Contents?.filter(obj => obj.Key?.match(/thumbs\/.+/))
	const thumbUrls = thumbInfos?.map(async thumb => ({
		key: thumb.Key,
		url: await getSignedUrl(s3, new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: thumb.Key }), {
			expiresIn: 3600
		})
	}))
	const thumbs = thumbUrls ? await Promise.all(thumbUrls) : []

	async function getThumbPreview(thumb: string) {}

	async function submit(data: FormData) {
		'use server'
		console.log(data)
	}

	return (
		<main className="flex-col items-center justify-between px-4 py-8">
			<h2 className="my-8">Post</h2>
			<form className="min-w-fit" action={submit}>
				<div className="flex my-2 mx-0 lg:mx-8">
					<div className="flex flex-col m-6 w-3/5 min-w-fit">
						<label htmlFor="title">Title</label>
						<input
							id="title"
							name="title"
							className="bg-inherit border-b outline-none cursor-text"
							maxLength={50}
							required
						/>
						<ImagePreview thumbs={thumbs} />
						<input
							type="file"
							name="thumb-file"
							id="thumb-file"
							className="bg-inherit border-b outline-none cursor-text"
						/>
						<div className="flex flex-col my-2">
							<label htmlFor="media-file">Media</label>
							<input
								type="file"
								name="media-file"
								id="media-file"
								className="bg-inherit border-b outline-none cursor-text"
							/>
						</div>
					</div>
					<div className="flex flex-col m-6 w-2/5 min-w-fit">
						<div className="flex flex-col my-2">
							<label htmlFor="content">Content</label>
							<textarea
								id="content"
								name="content"
								className="bg-inherit border outline-none cursor-text resize-none p-2 h-48"
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-end mx-0 md:mx-8">
					<div className="m-6">
						<button className="bg-white hover:bg-slate-200 text-black rounded-sm p-2 mx-2">Submit</button>
						<Link href="/">
							<button type="button" className="bg-white hover:bg-slate-200 text-black p-2 rounded-sm">
								Home
							</button>
						</Link>
					</div>
				</div>
			</form>
		</main>
	)
}
