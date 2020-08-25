import axios from 'axios'
import baseURL from '../config/request.config.js'
import { Message, MessageBox, Loading } from 'element-ui'
import router from '@/router/index'

let token = localStorage.getItem('token')
// 创建axios实例
const service = axios.create({
  timeout: 60000
})

service.setToken = (val) => { // 设置token
  console.log(val)
  localStorage.setItem('token', val)
  token = val
}
service.getToken = () => token // 获取token

// 请求拦截器
let loading
// 内存中正在请求的数量
let loadingNum = 0
function startLoading () {
  if (loadingNum === 0) {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(255,255,255,0.5)'
    })
  }
  // 请求数量加1
  loadingNum++
}
function endLoading () {
  // 请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
  }
}
service.interceptors.request.use(config => {
  if (process.env.NODE_ENV === 'production') {
    config.baseURL = baseURL
  }
  // 加载动画
  startLoading()

  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 关闭加载动画
  endLoading()
  const data = res.data
  console.log()
  // if (data.code && data.code.toString() === '99999') {
  //   return Promise.reject(new Error('99999'))
  // }
  return data.success ? data.data : Promise.reject(new Error(data.msg))
}, err => {
  const data = err.response.data
  console.log('00000', data)
  endLoading()
  if (data.success === false) {
    console.log('mmm')
    Message({
      message: data.data,
      type: 'error',
      duration: 3000
    })
  }
  if (data.code === 10002 || data.message === 'Unauthorized') {
    console.log('======', err.message)
    MessageBox({
      title: '',
      type: 'wraning',
      message: '登录身份已过期，请重新登录',
      center: true,
      showCancelButton: false,
      confirmButtonText: '去登录'
    }).then(() => {
      router.push({ name: 'login' })
    })
    return
  }
  return Promise.reject(err)
})

// 统一请求的数据封装在config的data项
// 对post请求头默认添加token(若存在token且authToken为true)
// 第二参数catchConfig：[boolean, object]
//    类型为boolean,默认为true开启错误提示，false关闭
//    类型为object, 则根据配置项开启提示
// 开发环境不是以url中api/开头的，需要再url前加temp/，进行代理，解决跨域问题
const IS_DEVLOPMENT_ENV = process.env.NODE_ENV === 'development'
const request = (config = {}, catchConfig) => {
  // 开发环境不是以url中api/开头的，需要再url前加temp/，进行代理，解决跨域问题
  if (IS_DEVLOPMENT_ENV && config.url.indexOf('api/') < 0 && config.url.indexOf('temp/') < 0) {
    config.url = 'temp/' + config.url
  }

  const promise = new Promise((resolve, reject) => {
    service(config).then(data => {
      resolve(data)
    })
  })
  return promise
}

export default request
