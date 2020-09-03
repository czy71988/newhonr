import baseURL from '@/config/request.config.js'
// const baseUrl = 'https://139.196.170.121:8080/'
const baseUrl = baseURL
const prefix = process.env.NODE_ENV === 'production' ? baseUrl : ''
// const temp = process.env.NODE_ENV === 'production' ? '' : 'temp/'
const actions = {
  uploadBusinessLicense: prefix + '/zkurtg-red-api/public/uploadFiles', // 无权限上传
  UploadWithoutPermission: prefix + ' /zkurtg-red-api/rtg/RtgUserLogin/uploadFiles' // 有权限上传
}

console.log(actions)
export default actions
