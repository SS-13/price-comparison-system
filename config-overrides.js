const path = require("path");
const { InjectManifest, GenerateSW } = require("workbox-webpack-plugin");

function findSWPrecachePlugin(element) {
  return element.constructor.name === "GenerateSW";
}

function removeSWPrecachePlugin(config) {
  const swPrecachePluginIndex = config.plugins.findIndex(findSWPrecachePlugin);

  if (swPrecachePluginIndex !== -1) {
    config.plugins.splice(swPrecachePluginIndex, 1);
  }
}

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Production build - Adding Workbox for PWAs");
    config.devtool = "source-map";
    // removeSWPrecachePlugin(config);
    config.plugins.push(
      //   new InjectManifest({
      //     swSrc: path.join(__dirname, "src", "service-worker.ts"),
      //   })

      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      })
    );
  }
  return config;
};
