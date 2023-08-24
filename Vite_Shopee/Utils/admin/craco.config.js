const CracoLessPlugin = require('craco-less')

module.exports = {
  devServer: {
    port: 3001
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // tabs
              '@tabs-title-font-size': '20px',
              '@tabs-title-font-size-lg': '24px',
              '@tabs-title-font-size-sm': '16px',
              '@tabs-horizontal-padding': '6px 0',
              '@tabs-horizontal-padding-lg': '8px 0',
              '@tabs-horizontal-padding-sm': '4px 0',
              '@tabs-ink-bar-color': '#ADADAD',
              '@tabs-highlight-color': '#ffffff',
              '@tabs-hover-color': '#5d4eb3',
              '@tabs-active-color': '#5d4eb3'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
