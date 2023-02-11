/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-14 15:36:38
 * @LastEditTime: 2022-11-16 16:22:46
 * @LastEditors: lmfang
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": { //捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，
                    target: process.env.VUE_APP_PROXYURL, //代理的api地址，就是要跨域的地址
                    changeOrigin: true, // 这个参数可以让target参数是域名
                    pathRewrite: { //对路径匹配到的字符串重写
                        '^/api': '/api/v1'
                    },
                },
            },
        },
    },
});