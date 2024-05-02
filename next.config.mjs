/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
  },
  transpilePackages: ["@mui/x-charts"],
};

export default nextConfig;
