/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/api/:id',
        destination: '/something',
      },
    ];
  },
};

export default nextConfig;
