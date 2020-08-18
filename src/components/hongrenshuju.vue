<template>
<!-- 红人详情页 -->
  <div class="honrShuju">
    <div class="Top">
      <!-- 主栏 -->
      <div class="zhu">
        <img :src="list.imageUrl" alt="">
        <p class="p1">{{list.redskinsName}}</p>
        <p class="p2">
          <span>{{list.contentType | contentCategoryFilter}}</span>
          <!-- <span>母婴玩具</span>
          <span>母婴玩具</span>
          <span>母婴玩具</span> -->
        </p>
        <p class="p3">
          <span>
            <span>粉丝数量:</span>
            <span>{{list.fansAmount}}万+</span>
          </span>
          <span>
            <span>最高点赞数:</span>
            <span>{{list.highestLikes}}万+</span>
          </span>
          <span>
            <span>粉丝比例:</span>
            <span>{{list.fansType === 1 ? '男女均衡' : (list.fansType === 2 ? '男粉多' : '女粉多')}}</span>
          </span>
        </p>
        <p class="p4">
          <span @click="lianxi(id)">联系红人</span>
        </p>
      </div>
      <!-- 侧栏 -->
      <div class="tuijian">
        <div class="tuijian-Top">
          <span>红人推荐</span>
        </div>
        <ul>
          <li v-for="item in Tuilist" :key="item.id">
            <img src="../assets/new/测试.png" alt="">
            <p class="pT1">{{item.redskinsName}}</p>
            <p class="pT2">
              <span>{{item.contentType | contentCategoryFilter}}</span>
              <span>{{item.fansAmount}}万+</span>
            </p>
            <p class="pT3">
              <span>内容分类</span>
              <span>粉丝数量</span>
            </p>
          </li>
        </ul>
      </div>
      <p class="hudongshuj">
        <span>互动数据</span>
      </p>
      <div class="hudongkanabn">
        <div>
          <p>{{list.liveStreamingAmount}}W+</p>
          <p>直播观看数</p>
        </div>
        <div>
          <p>{{list.imageTextView}}W+</p>
          <p>图文浏览数</p>
        </div>
        <div>
          <p>{{list.shortVideoRelease}}W+</p>
          <p>短视频播放数</p>
        </div>
        <div>
          <p>{{list.monitorRelease}}W+</p>
          <p>视屏发布数量</p>
        </div>
        <div>
          <p>{{list.guidanceShop}}W+</p>
          <p>引导进店数</p>
        </div>
        <div>
          <p>{{list.totalSales}}W+</p>
          <p>总销售额</p>
        </div>
      </div>
      <p class="hudongshuj sdfrqrq">
        <span>近期直播商品</span>
      </p>
      <div class="zhiboshop">
        <ul>
          <li v-for="item in goodslist" :key="item.id">
            <div>
              <img :src="item.recordUrl" alt="">
            </div>
            <p>{{item.recordName}}</p>
          </li>
        </ul>
      </div>
      <p class="hudongshuj">
        <span>直播数据</span>
      </p>
      <div class="zhiboshuju">
        <ul>
          <li class="zhiboshujus" v-for="item in liveList" :key="item.id">
            <img :src="item.recordUrl" alt="">
            <div class="dfbvge">
              <p>合作商家：</p>
              <p>销售额：</p>
              <p>单量：</p>
            </div>
            <div class=" sdfget">
              <p>{{item.recordName}}</p>
              <p>{{item.orderSale}}</p>
              <p>{{item.orderCount}}</p>
            </div>
          </li>
        </ul>
      </div>
      <p class="bottom">
        <span>种草视频</span>
      </p>
      <div class="bottoms">
        <ul>
          <li v-for="item in seedList" :key="item.id">
            <video ref='video'></video>
            <div>
              <img @click="bofang(item.recordUrl)" src="../assets/new/iocn/bofang@2x.png" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="联系平台经纪人"
      :visible.sync="ishow"
      center>
      <div class="dislogsss">
        <img src="../assets/new/图像 222@2x.png" alt="">
        <p>
          <img src="../assets/new/iocn/-@2x.png" alt="">
          <span>(微信)</span>
        </p>
        <div>
          <span>电话：</span>
          <span>15874219741</span>
          <span>(微信同号)</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { honrshuju, newNohonrlist } from '../api/newhonrList'
export default {
  data () {
    return {
      // =========================================================================
      ishow: false,
      list: [],
      Tuilist: [],
      type: '',
      goodslist: [], // 最近直播商品
      liveList: [], // 直播数据
      seedList: [], // 种草视频
      token: sessionStorage.getItem('token'),
      type1: sessionStorage.getItem('type')
      // =========================================================================
    }
  },
  created () {
    // setInterval(this.scroll, 2000)
  },
  mounted () {
    // this.geteeid()
    this.gitxinxi()
  },
  methods: {
    // -------------------------------------------------------------------
    lianxi (id) {
      if (!this.token && !this.type1) {
        this.$message.error('请登录账号操作')
      } else if (this.type1 !== 2) {
        this.$message.error('您不是商家用户')
      } else {
        this.ishow = true
      }
    },
    // 获取红人信息
    gitxinxi () {
      const id = this.$route.params.redskinsId
      honrshuju({
        redskinsId: id
      }).then(data => {
        console.log('====', data)
        this.goodslist = data.goodslist // 最近直播商品
        this.liveList = data.liveList // 直播数据
        this.seedList = data.seedList // 种草视频
        this.list = data
        this.type = data.contentType
        console.log('1', this.goodslist)
        console.log('2', this.liveList)
        console.log('3', this.seedList)
        newNohonrlist({
          filters: {
            redskinsPlatform: '',
            contentType: this.type,
            fansAmountType: '',
            province: ''
          },
          page: 1,
          rows: 20
        }).then(data => {
          this.Tuilist = data.result
        })
      })
    },
    bofang (url) {
      this.$refs.audio.src = url
    }
    // -------------------------------------------------------------------
  }
}
</script>

<style lang="less" scoped>
  .honrShuju {
    position: relative;
    // background-color: chocolate;
    .Top {
      padding: 0 166px;
      .zhu {
        float: left;
        width: 1226px;
        height: 415px;
        margin-right: 20px;
        background-color: #F7F7F7;
        img {
          width: 415px;
          height: 415px;
          float: left;
          margin-right: 20px;
        }
        .p1 {
          font-size:26px;
          font-family:PingFang SC;
          font-weight:700;
          color:rgba(0,0,0,1);
          opacity:1;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .p2 {
          margin-bottom: 50px;
          span {
            display: inline-block;
            width:110px;
            height:33px;
            background:rgba(232,138,29,1);
            opacity:1;
            border-radius:10px;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:33px;
            color:rgba(255,255,255,1);
            text-align: center;
            margin-right: 20px;
          }
        }
        .p3 {
          margin-bottom: 145px;
          span {
            margin-right: 15px;
            span:nth-child(1) {
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(102,102,102,1);
              opacity:1;
            }
            span:nth-child(2) {
              font-size:26px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(0,0,0,1);
              opacity:1;
            }
          }
        }
        .p4 {
          span {
            display: inline-block;
            width:180px;
            height:50px;
            background:rgba(232,37,29,1);
            opacity:1;
            border-radius:10px;
            text-align: center;
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:50px;
            color:rgba(255,255,255,1);
            opacity:1;
          }
        }
      }
      .tuijian {
        width: 285px;
        height: 415px;
        display: inline-block;
        .tuijian-Top {
          width:285px;
          height:53px;
          background:rgba(247,247,247,1);
          opacity:1;
          padding-left: 20px;
          box-sizing: border-box;
          span {
            padding-left: 10px;
            border-left: 3px solid #E8251D;
            font-size:20px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            opacity:1;
            line-height: 53px;
          }
        }
        ul {
          overflow: hidden;
          height: 359px;
          overflow-y: auto;
          li {
            display: block;
            height: 117px;
            margin-top: 4px;
            background:rgba(247,247,247,1);
            img {
              width: 117px;
              height: 117px;
              float: left;
              margin-right: 10px;
            }
            .pT1 {
              font-size:18px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(0,0,0,1);
              opacity:1;
              line-height: 40px;
              margin-bottom: 10px;
            }
            .pT2 {
              margin-bottom: 10px;
              span {
                font-size:14px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
                opacity:1;
                margin-right: 5px;
                padding-left: 5px;
                box-sizing: border-box;
              }
            }
            .pT3 {
              span {
                display: inline-block;
                width:62px;
                height:22px;
                background:rgba(232,138,29,1);
                opacity:1;
                border-radius:10px;
                font-size:10px;
                font-family:PingFang SC;
                font-weight:400;
                line-height:22px;
                color:rgba(255,255,255,1);
                opacity:1;
                margin-right: 5px;
                text-align: center;
              }
            }
          }
        }
      }
      .hudongshuj {
        border-bottom: 1px solid rgba(220,220,220,1);
        margin-top: 80px;
        line-height:50px;
        span {
          font-size:28px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:28px;
          color:rgba(0,0,0,1);
          opacity:1;
          padding-left: 10px;
          box-sizing: border-box;
          display: inline-block;
          border-left: 5px solid #E8251D;
        }
      }
      .sdfrqrq {
        margin-top: 60px;
      }
      .hudongkanabn {
        display: flex;
        div {
          flex: 1;
          text-align: center;
          P:nth-child(1) {
            font-size:28px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:41px;
            color:rgba(232,37,29,1);
            opacity:1;
            margin-top: 20px;
          }
          P:nth-child(2) {
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-top: 25px;
          }
        }
      }
      .zhiboshop {
        ul {
          overflow: hidden;
          width: 100%;
          overflow-x: auto;
          li {
            display: inline-block;
            width: 185px;
            height: 255px;
            div {
              width: 155px;
              height: 155px;
              background:rgba(245,245,245,1);
              border-radius:50%;
              margin-top:40px;
              margin-bottom: 20px;
              img {
                margin-top: 25px;
                margin-left: 25px;
                width: 107px;
                height: 107px;
              }
            }
            p {
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              line-height:40px;
              color:rgba(102,102,102,1);
              opacity:1;
              text-align: center;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
        }
      }
      .zhiboshuju {
        margin-top: 44px;
        ul {
          overflow: hidden;
          width: 100%;
          overflow-x: auto;
        }
        .zhiboshujus {
          display: inline-block;
          width: 400px;
          height: 162px;
          padding: 20px;
          box-sizing: border-box;
          background:rgba(247,247,247,1);
          margin-right: 30px;
          img {
            width: 122px;
            height: 122px;
            float: left;
            border-radius: 50%;
            margin-right: 10px;
          }
          .dfbvge {
            width: 110px;
            float: left;
            p {
              display: block;
              width: 110px;
              font-size:18px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:30px;
              color:rgba(102,102,102,1);
              opacity:1;
              margin: 12px 0;
              text-align: right;
            }
          }
          .sdfget {
            float: left;
            p {
              text-align: left;
              display: block;
              width: 110px;
              margin: 10px 0;
              text-align: left;
              padding-left: 5px;
              box-sizing: border-box;
            }
            p:nth-child(1) {
              width: 100%;
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              opacity:1;
            }
            p:nth-child(2) {
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(188,0,0,1);
              opacity:1;
            }
            p:nth-child(3) {
              font-size:20px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(232,138,29,1);
              opacity:1;
            }
          }
        }
      }
      .bottom {
        margin-top: 50px;
        margin-bottom: 20px;
        span {
          display: inline-block;
          border-left: 5px solid #E8251D;
          padding-left: 5px;
          box-sizing: border-box;
          font-size:20px;
          line-height: 20px;
          font-family:PingFang SC;
          font-weight:400;
        }
      }
      .bottoms {
        ul {
          overflow: hidden;
          width: 100%;
          overflow-x: auto;
          li {
            display: inline-block;
            width: 240px;
            height: 333px;
            margin-right: 20px;
            position: relative;
            video {
              width: 100%;
              height: 100%;
            }
            div {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: #000;
              opacity: 0.5;
              img {
                width: 25px;
                height: 25px;
                margin: auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%);
                transform: translateX(-50%);
              }
            }
          }
        }
      }
    }
    .dislogsss {
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
      p {
        margin-top: 15px;
        img {
          display: inline-block;
          width: 20px;height: 17px;vertical-align: middle;
        }
        span {
          font-size:18px;
          font-family:PingFang SC;
          font-weight:400;
          // line-height:25px;
          color:rgba(102,102,102,1);
          opacity:1;vertical-align: middle;
          margin-left: 10px;
        }
      }
      div {
        margin-top: 15px;
        span:nth-child(1) {
          font-size: 18px;
          color: #666666;
        }
        span:nth-child(2) {
          font-size: 22px;
          color: #E8251D;
          margin-right: 10px;
        }
        span:nth-child(3) {
          font-size: 18px;
          color: #999999;
        }
      }
    }
  }
</style>

<style lang="less">
.honrShuju {
  .el-dialog {
    width:460px;
    height:350px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(112,112,112,1);
    opacity:1;
    border-radius:21px;
    .el-dialog__title {
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      // line-height:28px;
      color:rgba(0,0,0,1);
      opacity:1;
    }
  }
}
</style>
