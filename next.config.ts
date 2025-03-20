import type { NextConfig } from 'next';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['jotai-devtools'],
  output: 'standalone',
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new NodePolyfillPlugin());
    }
    return config;
  },
  // headers & Cors
  
  // headers & Cors
};

export default nextConfig;
