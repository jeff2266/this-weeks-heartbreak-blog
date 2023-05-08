export default function PlayToggle({
	className,
	playState,
	togglePlay,
	darkTheme
}: {
	className?: string
	playState: boolean | null
	togglePlay: () => void
	darkTheme: boolean
}) {
	const size = 28
	return (
		<button className={className} onClick={togglePlay} disabled={playState === null}>
			{playState === true ? (
				<svg
					width={`${size}px`}
					height={`${size}px`}
					fill={darkTheme ? '#fff' : '#000'}
					viewBox='-6.5 -1 34 34'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>pause</title>
					<path d='M0 6.563v18.875c0 0.531 0.438 0.969 0.969 0.969h6.625c0.5 0 0.906-0.438 0.906-0.969v-18.875c0-0.531-0.406-0.969-0.906-0.969h-6.625c-0.531 0-0.969 0.438-0.969 0.969zM12.281 6.563v18.875c0 0.531 0.438 0.969 0.938 0.969h6.625c0.531 0 0.969-0.438 0.969-0.969v-18.875c0-0.531-0.438-0.969-0.969-0.969h-6.625c-0.5 0-0.938 0.438-0.938 0.969z'></path>
				</svg>
			) : (
				<svg
					width={`${size}px`}
					height={`${size}px`}
					fill={darkTheme ? '#fff' : '#000'}
					viewBox='-7 0 32 32'
					version='1.1'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title>play</title>
					<path d='M0 6.688v18.906c0 0.344 0.156 0.625 0.469 0.813 0.125 0.094 0.344 0.125 0.5 0.125s0.281-0.031 0.438-0.125l16.375-9.438c0.313-0.219 0.5-0.5 0.5-0.844 0-0.313-0.188-0.594-0.5-0.813l-16.375-9.438c-0.563-0.406-1.406 0.094-1.406 0.813z'></path>
				</svg>
			)}
		</button>
	)
}
