const fs = require("fs");
// This is a developpement script
// eslint-disable-next-line import/no-extraneous-dependencies
const globby = require("globby");

const alternativeLanguages = ["fr", "pt-BR"];

function toW3CString(date) {
  const year = date.getFullYear();
  let month = date.getMonth();
  month += 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const offset = -date.getTimezoneOffset();
  let offsetHours = Math.abs(Math.floor(offset / 60));
  let offsetMinutes = Math.abs(offset) - offsetHours * 60;
  if (offsetHours < 10) {
    offsetHours = `0${offsetHours}`;
  }
  if (offsetMinutes < 10) {
    offsetMinutes = `0${offsetMinutes}`;
  }
  let offsetSign = "+";
  if (offset < 0) {
    offsetSign = "-";
  }
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

module.exports = async function generateSiteMap() {
  const pages = await globby(["pages/**/*.tsx", "!pages/**/[id].tsx", "!pages/**/_*.tsx"]);

  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
  ];

  pages.forEach((page) => {
    const stats = fs.statSync(page);
    const path = page.replace("pages", "").replace(".tsx", "").replace(".md", "");
    const route = path.replace("/index", "").replace(/^\//, "");

    sitemap.push(`  <url>`);
    sitemap.push(`    <loc>https://afkalc.com${`/${route}`.replace("//", "/")}</loc>`);
    sitemap.push(`    <lastmod>${toW3CString(stats.ctime)}</lastmod>`);

    alternativeLanguages.forEach((lang) => {
      const url = `https://afkalc.com${`/${lang.toLowerCase().replace("-", "_")}/${route}`.replace(
        "//",
        "/"
      )}`;
      sitemap.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`);
    });

    sitemap.push(`  </url>`);
  });

  sitemap.push(`</urlset>`);

  fs.writeFileSync("public/sitemap.xml", sitemap.join("\n"));
};
