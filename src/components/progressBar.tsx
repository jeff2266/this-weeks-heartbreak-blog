import { useRef } from 'react'

export default function ProgressBar({
	className,
	playTime,
	duration,
	seekTo
}: {
	className?: string
	playTime: number
	duration: number
	seekTo: (target: number) => void
}) {
	const progressFull = useRef<HTMLDivElement>(null)

	return (
		<div
			ref={progressFull}
			className={className}
			onClick={e => {
				progressFull.current &&
					playTime &&
					seekTo(((e.clientX - progressFull.current.offsetLeft) / progressFull.current.clientWidth) * duration)
			}}>
			<span
				className="flex relative bg-gray-600"
				style={{
					width: `${playTime && duration > 0 ? (playTime / duration) * 100 : 0}%`,
					height: 'inherit',
					borderRadius: 'inherit'
				}}></span>
		</div>
	)
}
