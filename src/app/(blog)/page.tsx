import { s3 } from '@/s3'
import { prisma } from '@/db'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import SearchBar from '@/components/searchBar'
import StaticTitle from '@/components/banner/staticTitle'
import UserSignIn from '@/components/userSignIn'
import HamburgerMenu from '@/components/hamburgerMenu'
import MainPostsList from '@/components/mainPostsList'

const POSTS_PER_PAGE = 8

export default async function Home() {
	return (
		<>
			<div className="flex justify-center lg:justify-between">
				<StaticTitle animate={true} />
				<nav className="hidden lg:flex items-center justify-end">
					<SearchBar />
					<UserSignIn />
				</nav>
			</div>
			<HamburgerMenu />
			<MainPostsList take={POSTS_PER_PAGE} />
			<div className="h-16"></div>
		</>
	)
}
