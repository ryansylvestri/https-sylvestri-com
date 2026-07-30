import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.sylvestri.com",
          },
        ],
        destination: "https://sylvestri.com/:path*",
        permanent: true,
      },
      { source: "/story", destination: "/about", permanent: true },
      { source: "/lead-magnets", destination: "/resources", permanent: true },
      {
        source: "/lead-magnets/first-time-buyer-blueprint",
        destination: "/guides/first-time",
        permanent: true,
      },
      {
        source: "/lead-magnets/seller-pricing-guide",
        destination: "/guides/sellers",
        permanent: true,
      },
      {
        source: "/lead-magnets/hudson-valley-investor-playbook",
        destination: "/guides/investors",
        permanent: true,
      },
      {
        source: "/lead-magnets/relocation-guide",
        destination: "/guides/relocation",
        permanent: true,
      },
      {
        source: "/lead-magnets/divorce-home-guide",
        destination: "/resources/divorce",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": [
      "./content/**/*.mdx",
      "./node_modules/next-mdx-remote/**/*",
      "./node_modules/@mdx-js/mdx/**/*",
      "./node_modules/gray-matter/**/*",
      "./node_modules/zod/**/*",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/monkeymaghees",
        destination: "/monkeymaghees/index.html",
      },
    ];
  },
};

export default nextConfig;
