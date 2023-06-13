import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from 'react'

export default function Volume({
	className,
	volume,
	setVolume
}: {
	className?: string
	volume: { value: number; mute: boolean }
	setVolume: Dispatch<SetStateAction<{ value: number; mute: boolean }>>
}) {
	const [showSlider, setShowSlider] = useState(false)
	const [settingVolume, setSettingVolume] = useState(false)
	const sliderFull = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!settingVolume) return
		document.addEventListener('mouseup', onMouseUp)
		document.addEventListener('mousemove', onMouseMove)
		return () => {
			document.removeEventListener('mouseup', onMouseUp)
			document.removeEventListener('mousemove', onMouseMove)
		}
	}, [settingVolume])

	const onMouseUp = (e: MouseEvent) => {
		if (!settingVolume) return
		if (!volume.mute) setVolume(prev => ({ value: calcSliderValue(e.clientY), mute: prev.value === 0 }))
		setSettingVolume(false)
		const inSlider = sliderFull.current && e.target instanceof Node && sliderFull.current.contains(e.target)
		if (!inSlider) setShowSlider(false)
	}

	const onMouseMove = (e: MouseEvent) => {
		if (!settingVolume) return
		if (!volume.mute) setVolume(prev => ({ value: calcSliderValue(e.clientY), mute: prev.value === 0 }))
	}

	const calcSliderValue = (y: number) => {
		if (!sliderFull.current) return 1
		const sliderFullHeight = sliderFull.current.clientHeight
		const sliderAbsTop = sliderFull.current.getBoundingClientRect().top
		if (!(sliderFullHeight > 0)) return 1
		const val = 1 - (y - sliderAbsTop) / sliderFullHeight
		const roundedVal = Math.round((val + Number.EPSILON) * 100) / 100
		return roundedVal > 1 ? 1 : roundedVal < 0 ? 0 : roundedVal
	}

	return (
		<div
			className="flex"
			onMouseOver={() => {
				setShowSlider(true)
			}}
			onMouseOut={() => {
				if (!settingVolume) setShowSlider(false)
			}}>
			<div className={`${showSlider ? '' : 'hidden'} absolute bottom-8 px-2.5 pb-3 h-16 z-10`}>
				<div
					ref={sliderFull}
					className="w-2 h-full flex flex-col-reverse bg-gray-200 rounded cursor-pointer"
					onMouseDown={e => {
						setSettingVolume(true)
						setVolume({ value: calcSliderValue(e.clientY), mute: false })
					}}>
					<div
						className="flex relative bg-gray-600"
						style={{
							height: `${volume.mute ? '0' : volume.value * 100}%`,
							width: 'inherit',
							borderRadius: 'inherit'
						}}></div>
				</div>
			</div>
			<button
				className={className}
				onClick={() => {
					volume.mute
						? setVolume(prev => ({ value: prev.value > 0 ? prev.value : 0.1, mute: false }))
						: setVolume(prev => ({ ...prev, mute: true }))
				}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					version="1.0"
					width="28"
					height="28"
					viewBox="0 0 75 75"
					stroke="#fff"
					strokeWidth="5">
					<path d="m39,14-17,15H6V48H22l17,15z" fill="#fff" strokeLinejoin="round" />
					{volume.value === 0 || volume.mute ? (
						<path d="m49,26 20,24m0-24-20,24" fill="none" strokeLinecap="round" />
					) : (
						<path d="M50,27.6a19.5,19.5 0 0 1 0,21.4M59.1,20.5a30,30 0 0 1 0,35.6" strokeLinecap="round" />
					)}
				</svg>
			</button>
		</div>
	)
}
