export default async function Search({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	return <div>{`${JSON.stringify(searchParams)}`}</div>
}
