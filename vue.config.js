
const baseURL = 'https://ht.hongrendaihuo.com:8081/'
// const newbaseURL = 'http://101.133.136.149:8888/'
// const baseURL = 'https://10.1.202.150:8080/'
module.exports = {
  devServer: {
    proxy: {
      '/zkurtg-red-api': {
        // target: 'http://localhost:8082/zkurtg-red-api',
        // target: 'http://101.133.136.149:48081/zkurtg-red-api/',
        target: 'http://101.133.136.149:8888/',
        changeOrigin: true, // 是否改变源地址
        pathRewrite: {
          '^/temp1': ''
        }
      },
      '/api': {
        target: baseURL,
        changeOrigin: true
      },
      '/temp': {
        target: baseURL,
        changeOrigin: true,
        pathRewrite: {
          '^/temp': ''
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      wx: 'wx'
    }
  }
}
