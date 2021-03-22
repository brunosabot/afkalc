const { nextI18NextRewrites } = require("next-i18next/rewrites");
const generateSitemap = require("./scripts/generateSitemap");

const localeSubpaths = {
  dev: "dev",
  fr: "fr",
};

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
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
