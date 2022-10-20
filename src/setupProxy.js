const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://43.143.44.182',
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
}