/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

module.exports = nextConfig
