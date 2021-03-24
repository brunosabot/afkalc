const { i18n } = require("./next-i18next.config");
const generateSitemap = require("./scripts/generateSitemap");

const localeSubpaths = {
  dev: "dev",
  fr: "fr",
};

module.exports = {
  i18n,
  async redirects() {
    return [
      {
        source: "/priority-list",
        destination: "/tiers-list",
        permanent: true,
      },
    ];
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (isServer) {
      generateSitemap();
    }

    return config;
  },
};
