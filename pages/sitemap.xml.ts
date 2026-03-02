import { GetServerSideProps } from "next";

const SITE_URL = "https://www.codealgo.com";

const pages = [
  "",
  "/courses/python-for-kids",
  "/courses/javascript-for-beginners",
  "/pricing/monthly-coding-classes",
  "/blog",
  "/press",
  "/for-parents",
  "/for-educators",
  "/learn-more",
];

function generateSitemap(urls: string[]): string {
  const currentDate = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap(pages);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}