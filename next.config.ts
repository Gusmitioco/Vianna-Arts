import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/goblin',
        permanent: false,
      },
      {
        source: '/admin/login',
        destination: '/goblin/login',
        permanent: false,
      },
      {
        source: '/novidades',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
