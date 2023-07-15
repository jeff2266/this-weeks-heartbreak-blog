import ProviderSignIn from '@/components/providerSignIn'
import { getProviders } from 'next-auth/react'

export default async function SignIn() {
	const providers = await getProviders()
	const googleSignIn: string | undefined = (providers?.google && (await import('public/img/googleSignIn.svg')))?.default
		.src

	return (
		<main className="w-screen h-screen flex items-center justify-center bg-gradient-to-t from-white from-[40%] to-transparent to-[42%]">
			<fieldset className="flex flex-col items-center justify-center w-1/2 h-1/3 bg-black border px-4 pb-8 pt-12">
				<legend className="p-1">
					<h2>Sign In</h2>
				</legend>
				{providers?.google && <ProviderSignIn provider={providers.google} image={googleSignIn} />}
			</fieldset>
		</main>
	)
}
