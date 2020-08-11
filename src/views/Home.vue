<template>
  <div>

    <div class="honrHome">
      <div class="Topbanner">
        <div class="TopbannerImgdiv1">
          <img :src="bannerimg1" alt="" class="TopbannerImg1">
          <img :src="bannerimg2" alt="" class="TopbannerImg2">
        </div>
        <img :src="bannerimg3" alt="" class="TopbannerImg3">
        <div class="TopbannerImgdiv2">
          <img :src="bannerimg4" alt="" class="TopbannerImg4">
          <img :src="bannerimg5" alt="" class="TopbannerImg5">
        </div>
      </div>

      <!-- 好品推荐 -->
      <div class="Homehaopin">
        <router-link :to="{name: 'goodsList'}">
          <img class="Goodproductrecommendation" :src="haopinimg" alt="">
        </router-link>
        <div class="Homehaopindiv" @mouseenter="showDialog" @mouseleave="hideDialog" v-for="item in haohuoList_shop" :key="item.id">
          <div class="shopImg">
            <img :src="item.rtgGoodsDto.goodsDrawingUrl" alt="" @click="handleGoodsItem(item)">
            <p class="Homehaopinnumber">
              <span class="numberSpan1">¥{{item.rtgGoodsDto.goodsDiscountsPrice}}</span>
              <s class="numberSpan2">¥{{item.rtgGoodsDto.goodsPrice}}</s>
              <span class="numberSpan3">佣金:<span class="numberSpan4">{{item.rtgGoodsDto.commissionRate}}%</span></span>
            </p>
            <p class="shopname">
              {{item.rtgGoodsDto.goodsName}}
            </p>
            <div class="shopquan">
              <div class="shopquankuang"> {{item.rtgGoodsDto.marketPlatform === 1 ? '淘宝' : (item.rtgGoodsDto.marketPlatform === 2 ? '天猫' : (item.rtgGoodsDto.marketPlatform === 4 ? '京东' : (item.rtgGoodsDto.marketPlatform===3 ? '拼多多' : '供应商')))}}</div>
              <div class="shopquan1">券 ¥ {{item.rtgGoodsDto.discountsCoupon || '0'}}</div>
              <span>商品有效期：{{item.rtgGoodsDto.goodsValidity | datafilter}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 热销榜单 -->
      <div class="rexio">
        <p class="biaotitu">
          <img src="../assets/new/组 509@2x.png" alt="">
        </p>

        <!-- 第一模块 -->
        <div class="Homehaopin">
          <img class="Goodproductrecommendation" :src="this.rexiao_shop1" alt="">
          <div class="Homehaopindiv" @mouseenter="showDialog" @mouseleave="hideDialog" v-for="item in rexiaoList1" :key="item.id">
            <div class="shopImg">
              <img :src="item.rtgGoodsDto.goodsDrawingUrl" alt="" @click="handleGoodsItem(item)">
              <p class="Homehaopinnumber">
                <span class="numberSpan1">¥{{item.rtgGoodsDto.goodsDiscountsPrice}}</span>
                <s class="numberSpan2">¥{{item.rtgGoodsDto.goodsPrice}}</s>
                <span class="numberSpan3">佣金:<span class="numberSpan4">{{item.rtgGoodsDto.commissionRate}}%</span></span>
              </p>
              <p class="shopname">
                {{item.rtgGoodsDto.goodsName}}
              </p>
              <div class="shopquan">
                <div class="shopquankuang">{{item.rtgGoodsDto.marketPlatform === 1 ? '淘宝' : (item.rtgGoodsDto.marketPlatform === 2 ? '天猫' : (item.rtgGoodsDto.marketPlatform === 4 ? '京东' : (item.rtgGoodsDto.marketPlatform===3 ? '拼多多' : '供应商')))}}</div>
                <div class="shopquan1">券 ¥ {{item.rtgGoodsDto.discountsCoupon || '0'}}</div>
                <span>商品有效期：{{item.rtgGoodsDto.goodsValidity | datafilter}}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二模块 -->
        <div class="Homehaopin mokuaiyi">
          <img class="Goodproductrecommendation" :src="this.rexiao_shop2" alt="">
          <div class="Homehaopindiv" @mouseenter="showDialog" @mouseleave="hideDialog" v-for="item in rexiaoList2" :key="item.id">
            <div class="shopImg">
              <img :src="item.rtgGoodsDto.goodsDrawingUrl" alt="" @click="handleGoodsItem(item)">
              <p class="Homehaopinnumber">
                <span class="numberSpan1">¥{{item.rtgGoodsDto.goodsDiscountsPrice}}</span>
                <s class="numberSpan2">¥{{item.rtgGoodsDto.goodsPrice}}</s>
                <span class="numberSpan3">佣金:<span class="numberSpan4">{{item.rtgGoodsDto.commissionRate}}%</span></span>
              </p>
              <p class="shopname">
                {{item.rtgGoodsDto.goodsName}}
              </p>
              <div class="shopquan">
                <div class="shopquankuang">{{item.rtgGoodsDto.marketPlatform === 1 ? '淘宝' : (item.rtgGoodsDto.marketPlatform === 2 ? '天猫' : (item.rtgGoodsDto.marketPlatform === 4 ? '京东' : (item.rtgGoodsDto.marketPlatform===3 ? '拼多多' : '供应商')))}}</div>
                <div class="shopquan1">券 ¥ {{item.rtgGoodsDto.discountsCoupon || '0'}}</div>
                <span>商品有效期：{{item.rtgGoodsDto.goodsValidity | datafilter}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 中间广告位 -->
      <div class="cententGg">
        <img :src="bannerimg6" alt="">
      </div>
    </div>

    <div class="honrHOMEh">
      <p class="honrHOMEh-p1">
        海量优质明星网红 资源价值最大化
      </p>
      <p class="honrHOMEh-dfdf">
        丰富的主播资源，众多天团主播，560+签约主播，1500+深度合作主播，1亿+网红流量资源。
      </p>
      <div class="honrHicon clearfix">
        <div class="honrHicons hHiocn1" @click="honrS(1)">
          <img src="../assets/new/iocn/canju@2x.png" alt="">
          <p>母婴玩具</p>
        </div>
        <div class="honrHicons hHiocn2" @click="honrS(2)">
          <img src="../assets/new/iocn/jiadianpeizhi-dianji@2x.png" alt="">
          <p>科技生活</p>
        </div>
        <div class="honrHicons hHiocn3" @click="honrS(3)">
          <img src="../assets/new/iocn/meizhuang-2@2x.png" alt="">
          <p>美妆护肤</p>
        </div>
        <div class="honrHicons hHiocn4" @click="honrS(4)">
          <img src="../assets/new/iocn/路径 1312@2x.png" alt="">
          <p>美食攻略</p>
        </div>
        <div class="honrHicons hHiocn5" @click="honrS(5)">
          <img src="../assets/new/iocn/fuzhuangdian@2x.png" alt="">
          <p>服装穿搭</p>
        </div>
        <div class="honrHicons hHiocn6" @click="honrS(6)">
          <img src="../assets/new/iocn/组 402@2x.png" alt="">
          <p>家具百货</p>
        </div>
        <div class="honrHicons hHiocn7" @click="honrS(0)">
          <img src="../assets/new/iocn/组 403@2x.png" alt="">
          <p>其他</p>
        </div>
      </div>
      <div class="honrconcent">
        <div class="honrcontent1" v-for="item in honrLIS" :key="item.id">
          <div class="honrcontent1-top">
            <img :src="item.imageUrl" alt="">
            <p class="p1">
              <span>{{item.redskinsName}}</span>
              <span @click="hongren(item.redskinsId)">详细分析···</span>
            </p>
            <p class="dfdf">
              <span>粉丝数</span>
              <span>{{item.fansAmount || '--'}}万+</span>
            </p>
            <p>
              <span class="sfsdb">母婴玩具</span>
            </p>
          </div>
          <div class="honrshuju">
            <p>
              <span>互动数据</span>
            </p>
            <div class="honrshuju1">
              <div>
                <p>{{item.liveStreamingAmount}}万+</p>
                <p>直播观看数</p>
              </div>
              <div>
                <p>{{item.imageTextView}}万+</p>
                <p>图文浏览数</p>
              </div>
              <div>
                <p>{{item.shortVideoRelease}}万+</p>
                <p>短视频播放数</p>
              </div>
              <div>
                <p>{{item.highestLikes}}万+</p>
                <p>点赞数量</p>
              </div>
            </div>
            <p>
              <span>近期直播商品</span>
            </p>
            <div class="honrboshop">
              <img :src="item.goodslist[0].recordUrl" alt="">
              <p>{{item.goodslist[0].recordName}}</p>
              <p class="dfdf">
                <span>销售额</span>
                <span>{{item.goodslist[0].orderSale}}</span>
              </p>
              <p class="dfdbgnse">
                <span>{{item.goodslist[0].recordName}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="honrQita">
        <div class="honrQitas" v-for="item in contList" :key="item.id">
          <img :src="item.rtgRedskinsUserPublicDto.imageUrl" alt=""  @click="hongren(item.redskinsId)">
          <p>{{item.rtgRedskinsUserPublicDto.redskinsName}}</p>
          <p>
            <span>粉丝数</span>
            <span>{{item.rtgRedskinsUserPublicDto.fansAmount || '--'}}万+</span>
          </p>
          <p>
            <span>直播观看数</span>
            <span>{{item.rtgRedskinsUserPublicDto.liveStreamingAmount}}万+</span>
          </p>
          <div @click="hongren(item.redskinsId)">联系红人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { honrtuijian } from '@/api/newhonrList'
import { Homeshoplist } from '@/api/newshopList'
import { fetchBanners } from '@/api/banner'
export default {
  name: 'Test',
  // components: {
  //   mbGoodsItem,
  //   mbFavoriteItem
  // },
  data () {
    return {

      // ----------------------new------------------------
      ishow: false,
      ishow1: false,
      ishow2: false,
      honrLIS: [],
      contList: [],
      // haohuoList: [], // 好品推荐
      rexiaoList1: [], // 热销榜单1
      rexiaoList2: [], // 热销榜单2
      bannerimg1: '',
      bannerimg2: '',
      bannerimg3: '',
      bannerimg4: '',
      bannerimg5: '',
      bannerimg6: '',
      haohuoList_shop: [],
      haopinimg: '',
      rexiao_shop1: '',
      rexiao_shop2: ''

      // ----------------------new------------------------
    }
  },
  methods: {
    // ----------------------new------------------------

    // 显示操作项
    showDialog (type, index, item) {

    },
    // 隐藏蒙层
    hideDialog (type, index, item) {

    },
    // 跳转商品详情页
    handleGoodsItem (item) {
      this.$router.push({ name: 'newshop', query: { item: item } })
    },
    // 申请取样
    shenqingquyang (item) {
      this.$router.push({ name: 'applicationSample', query: { item: item } })
    },
    // 点击红人头像跳转
    hongren (id) {
      console.log('5555555555555')
      this.$router.push({ name: 'hongrenshuju', params: { redskinsId: id } })
    },
    honrS (type) {
      this.honrLIS = []
      // 红人首页推荐
      honrtuijian({
      }).then(data => {
        this.contList = data.srrList
        const LIST = data.mrrList
        LIST.forEach(item => {
          if (type === item.recommendType) {
            this.honrLIS.push(item.rtgRedskinsUserPublicDto)
          }
        })
      })
    },
    git_home_shop_list () {
      // 商品首页推荐
      Homeshoplist({}).then(data => {
        // console.log( data)
        this.haohuoList = data.hpRecommendList
        this.haohuoList.forEach(item => {
          if (item.locationColumns !== 1) {
            this.haohuoList_shop.push(item)
          } else {
            this.haopinimg = item.recommendPictureUrl
          }
        })
        this.rexiaoList = data.rxRecommendList
        const rexiaolist1 = []
        const rexiaolist2 = []
        this.rexiaoList.forEach(item => {
          if (item.locationRows === 1) {
            rexiaolist1.push(item)
          } else {
            rexiaolist2.push(item)
          }
        })
        rexiaolist1.forEach(item => {
          if (item.locationColumns !== 1) {
            this.rexiaoList1.push(item)
          } else {
            this.rexiao_shop1 = item.recommendPictureUrl
          }
        })
        rexiaolist2.forEach(item => {
          if (item.locationColumns !== 1) {
            this.rexiaoList2.push(item)
          } else {
            this.rexiao_shop2 = item.recommendPictureUrl
          }
        })
        console.log('热销榜单1', this.rexiaoList1, this.rexiao_shop1)
        console.log('热销榜单2', this.rexiaoList2, this.rexiao_shop2)
      })
    },
    // banner
    getbannerList (bannerLocation) {
      fetchBanners({
        bannerLocation: bannerLocation
      }).then(data => {
        data.forEach(item => {
          if (item.bannerLocation === 1) {
            this.bannerimg1 = item.bannerUrl
          } else if (item.bannerLocation === 2) {
            this.bannerimg2 = item.bannerUrl
          } else if (item.bannerLocation === 3) {
            this.bannerimg3 = item.bannerUrl
          } else if (item.bannerLocation === 4) {
            this.bannerimg4 = item.bannerUrl
          } else if (item.bannerLocation === 5) {
            this.bannerimg5 = item.bannerUrl
          } else if (item.bannerLocation === 6) {
            this.bannerimg6 = item.bannerUrl
          }
        })
      })
    }
    // 首页红人推荐

    // ----------------------new-----------------------
  },
  mounted () {
    this.honrS(1)
    this.getbannerList()
    this.git_home_shop_list()
  }
}
</script>

<style lang="less">

</style>
<style lang="less" scoped>
// -----
.clearfix:before,.clearfix:after {
  content:"";
  display: table
}
.clearfix:after {
  clear:both;
}
.clearfix { /* IE6、7专有*/
  *zooom:1;
}
// -----
  .honrHome {
    width: 1600px;
    margin: auto;
    .Topbanner {
      width: 100%;
      height: 730px;
      .TopbannerImgdiv1 {
        width: 375px;
        height: 730px;
        float: left;
        margin-right: 30px;
        .TopbannerImg1 {
          width: 375px;
          height: 350px;
          float: left;
          margin-bottom: 30px;
        }
        .TopbannerImg2 {
          width: 375px;
          height: 350px;
          float: left;
        }
      }
      .TopbannerImg3 {
        width: 790px;
        height: 730px;
        float: left;
        margin-right: 30px;
      }
      .TopbannerImgdiv2 {
        width: 375px;
        height: 730px;float: left;
        .TopbannerImg4 {
          width: 375px;
          height: 350px;
        margin-bottom: 30px;
          float: left;
        }
        .TopbannerImg5 {
          width: 375px;
          height: 350px;
          float: left;
        }
      }
    }
    .Homehaopin {
      margin-top: 50px;
      width: 100%;
      height: 440px;
      .Goodproductrecommendation {
        width: 295px;
        height: 440px;
        float: left;
      }
      .Homehaopindiv {
        width: 295px;
        height: 440px;
        float: left;
        // background-color: chocolate;
        margin-left: 30px;
        .shopImg {
          width: 295px;
          height: 295px;
          position: relative;
          img{
            width: 295px;
            height: 295px;
          }
          .shopTan {
            width: 295px;
            height: 38px;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: #E8251D;
            P {
              line-height: 38px;
              text-align: center;
              font-size:18px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(255,255,255,1);
              opacity:1;
              .shenqinggouwu {
                width: 20px;
                height: 18px;
                margin-right: 5px;
              }
            }
          }
          .Homehaopinnumber {
            margin-top: 5px;
            margin-bottom: 5px;
            padding: 0 10px;
            box-sizing: border-box;
            .numberSpan1 {
              font-size: 24px;
              color: #E8251D;
              font-family: PingFangSC-Medium;
              margin-right: 10px;
            }
            .numberSpan2 {
              font-size: 16px;
              color: #999999;
              font-family:PingFang SC;
            }
            .numberSpan3 {
              float: right;
              font-size:16px;
              font-family:PingFang SC;
              font-weight:400;
              line-height:22px;
              color:#666666;
              opacity:1;
              .numberSpan4 {
                color: #E8251D;
              }
            }
          }
          .shopname {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:500;
            // line-height:30px;
            color:rgba(51,51,51,1);
            // letter-spacing:15px;
            opacity:1;
            padding: 0 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .shopquan {
            border-top: 1px solid #DCDCDC;
            padding-top: 10px;
            .shopquankuang {
              float: left;
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
            .shopquan1 {
              float: left;
              width:50px;
              height:20px;
              background:rgba(253,102,105,1);
              opacity:1;
              text-align: center;
              line-height: 20px;
              font-size:10px;
              font-weight:400;
              color:rgba(255,255,255,1);
              opacity:1;
            }
            span {
              float: right;
              font-size:14px;
              font-family:PingFang SC;
              font-weight:400;
              line-height:22px;
              color:rgba(232,37,29,1);
              opacity:1;
            }
          }
        }
      }
    }
    .rexio {
      margin-top: 50px;
      .biaotitu {
        text-align: center;
        margin-bottom: 70px;
        img {
          width: 142px;
          height: 70px;
        }
      }
      .mokuaiyi {
        margin-top: 45px;
      }
    }
    .cententGg {
      margin-top: 80px;
      img {
        width: 100%;
        height: 225px;
      }
    }
  }
  .honrHOMEh {
    width: 100%;
    height: 100%;
    background:rgba(247,247,247,1);
    margin-top: 45px;
    padding-top: 45px;
    padding-bottom: 45px;
    box-sizing: border-box;
    .honrHOMEh-p1 {
      text-align: center;
      font-size:28px;
      font-family:PingFang SC;
      font-weight: 700;
      // line-height:40px;
      color:rgba(51,51,51,1);
      letter-spacing:5px;
      opacity:1;
    }
    .honrHOMEh-dfdf {
      margin-top: 28px;
      margin-bottom: 55px;
      text-align: center;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:400;
      // line-height:25px;
      color:rgba(102,102,102,1);
      opacity:1;
    }
    .honrHicon {
      width: 1020px;
      height: 100%;
      display: block;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-bottom: 100px;
      .honrHicons {
        float: left;
        width: 120px;
        height: 120px;
        border-radius:50%;
        // background-color: cyan;
        border:1px solid rgba(51,51,51,1);
        margin-right: 27px;
        text-align: center;
        img {
          width: 45px;
          height: 45px;
          margin-top: 25px;
        }
        p {
          margin-top: 5px;
          font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
        }
      }
      .hHiocn1:hover {
        background-color: #B41E87;
          color:rgba(255,255,255,1);
      }
      .hHiocn2:hover {
        background-color: #F2C714;
          color:rgba(255,255,255,1);
      }
      .hHiocn3:hover {
        background-color: #542C22;
          color:rgba(255,255,255,1);
      }
      .hHiocn4:hover {
        background-color:#F69600;
          color:rgba(255,255,255,1);
      }
      .hHiocn5:hover {
        background-color:#A17DFD;
          color:rgba(255,255,255,1);
      }
      .hHiocn6:hover {
        background-color: #F8C8AF;
          color:rgba(255,255,255,1);
      }
      .hHiocn7:hover {
        background-color:#580011;
          color:rgba(255,255,255,1);
      }
    }
    .honrHicon .honrHicons:last-child {
      margin-right: 0px;
    }
    .honrconcent {
      width: 1370px;
      height: 571px;
      // background-color: aqua;
      margin: auto;
      .honrcontent1 {
        float: left;
        width: 670px;
        height: 570px;
        background:#fff;
        .honrcontent1-top {
          height: 110px;
          margin-left: 30px;
          margin-top: 30px;
          img {
            width:110px;
            height:110px;
            border-radius:50%;
            opacity:1;
            float: left;
            margin-right: 24px;
          }
          .p1 {
            padding-top: 15px;
            padding-right: 20px;
            box-sizing: border-box;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:bold;
            color:rgba(0,0,0,1);
            opacity:1;
            span:nth-child(2) {
              float: right;
              font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(232,37,29,1);
              opacity:1;
            }
          }
          .dfdf {
            padding-top: 13px;
            box-sizing: border-box;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(126,126,126,1);
            opacity:1;
            span:nth-child(2) {
              font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(232,37,29,1);
              opacity:1;
              margin-left: 8px;
            }
          }
          .sfsdb {
            display: inline-block;
            width:80px;
            height:24px;
            background:rgba(232,37,29,1);
            opacity:1;
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:24px;
            color:rgba(255,255,255,1);
            opacity:1;
            text-align: center;
            margin-top: 10px;
          }
        }
        .honrshuju {
          margin-left: 30px;
          margin-top: 40px;
          p {
            border-bottom: 1px solid rgba(208,208,208,1);
            span {
              font-size:16px;
              font-family:Source Han Sans CN;
              font-weight:400;
              color:rgba(0,0,0,1);
              opacity:1;
              border-bottom: 2px solid rgba(232,37,29,1);;
            }
          }
          .honrshuju1 {
            display: flex;
            div {
              flex: 1;
              p {
                border: none;
                text-align: center;
              }
              p:nth-child(1) {
                font-size:19px;
                font-family:PingFang TC;
                font-weight:500;
                color:rgba(232,37,29,1);
                opacity:1;
                margin-top: 25px;
              }
              p:nth-child(2) {
                font-size:13px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(126,126,126,1);
                opacity:1;
                margin-top: 15px;
                margin-bottom: 28px;
              }
            }
          }
          .honrboshop {
            height: 177px;
            margin-top: 25px;
            img {
              float: left;
              background:rgba(243,243,243,1);
              width: 177px;height: 177px;
              margin-right: 20px;
            }
            p {
              border: none;
              font-size:18px;
              font-family:PingFang SC;
              font-weight:500;
              line-height:30px;
              color:rgba(51,51,51,1);
              // letter-spacing:15px;
              opacity:1;
              padding-left: 20px;
              span {
                border: none;
                font-size:18px;
                font-family:PingFang SC;
                font-weight:400;
                // line-height:30px;
                color:rgba(153,153,153,1);
                // letter-spacing:15px;
                opacity:1;
              }
              span:nth-child(2) {
                font-size:18px;
                font-family:PingFang SC;
                font-weight:500;
                // line-height:40px;
                color:rgba(232,37,29,1);
                // letter-spacing:15px;
                opacity:1;
                margin-left: 10px;
              }
            }
            .dfdf {
              margin-top: 20px;
            }
            .dfdbgnse {
              margin-top: 15px;
              span {
                // width:34px;
                height:20px;
                border:1px solid rgba(232,37,29,1);
                opacity:1;
                border-radius:3px;
                padding: 4px;
                box-sizing: border-box;
                font-size:13px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(232,37,29,1);
                opacity:1;
              }
            }
          }
        }
      }
      .honrcontent1:nth-child(1) {
        margin-right: 30px;
      }
    }
    .honrQita {
      margin-top: 30px;
      width: 1370px;
      height: 195px;
      // margin: auto;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 100px;
      .honrQitas {
        float: left;
        width: 320px;
        height: 195px;
        background-color: #fff;
        margin-left: 30px;
        padding-top: 30px;
        padding-left: 40px;
        box-sizing: border-box;
        img {
          float: left;
          width:90px;
          height:90px;
          background:rgba(255,255,255,1);
          border:1px solid rgba(112,112,112,1);
          border-radius:50%;
          opacity:1;
          margin-right: 20px;
        }
        p {
          font-size:14px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:30px;
          color:rgba(126,126,126,1);
          opacity:1;
          span:nth-child(2) {
            font-size:14px;
            font-family:Source Han Sans CN;
            font-weight:400;
            // line-height:17px;
            color:rgba(232,37,29,1);
            opacity:1;
            margin-left: 10px;
          }
        }
        div {
          width:90px;
          height:25px;
          border:1px solid rgba(232,37,29,1);
          opacity:1;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:25px;
          color:rgba(232,37,29,1);
          opacity:1;
          text-align: center;
          margin-left: 112px;
          margin-top: 25px;
        }
      }
      .honrQitas:nth-child(1) {
        margin-left: 0;
      }
    }
  }
</style>
