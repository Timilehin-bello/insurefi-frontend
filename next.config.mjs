/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  env: {
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
};

export default nextConfig;
