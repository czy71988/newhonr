// 红人api
import request from '../utils/request.js'

var token = sessionStorage.getItem('token')

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

// 红人个人中心——我的信息
export function honrMymessage (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgRedskinsUser/getDetails',
    data
  }, catchConfig)
  return req
}

// 红人个人中心——我的信息修改
export function honrMymessageModify (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgRedskinsUser/updRtgRedskinsUser',
    data,
    headers: { 'sessionId': token }
  }, catchConfig)
  return req
}

// 红人个人中心——红人数据
export function honrMyshuju (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/public/rtg/RtgRedskinsRecord/listPage',
    data
  }, catchConfig)
  return req
}

// 红人个人中心——红人数据增加
export function honrMyshujuNew (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgRedskinsRecord/addRtgRedskinsRecord',
    data
  }, catchConfig)
  return req
}

// 删除操作

// 红人个人中心——红人数据删除操作
export function honrMyOut (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgRedskinsRecord/delRtgRedskinsRecord',
    data
  }, catchConfig)
  return req
}

// 获取手机号/zkurtg-red-api/rtg/RtgUserLogin/getDetails
export function huoquPhone (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgUserLogin/getDetails',
    data
  }, catchConfig)
  return req
}

// 修改密码

export function xiugaimimaL (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgUserLogin/updatePassword',
    data
  }, catchConfig)
  return req
}

// 申请取样详情

export function Hrshenqingxiangqing (data, catchConfig) {
  const req = request({
    method: 'post',
    url: '/zkurtg-red-api/rtg/RtgSampleOrder/getDetails',
    data
  }, catchConfig)
  return req
}
