/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: process.env.ALLOWED_IMAGE_HOST
      ? process.env.ALLOWED_IMAGE_HOST.split(",").map((domain) => ({
          protocol: "https",
          hostname: domain,
        }))
      : [],
  },
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "/blog/page/1",
      },
      {
        source: "/blog/category/:category",
        destination: "/blog/category/:category/1",
      },
    ];
  },
};

export default nextConfig;
