/**
 * 代理 跨域
 **/
const proxy = require('http-proxy-middleware');

/**
 * 这个app代表的是服务器 是webpack-dev-server 底层用express实现的
 */
module.exports = function (app) {

    app.use('/xymall/api', proxy.createProxyMiddleware({
        target: 'http://localhost:1060',
        changeOrigin: true

    }));
};
