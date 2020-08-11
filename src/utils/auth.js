import { JSEncrypt } from 'jsencrypt'
import Cookies from 'js-cookie'
const reverseString = (str) => {
  return str.split('').reverse().join('')
}

const jsePublicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMIFJPPoh5auYAQnhCwFnQOdeZgUEF7n9tbIhImRGmqCguGT64GRrv73SJr4qc+IkkQy3eZrNboSXJOG9yYojzMCAwEAAQ=='

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
