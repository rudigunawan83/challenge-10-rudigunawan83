import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
}
