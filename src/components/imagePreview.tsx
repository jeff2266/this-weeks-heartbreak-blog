'use client'

import Image from 'next/image'
import { useState } from 'react'

type Param = {
	key?: string
	url?: string
}

export default function ImagePreview({ thumbs }: { thumbs: Param[] }) {
	const [thumbsSelect, setThumbsSelect] = useState<(Param & { isSelected: boolean })[]>(
		thumbs.map(thumb => ({ ...thumb, isSelected: false }))
	)

	function selectThumb(key: string) {
		const newThumbsSelect = thumbsSelect.map(thumb => ({ ...thumb, isSelected: false }))
		const selectedThumb = newThumbsSelect.find(thumb => thumb.key === key)
		if (selectedThumb) {
			selectedThumb.isSelected = true
			setThumbsSelect(newThumbsSelect)
		}
	}

	const previewImage = thumbsSelect.find(thumb => thumb.isSelected)?.url

	return (
		<>
			<label htmlFor="thumb-file">Image</label>
			<div className="flex">
				<ul className="w-2/5 h-32 max-h-32 p-2 me-2 overflow-auto border cursor-default select-none">
					{thumbs
						.filter(thumb => thumb.key)
						.map(thumb => (
							<li onClick={() => thumb.key && selectThumb(thumb.key)}>
								<input id={thumb.key} type="radio" name="bucketThumbsSelect" className="hidden peer" />
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
						/>
					) : (
						<p className="italic">Preview</p>
					)}
				</div>
			</div>
		</>
	)
}
