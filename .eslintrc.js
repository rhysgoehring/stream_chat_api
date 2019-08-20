module.exports = {
  extends: "airbnb-base",
    "env": {
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2017
    },
  rules: {
    "no-underscore-dangle": 0,
    "func-names": 0,
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ]
  }
};
