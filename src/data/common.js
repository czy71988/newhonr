import dyLogo from '@/assets/logo-dy.jpg'
import ksLogo from '@/assets/logo-ks.jpg'
import wsLogo from '@/assets/logo-ws.jpg'
import xhsLogo from '@/assets/logo-xhs.jpg'
import otherLogo from '@/assets/logo-other.png'
import tbLogo from '@/assets/logo-tb.png'
import MLogo from '@/assets/new/iocn/canju@2x.png'
import KLogo from '@/assets/new/iocn/jiadianpeizhi-dianji@2x.png'
import ZLogo from '@/assets/new/iocn/meizhuang-2@2x.png'
import SLogo from '@/assets/new/iocn/路径 1312@2x.png'
import FLogo from '@/assets/new/iocn/fuzhuangdian@2x.png'
import JLogo from '@/assets/new/iocn/组 402@2x.png'
import QLogo from '@/assets/new/iocn/组 403@2x.png'

const platformData = [
  { value: '1', label: '淘宝', logo: tbLogo },
  { value: '2', label: '抖音', logo: dyLogo },
  { value: '3', label: '快手', logo: ksLogo },
  { value: '4', label: '微视', logo: wsLogo },
  { value: '5', label: '小红书', logo: xhsLogo },
  { value: '0', label: '其他', logo: otherLogo }
]

const platformshangjia = [
  { value: '1', label: '淘宝' },
  { value: '2', label: '天猫' },
  { value: '3', label: '拼多多' },
  { value: '4', label: '京东' },
  { value: '5', label: '供应商' }
]

const contentCategoryData = [
  { value: '1', label: '母婴玩具', logo: MLogo },
  { value: '2', label: '科技生活', logo: KLogo },
  { value: '3', label: '美妆护肤', logo: ZLogo },
  { value: '4', label: '美食攻略', logo: SLogo },
  { value: '5', label: '服装穿搭', logo: FLogo },
  { value: '6', label: '家居百货', logo: JLogo },
  { value: '0', label: '其他', logo: QLogo }
]

const contentCategoryData1 = [
  { value: '1', label: '搞笑娱乐', logo: MLogo },
  { value: '2', label: '萌宠动漫', logo: KLogo },
  { value: '3', label: '情感励志', logo: ZLogo },
  { value: '4', label: '教育知识', logo: SLogo },
  { value: '5', label: '母婴玩具', logo: FLogo },
  { value: '7', label: '颜值才艺', logo: JLogo },
  { value: '8', label: '健康养生', logo: JLogo },
  { value: '9', label: '游戏电竞', logo: JLogo },
  { value: '10', label: '汽车周边', logo: JLogo },
  { value: '11', label: '科技生活', logo: JLogo },
  { value: '12', label: '新闻媒体', logo: JLogo },
  { value: '13', label: '美妆护肤', logo: JLogo },
  { value: '14', label: '旅游攻略', logo: JLogo },
  { value: '15', label: '美食攻略', logo: JLogo },
  { value: '16', label: '教程技术', logo: JLogo },
  { value: '17', label: '综合种草', logo: JLogo },
  { value: '18', label: '服装穿搭', logo: JLogo },
  { value: '19', label: '家居百货', logo: JLogo },
  { value: '20', label: '剧情故事', logo: JLogo },
  { value: '21', label: '音乐', logo: JLogo },
  { value: '22', label: '时尚', logo: JLogo },
  { value: '23', label: '创意', logo: JLogo },
  { value: '24', label: '边框', logo: JLogo },
  { value: '0', label: '其他', logo: QLogo }
]

// 商家内容分类
const contentCategoryStoreData = [
  { value: '1', label: '居家日用' },
  { value: '2', label: '数码家电' },
  { value: '3', label: '美妆个护' },
  { value: '4', label: '食品饮料' },
  { value: '5', label: '时尚配饰' },
  { value: '6', label: '趣味玩具' },
  { value: '7', label: '精品女装' },
  { value: '8', label: '户外运动' },
  { value: '9', label: '精品箱包' },
  { value: '10', label: '潮流男装' },
  { value: '11', label: '鞋品' },
  { value: '12', label: '家装家纺' },
  { value: '13', label: '居家内衣' },
  { value: '14', label: '文娱车品' },
  { value: '15', label: '母婴用品' },
  { value: '0', label: '其他' }
]

// 粉丝偏向
const fansFavoriteData = [
  { value: '1', label: '男女均衡' },
  { value: '2', label: '男粉多' },
  { value: '3', label: '女粉多' }
]

// 认证主体
const authBodyData = [
  { value: '0', label: '未认证' },
  { value: '1', label: '个人认证' },
  { value: '2', label: '企业认证' }
]

// 订单状态 0待发货1已发货2已收货3已拒绝
const deliveryStatuData = [
  { value: '0', label: '待发货' },
  { value: '1', label: '已发货' },
  { value: '2', label: '已拒绝' },
  { value: '3', label: '已收货' }
]

// 审核状态 0待审核1审核通过2审核拒绝
const auditStateData = [
  { value: '0', label: '待审核' },
  { value: '1', label: '审核通过' },
  { value: '2', label: '审核拒绝' }
]

// 尺码
const sizeData = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL']

// 粉丝数量
const fansNumberData = [
  { value: '1', label: '10w以内' },
  { value: '2', label: '10w-30w' },
  { value: '3', label: '30w-50w' },
  { value: '4', label: '50w-100w' },
  { value: '5', label: '100w以上' }
]

// 获赞数量
const praisedNumberData = [
  { value: '1', label: '10w以内' },
  { value: '2', label: '10w-30w' },
  { value: '3', label: '30w-50w' },
  { value: '4', label: '50w-100w' },
  { value: '5', label: '100w-300w' },
  { value: '6', label: '300w-500w' },
  { value: '7', label: '500w以上' }
]

// 所在省份
const provinceData = [
  { value: '北京市', label: '北京市' },
  { value: '天津市', label: '天津市' },
  { value: '上海市', label: '上海市' },
  { value: '河北省', label: '河北省' },
  { value: '江苏省', label: '江苏省' },
  { value: '浙江省', label: '浙江省' },
  { value: '安徽省', label: '安徽省' },
  { value: '福建省', label: '福建省' },
  { value: '江西省', label: '江西省' },
  { value: '山东省', label: '山东省' },
  { value: '山西省', label: '山西省' },
  { value: '辽宁省', label: '辽宁省' },
  { value: '吉林省', label: '吉林省' },
  { value: '黑龙江省', label: '黑龙江省' },
  { value: '河南省', label: '河南省' },
  { value: '湖北省', label: '湖北省' },
  { value: '广东省', label: '广东省' },
  { value: '湖南省', label: '湖南省' },
  { value: '重庆市', label: '重庆市' },
  { value: '四川省', label: '四川省' },
  { value: '贵州省', label: '贵州省' },
  { value: '云南省', label: '云南省' },
  { value: '陕西省', label: '陕西省' },
  { value: '青海省', label: '青海省' },
  // { value: '台湾省', label: '台湾省' },
  { value: '甘肃', label: '甘肃' },
  { value: '西藏自治区', label: '西藏' },
  { value: '宁夏回族自治区', label: '宁夏' },
  { value: '新疆维吾尔自治区', label: '新疆' },
  { value: '广西壮族自治区', label: '广西省' },
  { value: '内蒙古自治区', label: '内蒙古' }
  // { value: '香港特别行政区', label: '香港' },
  // { value: '澳门特别行政区', label: '澳门' },
  // { value: '海外', label: '海外' }
]

const personalHonr = [
  { value: '1', label: '我的信息' },
  { value: '2', label: '我的订单' },
  { value: '3',
    label: '红人数据',
    children: [
      { value: '3-1', lable: '近期直播商品' },
      { value: '3-2', lable: '种草视屏' },
      { value: '3-3', lable: '近期合作商家' }
    ]
  },
  { value: '4', label: '修改密码' }
]

const personalStroe = [
  { value: '1', label: '我的信息' },
  { value: '2', label: '我的订单' },
  { value: '3',
    label: '红人数据',
    children: [
      { value: '3-1', lable: '近期直播商品' },
      { value: '3-2', lable: '种草视屏' },
      { value: '3-3', lable: '近期合作商家' }
    ]
  },
  { value: '4', label: '修改密码' }
]

export {
  platformData,
  contentCategoryData,
  contentCategoryStoreData,
  fansFavoriteData,
  authBodyData,
  deliveryStatuData,
  auditStateData,
  sizeData,
  platformshangjia,
  fansNumberData,
  praisedNumberData,
  provinceData,
  contentCategoryData1,
  personalHonr,
  personalStroe
}
