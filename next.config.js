/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  async redirects() {
    return [
      {
        source: '/(boards|tasks)?(/|$)',
        destination: '/myday',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
