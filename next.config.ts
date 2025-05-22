/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/conversations",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
