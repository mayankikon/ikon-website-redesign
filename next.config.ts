import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/portal", destination: "/dealer-login", permanent: false },
      { source: "/get-a-demo", destination: "/request-a-demo", permanent: false },
    ];
  },
};

export default nextConfig;
