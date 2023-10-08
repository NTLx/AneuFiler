const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      fallback:{
        path: require.resolve("path-browserify"),
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      externals: [
        "electron-log",
        "@electron/remote",
        "node-xlsx",
        "officegen",
      ],
      nodeModulesPath: ["../../node_modules", "./node_modules"],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        productName: "AneuFiler",
        appId: "com.aneufiler.app",
        extraResources: [
          {
            from: "./src/assets/analysis.exe",
            to: "./analysis.exe",
          },
          {
            from: "./src/assets/analysis.mac",
            to: "./analysis.mac",
          },
          {
            from: "./src/assets/analysis",
            to: "./analysis",
          },
          {
            from: "./src/assets/hunanjiahui.png",
            to: "./hunanjiahui.png",
          },
          {
            from: "./src/assets/sampleDataTemplateAneuFiler.xlsx",
            to:"./sampleDataTemplateAneuFiler.xlsx",
          },
          {
            from:"./src/assets/app256x256.png",
            to:"./app256x256.png"
          }
        ],
        dmg: {
          title: "AneuFiler",
          icon: "./src/assets/app256x256.icns",
        },
        mac: {
          category: "public.app-category.developer-tools",
          icon: "./src/assets/app256x256.icns",
          extendInfo: {
            LSUIElement: 0,
          },
          target: ["dmg"],
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: "${productName}.v${version}.MacOS.${ext}",
        },
        win: {
          icon: "./src/assets/app.ico",
          // eslint-disable-next-line no-template-curly-in-string
          artifactName: "${productName}.v${version}.Win_Portable.${ext}",
          target: [
            {
              target: "portable",
              arch: ["ia32"],
            },
          ],
        },
        linux: {
          icon: "./src/assets/app256x256.png",
          category: "Network",
          target: ["deb"],
          artifactName: "${productName}.v${version}.${ext}",
        },
      },
    },
  },
});
