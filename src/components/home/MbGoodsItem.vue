<template>
  <li class="goods-item" @click="handleGoodsItem(item.id)">
    <div class="item-ctn">
      <div class="item-img-wrap">
        <!-- <img class="item-img" src="@/assets/goods-img.jpg" alt=""> -->
        <img class="item-img" src="@/assets/load-err.png" v-real-src="item.goodimg" alt="">
        <!-- <span class="item-pingtai-zhanshi">{{item.platform === 0 ? '淘宝' : (item.platform === 1 ? '天猫' : (item.platform === 3 ? '京东' : (item.platform===2 ? '拼多多' : '供应商')))}}</span> -->
        <!-- <span class="item-sales-volume">销量：{{item.monthvolume || 0}}</span> -->
      </div>
      <p class="item-title">
        <span class="ggggg">{{item.platform === 0 ? '淘宝' : (item.platform === 1 ? '天猫' : (item.platform === 3 ? '京东' : (item.platform===2 ? '拼多多' : '供应商')))}}</span>{{item.sputitle}}
        {{item.sputitle}}
      </p>
      <div class="row">
        <div class="clearfix"><span class="item-dicount-price">¥{{item.disprice - 0}}</span><span class="item-price">￥{{item.orprice - 0}}</span></div>
        <div class="item-coupon">
          <img src="@/assets/coupon.png" alt="">
          <span class="coupon-amount">{{item.coupon - 0 || 0}}</span>
        </div>
      </div>
      <div class="shangpinyuxiaoqi">
        <span>商品有效期：</span>
        <span>{{item.expirationDate}}</span>
      </div>
      <div class="row">
        <div class="item-commission">佣金<span class="item-commission-percent">{{item.proportion || 0}}%</span></div>
      </div>
      <button class="item-btn" @click.stop="hanldeApplicationSample(item)">申请取样</button>
    </div>
  </li>
</template>

<script>
import { getUserInf } from '@/utils/auth'
export default {
  name: 'mbGoodsItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleGoodsItem (id) { // 点击商品榜列表项
      // window.location.href = url
      // window.open(url, '_blank')
      let routeUrl = this.$router.resolve({
        path: 'newshop',
        query: { id: id }
      })
      window.open(routeUrl.href, '_blank')
    },
    // 申请样品
    hanldeApplicationSample (item) {
      const { id, bindId } = item
      const { token, userType, state } = getUserInf()
      if (!token || userType !== 1) {
        this.$alert('你还不是红人用户哦，请先登录红人账号', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          // this.$router.push('Login')
        })
      } else if (state !== 2) {
        this.$alert('亲，您的账号还未通过审核哦，请联系客服完成审核吧', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          this.$router.push({ name: 'personalMyxinxi' })
        })
      } else {
        this.$router.push({ name: 'applicationSample', query: { gid: id, bindId } })
      }
    }
  }
}
</script>

<style lang="less" scoped>

.ggggg {
  color: #ffffff;
  background-color: #fd3069;
  margin-right: 5px;
}
.shangpinyuxiaoqi {
  // margin-left: 10px;
  text-align: left;
  font-size: 12px;
}

.item-pingtai-zhanshi {
  display: block;
  height:20px;
  // height:100%;
  // padding: 10px 13px;
  box-sizing: border-box;
  background:rgba(255,65,91,1);
  // border-radius:0px 0px 100px 100px;
  // opacity:0.8;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}
 .item-ctn {
    box-sizing: border-box;
    width:100%;
    height: 100%;
    background:rgba(255,255,255,1);
    padding: 10px 9px;
    &:hover {
      cursor: pointer;
      .item-img-wrap::before {
        position: absolute;
        content: ' ';
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        opacity: .2;
        z-index: 100;
      }
    }
    .item-img-wrap {
      position: relative;
      width: 100%;
      padding-top: 100%;
      overflow: hidden;
      img {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
      }
    }

    .item-sales-volume {
      position: absolute;
      bottom: 4px;
      height: 20px;
      line-height: 20px;
      right: 0px;
      background:rgba(0,0,0,0.6);
      color: #ffffff;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      padding: 2px 4px;
      border-radius: 3px;
    }

    .item-title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-align: justify;
      white-space: normal;
      margin-top: 2px;
    }

    .item-dicount-price {
      float: left;
      height: 28px;
      line-height: 28px;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(254,58,96,1);
      margin-right: 2px;
    }
    .item-price {
      float: left;
      margin-top: 0px;
      height: 28px;
      line-height: 28px;
      font-size:11px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(170,170,170,1);
      text-decoration: line-through;
    }
    .row {
      margin-top: 1px;
      position: relative;
    }
    .item-coupon {
      width: 60px;
      height: 20px;
      position: absolute;
      right: 0px;
      font-size: 12px;
      top: 5px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .coupon-amount {
        display: block;
        // width: 26px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 75%;
        transform: translate(-50%, -50%);
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,116,116,1);
      }
    }

    .item-btn {
      margin-top: 0px;
      width: 100%;
      height: 35px;
      line-height: 35px;
      border-radius: 24px;
      background: linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
      color: #ffffff;
      &:hover {
        background:linear-gradient(90deg,#E12039 0%,#E12039 100%);
      }
    }

    .item-commission {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-align: left;
      .item-commission-percent {
        color: #FE3A60;
      }
    }
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 330px) {
  .item-ctn {
    .item-price {
      font-size: 10px;
    }
    .item-dicount-price {
      font-size: 10px;
    }
    .item-coupon {
      .coupon-amount {
        font-size: 10px;
      }
    }
  }
}
</style>
