// banner api
import request from '../utils/request.js'

// banner
export function fetchBanners (data, catchConfig) {
  const req = request({
    method: 'post',
    // url: 'bannerAjax/queryall',
    url: '/zkurtg-red-api/public/rtg/RtgBanner/list',
    data
  }, catchConfig)
  return req
}
