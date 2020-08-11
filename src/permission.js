// import router from './router'
// import { judgeUserType, getToken, saveUserToLocation } from '@/utils/auth'
// import { MessageBox } from 'element-ui'
// // import { getToken } from './utils/auth'
// import { fetchMyInf } from './api/user'

// const getPageTitle = (pageTitle) => {
//   const title = '红人带货-让生意红红火火'
//   // return (pageTitle ? (pageTitle + '-') : '') + title
//   return title
// }

// router.onError(err => {
//   console.group('router on error')
//   console.log(err)
//   console.groupEnd()
// })

// router.beforeEach(async (to, from, next) => {
//   document.title = getPageTitle(to.meta.title)
//   console.group('路由')
//   console.log(from)
//   console.log(to)
//   if (to.name === 'home' && to.query.out_trade_no) {
//     next('/home')
//     return
//   }
//   console.groupEnd()
//   // 是否是需要登录认证
//   if (to.meta.auth) {
//     // 获取用户信息
//     let userInf = null
//     try {
//       userInf = await fetchMyInf({
//         token: getToken()
//       }, false)
//     } catch (error) {
//       // return
//       console.log('自动登录失败')
//     }
//     if (!userInf) {
//       MessageBox({
//         title: '',
//         type: 'wraning',
//         message: '登录身份已过期，请重新登录',
//         center: true,
//         showCancelButton: false,
//         confirmButtonText: '去登录'
//       }).then(() => {
//         router.push({ name: 'login' })
//       })
//       return
//     }
//     saveUserToLocation(userInf)
//     // const user = getUserInf()
//     switch (to.name) {
//       case 'applicationSample':
//         applicationSampleRoute(to, from, next, userInf)
//         break
//       case 'accountSale':
//         accountSaleRoute(to, from, next, userInf)
//         break
//       default:
//         // 用户未登录，则跳到主页
//         next(getToken() ? true : { name: 'home' })
//         // next()
//         break
//     }
//   } else {
//     next()
//   }
// })

// const warningMsgBox = ({ title, message, confirmButtonText, cancelButtonText }) => {
//   return MessageBox({
//     title: title,
//     type: 'wraning',
//     message,
//     center: true,
//     showCancelButton: cancelButtonText,
//     confirmButtonText: confirmButtonText || '确定',
//     cancelButtonText: cancelButtonText || '取消'
//   })
// }

// // 申请取样路由拦截
// const applicationSampleRoute = (to, from, next, userInf) => {
//   // const userInf = getUserFromLocation()
//   // alert(userInf.usertype)
//   // alert(userInf.state)
//   if (!userInf || judgeUserType(userInf.usertype) !== 'favorite') {
//     MessageBox({
//       title: '温馨提示',
//       message: '你还不是红人用户哦，请先登录红人账号',
//       confirmButtonText: '确定',
//       center: true
//     }).then(() => {
//       router.push({ name: 'login' })
//     })
//     next(false)
//     return
//   }
//   if (userInf.state.toString() !== '1') {
//     MessageBox({
//       title: '温馨提示',
//       message: '亲，您的账号还未通过审核哦，请检查个人信息是否完整，联系客服完成审核吧',
//       confirmButtonText: '确定',
//       center: true
//     }).then(() => {
//       next({ name: 'personalMyxinxi' })
//     })
//   } else {
//     next()
//   }
// }

// // 账号转让-我要出售路由拦截
// // 已登录且需要审核通过
// const accountSaleRoute = (to, from, next, { token, usertype, state }) => {
//   if (!token) {
//     warningMsgBox({
//       title: '温馨提示',
//       message: '我要出售，需要登录才可访问',
//       cancelButtonText: '再看看',
//       confirmButtonText: '去登录'
//     }).then(() => {
//       next({ name: 'login', query: { 'redirect': from.path } })
//     }).catch(() => {
//       next(false)
//     })
//   } else if (state !== 1 && state !== '1') {
//     warningMsgBox({
//       title: '温馨提示',
//       message: '账号需要审核通过才可访问',
//       confirmButtonText: '好的'
//     }).then(() => {
//       next({ name: 'accountBuy' })
//     })
//   } else {
//     next()
//   }
// }
