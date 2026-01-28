const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  // Use react-native-svg-transformer for .svg imports
  config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
  config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
  config.resolver.sourceExts.push("svg");
  return config;
})();
