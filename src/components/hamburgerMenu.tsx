'use client'

import Image from 'next/image'
import hamburger from 'public/img/hamburger.svg'
import { useState } from 'react'

export default function HamburgerMenu() {
	const [isExpanded, setIsExpanded] = useState(true)
	return (
		<div className="lg:hidde">
			<div className={`h-0 relative z-20 w-full`}>
				<div className="bg-black">
					{isExpanded && (
						<div className="flex bg-black px-4 py-2">
							<ul>
								<li>lorem</li>
								<li>lorem</li>
								<li>lorem</li>
								<li>lorem</li>
								<li>lorem</li>
							</ul>
						</div>
					)}
					<span
						className={`${
							isExpanded ? 'border-b-[1px]' : 'border-t-[1px]'
						} flex w-full bg-black border-slate-400 items-center h-5 py-[0.25rem]`}>
						<div className="relative w-full h-full" onClick={() => setIsExpanded(prev => !prev)}>
							<Image src={hamburger} alt="menu" fill={true} />
						</div>
					</span>
				</div>
			</div>
			<span className="flex w-full border-t-[1px] h-5 py-[0.25rem] invisible">
				<div className="relative w-full h-full" onClick={() => setIsExpanded(prev => !prev)}>
					<Image src={hamburger} alt="menu" fill={true} />
				</div>
			</span>
		</div>
	)
}
