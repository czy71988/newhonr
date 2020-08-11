
import { JSEncrypt } from 'jsencrypt'
import Cookies from 'js-cookie'
// import { reverseString } from './index'

const jsePublicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMIFJPPoh5auYAQnhCwFnQOdeZgUEF7n9tbIhImRGmqCguGT64GRrv73SJr4qc+IkkQy3eZrNboSXJOG9yYojzMCAwEAAQ=='
// const jsePublicKey = 'NrxT3ShLtQoSKozwGyEkCd0zE/FY7PkGidCT4CGS3IaHGR612myYO/0f1tVnj5XhEUui1vXCHTxGUKMSQYiwyQ=='

/**
 * 颠倒字符串
 * @param str
 * @returns {string}
 */
const reverseString = (str) => {
  return str.split('').reverse().join('')
}

/**
 * 生成jse加密实例
 * @returns {JSEncrypt}
 */
const jseInstance = () => {
  let jse = new JSEncrypt()
  jse.setPublicKey(jsePublicKey)
  return jse
}

/**
 * 加密登录密码
 * @param pw 输入的密码字符串
 * @returns {PromiseLike<ArrayBuffer>}
 */
const encryptionPW = (pw) => {
  let jse = jseInstance()
  return jse.encrypt(pw)
}

/**
 * 解密登录密码
 * @param pw 输入的密码字符串
 * @returns {PromiseLike<ArrayBuffer>}
 */
const decryptPW = (pw) => {
  let jse = jseInstance()
  return jse.decrypt(pw)
}

/**
 * 获取sessionID
 */
const getToken = () => {
  return sessionStorage.getItem('token')
}

/**
 * 删除sessionID
 */
const removeToken = () => {
  sessionStorage.removeItem('token')
}

/**
 * 记住密码
 * @type {string}
 */
const mixStr = 'hgmix1a'
const rememberPW = (data) => {
  const codeUserName = data.username
  const codePassWord = reverseString(data.password + mixStr)
  Cookies.set('hn', codeUserName, { expires: 60 })
  Cookies.set('hp', codePassWord, { expires: 60 })
}
/**
 * 记住用户名和密码，校验用户的时候用
 * @param data
 */
const rememberForCheckUser = (data) => {
  const codeUserName = data.username
  const codePassWord = reverseString(data.password + mixStr)
  Cookies.set('u_checkUser', codeUserName)
  Cookies.set('p_checkUser', codePassWord)
}
/**
 * 取得记住的密码
 * @returns {{username: *, password: string}}
 */
const getRemembePW = () => {
  if (Cookies.get('hn') && Cookies.get('hp')) {
    let username = Cookies.get('hn')
    let mpassword = Cookies.get('hp')
    let password = reverseString(mpassword).split(mixStr)[0]
    return {
      username,
      password
    }
  }
}

/**
 * 从cookie中获取用户名和密码，校验用户的时候用
 * @returns {{password: *, username: *}}
 */
const getRemembeForCheckUser = () => {
  if (Cookies.get('u_checkUser') && Cookies.get('p_checkUser')) {
    let username = Cookies.get('u_checkUser')
    let mpassword = Cookies.get('p_checkUser')
    let password = reverseString(mpassword).split(mixStr)[0]
    return {
      username,
      password
    }
  }
}

const deleteRememberPW = () => {
  Cookies.remove('hn')
  Cookies.remove('hp')
}

export {
  getToken,
  removeToken,
  encryptionPW,
  decryptPW,
  rememberPW,
  rememberForCheckUser,
  getRemembePW,
  getRemembeForCheckUser,
  deleteRememberPW
}

// // userInf = { token, state, usertype, paymentstate }
// let userInf = null
// let token = localStorage.getItem('token')

// const setToken = (val) => {
//   localStorage.setItem('token', val)
//   token = val
// }

// const getToken = () => {
//   return token || localStorage.getItem('token')
// }

// // 用户审核状态
// const getState = () => userInf && userInf.state

// // 商家用户支付状态s
// const getpaymentstate = () => userInf && userInf.paymentstate

// // 存储用户信息 获取用户信息
// // userInf = { token, state, usertype, paymentstate }
// const saveUserToLocation = (data) => {
//   const keys = [ 'state', 'usertype', 'paymentstate', 'username', 'state' ]
//   userInf = keys.reduce((result, key) => {
//     result[key] = data[key]
//     return result
//   }, {})
//   console.group('save')
//   console.log(userInf)
//   console.groupEnd()
//   data.token && setToken(data.token)
// }
// // const getUserFromLocation = () => {
// //   return userInf
// // }

// const clearUserFromLocation = () => {
//   userInf = null
//   localStorage.clear()
// }

// const isLoggedIn = () => userInf !== null
// const getUserInf = () => {
//   console.log(userInf)
//   return userInf
// }

// // usertype  1: favorite红人  其他：store商家
// const getUserType = () => {
//   return judgeUserType(userInf && userInf.usertype)
// }

// const judgeUserType = usertype => {
//   return usertype === '1' || usertype === 1 ? 'favorite' : 'store'
// }

// export {
//   getUserInf,
//   getToken,
//   getUserType,
//   judgeUserType,
//   getState,
//   getpaymentstate,
//   saveUserToLocation,
//   // getUserFromLocation,
//   clearUserFromLocation,
//   isLoggedIn
// }
