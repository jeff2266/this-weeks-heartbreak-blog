import { StaticImageData } from 'next/image'
import PostThumbImage from './postThumbImage'
import Link from 'next/link'

type Params = {
	id: number
	title: string
	date: Date
	authorName?: string
	thumbUrl?: string | StaticImageData
	mediaUrl?: string
}

export default function PostThumb({ post: { id, title, authorName, date, thumbUrl, mediaUrl } }: { post: Params }) {
	return (
		<div className="w-full md:w-1/2 lg:1/3 xl:w-3/12 p-2">
			<div className="border-[1px] rounded-sm p-2">
				<div className="flex flex-col">
					<PostThumbImage post={{ id, title, thumbUrl, mediaUrl }} responsive={true} />
					<Link href={`posts/${id}`} className="mt-1">
						<h3>{title}</h3>
						<div className="flex justify-between text-sm">
							<p>{authorName}</p>
							<p>{new Date(date).toLocaleDateString('en-US', { dateStyle: 'short' })}</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
