import styles from './progressBarStyles.module.css'
import { DetailedHTMLProps, HTMLAttributes, useRef } from 'react'

export type PlayTime = { currentTime: number; duration: number } | null

export default function ProgressBar({
	className,
	playTime,
	seekTo
}: {
	className?: string
	playTime: PlayTime
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
					seekTo(((e.clientX - progressFull.current.offsetLeft) / progressFull.current.clientWidth) * playTime.duration)
			}}
		>
			<span
				className={styles.progressCurrent}
				style={{ width: `${playTime ? (playTime.currentTime / playTime.duration) * 100 : 0}%` }}
			></span>
		</div>
	)
}
