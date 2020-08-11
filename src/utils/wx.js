import wx from 'wx'
import sha1 from 'js-sha1'
let latestVersion = false
const defaultConfig = {
  // debug: true,
  // appId: 'wx0eb7c56e37c0b7f3',
  // appId: 'wxbaba17ec7abbc4ad', // hr企业
  appId: 'wx2b066eac8614a271', // ww企业
  signature: '',
  timestamp: Date.parse(new Date()),
  nonceStr: Math.random().toString(36).substr(2, 16),
  jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage']
}

let defaulShareData = {
  title: '红人带货-让生意红红火火',
  desc: '海量曝光，引爆销量，红人带货，打造销售奇迹！',
  link: window.location.origin,
  imgUrl: `${window.location.origin}/favicon.png`,
  success () {
    console.log('自定义分享内容成功')
  }
}

// 配置认证
wx.authConfig = (cfg = {}, jsapiTicket, shareData = {}) => {
  if (!jsapiTicket) {
    console.log('jsapiTicket 不存在')
    return
  }
  const config = Object.assign({}, defaultConfig, {
    timestamp: Date.parse(new Date())
  }, cfg)
  const str = `jsapi_ticket=${jsapiTicket}&noncestr=${config.nonceStr}&timestamp=${config.timestamp}&url=${window.location.href.split('#')[0]}`
  config.signature = sha1(str)
  defaulShareData = Object.assign({}, defaulShareData, shareData)
  wx.config(config)
}
// 分享
const shareMessage = (shareData = {}) => {
  shareData = Object.assign({}, defaulShareData, shareData)
  console.log(shareData)
  const shareFriendFun = latestVersion ? 'updateAppMessageShareData' : 'onMenuShareAppMessage'
  const shareTimeLimeFun = latestVersion ? 'updateTimelineShareData' : 'onMenuShareTimeline'
  wx[shareFriendFun](shareData)
  wx[shareTimeLimeFun](shareData)
}

wx.ready(function () {
  console.log(window.location.href)
  wx.checkJsApi({
    jsApiList: ['updateAppMessageShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function (res) {
      console.log(shareMessage)
      const checkResult = res.checkResult.updateAppMessageShareData
      if (typeof checkResult === 'boolean') {
        latestVersion = checkResult
      } else {
        latestVersion = checkResult.indexOf('no') < 0
      }
      shareMessage()
    }
  })
})
wx.updateShareData = (shareData) => {
  shareMessage(shareData)
}
