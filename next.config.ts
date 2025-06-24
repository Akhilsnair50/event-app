const nextConfig = {
  webpack(config: any) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': __dirname,
    }
    return config
  },
  images: {
    domains: [
      'prizmatix-storage.syd1.cdn.digitaloceanspaces.com',
    ],
  },
}

export default nextConfig
