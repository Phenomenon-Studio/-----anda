/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    devIndicators: {
        buildActivity: false,
    },
    images: {
        domains: [process.env.APP_ASSETS_HOSTNAME],
    },
    eslint: {
        dirs: ['src'],
    },
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US',
        localeDetection: false,
    },
};

module.exports = nextConfig;
