// 商品
import request from '../utils/request.js'

// 商品榜
export function newshoplist (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/public/rtg/RtgGoods/listPage',
    data
  }, catchConfig)
  return req
}

// 首页推荐
export function Homeshoplist (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/public/rtg/RtgRecommend/list',
    data
  }, catchConfig)
  return req
}
