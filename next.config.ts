/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/",
      destination: "/conservations",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
