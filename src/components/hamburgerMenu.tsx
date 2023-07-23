'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import hamburger from 'public/img/hamburger.svg'
import { useState } from 'react'

export default function HamburgerMenu() {
	const { data: session } = useSession()
	const [isExpanded, setIsExpanded] = useState(false)
	return (
		<>
			<div className="px-6 md:px-12 lg:hidden">
				<div className={`h-0 relative z-30 w-full`}>
					<div className="bg-black">
						{isExpanded && (
							<ul className="flex flex-col items-center px-4 py-2 list-none">
								{session ? (
									<>
										<li>
											<Link href="/likes">Likes</Link>
										</li>
										{(session.user.role === 'ADMIN' || session.user.role === 'AUTHOR') && (
											<li>
												<Link href="/author">Post</Link>
											</li>
										)}
										<hr className="w-full my-2" />
										<li>
											<Link href="/api/auth/signout">Sign Out</Link>
										</li>
									</>
								) : (
									<li>
										<Link href="/api/auth/signin" className="flex items-center">
											Sign In
										</Link>
									</li>
								)}
							</ul>
						)}
						<span
							className={`flex w-full bg-black border-slate-400 items-center h-5 py-[0.25rem] ${
								isExpanded ? 'border-b-[1px]' : 'border-t-[1px]'
							}`}>
							<button className="relative w-full h-full" onClick={() => setIsExpanded(prev => !prev)}>
								<Image src={hamburger} alt="menu" fill={true} />
							</button>
						</span>
					</div>
				</div>
				<span className="flex w-full border-t-[1px] h-5 py-[0.25rem] invisible">
					<div className="relative w-full h-full" onClick={() => setIsExpanded(prev => !prev)}>
						<Image src={hamburger} alt="menu" fill={true} />
					</div>
				</span>
			</div>
			<div
				className={`w-full h-screen fixed top-0 left-0 filter backdrop-blur-md bg-black/10 lg:hidden z-20 ${
					isExpanded ? 'animate-[fadeIn_0.2s] block' : 'hidden'
				}`}
				onClick={() => setIsExpanded(false)}></div>
		</>
	)
}
