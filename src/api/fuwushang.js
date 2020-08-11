// 商品
import request from '../utils/request.js'

// 商品榜
export function fuwushangbiaodan (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/public/rtg/RtgServiceProvider/add',
    data
  }, catchConfig)
  return req
}
