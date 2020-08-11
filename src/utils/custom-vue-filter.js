// 自定义过滤器
import Vue from 'vue'
import { fansFavoriteData, authBodyData, contentCategoryData1,
  platformData, deliveryStatuData, auditStateData,
  platformshangjia } from '@/data/common'

// 粉丝偏向
Vue.filter('fansFavoriteFilter', val => {
  if (!val) return '--'
  let label = ''
  fansFavoriteData.some(item => {
    if (item.value === val) {
      label = item.label
      return true
    }
  })
  return label
})

// 认证主体
Vue.filter('authBodyFilter', val => {
  if (!val) return '--'
  let label = ''
  authBodyData.some(item => {
    if (item.value === val) {
      label = item.label
      return true
    }
  })
  return label
})

// 商家平台
// 内容分类
Vue.filter('platformStoreFilter', val => {
  if (!val) return '--'
  let label = ''
  // val = val.toString()
  let vals = null
  if (typeof val === 'number') {
    vals = val.toString()
  } else if (typeof val === 'object') {
    vals = val
  } else {
    vals = val.split('|')
  }
  const labels = []
  for (let val of vals) {
    platformshangjia.some(item => {
      if (item.value === val) {
        label = item.label
        labels.push(label)
        return true
      }
    })
  }
  return labels.join(' ')
})

// 内容分类
Vue.filter('contentCategoryFilter', val => {
  if (!val) return '--'
  let label = ''
  // val = val.toString()
  const vals = val.split('|')
  const labels = []
  for (let val of vals) {
    contentCategoryData1.some(item => {
      if (item.value === val) {
        label = item.label
        labels.push(label)
        return true
      }
    })
  }
  // val = '2|3|19|20'
  return labels.join(' | ')
})

// 平台logo地址过滤器
Vue.filter('platformLogoFilter', val => {
  if (!val) return ''
  let url = ''
  platformData.some(item => {
    if (item.value === val) {
      console.log(item.logo)
      url = item.logo
      return true
    }
  })
  return url
})

// 平台logo地址过滤器
Vue.filter('platformFilter', val => {
  if (!val) return '--'
  let label = ''
  // val = val.toString()
  const vals = val.split('|')
  const labels = []
  for (let val of vals) {
    platformData.some(item => {
      console.log(item.value)
      console.log(val)
      console.log(item.value === val)
      if (item.value === val) {
        label = item.label
        labels.push(label)
        return true
      }
    })
  }
  return labels.join(' | ')
})

// 订单发货过滤器
Vue.filter('deliveryStatuFilter', val => {
  if (!val) return '待发货'
  let label = ''
  val = val.toString()
  deliveryStatuData.some(item => {
    if (item.value === val) {
      label = item.label
      return true
    }
  })
  return label
})

// 审核状态发货过滤器
Vue.filter('auditStateFilter', val => {
  if (!val) return '待审核'
  let label = ''
  val = val.toString()
  auditStateData.some(item => {
    if (item.value === val) {
      label = item.label
      return true
    }
  })
  return label
})

// 数量过万过滤器
Vue.filter('numMoreThanTensOfThousandsFilter', val => {
  if (!val) return 0
  if (val / 10000 > 1) {
    return Math.floor(val / 1000) / 10 + '万+'
  }
  return val
})

Vue.filter('datafilter', value => {
  if (!value) {
    return '--'
  }
  let date = new Date(value)
  let y = date.getFullYear()
  let MM = date.getMonth() + 1
  MM = MM < 10 ? ('0' + MM) : MM
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + MM + '-' + d + ' '
})
