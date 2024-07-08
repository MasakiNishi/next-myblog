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
};

export default nextConfig;
