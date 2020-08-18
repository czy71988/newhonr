// 登录相关
import request from '../utils/request1.js'
import request1 from '../utils/request.js'

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
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/portalLogin',
    data
  }, catchConfig)
  return req
}

//  获取验证码

export function phonecaptch (data, catchConfig) {
  const req = request1({
    method: 'get',
    url: '/zkurtg-red-api/public/captchaImageByPhone',
    data
  }, catchConfig)
  return req
}
