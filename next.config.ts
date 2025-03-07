import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['jotai-devtools'],
  output: "standalone",
};

export default nextConfig;
