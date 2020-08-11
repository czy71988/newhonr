// 订单
import request from '../utils/request.js'

// 我的订单 订单列表
export function fetchMyOrder (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/order/list',
    data
  }, catchConfig)
  return req
}
// 红人订单列表 我的订单 订单列表
export function fetchMyOrderForFavorite (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/order/lists',
    data
  }, catchConfig)
  return req
}

// 添加或更改发货信息 api/order/updatedeliveryStatus
export function addOrUpdateDeliveryOrder (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/order/updatedeliveryStatus',
    data
  }, catchConfig)
  return req
}
