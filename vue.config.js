module.exports = {
  devServer: {
    port: 3000
  },
  configureWebpack: {
    plugins: [
    ]
  },
  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true
    }
  }
}
