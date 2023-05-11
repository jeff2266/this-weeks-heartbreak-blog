import PostThumb from '@/components/postThumb'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	return (
		<main className='flex-col items-center justify-between p-24'>
			<p>main page</p>
			<Link href='/posts'>posts</Link>
			<PostThumb title='fsm-team-racing.mp3' />
			<PostThumb title='untitled_Master.wav' />
		</main>
	)
}
