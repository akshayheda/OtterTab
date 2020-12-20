const CracoLessPlugin = require("craco-less");  

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A", 
            '@font-family': '"Bariol", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol","Noto Color Emoji"' 
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};