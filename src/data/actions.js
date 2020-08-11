import baseURL from '@/config/request.config.js'
// const baseUrl = 'https://139.196.170.121:8080/'
const baseUrl = baseURL
const prefix = process.env.NODE_ENV === 'production' ? baseUrl : ''
const temp = process.env.NODE_ENV === 'production' ? '' : 'temp/'
const actions = {
  // uploadBusinessLicense: prefix + 'ossAjax/picturesUpload?findex=business', // 上传
  // uploadFrontIDCard: prefix + 'ossAjax/picturesUpload?findex=cardFront',
  // uploadBackIDCard: prefix + 'ossAjax/picturesUpload?findex=cardbackt',
  // uploadHoldIDCard: prefix + 'ossAjax/picturesUpload?findex=cardhold',
  uploadBusinessLicense: prefix + 'api/user/picturesRestUpload?findex=business', // 上传
  uploadFrontIDCard: prefix + 'api/user/picturesRestUpload?findex=cardFront',
  uploadBackIDCard: prefix + 'api/user/picturesRestUpload?findex=cardbackt',
  uploadHoldIDCard: prefix + 'api/user/picturesRestUpload?findex=cardhold',
  updateBusinessLicense: prefix + 'api/user/picturesRestUpload?findex=business', // 修改
  updateFrontIDCard: prefix + 'api/user/picturesRestUpload?findex=cardFront',
  updateBackIDCard: prefix + 'api/user/picturesRestUpload?findex=cardbackt',
  updateHoldIDCard: prefix + 'api/user/picturesRestUpload?findex=cardhold',
  uploadHeadPotrait: prefix + 'api/user/uploadHeader', // 上传头像
  uploadGoodsPic: prefix + temp + 'ossAjax/uploadGoodimg?findex=goodimg', // 上传商品图片
  uploadGoodsPic2: prefix + temp + 'ossAjax/picturesUpload?findex=goodimgs',
  uploadGoodsPic3: prefix + 'api/user/pictures?findex=hrhzsj', // 红人上传合作商家图片
  uploadGoodsPic4: prefix + 'api/user/pictures?findex=liveGoods', // 红人上传直播商品图片
  uploadGoodsPic5: prefix + 'api/user/videoUpload?findex=hrzcsp'// 红人上传种草视频
}

export default actions
