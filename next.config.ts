import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SECURITY TRADEOFF: the design-system `Avatar` (and any image source) may
    // receive arbitrary remote URLs from consumers, so we allow all https hosts.
    // For a production app with known avatar hosts, tighten this to an explicit
    // `hostname` allow-list (e.g. "avatars.githubusercontent.com") instead of "**".
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
