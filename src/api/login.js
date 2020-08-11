// 登录相关
import request from '../utils/request.js'

// 获取图形验证码
export function tuxingyanzhengma (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'goodsStoreAjax/queryAllfen',
    url: 'zkurtg-red-api/public/captchaImage',
    data
  }, catchConfig)
  return req
}

// 账号密码登录

export function LOGIN (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/portalLogin',
    data
  }, catchConfig)
  return req
}

// 账号密码登录
export function accountLogin (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/portalLogin',
    data
  }, catchConfig)
  return req
}

// 短信验证码登录
export function CodeLogin (data, catchConfig) {
  const req = request({
    method: 'put',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/portalLogin',
    data
  }, catchConfig)
  return req
}
