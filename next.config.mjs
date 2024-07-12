/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Add port if necessary, otherwise remove this line
        pathname: "/api/products/**",
      },
    ],
  },
};

export default nextConfig;
