'use client'

import { ClientSafeProvider, signIn } from 'next-auth/react'
import Image from 'next/image'

export default function ProviderSignIn({ provider, image }: { provider: ClientSafeProvider; image?: string }) {
	return (
		<button
			className="group w-5/6 max-w-md border min-w-max border-slate-400 rounded-md bg-white shadow-[inset_-2px_1px_rgba(8,48,255,0.3)] text-black px-2 py-1 m-2"
			key={provider.id}
			onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
			<div className="flex justify-center p-1">
				<div className="relative w-9 p-4">
					{image && <Image src={image} alt="provider icon" fill={true} style={{ objectFit: 'contain' }} />}
				</div>
				<div className="flex-grow self-center min-w-max group-hover:text-sky-800">{`Sign in with ${provider.name}`}</div>
			</div>
		</button>
	)
}
