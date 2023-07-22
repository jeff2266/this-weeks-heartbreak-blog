import { StaticImageData } from 'next/image'
import PostThumbImage from './postThumbImage'

type Params = {
	id: string
	title: string
	date: Date
	authorName?: string
	thumbUrl?: string | StaticImageData
	mediaUrl?: string
}

export default function PostThumb({ post: { id, title, authorName, date, thumbUrl, mediaUrl } }: { post: Params }) {
	return (
		<div className="w-full md:w-1/2 lg:1/3 xl:w-3/12 p-2">
			<div className="border-2 rounded-sm p-2">
				<div className="flex flex-col">
					<PostThumbImage params={{ id, title, thumbUrl, mediaUrl }} />
					<a href={`posts/${id}`}>
						<h3>{title}</h3>
						<div className="flex justify-between text-sm">
							<p>{authorName}</p>
							<p>{new Date(date).toLocaleDateString('en-US', { dateStyle: 'short' })}</p>
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
