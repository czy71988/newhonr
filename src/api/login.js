// 登录相关
import request from '../utils/request.js'
import request1 from '../utils/request1.js'

// let token = sessionStorage.getItem('token')

// 获取图形验证码
export function tuxingyanzhengma (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'zkurtg-red-api/public/captchaImage',
    data
  }, catchConfig)
  return req
}

// 账号密码登录

export function LOGIN (data, catchConfig) {
  const req = request1({
    method: 'post',
    url: '/zkurtg-red-api/rtg/portalLogin',
    data
  }, catchConfig)
  return req
}

//  获取验证码

// export function phonecaptch (data, catchConfig) {
//   const req = request1({
//     method: 'get',
//     url: '/zkurtg-red-api/public/captchaImageByPhone',
//     data
//   }, catchConfig)
//   return req
// }

// 获取手机验证码

export function captchaImageByPhone (data, catchConfig) {
  const req = request({
    method: 'get',
    url: '/zkurtg-red-api/public/captchaImageByPhone',
    data
  }, catchConfig)
  return req
}

// 登录页修改密码

export function changepasswordApi (data, catchConfig) {
  const req = request1({
    method: 'post',
    url: '/zkurtg-red-api/public/rtg/RtgUserLogin/updatePassword',
    data
  }, catchConfig)
  return req
}

// 注册页

export function zhuceHR (data, catchConfig) {
  const req = request1({
    method: 'post',
    url: '/zkurtg-red-api/rtg/register',
    data
  }, catchConfig)
  return req
}

// 手机号监测

export function zhucePhone (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/public/rtg/RtgUserLogin/getRegistrationStatus',
    data
  }, catchConfig)
  return req
}

// 首页用户信息

export function HOmApi (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgUserLogin/getPublicDetails',
    data
    // headers: { 'sessionId': token }
  }, catchConfig)
  return req
}
