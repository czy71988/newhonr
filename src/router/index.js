import Vue from 'vue'
import VueRouter from 'vue-router'
import Personal from '../components/Personal.vue'
import Login from '../views/Login.vue'
import Goods from '@/views/Goods.vue'
import SelectionRank from '@/components/SelectionRank.vue'
import GoodsSample from '@/components/application-sample/GoodsSample.vue'
import Index from '@/views/Index.vue'
import changepassword from '@/views/passeord.vue'
import registered from '@/components/Registered.vue'
// import fuwuxieyi from '../components/register/fuwutiaokuan.vue'
// import Test from '@/views/Test.vue'

Vue.use(VueRouter)
// 防止跳转同路由报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location) {
  return originalReplace.call(this, location).catch(err => err)
}

const indexChildrenRouter = [
  {
    path: 'home',
    component: () => import('@/views/Home.vue'),
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  {
    path: 'favorite',
    component: () => import('@/components/Favorite.vue'),
    name: 'favorite'
  },
  // 商品详情落地页
  {
    path: 'newshop',
    component: () => import('@/components/common/newshop.vue'),
    name: 'newshop'
  },
  // 选品榜 申请样例
  {
    path: 'goods',
    component: () => import('@/views/Goods.vue'),
    name: 'goods',
    redirect: 'goods/list',
    children: [
      {
        path: 'list/mb',
        name: 'goodsListMb',
        component: () => import('@/components/SelectionRankMb.vue'),
        meta: {
          title: '选品榜'
        }
      },
      {
        path: 'list',
        name: 'goodsList',
        component: () => import('@/components/SelectionRank.vue'),
        meta: {
          title: '选品榜'
        }
      },
      {
        path: 'sample/application',
        name: 'applicationSample',
        component: () => import('@/components/ApplicationSample.vue'),
        meta: {
          title: '选品榜', auth: true
        }
      },
      {
        path: 'mb/sample/application',
        name: 'applicationSampleMb',
        component: () => import('@/components/ApplicationSampleMb.vue'),
        meta: {
          title: '选品榜'
        }
      }
    ]
  },
  // 红人榜
  {
    path: 'favorite',
    name: 'favorite',
    component: () => import('@/components/Favorite.vue'),
    meta: { title: '红人榜' }
  },
  // 红人详情页
  {
    path: 'hongrenshuju',
    name: 'hongrenshuju',
    component: () => import('@/components/hongrenshuju.vue'),
    meta: { auth: false }
  },
  // 移动版红人榜
  {
    path: 'favorite/mb',
    name: 'favoriteMb',
    component: () => import('@/components/FavoriteMb.vue'),
    meta: { title: '红人榜' }
  },
  // 中通仓配
  {
    path: 'peicang',
    name: 'peicang',
    component: () => import('@/components/peicang.vue'),
    meta: { title: '中通配仓' }
  },
  // 合作案例
  {
    path: 'hezuoanli',
    name: 'hezuoanli',
    component: () => import('@/components/hezuoanli.vue'),
    meta: { title: '合作案例' }
  },
  // 合作案例
  {
    path: 'phoneMe',
    name: 'phoneMe',
    component: () => import('@/components/phoneMe.vue'),
    meta: { title: '合作案例' }
  },
  // 移动版个人中心 mb
  {
    path: 'mb/personal',
    name: 'persoanlMb',
    component: () => import('@/components/PersonalMb.vue'),
    children: [
      // 红人
      {
        path: 'inf',
        name: 'personalInfMb',
        meta: { auth: true },
        component: () => import('@/components/Personal/mb/personalInf.vue')
      },
      {
        path: 'order',
        name: 'personalOrderMb',
        meta: { auth: true },
        component: () => import('@/components/Personal/mb/PersonalOrder.vue')
      },
      {
        path: 'updatePwd',
        name: 'personalUpdatePwdMb',
        meta: { auth: true },
        component: () => import('@/components/Personal/mb/PersonalUpdatePwd.vue')
      },
      {
        path: 'personalMyshenqing',
        name: 'personalMyshenqingMb',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMyshenqing.vue')
      },
      // 商家
      {
        path: 'storeinf',
        name: 'storeInfMb',
        meta: { auth: true },
        component: () => import('@/components/store-user/mb/storeInf.vue')
      },
      {
        path: 'storeGoods',
        name: 'storeGoodsMb',
        meta: { auth: true },
        component: () => import('@/components/store-user/mb/storeGoods.vue')
      },
      {
        path: 'fapiao',
        name: 'fapiaoMb',
        meta: { auth: true },
        component: () => import('@/components/store-user/mb/storeFapiao.vue')
      },
      {
        path: 'storeOrder',
        name: 'storeOrderMb',
        meta: { auth: true },
        component: () => import('@/components/store-user/mb/storeOrder.vue')
      },
      // {
      //   path: 'shangjiamima',
      //   name: 'shangjiamimaMb',
      //   meta: { auth: true },
      //   component: () => import('@/components/store-user/mb/shangjiamima.vue')
      // },
      {
        path: 'shangjiashengqing',
        name: 'shangjiashengqingMb',
        meta: { auth: true },
        component: () => import('@/components/store-user/shangjiashengqing.vue')
      },
      {
        path: 'uploadGoods',
        name: 'storeUploadGoodsMb',
        meta: { auth: true },
        component: () => import('@/components/store-user/mb/storeUploadGoods.vue')
      }
    ]
  },
  // 个人中心p
  {
    path: 'personal',
    name: 'personal',
    component: () => import('@/components/Personal.vue'),
    children: [
      // 红人
      {
        path: 'personalMyxinxi',
        name: 'personalMyxinxi',
        meta: { auth: true },
        component: () => import('@/components/Personal/personalMyxinxi.vue')
      },
      {
        path: 'personalMydingdan',
        name: 'personalMydingdan',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMydingdan.vue')
      },
      {
        path: 'personalMymima',
        name: 'personalMymima',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMymima.vue')
      },
      {
        path: 'personalMyshenqing',
        name: 'personalMyshenqing',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMyshenqing.vue')
      },
      {
        path: 'hongrenshangchuan',
        name: 'hongrenshangchuan',
        meta: { auth: true },
        component: () => import('@/components/Personal/hongrenshangchuan.vue')
      },
      {
        path: 'PersonalMyshop',
        name: 'PersonalMyshop',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMyshop.vue')
      },
      {
        path: 'PersonalMyStore',
        name: 'PersonalMyStore',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMyStore.vue')
      },
      {
        path: 'PersonalMyVideo',
        name: 'PersonalMyVideo',
        meta: { auth: true },
        component: () => import('@/components/Personal/PersonalMyVideo.vue')
      },
      // 商家
      {
        path: 'myInf',
        name: 'myInf',
        meta: { auth: true },
        component: () => import('@/components/store-user/MyInf.vue')
      },
      {
        path: 'shangjiamyshangping',
        name: 'shangjiamyshangping',
        meta: { auth: true },
        component: () => import('@/components/store-user/shangjiamyshangping.vue')
      },
      {
        path: 'fapiao',
        name: 'fapiao',
        meta: { auth: true },
        component: () => import('@/components/store-user/fapiao.vue')
      },
      {
        path: 'shangjiadingdan',
        name: 'shangjiadingdan',
        meta: { auth: true },
        component: () => import('@/components/store-user/shangjiadingdan.vue')
      },
      {
        path: 'shangjiamima',
        name: 'shangjiamima',
        meta: { auth: true },
        component: () => import('@/components/store-user/shangjiamima.vue')
      },
      {
        path: 'shangjiashengqing',
        name: 'shangjiashengqing',
        meta: { auth: true },
        component: () => import('@/components/store-user/shangjiashengqing.vue')
      },
      {
        path: 'shangchaun',
        name: 'shangchaun',
        meta: { auth: true },
        component: () => import('@/components/store-user/shangchaun.vue')
      },
      // 修改商品信息
      {
        path: 'upshangjiashangpin',
        name: 'upshangjiashangpin',
        meta: { auth: true },
        component: () => import('../components/store-user/upshangjiashangpin.vue')
      }
    ]
  },
  // 账号转让 出售-购买
  {
    path: 'account',
    name: 'account',
    component: () => import('@/views/AccountTransfer.vue'),
    meta: { title: '账号转让' },
    children: [
      // 我要出售
      {
        path: 'sale',
        name: 'accountSale',
        component: () => import('@/components/AccountTransferSale.vue'),
        meta: { title: '账号转让', auth: true }
      },
      // 我要购买
      {
        path: 'buy',
        name: 'accountBuy',
        component: () => import('@/components/AccountTransferBuy.vue'),
        meta: { title: '账号转让' }
      }
    ]
  },
  // 关于我们
  {
    path: 'about',
    name: 'about',
    component: () => import('@/components/About.vue'),
    meta: { title: '关于我们' }
  },
  // 服务商
  {
    path: 'Service',
    name: 'Service',
    component: () => import('@/components/Service.vue'),
    meta: { title: '服务商' }
  }
]

const routes = [
  { path: '/',
    name: 'index',
    redirect: '/home',
    component: Index,
    children: indexChildrenRouter
  },
  { path: '/personal', name: 'personal', component: Personal },
  { path: '/changepassword', name: 'changepassword', component: changepassword },
  { path: '/login', name: 'login', component: Login },
  // 注册页
  {
    path: '/registered',
    name: 'registered',
    component: registered
  },
  {
    path: '/goods',
    component: Goods,
    children: [
      {
        path: '',
        component: SelectionRank
      },
      {
        path: 'application',
        name: 'myApplication',
        component: GoodsSample
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
