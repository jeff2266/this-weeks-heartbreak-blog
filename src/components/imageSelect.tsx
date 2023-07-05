'use client'

import Image from 'next/image'
import { ChangeEventHandler, useState } from 'react'

type Param = {
	key?: string
	url?: string
}

export default function ImageSelect({ thumbs }: { thumbs: Param[] }) {
	const [thumbsSelect, setThumbsSelect] = useState<(Param & { isSelected: boolean })[]>(
		thumbs.map(thumb => ({ ...thumb, isSelected: false }))
	)
	const [thumbUpload, setThumbUpload] = useState<Param | null>(null)

	const selectThumb = (key: string) => {
		const newThumbsSelect = thumbsSelect.map(thumb => ({ ...thumb, isSelected: false }))
		const selectedThumb = newThumbsSelect.find(thumb => thumb.key === key)
		if (selectedThumb) {
			selectedThumb.isSelected = true
			setThumbsSelect(newThumbsSelect)
		}
	}

	const onThumbUpload: ChangeEventHandler<HTMLInputElement> = evt => {
		const files = evt.target.files
		if (files && files.length > 0) setThumbUpload({ key: files[0].name, url: URL.createObjectURL(files[0]) })
		else setThumbUpload(null)
	}

	const previewImage = thumbUpload?.url ?? thumbsSelect.find(thumb => thumb.isSelected)?.url

	return (
		<>
			<label htmlFor="thumb-select">Image</label>
			<div className="flex">
				<ul className="w-2/5 h-32 max-h-32 p-2 me-2 overflow-auto border cursor-default select-none">
					{thumbs
						.filter(thumb => thumb.key)
						.map(thumb => (
							<li key={thumb.key} onClick={() => thumb.key && selectThumb(thumb.key)}>
								<input
									id={thumb.key}
									type="radio"
									name="thumb-select"
									value={thumb.key}
									className="hidden peer"
								/>
								<label htmlFor={thumb.key} className="peer-checked:bg-slate-800">
									{thumb.key}
								</label>
							</li>
						))}
				</ul>
				<div className="relative flex items-center justify-center overflow-hidden w-3/5 max-w ms-2 border">
					{previewImage ? (
						<Image
							className="max-h-full max-w-full"
							alt="preview"
							src={previewImage}
							fill={true}
							style={{
								objectFit: 'cover'
							}}
							sizes="100vw"
						/>
					) : (
						<p className="italic">Preview</p>
					)}
				</div>
			</div>
			<input
				type="file"
				name="thumb-file"
				id="thumb-file"
				accept="image/png, image/jpeg"
				className="bg-inherit border-b"
				onChange={onThumbUpload}
			/>
			{thumbUpload && thumbUpload.key && thumbsSelect.find(thumb => thumb.key === thumbUpload.key) && (
				<span className="text-xs italic text-right text-amber-400">{`File ${thumbUpload.key} already exists, will be overwritten...`}</span>
			)}
		</>
	)
}
