<template>
  <div class="hezuo">
    <div v-if="show1 === 0" class="transition-box animate__animated animate__zoomIn">
      <p class="p1">红人咨讯</p>
      <p class="p2">携手助力你我共同发展！</p>
      <div class="btn1" @click="jjjj">查看资讯</div>
    </div>
    <div v-if="show1 === 1">

      <div class="transition-box1 animate__animated animate__backInDown">
        <div>
          <img src="../assets/new/测试.png" alt="">
        </div>
        <div>
          <p class="pp1">明星、书记助阵，中通仓播2分钟卖出价值百万元“扶贫干红”</p>
          <p class="pp2">6月16日晚7点，中通快递开启第二场“仓播”带货，“国民舅舅”王耀庆、宁夏吴忠市红寺堡区委书记丁建成亮相淘宝直播间，与中通主播一起推荐助农优选好物。</p>
          <div class="btn2" @click="hcakan">查看资讯</div>
        </div>
      </div>
      <div class="transition-box2 animate__animated animate__backInLeft">
        <p class="ppp1">3分钟售空超90000单|红人带货携手直播女王薇娅与您一起“涨芝士啦”！</p>
        <p class="ppp2">3月16日晚，中快传媒旗下红人带货平台联合品牌商家君乐宝亮相薇娅直播间。君乐宝酸奶一经上架就将直播间气氛推向高潮，瞬间引发了粉丝的疯狂抢购。</p>
        <div class="btn3" @click="hcakan">查看资讯</div>
        <ul>
          <li>
            <img src="../assets/new/测试.png" alt="">
          </li>
          <li>
            <img src="../assets/new/测试.png" alt="">
          </li>
          <li>
            <img src="../assets/new/测试.png" alt="">
          </li>
          <li>
            <img src="../assets/new/测试.png" alt="">
          </li>
        </ul>
      </div>
      <div class="transition-box3 animate__animated animate__backInRight">
        <div class="hgf">
          <div>
            <img src="../assets/new/测试.png" alt="">
          </div>
          <div class="skdbgir">
            <p class="ppp1">直播助农|携手“通”心 锦上“田”花——崇明生态田播带货节圆满落幕。</p>
            <p class="ppp2">7月13日以携手“通”心，锦上“田”花为主题的崇明生态田播带货节，在上海崇明上实东滩低碳农业园正式开播。</p>
            <span @click="hcakan">查看资讯</span>
          </div>
        </div>
        <div class="hgf sdfgerbvcv">
          <div class="skdbgir">
            <p class="ppp1">直播助农|携手“通”心 锦上“田”花——崇明生态田播带货节圆满落幕。</p>
            <p class="ppp2">7月13日以携手“通”心，锦上“田”花为主题的崇明生态田播带货节，在上海崇明上实东滩低碳农业园正式开播。</p>
            <span @click="hcakan">查看资讯</span>
          </div>
          <div>
            <img src="../assets/new/测试.png" alt="">
          </div>
        </div>
        <div class="ooter" @click="hcakan">
          点击查看更多
        </div>
      </div>
    </div>
    <div v-if="show1 === 2"  class="transition-box4 animate__animated animate__backInUp">
      <ul>
        <li v-for="item in list" :key="item.id">
          <img :src="item.informationPictureUrl" alt="">
          <p class="li_p1">{{item.informationTitle}}</p>
          <p class="li_p2">{{item.informationDetails}}</p>
          <p class="li_p3">
              <a class="btn1" :href="item.informationUrl">查看资讯</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
script
<script>
import { honrZX } from '../api/newhonrList'
export default {
  data () {
    return {
      show1: 0,
      total: 0,
      list: []
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    jjjj () {
      this.show1 = this.show1 + 1
      setTimeout(() => {
        const element = document.querySelector('.pp3')
        element.classList.add('animate__animated', 'animate__lightSpeedInLeft')
      }, 1000)
    },
    hcakan () {
      this.show1 = 2
    },
    getlist () {
      honrZX({
        filters: {},
        page: '1',
        rows: '10'
      }).then(data => {
        console.log('资讯', data)
        this.total = data.totalCount
        this.list = data.result
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .hezuo {
      width: 100vw;
      height: calc(100vh - 200px);
    .transition-box {
      width: 100vw;
      height: calc(100vh - 200px);
      background: url('../assets/new/iocn/组 687.png') no-repeat center center;
      background-size: cover;
      background-attachment: fixed;
      padding: 200px 0;
      box-sizing: border-box;
      text-align: center;
      .p1 {
        font-size:60px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:60px;
        color:rgba(255,255,255,1);
        opacity:1;
      }
      .p2 {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:24px;
        color:rgba(255,255,255,1);
        opacity:1;
        margin-top: 40px;
      }
      .btn1 {
        width:180px;
        height:52px;
        background:rgba(232,37,29,1);
        opacity:0.75;
        border-radius:10px;
        font-size:22px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:52px;
        color:rgba(255,255,255,1);
        opacity:1;
        margin-top: 60px;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
    .transition-box1 {
      width: 100vw;
      height: calc(100vh - 200px);
      display: flex;
      div {
        position: relative;
        flex: 1;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        p {
          padding: 0 165px;
          box-sizing: border-box;
        }
        .pp1 {
          font-size:28px;
          font-family:PingFang SC;
          font-weight:500;
          line-height:40px;
          color:rgba(51,51,51,1);
          opacity:1;
          margin-bottom: 40px;
          margin-top: 180px;
        }
        .pp2 {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:28px;
          color:rgba(102,102,102,1);
          opacity:1;
        }
        .pp3 {
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
        }
        .btn2 {
          width:180px;
          height:52px;
          background:rgba(232,37,29,1);
          opacity:0.75;
          border-radius:10px;
          font-size:22px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:52px;
          color:rgba(255,255,255,1);
          opacity:1;
          margin-top: 60px;
          margin-left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
      }
    }
    .transition-box2 {
      width: 100vw;
      height: calc(100vh - 200px);text-align: center;
      .ppp1 {
        font-size:28px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:40px;
        color:rgba(51,51,51,1);
        opacity:1;
        margin: 50px 0;
      }
      .ppp2 {
        font-size:20px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:28px;
        color:rgba(102,102,102,1);
        opacity:1;
      }
      .btn3 {
        width:180px;
        height:52px;
        background:rgba(232,37,29,1);
        opacity:0.75;
        border-radius:10px;
        font-size:22px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:52px;
        color:rgba(255,255,255,1);
        opacity:1;
        margin-top: 60px;
        margin-left: 50%;
        transform: translateX(-50%);
        text-align: center;
      }
      ul {
        margin-top: 30px;
        display: inline-block;
        height: 377px;
        text-align: center;
        li {
          width: 377px;
          height: 377px;
          float: left;
          margin-left: 28px;
          img {
            width: 377px;
            height: 377px;
          }
        }
      }
    }
    .transition-box3 {
      width: 100vw;
      height: calc(100vh - 200px);
      .hgf {
        padding: 0 165px;
        box-sizing: border-box;
        .skdbgir {
          padding: 20px;
          box-sizing: border-box;
          .ppp1 {
            font-size:28px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:40px;
            color:rgba(51,51,51,1);
            opacity:1;
            margin-bottom: 20px;
          }
          .ppp2 {
            font-size:20px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:28px;
            color:rgba(102,102,102,1);
            opacity:1;
            margin-bottom: 30px;
          }
          span {
            display: inline-block;
            width:143px;
            height:42px;
            background:rgba(233,63,56,1);
            opacity:1;
            border-radius:10px;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:42px;
            color:rgba(255,255,255,1);
            opacity:1;
            text-align: center;
          }
        }
        div {
          display: inline-block;
          width: 785px;
          height: 326px;
          background:rgba(252,252,252,1);
          vertical-align:top;
          margin-bottom: 20px;
          img {
            width: 785px;
            height: 326px;
          }
        }
        div:nth-child(1) {
          margin-right: 20px;
        }
        // div:nth-child(2) {
        //   padding: 20px;
        //   box-sizing: border-box;
        // }
      }
      .sdfgerbvcv {
        div:nth-child(1) {
          span {
            float: right;
          }
        }
      }
      .ooter {
        width: 100%;
        height:84px;
        background:rgba(240,240,240,1);
        opacity:0.72;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:84px;
        color:rgba(102,102,102,1);
        opacity:1;
        text-align: center;
        margin: 52px 0;
      }
    }
    .transition-box4 {
      width: 100vw;
      // height: calc(100vh - 200px);
      height: 100%;
      // text-align: center;
      padding: 60px 375px;
      box-sizing: border-box;
      ul {
        li {
          width: 100%;
          height: 249px;
          position: relative;
          margin-bottom: 50px;
          img {
            width: 249px;
            height: 249px;
            float: left;
            margin-right: 30px;
          }
          .li_p1 {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:40px;
            color:rgba(0,0,0,1);
            opacity:1;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .li_p2 {
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:32px;
            color:rgba(126,126,126,1);
            opacity:1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .li_p3 {
            display: inline-block;
            width:125px;
            height:40px;
            background:rgba(232,37,29,1);
            opacity:1;
            border-radius:10px;
            font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:40px;
            color:rgba(255,255,255,1);
            opacity:1;
            text-align: center;
            position: absolute;
            bottom: 0;
            a {
              color:rgba(255,255,255,1);
            }
          }
        }
      }
    }
  }

        .pp3 {
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
        }
</style>
