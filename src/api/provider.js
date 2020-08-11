// 服务商
import request from '../utils/request.js'

// 添加服务商
export function addProvider (data, catchConfig) {
  const req = request({
    method: 'get',
    url: 'api/propider/add',
    data,
    authToken: false
  }, catchConfig)
  return req
}
