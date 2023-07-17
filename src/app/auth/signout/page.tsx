import SignOutButton from '@/components/signOutButton'

export default async function SignOut() {
	return (
		<fieldset className="flex flex-col items-center justify-center w-2/3 md:w-1/2 h-1/3 bg-black border px-4 py-8">
			<legend className="p-1 text-center">
				<h2>Sign Out</h2>
			</legend>
			<p className="text-[1em] md:text-xl my-4 text-center">Are you sure you want to sign out?</p>
			<SignOutButton />
		</fieldset>
	)
}
