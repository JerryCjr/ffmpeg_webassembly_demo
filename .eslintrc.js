module.exports = {
  extends: "standard",
  rules: {
    'semi': ['error', 'always'],
    'space-before-function-paren': 'off',
    'no-unused-vars': ['error', {
      'varsIgnorePattern': '[regeneratorRuntime|proConf]',
      'args': 'none'
    }]
  },
  globals: {
    getApp: false,
    Page: false,
    wx: false,
    App: false,
    getCurrentPages: false,
    Component: false
  }
};
