module.exports = {
  "extends": "../.eslintrc.js",
  "globals": {
    "it": true,
    "context": true,
    "describe": true,
    "before": true,
    "after": true,
    "beforeEach": true,
    "afterEach": true,
  },
  "rules":{
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-unused-expressions": 0
  }
};
