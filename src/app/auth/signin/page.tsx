import ProviderSignInButton from '@/components/providerSignInButton'
import { getProviders } from 'next-auth/react'

export default async function SignIn() {
	const providers = await getProviders()
	const googleSignIn: string | undefined = (providers?.google && (await import('public/img/googleSignIn.svg')))?.default
		.src

	return (
		<fieldset className="flex flex-col items-center justify-center w-1/2 h-1/3 bg-black border px-4 pb-8 pt-12">
			<legend className="p-1 text-center">
				<h2>Sign In</h2>
			</legend>
			{providers?.google && <ProviderSignInButton provider={providers.google} image={googleSignIn} />}
		</fieldset>
	)
}
