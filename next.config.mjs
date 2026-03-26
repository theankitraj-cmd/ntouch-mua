/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias["async_hooks"] = "node:async_hooks";
      config.externals.push("node:async_hooks");
    }
    return config;
  },
};

export default nextConfig;
