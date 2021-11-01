module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {},
  globals: {
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    my: true,
    swan: true,
    getApp: true,
    getCurrentPages: true,
    getDate: true
  }
}
