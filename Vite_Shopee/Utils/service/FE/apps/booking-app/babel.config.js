// {
//   "presets": ["@nrwl/next/babel"],
//   "plugins": []
// }

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // {
      //   targets: {
      //     esmodules: true,
      //   },
      // }
    ],
    '@babel/preset-react',
    [
      'next/babel',
    ]
  ],
  plugins: [
    ["styled-jsx/babel", { "optimizeForSpeed": true }],
    "@babel/plugin-transform-runtime",
    // [
    //   "styled-jsx/babel",
    //   { "plugins": ["styled-jsx-plugin-less"] }
    // ],
    "@babel/plugin-syntax-jsx",
    // ['import', { libraryName: 'antd', style: true }],
  ],
  overrides: [{
    include: [
      './node_modules'
    ],
    plugins: [
      ['babel-plugin-transform-require-ignore', {
        extensions: ['.css']
      }]
    ]
  }]
};
