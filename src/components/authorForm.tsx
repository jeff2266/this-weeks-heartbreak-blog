'use client'

import { createContext, useContext, useRef, useState } from 'react'
import { useClientContext } from './clientContext'
import { useSession } from 'next-auth/react'
import ImageSelect from '@/components/imageSelect'
import Link from 'next/link'
import HeartLoader from './heartLoader'

export type FileDescription = {
	key: string
	url: string
}

type Params = {
	thumbs: FileDescription[]
}

type AuthorFormData = {
	// Required
	title: string | null

	// Optional
	content: string | null
	thumbSelect: string | null
	thumbUpload: File | null
	mediaUpload: File | null
}

const defaultAuthorFormContextState: AuthorFormData = {
	title: null,
	content: null,
	thumbSelect: null,
	thumbUpload: null,
	mediaUpload: null
}

const AuthorFormContext = createContext<AuthorFormData>(defaultAuthorFormContextState)

export function useAuthorFormContext() {
	return useContext(AuthorFormContext)
}

export function AuthorForm({ thumbs }: Params) {
	const { data: session } = useSession()
	const { baseUrl } = useClientContext()
	const { current: authorFormContext } = useRef<AuthorFormData>(defaultAuthorFormContextState)
	const [pending, setPending] = useState(false)
	const titleRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLTextAreaElement>(null)
	const mediaRef = useRef<HTMLInputElement>(null)

	async function submit({
		title,
		content,
		thumbSelect,
		thumbUpload,
		mediaUpload,
		authorId
	}: AuthorFormData & { authorId: string }) {
		if (!title) throw new Error('Invalid input...')
		console.log(`${title}, ${content}, ${thumbSelect}, ${thumbUpload}, ${mediaUpload}, ${authorId}`)

		let thumb = thumbSelect
		if (thumbUpload && thumbUpload.size > 0) {
			if (!thumbUpload.type.startsWith('image')) throw new Error('Invalid image file...')
			// Must be smaller than 1 MB
			if (thumbUpload.size > 1048576) throw new Error('Image file too large...')

			try {
				// Get presigned upload url
				let res = await fetch(`${baseUrl}/api/post/presign?key=${encodeURIComponent(thumbUpload.name)}`)
				const url = res.ok ? await res.json() : ''

				// Upload new thumb to storage
				res = await fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': `${thumbUpload.type}`,
						'Content-Length': `${thumbUpload.size}`
					},
					body: thumbUpload.stream()
				})

				// if (res.$metadata.httpStatusCode !== 200)
				// 	throw new Error(`Error when saving image file, status ${res.$metadata.httpStatusCode}`)
			} catch (e) {
				console.log(e)
			}
			thumb = thumbUpload.name
		}

		// let media: string | null = null
		// if (mediaUpload && mediaUpload.size > 0) {
		// 	if (!mediaUpload.type.startsWith('audio/mpeg')) throw new Error('Invalid media file...')
		// 	// Must be smaller than 128 MB
		// 	if (mediaUpload.size > 134217728) throw new Error('Media file too large...')

		// 	const mediaId = `${crypto.randomUUID()}.${mediaUpload.name.split('.').pop()}`

		// 	const res = await new Upload({
		// 		client: s3,
		// 		params: {
		// 			Bucket: process.env.BUCKET_NAME,
		// 			Key: `media/${mediaId}`,
		// 			Body: Buffer.from(await mediaUpload.arrayBuffer()),
		// 			ContentType: mediaUpload.type
		// 		},
		// 		queueSize: 4,
		// 		partSize: 1024 * 1024 * 5
		// 	})
		// 		.on('httpUploadProgress', progress => {
		// 			console.log(progress)
		// 		})
		// 		.done()

		// 	if (res.$metadata.httpStatusCode !== 200)
		// 		throw new Error(`Error when saving media file, status ${res.$metadata.httpStatusCode}`)
		// 	media = mediaId
		// }
	}

	return (
		<AuthorFormContext.Provider value={authorFormContext}>
			<form
				className="min-w-fit"
				onInvalid={() => {
					setPending(false)
				}}
				onSubmit={async evt => {
					evt.preventDefault()
					const authorId = session?.user.userId
					if (!authorId) throw new Error('Invalid session...')
					authorFormContext.title = titleRef.current?.value ?? null
					authorFormContext.content = contentRef.current?.value ?? null
					authorFormContext.mediaUpload = mediaRef.current?.files?.item(0) ?? null
					setPending(true)
					await submit({ ...authorFormContext, authorId })
				}}>
				<div className="flex flex-wrap gap-x-4 justify-between w-full my-2">
					<div className="grow flex flex-col min-w-fit">
						<label htmlFor="title">Title</label>
						<input
							id="title"
							name="title"
							ref={titleRef}
							className="bg-inherit border-b outline-none cursor-text"
							maxLength={50}
							required
						/>
						<div className="flex flex-col h-full min-h-[8rem] my-2">
							<label htmlFor="content">Content</label>
							<textarea
								id="content"
								name="content"
								ref={contentRef}
								className="bg-inherit border outline-none cursor-text resize-none p-2 h-full"
							/>
						</div>
					</div>
					<div className="grow flex flex-col min-w-fit">
						<ImageSelect thumbs={thumbs} />
						<div className="flex flex-col my-2">
							<label htmlFor="media-file">Media</label>
							<input
								type="file"
								name="media-file"
								id="media-file"
								ref={mediaRef}
								accept="audio/mpeg"
								className="bg-inherit border-b"
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-end">
					<Link href="/" className="me-2">
						<div className="bg-white hover:bg-slate-100 text-black hover:text-sky-800 p-2 rounded-sm">Home</div>
					</Link>
					<button
						className={`rounded-sm p-2 ${
							pending
								? 'bg-slate-200 text-slate-600'
								: 'bg-white text-black hover:bg-slate-100 hover:text-sky-800'
						}`}>
						Submit
					</button>
				</div>
			</form>
			<div className="flex w-full">
				<HeartLoader pulseKey={1} />
			</div>
		</AuthorFormContext.Provider>
	)
}
