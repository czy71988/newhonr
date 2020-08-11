<template>
<!-- 个人中心 -->
<div>
  <div class="personai" v-if="usertype === 'favorite'">
    <div>
      <el-row class="tac">
        <el-col :span="8">
          <el-menu :default-active="defaultActiveIndex" class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" @close="handleClose">
            <el-menu-item ><h2>个人中心</h2></el-menu-item>
            <el-menu-item index="1"><i class="el-icon-menu"></i>我的信息</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-document"></i>我的订单</el-menu-item>

            <el-menu-item index="3"><i class="el-icon-document"></i>红人数据</el-menu-item>
            <!-- <el-menu-item index="3"><i class="el-icon-star-on"></i>我的申请</el-menu-item> -->
            <el-menu-item index="4"><i class="el-icon-setting"></i>修改密码</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="hy456">
    <router-view></router-view>
    </div>
  </div>
  <div class="personai" v-else id="shangjia">
    <div>
      <el-row class="tac">
        <el-col :span="8">
          <el-menu :default-active="defaultActiveIndex" class="el-menu-vertical-demo" @open="handleOpen1" @select="handleSelect1" @close="handleClose">
            <el-menu-item ><h2>个人中心</h2></el-menu-item>
            <el-menu-item index="1"><i class="el-icon-menu"></i>我的信息</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-date"></i>我的商品</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-date"></i>发票申请</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-document"></i>我的订单</el-menu-item>
            <!-- <el-menu-item index="4"><i class="el-icon-star-on"></i>我的申请</el-menu-item> -->
            <el-menu-item index="5"><i class="el-icon-setting"></i>修改密码</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="hy456">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>

import { getUserType } from '@/utils/auth'
// import PersonalMyxinxi from './Personal/personalMyxinxi'
// import PersonalMydingdan from './Personal/PersonalMydingdan'
// import PersonalMymima from './Personal/PersonalMymima'
// import PersonalMyshenqing from './Personal/PersonalMyshenqing'
// import MyInf from './store-user/MyInf'
// import shangjiamyshangping from './store-user/shangjiamyshangping'
// import shangjiadingdan from './store-user/shangjiadingdan'
// import shangjiashengqing from './store-user/shangjiashengqing'
// import shangjiamima from './store-user/shangjiamima'
export default {
  name: 'personal',
  components: {
    // PersonalMyxinxi,
    // PersonalMydingdan,
    // PersonalMymima,
    // PersonalMyshenqing,
    // MyInf,
    // shangjiamyshangping,
    // shangjiadingdan,
    // shangjiashengqing,
    // shangjiamima
  },
  // usertype: 2,
  data () {
    return {
      tabPosition: 'left',
      usertype: getUserType(),
      defaultActiveIndex: '1'
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
    handleOpen (index) {
      console.log(index)
    },
    handleOpen1 (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (index) {
      console.log(index)
      if (index === '1') { this.$router.push({ name: 'personalMyxinxi' }) }
      if (index === '2') { this.$router.push({ name: 'personalMydingdan' }) }
      if (index === '3') { this.$router.push({ name: 'hongrenshangchuan' }) }
      if (index === '4') { this.$router.push({ name: 'personalMymima' }) }
    },
    handleSelect1 (index) {
      // console.log(index)
      if (index === '1') { this.$router.push({ name: 'myInf' }) }
      if (index === '2') { this.$router.push({ name: 'shangjiamyshangping' }) }
      if (index === '3') { this.$router.push({ name: 'shangjiadingdan' }) }
      if (index === '4') { this.$router.push({ name: 'fapiao' }) }
      if (index === '5') { this.$router.push({ name: 'shangjiamima' }) }
    },
    // 切换到激活的菜单按钮,当刷新页面，解决用户从地址栏刷新页面，页面显示激活的菜单按钮与当前页不匹配
    swichToActivedMenuWithFreshPage (route) {
      let defaultActiveIndex = '1'
      const name = route.name
      if (name === 'personalMydingdan' || name === 'shangjiamyshangping') {
        defaultActiveIndex = '2'
      } else if (name === 'hongrenshangchuan' || name === 'shangjiadingdan') {
        defaultActiveIndex = '3'
      } else if (name === 'personalMymima' || name === 'fapiao') {
        defaultActiveIndex = '4'
      } else if (name === 'shangjiamima') {
        defaultActiveIndex = '5'
      }
      this.defaultActiveIndex = defaultActiveIndex
    }
  }
}
</script>

<style lang="less" scoped>
.personai {
  height: 100%;
}
body {
  background-color: #f8f8f8;
}
.hy456 {
  width: 950px;
  height: 100%;
    min-height: 68vh;
  margin-bottom: 100px;
  float: left;
  margin-left: 45px;
}
</style>

<style lang="less">
body {
  background-color: #f8f8f8;
}
  .personai {
    width: 1200px;
    height: 100%;
    // margin-top: 40px;
    margin: 40px auto;
    // margin-top: 5
    .el-row {
      width: 200px;
      float: left;
    }
    .el-col-8 {
      width: 200px;
    }
    .el-menu {
      // width: 200px;
      padding: 0 !important;
      text-align: center;
      .el-menu-item.is-active {
        color: #fff;
        background-color: #fd3269;
      }
      .el-menu-item{
        float: none !important;
      }
    }
  }
</style>
