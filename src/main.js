import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import request from './utils/request.js'
import '@/permission.js'
import qs from 'qs'
import animate from 'animate.css'
import '@/utils/custom-vue-direction.js'
import '@/utils/custom-vue-filter.js'
import baseURL from '@/config/request.config.js'
import device from '@/utils/device'
import config from '@/config/zt-service-config'
import wx from 'wx'
import './utils/wx.js'
window.thirdClient = window.thirdClient || {}
window.thirdClient.config = config
console.log(window.thirdClient.config)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animate)
Vue.prototype.$axios = axios
Vue.prototype.$request = request

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$device = device
Vue.prototype.$wx = wx
axios.interceptors.request.use(function (config) {
  // config.headers.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiL2FwaSIsIjE1NzQ5OTcxNzgyMjUiLCIxMDIzOCJdfQ.bN17lIjuczFbb4TgSuwAfo5_h91X1mRNTh9UzWFa6po'
  if (process.env.NODE_ENV === 'production') {
    config.baseURL = baseURL
  }
  return config
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiL2FwaSIsIjE1NzQ5OTcxNzgyMjUiLCIxMDIzOCJdfQ.bN17lIjuczFbb4TgSuwAfo5_h91X1mRNTh9UzWFa6po'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
