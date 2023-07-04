import { prisma } from '@/db'
import { s3 } from '@/s3'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import Link from 'next/link'

export default async function Author() {
	const bucketObjects = await s3.send(
		new ListObjectsV2Command({
			Bucket: process.env.BUCKET_NAME
		})
	)

	const bucketThumbs = bucketObjects.Contents?.filter(obj => obj.Key?.match(/thumbs\/.+/))

	async function submit(data: FormData) {
		'use server'
		console.log(data)
	}

	return (
		<main className="flex-col items-center justify-between p-24">
			<h2 className="my-8">Post</h2>
			<form className="min-w-fit" action={submit}>
				<div className="flex my-2 mx-0 md:mx-8">
					<div className="flex flex-col m-6 w-2/5 min-w-fit">
						<div className="flex flex-col my-2">
							<label htmlFor="title">Title</label>
							<input
								id="title"
								name="title"
								className="bg-inherit border-b outline-none cursor-text"
								maxLength={50}
								required
							/>
						</div>
						<div className="flex flex-col my-2">
							<label htmlFor="thumb-file">Image</label>
							<ul className="h-32 max-h-32 p-2 overflow-auto border cursor-default select-none">
								{bucketThumbs
									?.filter(thumb => thumb.Key)
									.map(thumb => (
										<li>
											<input
												id={thumb.Key}
												type="radio"
												name="bucketThumbsSelect"
												className="hidden peer"
											/>
											<label htmlFor={thumb.Key} className="peer-checked:bg-slate-800">
												{thumb.Key}
											</label>
										</li>
									))}
							</ul>
							<input
								type="file"
								name="thumb-file"
								id="thumb-file"
								className="bg-inherit border-b outline-none cursor-text"
							/>
						</div>
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
					<div className="flex flex-col m-6 w-3/5 min-w-fit">
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
