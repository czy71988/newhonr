// 红人api
import request from '../utils/request.js'

// 红人榜 粉丝排行榜 top
export function newNohonrlist (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/public/rtg/RtgRedskinsUser/listPage',
    data
  }, catchConfig)
  return req
}

// 首页红人推荐
export function honrtuijian (data, catchConfig) {
  const req = request({
    method: 'post',
    url: 'zkurtg-red-api/public/rtg/RtgRedskinsRecommend/list',
    data
  }, catchConfig)
  return req
}

export function honrshuju (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/public/rtg/RtgRedskinsUser/getDetails',
    data
  }, catchConfig)
  return req
}

// 红人资讯
export function honrZX (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/public/rtg/RtgInformation/listPage',
    data
  }, catchConfig)
  return req
}
