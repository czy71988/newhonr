import request from '../utils/request.js'

// #
export function login (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/login',
    data,
    authToken: false
  }, catchConfig)
  return req
}

export function register (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/register',
    data,
    authToken: false
  }, catchConfig)
  return req
}

// 获取手机验证码/api/user/getcode
export function fetchPhoneCode (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/getcode',
    data,
    authToken: false
  }, catchConfig)
  return req
}

// 修改我的信息 api/user/updatemessage
export function updateMyInf (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/updatemessage',
    data
  }, catchConfig)
  return req
}
// 修改我的注册信息 userAjax/update
export function updateMyRegInf (data, catchConfig) {
  const req = request({
    method: 'get',
    // url: 'userAjax/update',
    url: 'api/user/update',
    data
  }, catchConfig)
  return req
}
// 上传头像
export function uploadHeadPotrait (data, catchConfig) {
  const req = request({
    method: 'post',
    url: 'api/user/uploadHeader',
    data
  }, catchConfig)
  return req
}

// 我的申请 api/user/Myapplication
export function fetchMyApplication (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/Myapplication',
    data
  }, catchConfig)
  return req
}

// 修改密码
export function updatePassword (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/updatepwd',
    data
  }, catchConfig)
  return req
}

// 我要出售
export function salesAccount (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/addMyapplication',
    data
  }, catchConfig)
  return req
}

// 确定收货
export function ConfirmReceipt (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/order/updatedeliveryStatus',
    data
  }, catchConfig)
  return req
}

// 获取我的信息
export function fetchMyInf (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/getById',
    data
  }, catchConfig)
  return req
}

// 修改我的注册信息
export function fetchMyzhu (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'userAjax/update',
    data
  }, catchConfig)
  return req
}

// 忘记密码
export function wangjimima (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/updatewj',
    data
  }, catchConfig)
  return req
}

// 支付
export function pay (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/xufei',
    data
  }, catchConfig)
  return req
}

// 创建临时id，用于上传图片
export function createTempId (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/user/creatId',
    data
  }, catchConfig)
  return req
}

// 商家发票信息接口
export function getInvoice (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/order/fapiao',
    data
  }, catchConfig)
  return req
}

// 商家商品详情(查库)
export function xiugaigoodsshangjia (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'goodsStoreAjax/getById',
    data
  }, catchConfig)
  return req
}

// 商家商品详情图
export function huoquxiangqingtu (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'admin/user/listfile',
    data
  }, catchConfig)
  return req
}
