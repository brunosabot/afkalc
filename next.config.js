const { withSentryConfig } = require("@sentry/nextjs");
const fs = require("fs");
const { i18n } = require("./next-i18next.config");
const generateSitemap = require("./scripts/generateSitemap");

const data = JSON.parse(fs.readFileSync("./package.json")).version;

const moduleExports = {
  future: {
    webpack5: true,
  },
  i18n,
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

const SentryWebpackPluginOptions = {
  release: `afkalc@${data}`,
  environment: process.env.NODE_ENV,
};

const finalExports =
  process.env.NODE_ENV === "development"
    ? moduleExports
    : withSentryConfig(moduleExports, SentryWebpackPluginOptions);

module.exports = finalExports;
