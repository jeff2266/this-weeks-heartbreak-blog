'use client'

import { MouseEventHandler, useState } from 'react'

export default function SearchBar() {
	const [isSearchHover, setIsSearchHover] = useState(false)

	const onMouseEnter: MouseEventHandler<HTMLButtonElement> = evt => {
		setIsSearchHover(true)
	}

	const onMouseLeave: MouseEventHandler<HTMLButtonElement> = evt => {
		setIsSearchHover(false)
	}

	const color = isSearchHover ? '#fff' : '#999'

	return (
		<form className="flex justify-end align-middle my-2">
			<input
				name="search"
				className="bg-inherit border-b outline-none cursor-text mx-2"
				placeholder="Search..."></input>
			<button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					viewBox="0,0,256,256"
					height="100%">
					<path
						fill={color}
						stroke={color}
						strokeWidth="0.25"
						strokeLinecap="butt"
						d="M110.933 25.6C63.906 25.6 25.6 63.906 25.6 110.933s38.306 85.334 85.333 85.334c20.45 0 39.231-7.262 53.95-19.317l50.95 50.95a8.534 8.534 0 1 0 12.067-12.067l-50.95-50.95c12.055-14.719 19.317-33.5 19.317-53.95 0-47.027-38.307-85.333-85.334-85.333zm0 17.067c37.804 0 68.267 30.463 68.267 68.266 0 37.804-30.463 68.267-68.267 68.267-37.803 0-68.266-30.463-68.266-68.267 0-37.803 30.463-68.266 68.266-68.266z"
					/>
				</svg>
			</button>
		</form>
	)
}
