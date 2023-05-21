/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => ({
    ...config,
    experiments: {
      ...config.experiments, topLevelAwait: true
    }
  })
}

module.exports = nextConfig
