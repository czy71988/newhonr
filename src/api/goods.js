// 商品api
import request from '../utils/request.js'

// 获取商品榜top
export function fetchGoodsTop (data, catchConfig) {
  const req = request({
    method: 'post',
    url: 'api/goods/queryAll',
    data
  }, catchConfig)
  return req
}

// 获取商品列表 api/goods/getGoodsList?page=0&row=10
export function fetchGoodsList (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/getGoodsList',
    // url: 'api/goods/querylin', // 测试
    data
  }, catchConfig)
  return req
}

// 商品粉丝数
// export function fetchGoodsFans (data, catchConfig) {
//   const req = request({
//     method: 'get',
//     url: 'goodsStoreAjax/queryAllfen',
//     data
//   }, catchConfig)
//   return req
// }

// 商品 申请取样提交
export function addApplicationSample (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/order/add',
    data
  }, catchConfig)
  return req
}

// 商品 获取申请取样
export function fetchApplicationSampleInf (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/getquyang',
    data
  }, catchConfig)
  return req
}

// 商品上传
export function addGoods (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'api/goods/add',
    url: 'api/goods/update',
    data
  }, catchConfig)
  return req
}

// 我的商品
export function fetchMyGoods (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/getMyGoodsList',
    data
  }, catchConfig)
  return req
}

// 商品状态修改 上架或 下架
export function updateGoodsState (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/state',
    data
  }, catchConfig)
  return req
}

// 热销榜单首图
export function shoututsgde (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'ossAjax/findex',
    data
  }, catchConfig)
  return req
}

// 首页美妆
export function meizhuang (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/meizhuang',
    data
  }, catchConfig)
  return req
}

// 首页家居
export function jiaju (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/jiaju',
    data
  }, catchConfig)
  return req
}

// 首页服装
export function fushi (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/fushi',
    data
  }, catchConfig)
  return req
}

// 首页数码
export function shuma (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/shuma',
    data
  }, catchConfig)
  return req
}

// 首页食品
export function shipin (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/shipin',
    data
  }, catchConfig)
  return req
}

// 创建商品id
export function createGoodsId (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/createId',
    data
  }, catchConfig)
  return req
}

// 商家商品删除
export function shanchushangpin (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/delete',
    data
  }, catchConfig)
  return req
}

// 商家商品编辑修改
export function xiugaishangpin (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/update',
    data
  }, catchConfig)
  return req
}

// 获取商品详情 api/goods/getById
export function getGoodsDetail (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/goods/getById',
    data
  }, catchConfig)
  return req
}

// 商家淘宝商品详情
export function getshangpingtaobao (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'dtk/getgoodsdetail',
    data
  }, catchConfig)
  return req
}

// 商家平多多商品详情
export function getshangpingpingduoduo (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'pdd/getgoods',
    data
  }, catchConfig)
  return req
}

// 商家商品详情(查平多多)
export function searchPddGoodsDetail (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'pdd/getgoods',
    url: 'pdd/detail',
    data
  }, catchConfig)
  return req
}

// 商家商品详情(天猫淘宝)
export function searchDtkGoodsDetail (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'dtk/getgoodsdetail',
    data
  }, catchConfig)
  return req
}

// 删除文件
export function deleteFile (id, catchConfig) {
  return request({
    method: 'get',
    url: 'ossAjax/deleteById',
    params: {
      id
    }
  }, catchConfig)
}
