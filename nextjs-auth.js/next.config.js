/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    AUTH_SECRET:
      process.env.AUTH_SECRET ||
      "123SESSION_PASSWORDadfAUTH_SECRETww",
    AUTH_URL: process.env.AUTH_URL || "http://localhost:3000",
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    SESSION_PASSWORD:
      process.env.SESSION_PASSWORD || "123SESSION_PASSWORD",
    SERVICE_AUTH_URL: process.env.SERVICE_AUTH_URL || "http://localhost:8000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};
