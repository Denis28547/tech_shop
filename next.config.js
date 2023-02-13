/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "localhost",
      "sell-it.vercel.app",
    ],
  },
};

module.exports = nextConfig;
