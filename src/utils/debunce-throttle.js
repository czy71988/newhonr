// 防抖
const debunce = function (fn, delay) {
  let timeId = null
  let isFirst = true // 是否是第一次触发
  let lastTime = 0
  return function () {
    const nowTime = Date.now()
    lastTime = isFirst ? nowTime : lastTime
    if (nowTime - lastTime < delay) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn.apply(this, arguments)
      isFirst = true
    }, delay)
  }
}

// 节流
const throttle = function (fn, delay) {
  let lastTime = 0
  return function () {
    const nowTime = Date.now()
    if (nowTime - lastTime >= delay) {
      fn.apply(this, arguments)
      lastTime = nowTime
    }
  }
}

export {
  throttle,
  debunce
}
