<!-- 选品榜列表项 -->
<template>
  <li class="cpt-goods-list-item item">
    <div @mouseenter="show1Dialog" @mouseleave="hide1Dialog">
      <img class="dfdbhvbeimg" @click="handleGoodsItem(item.goodsId)" src="@/assets/load-err.png" v-real-src="item.goodsDrawingUrl" alt="">
      <!-- 鼠标移入显示申请取样 -->
      <div class="skjfhbvsb" v-if="show">
        <div class="shopTan">
          <p @click="hanldeApplicationSample(item)">
            <span>
              <img class="shenqinggouwu" src="../../assets/new/购物车.png" alt="">
            </span>
            <span>申请取样</span>
          </p>
        </div>
      </div>
    </div>
    <p class="p1">
      <span>¥</span>
      <span>{{item.goodsDiscountsPrice-0}}</span>
      <s>¥{{item.goodsPrice-0}}</s>
      <span class="skdsdfhvbkh">
        <span>佣金:</span>
        <span>{{item.commissionRate}}%</span>
      </span>
    </p>
    <p class="p2">
      {{item.goodsName}}
    </p>
    <p class="p3">
      <span>{{item.marketPlatform === 1 ? '淘宝' : (item.marketPlatform === 2 ? '天猫' : (item.marketPlatform === 4 ? '京东' : (item.marketPlatform===3 ? '拼多多' : '供应商')))}}</span>
      <span>券 ¥ {{item.discountsCoupon || 0}}</span>
      <span>商品有效期:{{item.goodsValidity | datafilter}}</span>
    </p>
  </li>
</template>

<script>

// import { clearUserFromLocation } from '@/utils/auth'
// import { getUserFromLocation } from '@/utils/auth'
export default {
  name: 'GoodsListItem',
  props: {
    item: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  data () {
    return {
      show: false,
      token: sessionStorage.getItem('token'),
      type: sessionStorage.getItem('type')
    }
  },
  methods: {

    // ==================================================================
    show1Dialog () {
      this.show = true
    },
    hide1Dialog () {
      this.show = false
    },
    // ==================================================================
    // 申请取样
    hanldeApplicationSample (item) {
      if (!this.token && !this.type) {
        this.$message.error('您还未登陆账号，请先登陆红人账号')
      } else if (this.type !== 1) {
        this.$message.error('请先登陆红人账号')
      } else {
        this.$router.push({ name: 'applicationSample', query: { item: item } })
      }
    },
    handleGoodsItem (id) { // 点击商品榜列表项
      this.$router.push({ name: 'newshop', query: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>

.cpt-goods-list-item {
  &.item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    float: left;
    width: 294px;
    height: 445px;
    background:rgba(255,255,255,1);
    // padding: 12px 9px;
    padding: 12px 9px 0 12px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(237,237,237,1);
  }
  div {
    // position: relative;
    .dfdbhvbeimg {
      width: 270px;
      height: 270px;
    }
    .skjfhbvsb {
      // width: 270px;
      // height: 270px;
      // // background-color: #000;
      // // opacity: 0.5;
      // position: absolute;
      // left: 0;
      // top: 0;z-index: 9998;
      .shopTan {
        width: 270px;
        height: 38px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #E8251D;
        z-index: 9999;
          // opacity:1;
        P {
          line-height: 38px;
          text-align: center;
          font-size:18px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(255,255,255,1);
          // opacity:1;
          .shenqinggouwu {
            width: 20px;
            height: 18px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .p1 {
    span:nth-child(1) {
      font-size: 16px;
      color: #E8251D;
      font-family:PingFangSC-Medium;
    }
    span:nth-child(2) {
      font-size: 24px;
      color: #E8251D;
      font-family:PingFangSC-Medium;
      // margin-right: 20px;
    }
    s {
      font-size: 12px;
      color: #999999;
      font-family:PingFangSC-Medium;
      // margin-right: 20px;
    }
    .skdsdfhvbkh {
      float: right;
      margin-right: 10px;
      span:nth-child(1) {
        font-size: 16px;
        color: #666666;
        font-family:PingFangSC-Semibold;
      }
      span:nth-child(2) {
        font-size: 16px;
        color: #E8251D;
        font-family:Source Han Sans CN ;
      }
    }

  }
  .p2 {
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    opacity:1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .p3 {
    line-height: 40px;
    border-top: 1px solid rgba(220,220,220,1);
    span:nth-child(1) {
      padding: 0 5px;
      box-sizing: border-box;
      display: inline-block;
      // width: 34px;
      height: 20px;
      border:1px solid rgba(232,37,29,1);
      opacity:1;
      border-radius:3px;
      line-height: 20px;
      text-align: center;
      font-size:13px;
      font-family:PingFang SC;
      font-weight:400;
      // line-height:12px;
      color:rgba(232,37,29,1);
      opacity:1;
      margin-right: 10px;
    }
    span:nth-child(2) {
      display: inline-block;
      width:50px;
      height:20px;
      background:rgba(253,102,105,1);
      opacity:1;
      font-size:9px;
      font-family:DINPro;
      font-weight:400;
      line-height:20px;
      color:rgba(255,255,255,1);
      opacity:1;
      text-align: center;
    }
    span:nth-child(3) {
      float: right;
      font-size:14px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(232,37,29,1);
      opacity:1;
    }
  }
}
</style>
