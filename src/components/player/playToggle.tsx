import Image from 'next/image'
import pause from 'public/img/pause.svg'
import play from 'public/img/play.svg'

export default function PlayToggle({
	className,
	playState,
	togglePlay
}: {
	className?: string
	playState: boolean | null
	togglePlay: () => void
}) {
	const size = 28
	return (
		<button className={className} onClick={togglePlay} disabled={playState === null}>
			{playState === true ? (
				<Image src={pause} alt="pause" width={size} height={size} />
			) : (
				<Image src={play} alt="play" width={size} height={size} />
			)}
		</button>
	)
}
