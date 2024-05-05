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
        domains: ['img.clerk.com', 'withjessi.com']
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
