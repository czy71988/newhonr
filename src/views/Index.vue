<template>
  <div class="honIndex">
    <div class="top">
      <div class="top-yyy">
        <p>
          <span><img src="../assets/new/路径 1003@2x.png" alt=""></span>
          <span>你的好友已提现</span>
          <span>...</span>
        </p>
      </div>
    </div>
    <div class="indexHeader">
      <el-container>
        <el-header>
          <div class="heater-div">
            <img class="heater-icon" src="../assets/new/组 54@2x.png" alt="">
            <div class="daohangci">
              <div class="nav-list-warp">
                <ul class="nav-list" ref="navListNode">
                    <li class="nav-item" @click="handleNavChange($event)">
                      <router-link :to="{name:'home'}">首页</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link :to="{name:'goodsList'}" >好货榜</router-link>
                    </li>
                    <li class="nav-item" @click="handleNavChange($event)">
                      <router-link :to="{name:'favorite'}" >红人榜</router-link>
                    </li>
                    <li class="nav-item" @click="handleNavChange($event)">
                      <router-link :to="{name:'Service'}" >服务商</router-link>
                    </li>
                    <li class="nav-item" @click="handleNavChange($event)">
                      <router-link :to="{name:'hezuoanli'}" >红人资讯</router-link>
                    </li>
                    <li class="nav-item">
                      <router-link :to="{name:'peicang'}" >中通仓配</router-link>
                    </li>
                    <li class="nav-item" @click="handleNavChange($event)">
                      <router-link :to="{name:'about'}" >关于我们</router-link>
                    </li>
                  </ul>
              </div>
            </div>
            <div class="daohangright">
              <span>
                <span><router-link :to="{name:'registered'}" class="menu__item">注册</router-link></span>
                <span><router-link  :to="{name:'login'}" class="menu__item">登录</router-link></span>
              </span>
              <span>
                <span @click="dfbieijb" :to="{name: 'personalMyxinxi'}"><img src="../assets/new/路径 251@2x.png" alt=""></span>

              </span>

              <span v-if="this.$route.path === '/home'" @click="fushow(1)"><img src="../assets/new/路径 65@2x.png" alt=""></span>
              <span v-if="this.$route.path === '/home'" @click="fushow(2)"><img src="../assets/new/menu-button@2x.png" alt=""></span>
            </div>
            <!-- 搜索弹框 -->
            <div class="dfaerecvnjoi" v-if="fushow1">
              <el-input v-if="this.$route.path === '/home'" placeholder="请输入内容" v-model="input3" class="input-with-select" @keyup.enter.native="quedingsousuo">
                <el-select v-model="select" slot="prepend" placeholder="搜商品">
                  <el-option label="搜商品" value="1"></el-option>
                  <el-option label="搜红人" value="2"></el-option>
                </el-select>
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
              </el-input>
            </div>
            <!-- 菜单弹框 -->
            <div v-if="show3" class="bhuvgyghj">
              <div class="sHow3P1">优品类别</div>
              <ul class="sHow3P1List">
                <li @click="youpintuijian(item.value)" v-for="item in youxuan" :key="item.id">{{item.label}}</li>
              </ul>
              <div class="sHow3P1">红人数据</div>
              <ul class="sHow3P1List">
                <li @click="fansnember(item.value)" v-for="item in fansNumberData" :key="item.id">{{item.label}}</li>
                <li @click="fansType(item.value)" v-for="item in fansFavoriteData" :key="item.id">{{item.label}}</li>
              </ul>
              <div class="sHow3P1">所属平台</div>
              <ul class="sHow3P1List">
                <li @click="honrPt" v-for="item in platformData" :key="item.id">{{item.label}}</li>
              </ul>
            </div>

          </div>
        </el-header>
        <el-main>
          <!-- keep-alive 缓存当前输出视图组件 -->
          <div class="fiuehaflioh router-view">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </el-main>
        <el-footer>
          <div class="Indexfooter">
            <p>
              <span>浙江中快网络科技有限公司</span>
              <span>备案号码：沪ICP备17053507号</span>
            </p>
          </div>
        </el-footer>
      </el-container>
    </div>

    <!-- 页面浮窗 -->
    <div class="fu">
      <div v-if="scrollTop" class="huidaodingbu" @click="backtop">
        <img src="../assets/go-back.png" alt="">
      </div>
      <div class="kefu" >
        <img src="../assets/new/iocn/二维码.png" alt="">
      </div>
    </div>
    <div class="erweimaFuchuang" v-if="fuxian">
      <img src="../assets/new/iocn/图像 222@2x.png" alt="">
      <p>微信扫一扫</p>
      <p>金牌客服为您服务</p>
    </div>
  </div>
</template>

<script>
import { makeScrollNodeScrollToMiddle } from '@/utils/mix'
import { platformData, fansNumberData, fansFavoriteData } from '../data/common'
// import ztConfig from '@/config/zt-service-config'

export default {
  name: 'Index',
  data () {
    return {
      // ----zuixin---
      scrollTop: '',
      fuxian: false,
      fushow1: false,
      show3: false,
      select: '1',
      input3: '',
      youxuan: [
        { value: '1', label: '居家日用' },
        { value: '2', label: '数码家电' },
        { value: '3', label: '美妆个护' },
        { value: '4', label: '食品饮料' },
        { value: '7', label: '精品女装' },
        { value: '9', label: '精品箱包' },
        { value: '10', label: '潮流男装' },
        { value: '11', label: '鞋品' },
        { value: '12', label: '家装家纺' }
      ],
      fansNumberData,
      fansFavoriteData,
      platformData
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.showbtn, true)
  },
  methods: {
    // ------------------------------------------------------------
    // 显示回到顶部按钮
    showbtn () {
      let that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
    },
    /**
        * 回到顶部功能实现过程：
        * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
        * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
        * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
        * 4. 最后记得在移动到顶部时，清除定时器
      */
    backtop () {
      var timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        this.isTop = true
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    },
    // 二维码显示与隐藏
    showDialogFu () {
      this.fuxian = true
    },
    hideDialogFu () {
      this.fuxian = false
    },
    fushow (a) {
      if (a === 1) {
        this.fushow1 = !this.fushow1
        this.show3 = false
      } else if (a === 2) {
        this.show3 = !this.show3
        this.fushow1 = false
      }
    },
    quedingsousuo () {
      if (this.select === '1') {
        this.$router.push({ name: 'goodsList', query: { sousuo: this.input3 } })
        this.input3 = ''
      } else if (this.select === '2') {
        this.$router.push({ name: 'favorite', query: { sousuo: this.input3 } })
        this.input3 = ''
      }
    },
    handleNavChange (e) {
      // alert(e)
      makeScrollNodeScrollToMiddle(e.currentTarget, this.$refs.navListNode)
    },
    // 点击进入个人中心
    dfbieijb () {
      const token = sessionStorage.getItem('token')
      if (!token) {
        this.$alert('您还未登陆账号，请登录账号', '注意！', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ name: 'login' })
          }
        })
      } else {
        this.$router.push({ name: 'personal' })
      }
    },
    // 点击优品类别
    youpintuijian (value) {
      this.$router.push({ name: 'goodsList', query: { value: value } })
      this.show3 = !this.show3
    },
    // 点击粉丝数量，跳转红人榜
    fansnember (value) {
      this.$router.push({ name: 'favorite', query: { value: value } })
      this.show3 = !this.show3
    },
    // 点击粉丝类别，跳转红人榜
    fansType (value) {
      this.$router.push({ name: 'favorite', query: { value1: value } })
      this.show3 = !this.show3
    },
    // 点击平台，跳转红人榜
    honrPt (value) {
      this.$router.push({ name: 'favorite', query: { value2: value } })
      this.show3 = !this.show3
    }
    // 搜索按钮
    // sousuo () {
    //   if()
    // }
  }
}
</script>

<style lang="less">
  .honIndex {
    .indexHeader {
      .el-main {
        margin: 0;
        padding: 0 !important;
      }
      .el-footer {
        padding: 0;
      }
      .el-header {
        height: 160px !important;
      }
    }
    .dfaerecvnjoi {
      .el-input-group {
        width: 390px;
        height: 50px;
        position: relative;
        opacity:0.75;
      }
      .el-input-group__prepend {
        width: 65px;border-radius:25px;
        z-index: 55;
        border: 1px solid #DCDFE6;
      }
      .el-input-group>.el-input__inner {
        height: 50px;
        border-radius: 25px 25px 25px 25px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 54;
        padding-left: 120px;
      }
    }

  }
</style>

<style lang="less">
a {
  // display: none;
  text-decoration:none
}
  .honIndex {
    background-color: #FFFFFF;
    position: relative;
    width: 100vw;
    .jjjjjjjjj {
      display: block;
      width: 100px;
      height: 50px;
      background-color: darkgoldenrod;
      position: absolute;
      top: 50%;
      right: 100px;
      color: #fff;
    }
    .top {
      margin: auto;
      // background-color: #FFFFFF;
        background:rgba(247,247,247,1);
      .top-yyy {
        width:100%;
        height:40px;
        opacity:1;
        background:rgba(247,247,247,1);
        width: 1600px;
        margin: auto;
        padding-left: 500px;
        p {
          font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:40px;
          color:rgba(247,133,128,1);
          opacity:1;
          span:nth-child(1) {
            margin-right: 5px;
          }
          img {
            width: 22px;
            height: 18px;
          }
        }
      }
    }
    .indexHeader {
      .heater-div {
        width: 1600px;
        height: 76px;
        margin: auto;
        position: relative;
        margin-top: 45px;
        .heater-icon {
          width: 200px;
          height: 75px;
        }
        .daohangci {
          display: inline-block;
          margin-left: 123px;
          // 导航列表
          .nav-list-warp {
            // width: 100%;
            margin-bottom: 2px;
            padding-top: 4px;
            padding-bottom: 4px;
            .nav-list {
              overflow-y: auto;
              white-space: nowrap;
              text-align: center;
              // height: 32px;
              // padding-bottom: 12px;
              &::-webkit-scrollbar {
                display: none;
              }
              .nav-item {
                display: inline-block;
                font-size: 14px;
                margin-right: 15px;
                // width: 70px;
                height: 20px;
                padding: 4px 6px;
                vertical-align: top;
                a {
                  position: relative;
                  display: block;
                  color: #666;
                  height: 100%;
                  border-radius: 2px;
                  // transition: font .1s ease-in;
                  margin-left: 2px;
                  // padding-bottom: 10px;
                  &.router-link-active {
                    color: #fff;
                    color: #fd3069;
                    background-color: #fd3069;
                    background-color: #fff;
                    // transform: scale(1.2)
                    vertical-align: bottom;
                    &::after {
                      position: absolute;
                      display: block;
                      content: ' ';
                      height: 2px;
                      width: 20px;
                      border-radius: 6px;
                      background-color: #fd3069;
                      bottom: -2px;
                      left: 50%;
                      margin-left: -10px;
                    }
                  }
                }
                &:first-child {
                  margin-left: 15px;
                }
              }
            }
          }
        }
        .daohangright {
          // display: inline-block;
          position: absolute;
          bottom: 0;
          right: 0;

          span {
            margin-left: 30px;
            img {
              width: 15px;
              height: 15px;
            }
            .menu__item {
              font-size:14px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:20px;
              color:rgba(85,85,85,1);
              // letter-spacing:50px;
              opacity:1;
            }
          }
        }
        .dfaerecvnjoi {
          position: absolute;
          right: 0;
          top: 76px;
        }
        .bhuvgyghj {
          position: absolute;
          right: 0;
          top: 76px;
          width:186px;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 16px rgba(0,0,0,0.16);
          opacity:1;
          padding: 20px;
          box-sizing: border-box;
          .sHow3P1 {
            display: block;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:700;
            line-height:16px;
            color:rgba(51,51,51,1);
            opacity:1;
            margin-bottom: 10px;
            text-align: left;
            margin-top: 20px;
          }
          .sHow3P1List {
            display: block;
            height: 100%;
            li {
              display: inline-block;
              width: 50%;
              height: 28px;
              line-height: 28px;
              font-size:14px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:37px;
              color:rgba(153,153,153,1);
              opacity:0.99;
              // float: left;
            }
            li:hover {
              font-weight:500;
              color:rgba(232,37,29,1);
            }
          }
        }
      }
      .Indexfooter {
        width: 100%;
        height: 100px;
        background-color: #555555;
        p {
          text-align: center;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:18px;
          color:rgba(208,208,208,1);
          opacity:1;
          line-height: 100px;
          span:nth-child(1) {
            margin-right: 50px;
          }
        }
      }
    }
    .fu {
      // position: absolute;
      position: fixed;
      bottom: 15%;
      right: 85px;
      div {
        width:60px;
        height:60px;
        background:rgba(85,85,85,1);
        opacity:1;
        padding: 10px;
        box-sizing: border-box;
        img {
          width: 40px;
          height: 40px;
        }
      }
      .huidaodingbu {
        margin-bottom: 20px;
      }
    }
    .erweimaFuchuang {
      position: fixed;
      bottom: 10%;
      right: 173px;
      width:171px;
      height:209px;
      background:rgba(208,208,208,1);
      opacity:1;
      box-sizing: border-box;
      img {
        margin-top: 33px;
        margin-left: 33px;
        margin-right: 33px;
        margin-bottom: 10px;
        width: 106px;
        height: 106px;
      }
      p {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        // line-height:20px;
        color:rgba(0,0,0,1);
        opacity:1;
        text-align: center;
      }
    }
  }
</style>
