'use client'

import { MouseEventHandler, useState } from 'react'

export default function UserSignIn() {
	const [isHover, setIsHover] = useState(false)

	const onMouseEnter: MouseEventHandler<HTMLButtonElement> = evt => {
		setIsHover(true)
	}

	const onMouseLeave: MouseEventHandler<HTMLButtonElement> = evt => {
		setIsHover(false)
	}

	const color = isHover ? '#fff' : '#999'

	return (
		<button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
				<path
					fill={color}
					d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
				/>
			</svg>
		</button>
	)
}
