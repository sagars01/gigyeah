/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');
const nextConfig = {
    compiler: {

    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'withjessi.com',
                pathname: '**',
            },
        ],
    },
    env: {
        metadataBase: 'https://www.withjessi.com'
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    },
}

module.exports = withAntdLess(nextConfig)
