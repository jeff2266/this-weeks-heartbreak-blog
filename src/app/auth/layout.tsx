export const metadata = {
	icons: '/img/favicon.ico'
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gradient-to-t from-white from-[40%] to-transparent to-[42%]">
			{children}
		</div>
	)
}
