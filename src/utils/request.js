import axios from 'axios'
import baseURL from '../config/request.config.js'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import noAuthReqUrlData from '@/data/noAuthReqUrl'
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
service.interceptors.request.use(config => {
  if (process.env.NODE_ENV === 'production') {
    config.baseURL = baseURL
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const data = res.data
  if (data.code && data.code.toString() === '99999') {
    return Promise.reject(new Error('99999'))
  }
  return data.success ? data.data : Promise.reject(new Error(data.msg))
}, err => {
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
  let shouldToken = true
  for (const noAuthReq of noAuthReqUrlData) {
    if (config.url.indexOf(noAuthReq) > -1) {
      shouldToken = false
      break
    }
  }
  console.log('==')
  console.log(getToken())
  config.data || (config.data = {})
  if (shouldToken) config.data.token = getToken()
  config = Object.assign({
    method: 'post',
    header: {},
    authToken: true
  }, config)
  const method = config.method || 'post'
  if (!config.header.token && config.authToken === true) {
    if (method.toLowerCase() === 'post') { // 给post请求默认添加token
      if (token) {
        config.header.token = token
      }
    }
  }
  if (method.toLowerCase() === 'get' && !config.params) { // 将get请求的data赋值给params
    config.params = config.data
    config.data = {}
  }

  const promise = new Promise((resolve, reject) => {
    service(config).then(data => {
      resolve(data)
    }).catch(err => {
      // 参数为对象的，并对象属性open为false,则不开启消息处理模式, 或者为false 则不开启
      if (catchConfig === false || (typeof catchConfig === 'object' && catchConfig.open === false)) {
        reject(err)
      } else {
        if (err.message === 'token失效' || err.message === '99999') {
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
        dealCatch(err, catchConfig)
      }
    })
  })
  return promise
}

function dealCatch (err, config) { // 处理错误信息
  if (typeof config !== 'object') {
    Message({
      message: err.response.data.data,
      type: 'error',
      duration: 3000
    })
  }
  // 根据配置项进行定义提示
}

export default request
