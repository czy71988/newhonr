// 登录相关
import request from '../utils/request.js'

// 获取图形验证码
export function tuxingyanzhengma (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/public/captchaImage',
    data
  }, catchConfig)
  return req
}
