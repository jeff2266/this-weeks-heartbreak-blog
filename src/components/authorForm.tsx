'use client'

import { startTransition, useState } from 'react'
import Link from 'next/link'
import ImageSelect from '@/components/imageSelect'

type Params = {
	thumbs: {
		key?: string
		url: string
	}[]
	submit: (data: FormData) => {}
}

export default function AuthorForm({ params: { thumbs, submit } }: { params: Params }) {
	const [pending, setPending] = useState(false)
	return (
		<>
			<form
				className="min-w-fit"
				action={submit}
				onInvalid={() => {
					setPending(false)
				}}>
				<div className="flex flex-wrap gap-x-4 justify-between w-full my-2">
					<div className="grow flex flex-col min-w-fit">
						<label htmlFor="title">Title</label>
						<input
							id="title"
							name="title"
							className="bg-inherit border-b outline-none cursor-text"
							maxLength={50}
							required
						/>
						<div className="flex flex-col h-full min-h-[8rem] my-2">
							<label htmlFor="content">Content</label>
							<textarea
								id="content"
								name="content"
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
						}`}
						onClick={() => {
							setPending(true)
						}}>
						Submit
					</button>
				</div>
			</form>
		</>
	)
}
