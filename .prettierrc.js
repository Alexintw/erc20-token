const solidityPlugin = require("prettier-plugin-solidity");
const plugin = solidityPlugin.default || solidityPlugin;

module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  // 这里用我们上面拿到的 plugin 引用
  plugins: [plugin],
  overrides: [
    {
      files: "*.sol",
      options: {
        parser: "solidity",
        tabWidth: 4
      }
    }
  ]
};