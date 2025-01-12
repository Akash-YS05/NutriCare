import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['plus.unsplash.com', 'img.freepik.com', 'cdn.dribbble.com'], // Add this domain for Unsplash premium images
  },
};

export default nextConfig;
