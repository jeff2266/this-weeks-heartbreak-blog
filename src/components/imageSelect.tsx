'use client'

import { ChangeEventHandler, useState } from 'react'
import Image from 'next/image'
import loading from 'public/img/loading.svg'

type Param = {
	key?: string
	url?: string
}

export default function ImageSelect({ thumbs }: { thumbs: Param[] }) {
	const [imageLoading, setImageLoading] = useState<boolean>(false)
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
			setImageLoading(true)
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
			<div className="flex h-full">
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
				<div className="relative overflow-hidden w-3/5 ms-2 border">
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
			<div className="flex flex-col">
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
