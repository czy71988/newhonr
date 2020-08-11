// 自定义指令
import Vue from 'vue'

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

// 全局注册自定义指令，用于判断当前图片是否能够加载成功
// 加载成功则显示替换src所指向的图片，否则显示默认src的图片
// 指令为 real-src
Vue.directive('real-src', async (el, binding) => {
  const imgSrc = binding.value // 获取图片资源
  let isSuccess = false
  if (imgSrc) isSuccess = await loadImgIsSuccess(imgSrc)

  if (isSuccess) {
    el.setAttribute('src', imgSrc)
  }
})

// 自定义节流指令
Vue.directive('c-throttle', {
  bind: (el, binding) => {
    const { arg, modifiers, value } = binding
    // console.group('绑定了c-throttle')
    // console.log(binding)
    // console.log(arg)
    // console.log(value)
    // console.log(modifiers)
    // console.groupEnd()
    if (modifiers.click) {
      el.addEventListener('click', throttle(value, arg))
    }
  }
})

const loadImgIsSuccess = (url) => {
  return new Promise(resolve => {
    let img = new Image()
    img.onload = function () {
      if (this.complete === true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      resolve(false)
      img = null
    }
    img.src = url
  })
}

export {
  loadImgIsSuccess
}
