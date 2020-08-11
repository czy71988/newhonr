
<!-- 红人列表项 -->
<template>
  <div class="honrList">
    <div class="hezi" @mouseenter="showDialog" @mouseleave="hideDialog">
      <img :src="item.imageUrl" alt="" class="touxiang">
      <img src="../../assets/new/douyin@2x.png" alt="" class="leibie">
      <div class="mengban"></div>
      <span class="leibieIcon">{{item.redskinsPlatform === '1' ? '淘宝' : (item.redskinsPlatform === '2' ? '抖音' : (item.redskinsPlatform === '3' ? '快手' : (item.redskinsPlatform === '4' ? '微视' : (item.redskinsPlatform === '5' ? '小红书' : '其他'))))}}</span>
      <p class="Pmingcheng">{{item.redskinsName}}</p>
      <p class="Pneirong">
        <span>{{item.contentType | contentCategoryFilter}}</span>
        <span class="neirongDiv">
          内容分类
        </span>
        <span>{{item.fansAmount}}万</span>
        <span class="neirongDiv">
          粉丝数量
        </span>
      </p>
      <div class="handleDialog" v-if="!ishow" @click="hongrenshuju(item.redskinsId)">
        <div class="dianji">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMyInf } from '@/api/user'
import { getUserInf } from '@/utils/auth'
export default {
  name: 'FavoriteListItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      centerDialogVisible: false,
      uuu: {},
      ishow: true
    }
  },
  methods: {
    hongrenshuju (id) {
      this.$router.push({ name: 'hongrenshuju', params: { redskinsId: id } })
    },
    honren ({ id }) {
      const { token, userType } = getUserInf()
      if (token && userType !== 2) {
        this.$alert('你还不是商家用户哦，请先登录商家账号', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          // this.$router.push('Login')
        })
      } else if (!token) {
        this.$alert('亲，你还不是商家用户哦，请先登录商家账号', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          this.$router.push({ name: 'login' })
        })
      } else {
        fetchMyInf({
          id
        }).then(data => {
          console.log('这是红人信息')
          console.log(data)
          this.uuu = data
        })
        // this.centerDialogVisible = true
        this.centerDialogVisible = true
      }
    },
    // 显示操作项
    showDialog (index, item) {
      console.log('移入事件')
      this.ishow = false
    },
    // 隐藏蒙层
    hideDialog (index, item) {
      this.ishow = true
      console.log('移出事件')
    }
  }
}
</script>

<style lang="less" scoped>
.honrList {
  .hezi {
    width:300px;
    height:300px;
    // background:rgba(243,243,243,1);
    background-color: #fff;
    position: relative;
    // margin-right: 20px;
    .leibie {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 61;
    }
    .mengban {
      width: 300px;
      height: 300px;
      opacity:0.2;
      background-color: black;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 60;
    }
    .leibieIcon {
      position: absolute;
      top: 10px;
      left: 45px;
      line-height: 30px;
      font-size:15px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      z-index: 61;
    }
    .touxiang {
      width:300px;
      height:300px;
      opacity:1;
      z-index: -1;
    }
    .Pmingcheng {
      font-size:20px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:28px;
      color:rgba(255,255,255,1);
      opacity:1;
      position: absolute;
      left: 10px;
      bottom: 40px;
      z-index: 61;
    }
    .Pneirong {
      position: absolute;
      left: 10px;
      bottom: 12px;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:20px;
      color:rgba(255,255,255,1);
      opacity:1;
      z-index: 999;
      span {
        margin-right: 10px;
      }
      .neirongDiv {
        display: inline-block;
        width:54px;
        height:19px;
        background:rgba(232,138,29,1);
        opacity:1;
        border-radius:10px;
        font-size:9px;
        text-align: center;
      }
    }
    .handleDialog {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      background:#000;
      opacity:0.3;
      width:300px;
      height:300px;
      .dianji {
        text-align: center;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        img {
          width:30px;
          height:27px;
          opacity:1;
        }
        .iconP {
          font-size:27px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          opacity:1;
        }
      }
    }
  }
}
  @media screen and (max-width: 1024px) {

  }
</style>
