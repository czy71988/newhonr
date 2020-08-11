<template>
<!-- 个人中心 -->
<div class="personal">
  <!-- 红人菜单 -->
  <div class="personal__menu menu__favorite" v-if="usertype === 'favorite'">
    <ul class="menu-list" ref="favoriteScrollNode">
      <li class="menu-list__item" :class="item.value === activedItem.favorite ? 'active' : ''"
        @click="handleFavoriteMenus(item.value, $event)"  v-for="item in favoriteMenus" :key="item.value">{{item.label}}</li>
    </ul>
  </div>
  <!-- 商家 -->
  <div class="personal__menu menu__store" v-else>
    <ul class="menu-list" ref="storeScrollNode">
      <li class="menu-list__item" :class="item.value === activedItem.store ? 'active' : ''" @click="handleStoreMenus(item.value, $event)"  v-for="item in storeMenus" :key="item.value">{{item.label}}</li>
    </ul>
  </div>
  <div class="router-view-wrap">
    <router-view></router-view>
  </div>
</div>
</template>
<script>

import { getUserType } from '@/utils/auth'
// 商家按钮
const storeMenus = [
  { label: '我的信息', value: 'storeInfMb' },
  { label: '我的商品', value: 'storeGoodsMb' },
  { label: '发票申请', value: 'fapiaoMb' },
  { label: '我的订单', value: 'storeOrderMb' },
  { label: '修改密码', value: 'shangjiamimaMb' }
]
// 红人按钮
const favoriteMenus = [
  { label: '我的信息', value: 'personalInfMb' },
  { label: '我的订单', value: 'personalOrderMb' },
  { label: '红人数据', value: 'personalOrderMb' },
  { label: '修改密码', value: 'personalUpdatePwdMb' }
]
Object.freeze(storeMenus)
Object.freeze(favoriteMenus)
export default {
  name: 'personal',
  components: {
  },
  data () {
    return {
      storeMenus,
      favoriteMenus,
      usertype: getUserType(),
      activedItem: {
        store: 'menu1',
        favorite: 'personalInfMb'
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.swichToActivedMenuWithFreshPage(to)
    next()
  },
  created () {
    this.usertype = getUserType()
    console.group('usertype')
    console.log(this.usertype)
    console.groupEnd()
    // console.log('personal created')
    this.swichToActivedMenuWithFreshPage(this.$route)
  },
  methods: {
    makeMenuBtnCenter (scrollNodeName, targetNode) {
      // 让被点击的按钮居中
      const menuBtnW = 88
      // alert(targetNode.offsetLeft)
      // alert(document.documentElement.clientWidth)
      const needScrollX = targetNode.offsetLeft - (document.body.clientWidth || document.documentElement.clientWidth) / 2 + menuBtnW / 2
      const scrollNode = this.$refs[scrollNodeName]
      if (scrollNode.scrollTo) scrollNode.scrollTo(needScrollX, 0)
      else scrollNode.scrollLeft = needScrollX
    },
    // 红人导航按钮
    handleFavoriteMenus (activedItem, e) {
      if (activedItem === this.activedItem.favorite) return
      this.activedItem.favorite = activedItem
      this.makeMenuBtnCenter('favoriteScrollNode', e.currentTarget)
      this.$router.push({ name: activedItem })
    },
    // 商家导航按钮
    handleStoreMenus (activedItem, e) {
      if (activedItem === this.activedItem.store) return
      this.activedItem.store = activedItem
      // 让被点击的按钮居中
      this.makeMenuBtnCenter('storeScrollNode', e.currentTarget)
      this.$router.push({ name: activedItem })
    },
    handleOpen (index) {
      console.log(index)
    },
    handleOpen1 (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 切换到激活的菜单按钮,当刷新页面，解决用户从地址栏刷新页面，页面显示激活的菜单按钮与当前页不匹配
    swichToActivedMenuWithFreshPage (route) {
      // 如果路由名称为红人则，设置当前激活项为红人导航项，反之商家
      const name = route.name
      if (name === 'personalInfMb' || name === 'personalOrderMb' || name === 'personalUpdatePwdMb') {
        this.activedItem.favorite = name
      } else {
        this.activedItem.store = name
      }
    }
  }
}
</script>

<style lang="less" scoped>
.personal {
  width: 100%;
}
.personal__menu {
  width: 100%;
  margin-bottom: 15px;
  .menu-list {
    overflow-y: auto;
    white-space: nowrap;
    text-align: center;
    padding:0px 5px;
    &::-webkit-scrollbar {
      display: none;
    }
    .menu-list__item {
      display: inline-block;
      width: 80px;
      font-size: 14px;
      padding: 3px 4px;
      border-radius: 18px;
      transition: all .15s linear;
      &.active {
        color: #ffffff;
        background: linear-gradient(90deg, #fd3069 0%, #ff4459 100%);
      }
    }
  }
}
.router-view-wrap {
  width: 100%;
}
</style>
