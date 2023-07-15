'use client'

import { signOut } from 'next-auth/react'

export default function ClientSignOut() {
	return (
		<button
			className="group w-5/6 max-w-md border min-w-max border-slate-400 rounded-md bg-white shadow-[inset_-2px_1px_rgba(8,48,255,0.3)] text-black px-2 py-1 m-2"
			onClick={() =>
				signOut({
					callbackUrl: '/'
				})
			}>
			<div className="flex justify-center p-1">
				<div className="flex-grow self-center min-w-max group-hover:text-sky-800">Sign Out</div>
			</div>
		</button>
	)
}
