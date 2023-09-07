'use client'

import { ChangeEventHandler, useState } from 'react'
import { FileDescription, useAuthorFormContext } from './authorForm'
import Image from 'next/image'
import loading from 'public/img/loading.svg'

export default function ImageSelect({ thumbs }: { thumbs: FileDescription[] }) {
	const authorFormContext = useAuthorFormContext()
	const [imageLoading, setImageLoading] = useState<boolean>(false)
	const [thumbsSelect, setThumbsSelect] = useState<(FileDescription & { isSelected: boolean })[]>(
		thumbs.map(thumb => ({ ...thumb, isSelected: false }))
	)
	const [thumbUpload, setThumbUpload] = useState<FileDescription | null>(null)

	const selectThumb = (key: string) => {
		const newThumbsSelect = thumbsSelect.map(thumb => ({ ...thumb, isSelected: false }))
		const selectedThumb = newThumbsSelect.find(thumb => thumb.key === key)
		if (selectedThumb) {
			selectedThumb.isSelected = true
			authorFormContext.thumbSelect = selectedThumb.key
			setThumbsSelect(newThumbsSelect)
			setImageLoading(true)
		}
	}

	const onThumbUpload: ChangeEventHandler<HTMLInputElement> = evt => {
		const files = evt.target.files
		if (files && files.length > 0) {
			const thumbUpload = files[0]
			authorFormContext.thumbUpload = thumbUpload
			setThumbUpload({ key: thumbUpload.name, url: URL.createObjectURL(files[0]) })
		} else {
			authorFormContext.thumbUpload = null
			setThumbUpload(null)
		}
	}

	const previewImage = thumbUpload?.url ?? thumbsSelect.find(thumb => thumb.isSelected)?.url

	return (
		<>
			<label className="font-semibold" htmlFor="thumb-select">
				Image
			</label>
			<div className="flex gap-2 h-full">
				<ul className="w-2/5 p-2 me-2 overflow-auto border cursor-default select-none">
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
				<div className="flex relative overflow-hidden w-3/5 border">
					{previewImage ? (
						<div className="relative w-full pb-[55%]">
							<Image
								alt="preview"
								src={previewImage}
								fill={true}
								style={{ objectFit: 'cover' }}
								sizes="100vw"
								onLoad={() => setImageLoading(false)}
							/>
							{imageLoading && (
								<div className="w-full h-full flex justify-center align-middle absolute filter backdrop-blur-md bg-black/10 opacity-95 z-10">
									<div className="w-1/4 relative">
										<Image alt="" src={loading} fill={true} sizes="100vw" />
									</div>
								</div>
							)}
						</div>
					) : (
						<div className="relative w-full pb-[55%]">
							<p className="absolute italic">Preview</p>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col mt-2">
				<input
					type="file"
					name="thumb-file"
					id="thumb-file"
					accept="image/png, image/jpeg"
					className="bg-inherit border-b"
					onChange={onThumbUpload}
				/>
			</div>
			{thumbUpload && thumbUpload.key && thumbsSelect.find(thumb => thumb.key === thumbUpload.key) && (
				<span className="text-xs italic text-right text-amber-400">{`File ${thumbUpload.key} already exists, will be overwritten...`}</span>
			)}
		</>
	)
}
