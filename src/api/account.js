// 账号
import request from '../utils/request.js'

// 账号出售
export function addAccountSale (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'bannerAjax/updates',
    url: 'api/userstate/updates',
    data
  }, catchConfig)
  return req
}

// 账号出售的列表 api/userstate/lists
export function fetchAccountSaleList (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'bannerAjax/lists',
    url: 'api/userstate/lists',
    data
  }, catchConfig)
  return req
}

// 合作案例列表
export function hezuolist (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'partnerAjax/list',
    url: 'api/partner/list',
    data
  }, catchConfig)
  return req
}

// 合作案例列表
export function getonehezuolist (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'partnerAjax/getById',
    url: 'api/partner/getById',
    data
  }, catchConfig)
  return req
}
