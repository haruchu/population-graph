/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  webpack5: true,
  webpack(config) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["src"],
  },
};
