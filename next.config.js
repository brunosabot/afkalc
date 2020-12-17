module.exports = {
  i18n: {
    locales: ["dev", "en", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
