import styles from './progressBarStyles.module.css'
import { useRef } from 'react'

export type PlayTime = { currentTime: number; duration: number } | null

export default function ProgressBar({ playTime, seekTo }: { playTime: PlayTime; seekTo: (target: number) => void }) {
	const progressFull = useRef<HTMLInputElement>(null)
	const progPercent = playTime ? (playTime.currentTime / playTime.duration) * 100 : 0

	return (
		<div
			ref={progressFull}
			className={styles.progressFull}
			onClick={e => {
				progressFull.current &&
					playTime &&
					seekTo(((e.clientX - progressFull.current.offsetLeft) / progressFull.current.clientWidth) * playTime.duration)
			}}
			onTouchEnd={e => {
				progressFull.current &&
					playTime &&
					seekTo(
						((e.touches[0].clientX - progressFull.current.offsetLeft) / progressFull.current.clientWidth) *
							playTime.duration
					)
			}}
		>
			<span className={styles.progressCurrent} style={{ width: `${progPercent}%` }}></span>
		</div>
	)
}
