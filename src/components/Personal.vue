<template>
  <div class="personal">
    <div class="horn">
      <p class="honrn_p">个人中心</p>
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @select="handleSelect"
            @close="handleClose">
            <el-menu-item index="1">
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">我的订单</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <span>红人数据</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">近期直播商品</el-menu-item>
                <el-menu-item index="3-2">近期合作商家</el-menu-item>
                <el-menu-item index="3-3">种草视屏</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <span slot="title">修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div class="router-view-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { personalHonr, personalStroe } from '../data/common'
export default {
  data () {
    return {
      type: 'honren',
      personalHonr,
      personalStroe
    }
  },
  methods: {
    handleSelect (index) {
      console.log(index)
      if (index === '1') { this.$router.push({ name: 'personalMyxinxi' }) }
      if (index === '2') { this.$router.push({ name: 'personalMydingdan' }) }
      if (index === '3') { this.$router.push({ name: 'hongrenshangchuan' }) }
      if (index === '4') { this.$router.push({ name: 'personalMymima' }) }
    }
  }
}
</script>

<style lang="less">
  .personal {
    .el-menu {
      width: 170px;
      .el-submenu__icon-arrow {
        left: 115px;
      }
    }
    .el-submenu {
      text-align: center !important;
      .el-menu-item {
        min-width: 170px;
      font-size:14px;
      // font-family:PingFang SC;
      // font-weight:400;
      // // line-height:48px;
      // color:rgba(126,126,126,1);
      // opacity:1;
      }
    }
    .el-menu-item {
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      // line-height:48px;
      color:rgba(126,126,126,1);
      opacity:1;
    }

      .el-submenu__title {
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      // line-height:48px;s
      color:rgba(126,126,126,1);
      opacity:1;
      }
      .el-submenu__icon-arrow {
        margin-top: -3px;
      }
      .el-menu-item.is-active {
        color: #E8251D;
      }
  }

</style>

<style lang="less" scoped>
  .personal {
    padding: 80px 375px;
    box-sizing: border-box;
    background:rgba(247,247,247,1);
    .horn {
      width: 170px;
      background: #fff;
      // display: inline-block;
      float: left;
      margin-right: 40px;
      border-top: 2px solid rgba(232,37,29,1);
      .honrn_p {
        text-align: center;
        font-size:20px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:57px;
        color:rgba(85,85,85,1);
        opacity:1;
      }
      .tac {
        width: 170px;
      }
    }
    .router-view-wrap {
      padding-left: 210px;
      box-sizing: border-box;
      // display: inline-block;
      width: 100%;
      // width: 960px;
    }
  }
</style>
