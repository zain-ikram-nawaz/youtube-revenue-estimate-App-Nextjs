/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. Slash handling fix karein
    trailingSlash: false,

    // 2. Better crawling — add proper headers for HTML pages
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                // Allow Google to cache the sitemap
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/xml',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=3600',
                    },
                ],
            },
        ];
    },

    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'yt3.googleusercontent.com' },
            { protocol: 'https', hostname: 'yt3.ggpht.com' },
            { protocol: 'https', hostname: 'channelincome.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
        ],
    },
    async redirects() {
        return [
            // Component pages ko homepage pe permanent redirect karein (301)
            {
                source: '/components/:path*',
                destination: '/',
                permanent: true,
            },
            // ── Keyword URL variants → canonical tool page ──
            {
                source: '/youtube-revenue-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-cpm-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/cpm-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-rpm-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-earnings-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-income-estimator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-money-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-earnings-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            {
                source: '/youtube-channel-earnings-calculator',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            },
            // Pattern based redirects
            {
                source: '/youtube-guides/:slug*',
                destination: '/guide/:slug*',
                permanent: true,
            },
            // ── Deleted guide posts (still indexed by Google) → tool page ──
            {
                source: '/guide/how-to-start-a-youtube-channel-step-by-step-beginners-guide',
                destination: '/tool/youtube-revenue-calculator',
                permanent: true,
            }
        ];
    },
};

export default nextConfig;
