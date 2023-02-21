/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
`;
// next.config.js

const securityHeaders = [
   // Prevent clickjacking
   { key: "X-Frame-Options", value: "DENY" },
   // Enable XSS protection
   { key: "X-XSS-Protection", value: "1; mode=block" },
   // Prevent MIME sniffing
   { key: "X-Content-Type-Options", value: "nosniff" },
   {
      key: "Content-Security-Policy",
      value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
   },
];
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: securityHeaders,
         },
      ];
   },
};

module.exports = nextConfig;
