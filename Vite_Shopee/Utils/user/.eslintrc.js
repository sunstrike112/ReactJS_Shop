module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: false
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-irregular-whitespace': 0,
    'react/static-property-placement': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/state-in-constructor': 0,
    'no-case-declarations': 0,
    'no-nested-ternary': 0,
    'prefer-const': 0,
    'import/no-cycle': 0,
    'react/sort-comp': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': 0,
    'react/button-has-type': 0,
    'linebreak-style': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-filename-extension': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-tabs': 0,
    'global-require': 0,
    'object-curly-newline': 0,
    'max-len': ['error', { 'code': 200 }],
    'quote-props': 0,
    'no-void': 0,
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'no-console': 1,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'dot-notation': ['error', { 'allowPattern': '^[a-z]+(_[a-z]+)+$' }],
    'no-unused-expressions': ['error', {
      'allowTaggedTemplates': true
    }],
    'no-underscore-dangle': ['error', {
      'allowAfterThis': true,
      'allowAfterSuper': true
    }],
    'func-names': ['error', 'never'],
    'import/prefer-default-export': 0,
    'react/prop-types': ['error', {
      'ignore': ['children', 'className', 'style', 'history', 'match', 't', 'i18n', 'component', 'error']
    }],
    'react/jsx-pascal-case': 0,
    '@babel/plugin-proposal-export-default-from': 0,
    'import/named': 0
  }
}
