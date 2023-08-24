// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid'
]);
// import { brandingColors } from './src/constants/branding-color';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config();

// Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './src/styles/antd-custom.less'), 'utf8')
// )

const nextConfig = {
  env: {
  },
};

const plugins = [
  withTM,
  withCSS({
    cssLoaderOptions: {
      url: false
    }
  }),
  [withLess(
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        // modifyVars: themeVariables, // make your antd custom effective
        modifyVars: {
          'primary-color': '#04BAE0', // primary color for all components
          'link-color': '#04BAE0', // link color
          'success-color': '#52c41a', // success state color
          'warning-color': '#faad14', // warning state color
          'error-color': '#f5222d', // error state color
          'font-size-base': '14px', // major text font size
          'heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
          'text-color': 'rgba(0, 0, 0, 0.65)', // major text color
          'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
          'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
          'border-radius-base': '2px', // major border radius
          'border-color-base': '#d9d9d9', // major border color
          'box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
          'btn-primary-color': '#1D1655',
        }
      },
      webpack: (config, options) => {
        options.defaultLoaders.babel.options.babelrc = true;
        options.defaultLoaders.babel.options.rootMode = 'upward';

        if (options.isServer) {
          const antStyles = /antd\/.*?\/style.*?/
          const origExternals = [...config.externals]
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback()
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback)
              } else {
                callback()
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
          ]

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
          })
        }

        // const builtInLoader = config.module.rules.find((rule) => {
        //   if (rule.oneOf) {
        //     return (
        //       rule.oneOf.find((deepRule) => {
        //         return deepRule?.test && deepRule?.test.toString().includes('/a^/');

        //       }) !== undefined
        //     );
        //   }
        //   return false;
        // });

        // if (typeof builtInLoader !== 'undefined') {
        //   config.module.rules.push({
        //     oneOf: [
        //       ...builtInLoader.oneOf.filter((rule) => {
        //         return (rule?.test && rule?.test.toString().includes('/a^/')) !== true;
        //       }),
        //     ],
        //   });
        // }

        config.plugins.push(new MiniCssExtractPlugin());
        config.module.rules.push({
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // { loader: 'style-loader', options: { esModule: true } },
            "to-string-loader",
            // "style-loader",
            { loader: 'css-loader', options: { importLoaders: 1 } },
            // "postcss-loader",
          ],
        })

        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
      }
    },
    withNx({
      nx: {
        // Set this to false if you do not want to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: true,
      },
      // Set this to true if you use CSS modules.
      // See: https://github.com/css-modules/css-modules
      cssModules: false,
    }),
  )]
];

module.exports = withPlugins(plugins, nextConfig);

// module.exports = withLess(
//   withNx({
//     nx: {
//       // Set this to false if you do not want to use SVGR
//       // See: https://github.com/gregberge/svgr
//       svgr: true,
//     },
//     // Set this to true if you use CSS modules.
//     // See: https://github.com/css-modules/css-modules
//     cssModules: false,
//   })
// );
