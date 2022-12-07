const { createProxyMiddleware} = require("http-proxy-middleware")

module.exports = app => {
  app.use(
    createProxyMiddleware('/api/v1/auth/login', {
      target: "https://payoaut.com",
      changeOrigin: true
    })
  )
  app.use(createProxyMiddleware("/api/**", { // https://github.com/chimurai/http-proxy-middleware
    target: "http://localhost:5000",
    secure: false
  }));
}