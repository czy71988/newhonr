<template>
  <div class="newshop">
    <p class="top">
      <span>{{item.marketPlatform | platformStoreFilter}}</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{item.goodsType | contentCategoryFilter}}</span>
      <i class="el-icon-arrow-right"></i>
      <span>{{item.goodsName}}</span>
    </p>
    <div class="LLLL">
      <div class="Ltop">
        <img :src="item.goodsDrawingUrl" alt="">
        <p class="LtopP1">
          <span>{{item.marketPlatform | platformStoreFilter}}</span>
          <span>{{item.goodsName}}</span>
        </p>
        <p class="LtopP2">
          <span>优惠价</span>
          <span>¥</span>
          <span>{{item.goodsDiscountsPrice}}</span>
          <span class="flr">销量：<span>{{item.goodsSales}}</span></span>
        </p>
        <p class="LtopP3">
          <span>价 格</span>
          <s>¥{{item.goodsPrice}}</s>
        </p>
        <p class="LtopP4">
          <span>优 惠</span>
          <span>券 ¥ {{item.discountsCoupon || '0'}}</span>
        </p>
        <p class="LtopP5">
          <span>佣 金</span>
          <span>佣金:</span>
          <span>{{item.commissionRate || '0'}}%</span>
        </p>
        <p class="LtopP6">
          <span>日 期</span>
          <span>商品有效期：{{item.goodsValidity || ''}}</span>
        </p>
        <p class="LtopP7">
          <span>店 铺</span>
          <span>{{item.shopName}}</span>
          <i class="el-icon-arrow-right"></i>
        </p>
        <div class="btn">
          <p>
            <span class="dfjbkdtt">
              <img src="../../assets/new/购物车.png" alt="">
            </span>
            <span @click="hanldeApplicationSample(this.item)">
              申请取样
            </span>
          </p>
        </div>
      </div>

      <div class="content">

        <div class="cenleft">
          <p class="cenleft-top">
            <span>为你推荐</span>
          </p>
          <ul>
            <li>
              <img src="../../assets/new/测试.png" alt="">
              <p class="ul-li-p1">
                <span>¥</span>
                <span>134</span>
                <s>134.00</s>
                <span>佣金<span>10%</span></span>
              </p>
              <p class="ul-li-p2">多芬沐浴磨砂震撼价多芬沐浴磨砂震撼价多芬沐浴磨砂震撼价磨撼…</p>
              <p class="ul-li-p3"></p>
              <p class="ul-li-p4">
                <span>京东</span>
                <span>券 ¥ 10</span>
                <span>商品有效期：2020-01-01</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="cenright">
          <p class="cenleft-top">
            <span>商品详情图</span>
          </p>
          <ul>
            <li v-for="item in shopUrls" :key="item">
              <img :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { platformshangjia } from '../../data/common'
// import { getGoodsDetail } from '../../api/goods'
// import { huoquxiangqingtu } from '../../api/user'
export default {
  data () {
    return {
      list: [],
      goodsurl: '',
      tupian2: '',
      detailImgs: [],
      // platformshangjia,
      uploader: {
        oldFiles: []
      },
      item: {},
      shopUrls: []
    }
  },
  mounted () {
    this.item = this.$route.query.item
    const urlss = this.item.goodsDetailsPicture
    console.log('-商品详情图-', urlss)
    this.shopUrls = () => {
      return urlss.split(',')
    }
    console.log('切割出来的url', this.shopUrls)
    // this.getshops()
    // this.huoqu()
  },
  methods: {
    hanldeApplicationSample (item) {
      this.$router.push({ name: 'applicationSample' })
    }

  }

  // const goodsId = this.$route.query.goodsId
}
</script>

<style lang="less" scoped>
  .newshop {
    .top {
      line-height: 60px;
      background-color:#F7F7F7 ;
      padding: 0 375px;
      box-sizing: border-box;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:37px;
      color:rgba(102,102,102,1);
      opacity:1;
      margin-bottom: 20px;
      i {
        margin: 0 5px;
      }
      span:nth-child(5) {
        // display: inline-block;
        // display: inline-block;
        width: 300px;
        word-break: break-all;
        display: -webkit-box; /**对象作为伸缩盒子模型展示**/
        -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
        -webkit-line-clamp: 1; /**显示的行数**/
        overflow: hidden; /**隐藏超出的内容**/
      }
    }
    .LLLL {
      padding: 0 375px;
      box-sizing: border-box;
      .Ltop {
        height: 458px;
        width: 100%;
        position: relative;
        img {
          width: 458px;
          height: 458px;
          float: left;
          margin-right: 30px;
        }
        p {
          // line-height: 62px;
        }
        .LtopP1 {
          margin-bottom: 16px;
          span {
            font-size:25px;
            font-family:PingFang SC;
            font-weight:500;
            // line-height:42px;
            color:rgba(51,51,51,1);
            opacity:1;
          }
          span:nth-child(1) {
            display: inline-block;
            padding: 0 5px;
            box-sizing: border-box;
            // width:52px;
            height:28px;
            border:1px solid rgba(232,37,29,1);
            opacity:1;
            border-radius:6px;
            font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            // line-height:28px;
            color:rgba(232,37,29,1);
            opacity:1;
            text-align: center;
            margin-right: 10px;
          }
        }
        .LtopP2 {
          line-height: 62px;
          background-color: #F0F0F0;
          span:nth-child(1) {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:62px;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-right: 30px;
          }
          span:nth-child(2) {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:62px;
            color:rgba(232,37,29,1);
            opacity:1;
          }
          span:nth-child(3) {
            font-size: 32px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:62px;
            color:rgba(232,37,29,1);
            opacity:1;
          }
          .flr {
            float: right;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:62px;
            color:rgba(102,102,102,1);
            opacity:1;
            span {
              font-size:22px;
              font-family:PingFang SC;
              font-weight:500;
              line-height:62px;
              color:rgba(232,37,29,1);
              opacity:1;
            }
          }
        }
        .LtopP3 {
          line-height: 62px;
          background-color: #F0F0F0;
          span {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:62px;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-right: 40px;
          }
          s {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:62px;
            color:rgba(102,102,102,1);
            opacity:1;
          }
        }
        .LtopP4 {
          // line-height: 62px;
          background-color: #F7F7F7;
          span:nth-child(1) {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:62px;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-right: 40px;
          }
          span:nth-child(2) {
            display: inline-block;
            width: 83px;
            height: 33px;
            border-radius: 5px;
            background:rgba(253,102,105,1);
            font-size:16px;
            font-family:DINPro;
            font-weight:400;
            line-height:33px;
            color:rgba(255,255,255,1);
            opacity:1;
            text-align: center;
          }
        }
        .LtopP5 {
          line-height: 62px;
          span:nth-child(1) {
          font-size:18px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:62px;
          color:rgba(102,102,102,1);
          opacity:1;
          margin-right: 40px;
          }
          span:nth-child(2) {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:62px;
            color:#666666;
            opacity:1;
          }span:nth-child(3) {
            font-size:24px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:62px;
            color:rgba(232,37,29,1);
            opacity:1;
          }
        }
        .LtopP6 {
          line-height: 62px;
          span {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            // line-height:22px;
            color:rgba(102,102,102,1);
            opacity:1;
          }
          span:nth-child(1) {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            // line-height:22px;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-right: 40px;
          }
        }
        .LtopP7 {
          line-height: 62px;
          span {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            // line-height:22px;
            color:rgba(252,132,127,1);
            opacity:1;
          }
          span:nth-child(1) {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            // line-height:22px;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-right: 40px;
          }
        }
        .btn {
          width:255px;
          height:60px;
          background:rgba(232,37,29,1);
          opacity:1;
          border-radius:10px;
          position: absolute;
          bottom: 0;
          right: 0;
          p {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:60px;
            color:rgba(255,255,255,1);
            opacity:1;
            text-align: center;
            .dfjbkdtt {
              display: inline-block;
                width: 22px;
                height: 22px;
              img{
                width: 22px;
                height: 22px;
                margin-right: 5px;
              }
            }
          }
        }
      }
      .content {
        margin-top: 80px;
        width: 100%;
        .cenleft {
          width: 334px;
          height: 100%;
          float: left;
          margin-right: 30px;
          .cenleft-top {
            line-height: 60px;
            background: rgba(247,247,247,1);
            padding: 0 20px;
            box-sizing: border-box;
            span {
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:60px;
              color:rgba(85,85,85,1);
              opacity:1;
              // display: inline-block;
              // height: 15px;
              border-left: 5px solid #E8251D;
              padding-right: 5px;
              box-sizing: border-box;
            }
          }
          ul {
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid rgba(226,226,226,1);
            li {
              display: block;
              width: 294px;
              height: 100%;
              // background-color: darkmagenta;
              img {
                width: 294px;
                height: 294px;
              }
              .ul-li-p1 {
                margin-top: 5px;
                margin-bottom: 5px;
                span:nth-child(1) {
                  font-size: 16px;
                  color: #E8251D;
                }
                span:nth-child(2) {
                  font-size:24px;
                  font-family:PingFang SC;
                  font-weight:500;
                  // line-height:17px;
                  color:rgba(153,153,153,1);
                  opacity:1;
                  margin-right: 10px;
                }
                s {
                  font-size:12px;
                  font-family:PingFang SC;
                  font-weight:500;
                  // line-height:17px;
                  color:rgba(153,153,153,1);
                  opacity:1;
                }
                span:nth-child(4) {
                  float: right;
                  font-size:16px;
                  font-family:PingFangSC-Semibold;
                  font-weight:400;
                  // line-height:22px;
                  color:#666666;
                  opacity:1;
                  span {
                    font-size:16px;
                    font-family:PingFang SC;
                    font-weight:400;
                    // line-height:22px;
                    color:rgba(232,37,29,1);
                    opacity:1;
                  }
                }
              }
              .ul-li-p2 {
                font-size:18px;
                font-family:PingFang SC;
                font-weight:500;
                // line-height:30px;
                color:rgba(51,51,51,1);
                // letter-spacing:15px;
                opacity:1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 5px;
              }
              .ul-li-p3 {
                display: block;
                width: 100%;
                height: 1px;
                border-bottom:1px solid rgba(220,220,220,1);
                margin-bottom: 5px;
              }
              .ul-li-p4 {
                margin-bottom: 20px;
                span:nth-child(1) {
                  display: inline-block;
                  width:34px;
                  height:20px;
                  border:1px solid rgba(232,37,29,1);
                  opacity:1;
                  border-radius:3px;
                  font-size:13px;
                  font-family:PingFang SC;
                  font-weight:400;
                  line-height:20px;
                  color:rgba(232,37,29,1);
                  opacity:1;
                  text-align: center;
                  margin-right: 10px;
                }
                span:nth-child(2) {
                  display: inline-block;
                  width:50px;
                  height:20px;
                  background:rgba(253,102,105,1);
                  opacity:1;
                  font-size:12px;
                  font-family:DINPro;
                  font-weight:400;
                  line-height:20px;
                  color:rgba(255,255,255,1);
                  opacity:1;
                  text-align: center;
                  margin-right: 30px;
                }
                span:nth-child(3) {
                  font-size:14px;
                  font-family:PingFang SC;
                  font-weight:400;
                  // line-height:22px;
                  color:rgba(232,37,29,1);
                  opacity:1;
                }
              }
            }
          }
        }
        .cenright {
          float: left;
          width: 749px;
          height: 100%;
          .cenleft-top {
            line-height: 60px;
            background: rgba(247,247,247,1);
            padding: 0 20px;
            box-sizing: border-box;
            span {
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:60px;
              color:rgba(85,85,85,1);
              opacity:1;
              // display: inline-block;
              // height: 15px;
              border-left: 5px solid #E8251D;
              padding-right: 5px;
              box-sizing: border-box;
            }
          }
          ul {
            li {
              img {
                width: 749px;
                height: 749px;
              }
            }
          }
        }
      }
    }
  }
</style>
