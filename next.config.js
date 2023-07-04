/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true
	},
	images: {
		domains: ['thisweeksheartbreak.s3.us-west-1.amazonaws.com']
	},
	webpack: config => ({
		...config,
		experiments: {
			...config.experiments,
			topLevelAwait: true
		}
	})
}

module.exports = nextConfig
