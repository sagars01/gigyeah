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
        domains: ['img.clerk.com'],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config
    }
}

module.exports = withAntdLess(nextConfig)
