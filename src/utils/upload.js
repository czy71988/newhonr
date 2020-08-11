import request from './request'

const upload = ({ url, file }, config) => {
  const formData = new FormData()
  formData.append('file', file, file.fullName)
  return request({
    method: 'post',
    url,
    data: formData,
    header: {
      'Content-Type': 'multipart/form-data'
    }
  }, config)
}

export default upload
