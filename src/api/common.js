// 搜索
import request from '../utils/request.js'

// 搜索
export function search (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/search/getsearch',
    data
  }, catchConfig)
  return req
}

// 获取微信jsapi ticket api/share/ticket
export function getWxJsTicket (data = {}, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/share/ticket',
    data
  }, catchConfig)
  return req
}
