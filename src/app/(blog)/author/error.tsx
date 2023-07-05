'use client'

import Link from 'next/link'

export default function Error({ error }: { error: Error; reset: () => void }) {
	return (
		<html>
			<body>
				<h2>Something went wrong!</h2>
				<p>{error.message}</p>
				<Link href="/">Home</Link>
			</body>
		</html>
	)
}
