/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
    serverActions: true,
  },
  images: {
    domains: [
      'cdn.imagin.studio',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
}

module.exports = nextConfig
