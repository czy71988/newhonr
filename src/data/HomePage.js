// 首页侧边栏精选服务数据
// 优品类别
const goodsCategoryData = [
  // { value: '', label: '全部' },
  { value: 'c06', label: '食品饮料' },
  { value: 'c03', label: '美妆个护' }, // o
  { value: 'c04', label: '居家日用' },
  { value: 'c05', label: '鞋品' },
  { value: 'c09', label: '潮流男装' },
  { value: 'c14', label: '家装家纺' },
  { value: 'c11', label: '精品箱包' },
  { value: 'c01', label: '精品女装' },
  { value: 'c08', label: '数码家电' } // o
  // { value: '13', label: '户外运动' },
  // { value: '7', label: '文娱车品' },
  // { value: '12', label: '配饰' }
  // { value: '10', label: '内衣' },
  // { value: '2', label: '母婴' }
]

// 粉丝数量
const fansNumberData = [
  { value: '1', label: '十万粉丝' },
  { value: '2', label: '三十万粉丝' },
  // { value: '3', label: '30w-50w' },
  { value: '4', label: '一百万内' },
  { value: '5', label: '三百万内' },
  { value: '6', label: '五百万内' },
  { value: '7', label: '五百万+' }
]

const platformData = [
  { value: '1', label: '淘宝' },
  // { value: '2', label: '腾讯', logo: txLogo },
  // { value: '3', label: '拼多多', logo: pddLogo },
  { value: '4', label: '抖音' },
  { value: '5', label: '快手' },
  { value: '6', label: '微视' },
  { value: '7', label: '小红书' },
  { value: '8', label: '其他' }
]

// 粉丝偏向
const fansFavoriteData = [
  { value: '1', label: '男女均衡' },
  { value: '2', label: '男粉较多' },
  { value: '3', label: '女粉较多' }
]

export default {
  platformData,
  goodsCategoryData,
  fansNumberData,
  fansFavoriteData
}
