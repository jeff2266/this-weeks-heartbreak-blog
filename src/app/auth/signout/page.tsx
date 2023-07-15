import ClientSignOut from '@/components/clientSignOut'

export default async function SignOut() {
	return (
		<fieldset className="flex flex-col items-center justify-center w-1/2 h-1/3 bg-black border px-4 pb-8 pt-12">
			<ClientSignOut />
		</fieldset>
	)
}
