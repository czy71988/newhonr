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
          <img :src="list1[0].informationPictureUrl" alt="">
        </div>
        <div>
          <p class="pp1">{{list1[0].informationTitle}}</p>
          <p class="pp2">{{list1[0].informationDetails}}</p>
          <div class="btn2" @click="hcakan(list1[0].informationUrl)">查看资讯</div>
        </div>
      </div>
      <div class="transition-box2 animate__animated animate__backInLeft">
        <p class="ppp1">{{list2[0].informationTitle}}</p>
        <p class="ppp2">{{list2[0].informationDetails}}</p>
        <div class="btn3" @click="hcakan(list2[0].informationUrl)">查看资讯</div>
        <ul>
          <li v-for="item in list2_list" :key="item.id">
            <img :src="item.url" alt="">
          </li>
        </ul>
      </div>
      <div class="transition-box3 animate__animated animate__backInRight">
        <div class="hgf">
          <div>
            <img :src="list3[0].informationPictureUrl" alt="">
          </div>
          <div class="skdbgir">
            <p class="ppp1">{{list3[0].informationDetails}}</p>
            <p class="ppp2">{{list3[0].informationDetails}}</p>
            <span @click="hcakan(list3[0].informationUrl)">查看资讯</span>
          </div>
        </div>
        <div class="hgf sdfgerbvcv">
          <div class="skdbgir">
            <p class="ppp1">{{list4[0].informationDetails}}</p>
            <p class="ppp2">{{list4[0].informationDetails}}</p>
            <span @click="hcakan(list4[0].informationUrl)">查看资讯</span>
          </div>
          <div>
            <img :src="list4[0].informationPictureUrl" alt="">
          </div>
        </div>
        <div class="ooter" @click="hcakan1">
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
      list: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list2_list: []
    }
  },
  mounted () {
    this.getlist()
    this.getlist1()
    this.getlist2()
    this.getlist3()
    this.getlist4()
  },
  methods: {
    jjjj () {
      this.show1 = this.show1 + 1
      setTimeout(() => {
        const element = document.querySelector('.pp3')
        element.classList.add('animate__animated', 'animate__lightSpeedInLeft')
      }, 1000)
    },
    hcakan (a) {
      window.open(a)
    },
    hcakan1 () {
      this.show1 = 2
    },
    getlist () {
      honrZX({
        filters: {
          informationLocation: '',
          informationType: ''
        },
        page: '1',
        rows: '10'
      }).then(data => {
        console.log('资讯', data)
        this.total = data.totalCount
        this.list = data.result
      })
    },
    getlist1 () {
      honrZX({
        filters: {
          informationLocation: '1',
          informationType: ''
        },
        page: '1',
        rows: '10'
      }).then(data => {
        this.list1 = data.result
        console.log('资讯1', this.list1)
      })
    },
    getlist2 () {
      honrZX({
        filters: {
          informationLocation: '2',
          informationType: ''
        },
        page: '1',
        rows: '10'
      }).then(data => {
        this.list2 = data.result
        this.list2_list = JSON.parse(data.result[0].detailsPictures)
        console.log('资讯2', this.list2)
        console.log('资讯256789', this.list2_list)
      })
    },
    getlist3 () {
      honrZX({
        filters: {
          informationLocation: '3',
          informationType: ''
        },
        page: '1',
        rows: '10'
      }).then(data => {
        this.list3 = data.result
        console.log('资讯3', this.list3)
      })
    },
    getlist4 () {
      honrZX({
        filters: {
          informationLocation: '4',
          informationType: ''
        },
        page: '1',
        rows: '10'
      }).then(data => {
        this.list4 = data.result
        console.log('资讯3', this.list4)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .hezuo {
      width: calc(100vw - 45px);
      // height: calc(100vh - 200px);
    .transition-box {
      width: calc(100vw - 45px);
      // height: calc(100vh - 200px);
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
      width: calc(100vw - 45px);
      margin-bottom: 30px;
      // height: calc(100vh - 200px);
      display: flex;
      div {
        position: relative;
        flex: 1;
        img {
          width: 100%;
          height: 100%;
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
      width: calc(100vw - 45px);
      // height: calc(100vh - 200px);
      text-align: center;
      margin-bottom: 30px;
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

      width: calc(100vw - 45px);
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
          width: 760px;
          height: 326px;
          background:rgba(252,252,252,1);
          vertical-align:top;
          margin-bottom: 20px;
          img {
            width: 760px;
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
      width: calc(100vw - 45px);
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
// 适配屏幕为1366px
@media (max-width: 1366px) {
  .hezuo {
    .transition-box1 {
      div {
        p {
          padding: 0 50px;
        }
      }
    }
    @width: 300px;
    @height: 300px;
    .transition-box2 {
      ul {
        li {
          width: @width;
          height: @height;
          img {
            width: @width;
            height: @height;
          }
        }
      }
    }
    .transition-box3 {
      .hgf {
        div{
          margin: auto;
        }
      }
    }
    .transition-box4 {
      padding: 60px 200px;
    }
  }
}
// 适配屏幕为1600px
@media (max-width: 1600px) {
  .hezuo {
    .transition-box1 {
      div {
        p {
          padding: 0 50px;
        }
      }
    }
    @width: 300px;
    @height: 300px;
    .transition-box2 {
      ul {
        li {
          width: @width;
          height: @height;
          img {
            width: @width;
            height: @height;
          }
        }
      }
    }
    .transition-box3 {
      .hgf {
        div{
          width: 600px;
          margin: auto;
          img {
            width: 600px;
          }
        }
      }
    }
    .transition-box4 {
      padding: 60px 200px;
    }
  }
}
</style>
