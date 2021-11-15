const { i18n } = require("./next-i18next.config");

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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = moduleExports;
