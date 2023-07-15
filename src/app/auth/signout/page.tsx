import SignOutButton from '@/components/signOutButton'

export default async function SignOut() {
	return (
		<fieldset className="flex flex-col items-center justify-center w-1/2 h-1/3 bg-black border px-4 py-8">
			<h2 className="my-4">Are you sure you want to sign out?</h2>
			<SignOutButton />
		</fieldset>
	)
}
