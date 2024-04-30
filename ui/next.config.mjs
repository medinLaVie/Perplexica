/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer, dev }) => {
  //   // Enable named chunks and modules for better readability in development
  //   // if (dev) {
  //   config.optimization = {
  //     ...config.optimization,
  //     moduleIds: 'named',
  //     namedChunks: true,
  //     namedModules: true,
  //   };
  //   // }

  //   return config;
  // },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        ignored: /node_modules/,
        aggregateTimeout: 300,  // wait 300ms before recompiling
        poll: 1000, // check every 1s
      };
    }
    return config;
  },
  // webpackDevMiddleware: (config) => {

  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   };
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        hostname: 's2.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
