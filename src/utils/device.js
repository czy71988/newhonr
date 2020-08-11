const ua = navigator.userAgent
const isMobile = () => {
  // let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone|oppo)/i)
  // return flag || document.body.clientWidth < 810
  return document.body.clientWidth < 810
}
const wxClient = () => {
  return ua.indexOf('MicroMessenger') > -1 // 微信
}
// 打开qq聊天链接
let openQQChatLink = 'http://wpa.qq.com/msgrd?v=3&uin=1417805760&site=qq&menu=yes'
if (isMobile() && !wxClient()) {
  openQQChatLink = 'mqqwpa://im/chat?chat_type=wpa&uin=1417805760&version=1&src_type=web&web_src=oicqzone.com'
}

const device = {
  isMobile: isMobile(),
  wxClient: wxClient(),
  openQQChatLink
}
// alert(navigator.userAgent)
export default device
