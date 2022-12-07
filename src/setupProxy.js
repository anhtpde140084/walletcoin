const { createProxyMiddleware} = require("http-proxy-middleware")

module.exports = app => {
  app.use(
    createProxyMiddleware('/api/v1/auth/login', {
      target: "https://payoaut.com",
      changeOrigin: true
    })
  )
}