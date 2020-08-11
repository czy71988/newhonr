// userInf = { token, state, usertype, paymentstate }
let userInf = null
let token = localStorage.getItem('token')

const setToken = (val) => {
  localStorage.setItem('token', val)
  token = val
}

const getToken = () => {
  return token || localStorage.getItem('token')
}

// 用户审核状态
const getState = () => userInf && userInf.state

// 商家用户支付状态s
const getpaymentstate = () => userInf && userInf.paymentstate

// 存储用户信息 获取用户信息
// userInf = { token, state, usertype, paymentstate }
const saveUserToLocation = (data) => {
  const keys = [ 'state', 'usertype', 'paymentstate', 'username', 'state' ]
  userInf = keys.reduce((result, key) => {
    result[key] = data[key]
    return result
  }, {})
  console.group('save')
  console.log(userInf)
  console.groupEnd()
  data.token && setToken(data.token)
}
// const getUserFromLocation = () => {
//   return userInf
// }

const clearUserFromLocation = () => {
  userInf = null
  localStorage.clear()
}

const isLoggedIn = () => userInf !== null
const getUserInf = () => {
  console.log(userInf)
  return userInf
}

// usertype  1: favorite红人  其他：store商家
const getUserType = () => {
  return judgeUserType(userInf && userInf.usertype)
}

const judgeUserType = usertype => {
  return usertype === '1' || usertype === 1 ? 'favorite' : 'store'
}

export {
  getUserInf,
  getToken,
  getUserType,
  judgeUserType,
  getState,
  getpaymentstate,
  saveUserToLocation,
  // getUserFromLocation,
  clearUserFromLocation,
  isLoggedIn
}
