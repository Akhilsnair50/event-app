const nextConfig = {
  webpack(config: any) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': __dirname,
    }
    return config
  },
}

export default nextConfig
