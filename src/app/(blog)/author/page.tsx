export default function Author() {
	return (
		<main className="flex-col items-center justify-between p-24">
			<h2 className="my-8">Post</h2>
			<form className="min-w-fit">
				<div className="flex my-2 mx-0 md:mx-8">
					<div className="flex flex-col m-6 w-2/5 min-w-fit">
						<div className="flex flex-col my-2">
							<label htmlFor="title">Title</label>
							<input id="title" name="title" className="bg-inherit border-b outline-none cursor-text" />
						</div>
						<div className="flex flex-col my-2">
							<label htmlFor="thumb-file">Image</label>
							<input
								type="file"
								name="thumb-file"
								id="thumb-file"
								className="bg-inherit border-b outline-none cursor-text"
							/>
						</div>
						<div className="flex flex-col my-2">
							<label htmlFor="media-file">Media</label>
							<input
								type="file"
								name="media-file"
								id="media-file"
								className="bg-inherit border-b outline-none cursor-text"
							/>
						</div>
					</div>
					<div className="flex flex-col m-6 w-3/5 min-w-fit">
						<div className="flex flex-col my-2">
							<label htmlFor="content">Content</label>
							<textarea
								id="content"
								name="content"
								className="bg-inherit border outline-none cursor-text resize-none p-2 h-48"
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-end mx-0 md:mx-8">
					<div className="m-6">
						<button>Submit</button>
					</div>
				</div>
			</form>
		</main>
	)
}
