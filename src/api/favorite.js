// 红人api
import request from '../utils/request.js'

// 红人榜 粉丝排行榜 top
export function fetchFavoriteTop (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'goodsStoreAjax/queryAllfen',
    url: 'api/hongren/queryAllfen',
    data
  }, catchConfig)
  return req
}

// 红人榜 api/hongren/list
export function fetchFavoriteList (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'userAjax/list',
    url: 'api/hongren/list',
    data
  }, catchConfig)
  return req
}

// 红人榜获赞排行榜 api/hongren/toplikes
export function fetchFavoriteListA (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/hongren/toplikes',
    data
  }, catchConfig)
  return req
}

// 上传红人信息 api/hongren/xinxi
export function uploadFavoriteInf (data, catchConfig) {
  const req = request({
    method: 'post',
    url: 'api/hongren/xinxi',
    data
  }, catchConfig)
  return req
}
