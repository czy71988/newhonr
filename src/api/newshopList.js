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

// 商家信息接口
export function Shop (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '',
    data
  }, catchConfig)
  return req
}

// 商家信息修改接口
export function ShopXiugai (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/RtgBusinessUser/updRtgBusinessUser',
    data
  }, catchConfig)
  return req
}

// 商家我的商品接口
export function storeShopList (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/RtgGoods/listPage',
    data
  }, catchConfig)
  return req
}

// 商家我的商品新增接口
export function storeShopnew (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/RtgGoods/addGoods',
    data
  }, catchConfig)
  return req
}

// 商家我的订单接口
export function storeDingDan (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/RtgSampleOrder/listPage',
    data
  }, catchConfig)
  return req
}

// 商品详情接口

export function storeShopContent (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/rtg/RtgGoods/getDetails',
    data
  }, catchConfig)
  return req
}

// 服务商接口

export function fuwushangApi (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'goodsStoreAjax/queryAllfen',
    url: '/zkurtg-red-api/public/rtg/RtgServiceProvider/addRtgServiceProvider',
    data
  }, catchConfig)
  return req
}
