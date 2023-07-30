import SearchBar from '@/components/searchBar'
import StaticTitle from '@/components/banner/staticTitle'
import UserSignIn from '@/components/userSignIn'
import HamburgerMenu from '@/components/hamburgerMenu'
import PostsList from '@/components/postsList'

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
			<PostsList type="MAIN" take={POSTS_PER_PAGE} />
			<div className="h-16"></div>
		</>
	)
}
