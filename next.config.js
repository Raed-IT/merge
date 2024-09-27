/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ms.itmd-b1.com:4571',
        pathname: '/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: { removeViewBox: false },
              },
            },
          ],
        },
        titleProp: true,
      },
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/apps',
      },
      {
        source: '/apps/:appId',
        destination: '/apps',
      },
      {
        source: '/apps/:appId/modules',
        destination: '/apps',
      },
    ];
  },
};

module.exports = nextConfig;