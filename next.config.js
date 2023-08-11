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
	}),
	async headers() {
		const url = process.env.PUBLIC_URL && process.env.PUBLIC_URL ? process.env.PUBLIC_URL : 'http://localhost:3000'
		return [{
			source: '/api/:path*',
			headers: [
				{ key: 'Access-Control-Allow-Credentials', value: 'true' },
				{ key: 'Access-Control-Allow-Origin', value: `${url}*` },
				{ key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
				{ key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' }
			]
		}]
	}
}

module.exports = nextConfig
