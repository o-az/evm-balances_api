module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
}
