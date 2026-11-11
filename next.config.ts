import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lisupai.online" }],
        destination: "https://www.lisupai.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
