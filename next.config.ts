import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["charging.diriahms.net", "*.charging.diriahms.net"],
};

export default nextConfig;
