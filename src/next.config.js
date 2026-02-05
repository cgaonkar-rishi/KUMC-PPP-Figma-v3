/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable webpack 5 features
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
