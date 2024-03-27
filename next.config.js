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
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config
    }
}

module.exports = withAntdLess(nextConfig)
