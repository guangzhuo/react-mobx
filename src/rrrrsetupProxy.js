const {createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://xxx',     //  测试环境配合
      changeOrigin: true,
      ws: true
    })
  );
};
