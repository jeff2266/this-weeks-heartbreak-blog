import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async function UserSignIn() {
	const session = await getServerSession(authOptions)

	// console.log(session)
	return (
		<div className="flex flex-col items-end relative ms-2 group">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="1.25em"
				viewBox="0 0 448 512"
				className="fill-gray-400 my-8 group-hover:fill-white">
				<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
			</svg>
			<div className="absolute w-max top-16 bg-white text-black px-4 py-2 rounded-sm invisible group-hover:visible">
				<ul>
					{session ? (
						<>
							<Link href="/api/auth/signout" className="flex items-center">
								Sign Out
							</Link>
						</>
					) : (
						<li>
							<Link href="/api/auth/signin" className="flex items-center">
								Sign In
							</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	)
}
