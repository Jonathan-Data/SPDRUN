import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    headers: async () => [{
        source: '/(.*)',
        headers: [
            {
                key: 'Content-Security-Policy',
                value: `default-src 'self' firebaseapis.com firebasestorage.googleapis.com;`
            }
        ]
    }]
};

export default nextConfig;
