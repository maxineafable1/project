import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'goship-girls.s3.ap-southeast-1.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ]
  }
};

export default nextConfig;
