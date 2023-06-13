import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/schema'
import PostThumb from '@/components/postThumb'
import SearchBar from '@/components/searchBar'
import Banner from '@/components/banner/banner'

const SIGNED_URL_EXPR = 60 * 60 * 2

type QueryReturn = (Database['public']['Tables']['posts']['Row'] & { user_data: { display_name: string } })[]

export default async function Home() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: posts } = await supabase.from('posts').select(`*, user_data(display_name)`).returns<QueryReturn>()
	const { data: signedAudioUrls } = await supabase.storage
		.from('audio')
		.createSignedUrls(posts?.map(post => post.audio ?? '') ?? [], SIGNED_URL_EXPR)
	const { data: signedImageUrls } = await supabase.storage
		.from('images')
		.createSignedUrls(posts?.map(post => `thumbs/${post.image}` ?? '') ?? [], SIGNED_URL_EXPR)

	const signedPosts = posts?.map((post, i) => {
		return {
			...post,
			audioUrl: signedAudioUrls ? (signedAudioUrls[i].error === null ? signedAudioUrls[i].signedUrl : null) : null,
			imageUrl: signedImageUrls ? (signedImageUrls[i].error === null ? signedImageUrls[i].signedUrl : null) : null
		}
	})

	return (
		<main className={`flex-col items-center p-16`}>
			<Banner />
			<div className="flex justify-end align-bottom">
				<SearchBar />
			</div>
			<div className="flex flex-wrap justify-start -m-2">
				{signedPosts?.map(post => (
					<PostThumb
						key={post.id}
						params={{
							...post,
							author: post.user_data.display_name
						}}
					/>
				))}
			</div>
			<div className="h-16"></div>
		</main>
	)
}
