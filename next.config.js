const { i18n } = require("./next-i18next.config");

const moduleExports = {
  i18n,
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    minimumCacheTTL: 864000,
    domains: ["cdn.buymeacoffee.com"],
  },
  async redirects() {
    return [
      {
        source: "/priority-list",
        destination: "/tiers-list",
        permanent: true,
      },
      {
        source: "/fr/:slug(.*)",
        destination: "/fr_FR/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = moduleExports;
