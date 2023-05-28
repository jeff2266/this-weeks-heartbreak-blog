import PostThumb from '@/components/postThumb'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { Inter } from 'next/font/google'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/schema'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session }
	} = await supabase.auth.getSession()

	let { data } = await supabase.from('posts').select()

	return (
		<main className={`flex-col items-center justify-between p-24 box-border ${inter.className}`}>
			<p>main page</p>
			<Link href="/posts">posts</Link>
			<div className="flex flex-wrap">
				{data?.map(post => (
					<PostThumb post={post} />
				))}
			</div>
		</main>
	)
}
