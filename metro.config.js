module.exports = (async () => {
  return {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    maxWorkers: 2,
  };
})();
