'use client'

import { FC, useState } from 'react'

const Player: FC = () => {
	const [show, setShow] = useState<boolean>(false)
	const headerDisplay = show ? 'legend-header-expanded' : 'legend-header-collapsed'
	const bodyDisplay = show ? 'legend-body-expanded' : 'legend-body-collapsed'
	const arrow = show ? '⏷' : '⏶'

	return (
		<div className='legend' onClick={() => setShow(prev => !prev)}>
			<div className={`legend-header bg-light ${headerDisplay}`}>
				<p className='my-0'>{`Legend ${arrow}`}</p>
			</div>

			<div className={`legend-body bg-light ${bodyDisplay}`}>
				<div className='d-flex justify-content-center'>
					<div className='d-flex me-4'>
						<div className='me-2 legend-green'>■</div>
						<div>Normal</div>
					</div>
					<div className='d-flex me-4'>
						<div className='me-2 legend-grey'>■</div>
						<div>Offline</div>
					</div>
					<div className='d-flex me-4'>
						<div className='me-2 legend-yellow'>■</div>
						<div>Warning</div>
					</div>
					<div className='d-flex me-4'>
						<div className='me-2 legend-orange'>■</div>
						<div>Error</div>
					</div>
					<div className='d-flex me-4'>
						<div className='me-2 legend-red'>■</div>
						<div>Alarm</div>
					</div>
				</div>

				<div className='d-flex justify-content-center'>
					<div className='d-flex me-4'>
						<div className='me-2 '>⊗</div>
						<div>Locked closed</div>
					</div>
					<div className='d-flex me-4'>
						<div className='me-2'>◯</div>
						<div>Locked open</div>
					</div>
					<div className='d-flex me-4'>
						<div className='me-2'>▲</div>
						<div>Entry direction</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Player
