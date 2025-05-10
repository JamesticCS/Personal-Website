/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'standalone', // Change from 'export' to 'standalone' for Vercel deployment
  images: {
    unoptimized: true,
    domains: ['localhost', 'jesse-hines.com'], // Add domains for image optimization
  },
  trailingSlash: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable for improved compatibility with Vercel
    serverComponentsExternalPackages: ['sharp']
  }
};

export default config;

