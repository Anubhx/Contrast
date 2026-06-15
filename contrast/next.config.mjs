/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['playwright', 'playwright-core', '@axe-core/playwright', 'axe-core']
  }
};

export default nextConfig;
