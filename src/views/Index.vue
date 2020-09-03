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
              <span v-if="!token">
                <span><router-link :to="{name:'registered'}" class="menu__item">注册</router-link></span>
                <span><router-link  :to="{name:'login'}" class="menu__item">登录</router-link></span>
              </span>
              <!-- <span v-else @mouseenter="fushow(3)" @mouseleave="fushow(4)"> -->
              <span v-if="this.$route.path === '/home' && token" @click="fushow(3)">
                <span class="idfgfvir" v-if="this.Viptype.imageUrl !== null || this.Viptype.imageUrl !== ''"><img :src="this.Viptype.imageUrl" alt=""></span>
                <span class="idfgfvir" v-else><img src="../assets/new/微信图片_20200901153933.png" alt=""></span>
                <!-- 头像弹框 -->
                <div class="yonghutouxiagn" v-if="fushow2">
                  <p class="yonghutouxiagn_p1">
                    <img  v-if="this.Viptype.imageUrl !== null || this.Viptype.imageUrl !== ''" :src="this.Viptype.imageUrl" alt="">
                    <img v-else src="../assets/new/微信图片_20200901153933.png" alt="">
                    <span>{{this.Viptype.redskinsName}}</span>
                    <span>{{this.Viptype.vendorName}}</span>
                  </p>
                  <p class="yonghutouxiagn_p2" v-if="this.type === '2'">
                    <span class="yonghutouxiagn_p2_span1" v-if="this.Viptype.vipStatus === 0">授权范围：合作会员<span @click="Vipstart"> (开通)</span></span>
                    <span class="yonghutouxiagn_p2_span2" v-else>{{this.Viptype.vipValidityEnd}}到期<span>(续费)</span></span>
                  </p>
                  <p class="yonghutouxiagn_p4" v-if="this.type === '1'">
                    <span>推广平台：</span>
                    <span v-for="item in this.Viptype.redskinsPlatform" :key="item.id">{{item | platformFilter}}</span>
                  </p>
                  <p class="yonghutouxiagn_p5" v-if="this.type === '1'">
                    <span>内容分类：</span>
                    <span v-for="item in this.Viptype.contentType" :key="item.id">{{item | contentCategoryFilter}}</span>
                  </p>
                  <p class="yonghutouxiagn_p3">
                    <span @click="dfbieijb">个人中心</span>
                    <span @click="qiehuanzhanghao">切换账号</span>
                    <span @click="tuichuqingchu">退出账号</span>
                  </p>
                </div>
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

            <div class="fuchuang_right">
              <div class="sdibeirbgi" @mouseenter="showHover(0)" @mouseleave="showHover(0)">
                <img v-if="!this.fu_show" src="../assets/new/htmal5icon31@2x.png" alt="" class="fuchuang_right_kefu">
                <img v-else src="../assets/new/htmal5icon31@2xf.png" alt="" class="fuchuang_right_kefu">
                <p class="fuchuang_right_kefu_p" >
                  在
                  线
                  客
                  服
                </p>
                <!--  -->
                <div class="fu_hover_div1" v-if="this.fu_show">
                  <img src="../assets/new/htmal5icon31@2xf.png" alt="">
                  <span>在线客服</span>
                  <p>工作日：8:30-17:30 </p>
                  <div @click="showZtIframe = true">联系客服</div>
                </div>
              </div>

              <span class="fuchuang_right_xian"></span>

              <div class="fuchuang_right_kefu_p1" @mouseenter="showHover(1)"        @mouseleave="showHover(1)">
                <img v-if="this.fu_show1" src="../assets/new/xiaoxi@2xf.png" alt="" class="fuchuang_right_xiaoxi_icon">
                <img v-else src="../assets/new/xiaoxi@2x.png" alt="" class="fuchuang_right_xiaoxi_icon">
                <p class="ibrgiebrbig">消息</p>
                <!--  -->
                <div class="fu_hover_div2" v-if="this.fu_show1">
                <!-- <div class="fu_hover_div2"> -->
                  <ul>
                    <li>
                      <img src="../assets/new/测试.png" alt="">
                      <p>会员提醒</p>
                      <p>您已开通会员，可点击个人中心查看详情点击个人中心查点击个人中心查点击个人中心查</p>
                    </li>
                  </ul>
                </div>
              </div>

              <span class="fuchuang_right_xian"></span>

              <div class="fuchuang_right_kefu_p" @mouseenter="showHover(2)" @mouseleave="showHover(2)">
                <p >
                  问
                  题
                  反
                  馈
                </p>
                <!--  -->
                <div class="fu_hover_div3" v-if="this.fu_show2">
                  <img src="../assets/new/图像 222@2x.png" alt="">
                  <p>微信扫一扫</p>
                  <p>金牌客服为您服务</p>
                  <p>服务热线：021-6077 6584</p>
                </div>
              </div>
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
    <div class="shfbvv content animate__animated animate__fadeInDown" v-if="scrollTop" >
      <div class="fuchuang_top">
        <img src="../assets/new/组 54@2x.png" alt="" class="fuchuang_top_logo">
        <!-- <img src="../assets/new/路径 1003@2x.png" alt="" class="fuchuang_top_laba"> -->
        <p class="fuchuang_top_Gbo">
          <span>
            <img src="../assets/new/路径 1003@2x.png" alt="" class="fuchuang_top_laba">
          </span>
          <span>你的好友已提现</span>
          <span>...</span>
        </p>
        <div class="fuchuang_top_sousuokuang">
          <el-input placeholder="请输入您要查找的商品/红人" v-model="input3" class="input-with-select" @keyup.enter.native="quedingsousuo">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="搜商品" value="1"></el-option>
              <el-option label="搜红人" value="2"></el-option>
            </el-select>
            <el-button slot="append" @click="quedingsousuo">搜索</el-button>
          </el-input>
        </div>
      </div>
    </div>
    <!-- <div class="fu">
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
    </div> -->

    <!-- 中通客服 -->
    <div class="zt-service-iframe-wrap" ref="ztIframeWrap" :class="showZtIframe ? 'active' : '' ">
      <div class="zt-service-hd clearfix">
        <div class="zt-service-title">红人带货</div>
        <img class="down-icon" src="@/assets/down.png" alt="" @click="showZtIframe = false">
      </div>
      <iframe class="zt-service-iframe" :src="ztServiceIframeSrc" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import { makeScrollNodeScrollToMiddle } from '@/utils/mix'
import { platformData, fansNumberData, fansFavoriteData } from '../data/common'
import ztConfig from '@/config/zt-service-config'
import { HOmApi } from '../api/login'

export default {
  name: 'Index',
  data () {
    return {
      // ----zuixin---
      scrollTop: '',
      fuxian: false,
      fushow1: false,
      fushow2: false,
      show3: false,
      select: '1',
      token: sessionStorage.getItem('token'),
      type: sessionStorage.getItem('type'),
      // type: '1',
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
      platformData,
      fu_show: false,
      fu_show1: false,
      fu_show2: false,
      ztServiceIframeSrc: `https://online.zto.com?configId=${ztConfig.configId}&pcType=clientDialog`,
      showZtIframe: false, // 显示中通客服
      Viptype: '', // 会员状态
      content_img: ''

    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('scroll', this.showbtn, true)
    HOmApi({
      sessionId: this.token
    }).then(data => {
      // this.$router.go(0)
      if (this.type === '1') {
        this.Viptype = data.rrud
        this.Viptype.contentType = this.Viptype.contentType.split(',')
      } else if (this.type === '2') {
        this.Viptype = data.rbud
      }
      console.log('999999', this.Viptype)
    })
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
        this.fushow2 = false
      } else if (a === 2) {
        this.show3 = !this.show3
        this.fushow1 = false
        this.fushow2 = false
      } else if (a === 3) {
        this.fushow2 = !this.fushow2
        this.show3 = false
        this.fushow1 = false
      } else if (a === 4) {
        this.fushow2 = !this.fushow2
        this.show3 = false
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
      this.$router.push({ name: 'personal' })
      this.fushow2 = !this.fushow2
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
    },
    handleConcactCustService () {
      /* eslint-disable */
      if (IB) IB.chat()
      else {
        this.$notify({ title: '正在与客服建立连接中，请稍后操作', showClose: false, duration: 900 })
      }
    },
    // 右侧鼠标移入移出事件
    showHover (a) {
      if (a === 0) {
        this.fu_show = !this.fu_show
      } else if (a === 1) {
        this.fu_show1 = !this.fu_show1
      } else if (a === 2) {
        this.fu_show2 = !this.fu_show2
      }
    },
    // 退出登录状态
    tuichuqingchu () {
      this.$alert('您确定要退出登录吗？', '注意！', {
        confirmButtonText: '确定',
        callback: action => {
          sessionStorage.clear()
          this.fushow2 = false
          this.$router.go(0)
        }
      })
    },
    // 切换账号
    qiehuanzhanghao () {
      this.$router.push({name:'login'})
      this.fushow2 = false
      alert(this.fushow2)
    },
    // 开通，续费会员
    Vipstart() {}
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

      .fuchuang_top_sousuokuang {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        .el-input-group__prepend {
          border-radius: 25px 0 0 25px;
          .el-input__inner {
            color: #666;
            width: 100px;
          }
        }
        .el-input-group {
          width: 450px;
          border:1px solid rgba(231,31,23,1);
            border-radius: 25px;
          .el-input__inner {
            // border:1px solid rgba(231,31,23,1);
            box-sizing: border-box;
          }
          .el-input-group__append {
            border-radius: 0 25px 25px 0;
            background-color: rgba(231,31,23,1);
            border: 1px solid rgba(231,31,23,1);
            font-size:14px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            opacity:1;
            box-sizing: border-box;
          }
        }
      }
</style>

<style lang="less" scoped>

.zt-service-iframe-wrap {
  position: fixed;
  right: 45px;
  bottom: 0px;
  z-index: 1200;
  height: 0px;
  overflow: hidden;
  width: 360px;
  box-sizing: border-box;
  &.active {
    border: 1px solid rgb(253, 48, 105);
    height: auto;
    height: 510px;
    overflow: auto;
  }
  .zt-service-title {
    display: block;
    font-size: 14px;
    color: rgb(255, 255, 255);
    line-height: 40px;
    padding-left: 10px;
  }
  .zt-service-hd {
    background-color: rgb(253, 48, 105);
    width: 400px;
    height: 40px;
    position: relative;
  }
  .zt-service-iframe {
    // width: 100%;
    width: 400px;
    height: calc(100% - 40px);
    border: none;
  }
  .down-icon {
    position: absolute;
    top: 10px;
    cursor: pointer;
    right: 10px;
    width: 20px;
    height: 18px;
  }
}

.zt-service-iframe-wrap {
  &.active {
    width: 400px;
    height: 600px;
  }
}
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
        height: 76px;
        margin: auto;
        position: relative;
        width: 1600px;
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
          position: absolute;
          box-sizing: border-box;
          bottom: 0;
          right: 0;

          span {
            display: inline-block;
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
            .idfgfvir {
              display: inline-block;
              width: 31px;
              height: 31px;
              // border: 1px solid #E39603;
              border-radius: 50%;
              opacity: 1;
              img {
                width: 31px;
                height: 31px;
                border-radius: 50%;
                opacity: 1;
              }
            }
            .yonghutouxiagn {
              position: fixed;
              top: 170px;
              right: 145px;
              width: 208px;
              background: #FFFFFF;
              box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
              opacity: 1;
              border-bottom: 1px solid #E8251D;
              padding: 15px;
              box-sizing: border-box;
              span {
                margin: 0;
              }
              .yonghutouxiagn_p1 {
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 15px;
                  float: left;
                  margin-right: 20px;
                }
                span {
                  line-height: 30px;
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  opacity: 0.99;
                }
              }
              .yonghutouxiagn_p2 {
                span {
                  font-size: 11px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  line-height: 24px;
                  color: #999999;
                  opacity: 0.99;
                  margin: 15px 0;
                  span {
                    color: #E8251D;
                  }
                }
              }
              .yonghutouxiagn_p3 {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: 400;
                // line-height: 37px;
                color: #666666;
                opacity: 0.99;
                display: flex;
                bottom: 15px;
                span {
                  flex: 1;
                  border-right:1px solid #D6D6D6;
                  text-align: center;
                }
                span:last-child {
                  border: none;
                }
              }
              .yonghutouxiagn_p4 {
                span {
                  font-size: 11px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  line-height: 30px;
                  color: #686868;
                  opacity: 0.99;
                }
                span:first-child {
                  font-size: 11px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  line-height: 30px;
                  color: #999999;
                  opacity: 0.99;
                }
              }
              .yonghutouxiagn_p5 {
                font-size: 11px;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 24px;
                color: #999999;
                opacity: 0.99;
                margin-bottom: 10px;
                span {
                  display: inline-block;
                  height: 18px;
                  background: #ED231A;
                  opacity: 0.83;
                  border-radius: 6px;
                  font-size: 11px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  line-height: 18px;
                  color: #FFFFFF;
                  opacity: 1;
                  text-align: center;
                  padding:  0 10px;
                  box-sizing: border-box;
                  margin-right: 5px;
                }
                span:first-child {
                  background: none;
                  color: #999999;
                  margin-right: 0;
                  padding: 0;
                }
              }
            }
          }
        }
        .dfaerecvnjoi {
          position: absolute;
          right: 45px;
          top: 76px;
        }
        .bhuvgyghj {
          position: absolute;
          right: 45px;
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
    .shfbvv {
        width: 100vw;
        height:54px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 6px rgba(0,0,0,0.11);
        opacity:1;
        position: fixed;
        top: 0;
        line-height: 54px;
        box-sizing: border-box;
      .fuchuang_top {
        width: 1600px;
        height:54px;
        margin: auto;
        .fuchuang_top_logo {
          width: 107px;
          height: 40px;
          margin-right: 70px;
          vertical-align: middle;
        }
        .fuchuang_top_laba {
          width: 22px;
          height: 18px;
          vertical-align: middle;
        }
        .fuchuang_top_Gbo{
            display: inline-block;
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
    .fuchuang_right {
      position: fixed;
      top: 0;
      right: 0;
      width:45px;
      // height:933px;
      height: 100vh;
      background:rgba(255,255,255,1);
      box-shadow:0px 3px 6px rgba(0,0,0,0.11);
      opacity:1;
      box-sizing: border-box;
      text-align: center;
      .sdibeirbgi{
        margin-top: 430px;
        padding: 13px 0;
        box-sizing: border-box;
      }
      .fuchuang_right_kefu {
        width: 18px;
        height: 18px;
      }
      .fuchuang_right_kefu_p {
        display: inline-block;
        padding: 0 18px;
        box-sizing: border-box;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:17px;
        color:rgba(247,133,128,1);
        opacity:1;
      }
      .fuchuang_right_kefu_p:hover {
        padding: 10px 0;
        box-sizing: border-box;
        display: inline-block;
        padding: 0 18px;
        box-sizing: border-box;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:17px;
        color:#fff;
        opacity:1;
        background-color: rgba(247,133,128,1);
      }
      .fuchuang_right_xian {
        display: inline-block;
        width:16px;
        height:0px;
        border:1px solid rgba(153,153,153,1);
        opacity:1;
        margin: 10px 0;
      }
      .fuchuang_right_xiaoxi_icon {
        display: block;
        width: 18px;
        height: 18px;
        margin: 5px auto;

      }
      .fuchuang_right_kefu_p1 {
        padding: 13px 0;
        box-sizing: border-box;
        p {
          font-size:12px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(102,102,102,1);
          opacity:1;

        }
      }
      .fuchuang_right_kefu_p1:hover {
        background-color:rgba(247,133,128,1) ;
        .ibrgiebrbig {
          color: #fff;
        }
      }
      .sdibeirbgi:hover {
        background-color:rgba(247,133,128,1) ;
        p {
          color: #fff;
        }
      }
    }
    .fu_hover_div1 {
      position: fixed;
      top: 430px;
      right: 45px;
      width: 167px;
      height:115px;
      background:rgba(247,133,128,1);
      opacity:1;
      padding: 22px 13px;
      border-radius: 5px 0 0 5px;
      box-sizing: border-box;
      z-index: 1200;
      img {
        width: 13px;
        height: 13px;
        margin-right: 5px;
      }
      span {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        opacity:1;
      }
      p {
        line-height: 35px;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        opacity:1;
        margin-left: 20px;
      }
      div {
        width:71px;
        height:23px;
        border:1px solid rgba(255,255,255,1);
        opacity:1;
        border-radius:4px;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:23px;
        color:rgba(255,255,255,1);
        opacity:1;
        text-align: center;
        margin-left: 20px;
      }
    }
    .fu_hover_div2 {
      position: fixed;
      top: 570px;
      right: 45px;
      width:293px;
      height:269px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 6px rgba(0,0,0,0.16);
      opacity:1;
      border-radius:8px 0px 0px 8px;
      overflow-x: hidden;
      overflow-y: hidden;
      ul {
        height:269px;
        padding: 0 12px ;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        li {
          width: 100%;
          height: 85px;
          padding: 20px 0;
          box-sizing: border-box;
          border-bottom:1px solid rgba(211,211,211,1);
          text-align: left;
          img {
            float: left;
            width:45px;
            height:45px;
            background:rgba(247,248,250,1);
            border:1px solid rgba(198,162,97,1);
            border-radius:50%;
            opacity:1;
            margin-right: 5px;
          }
          p:nth-child(2) {
            font-size:14px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            opacity:1;
            margin-bottom: 5px;
          }
          p:nth-child(3) {
            font-size:12px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            opacity:1;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .fu_hover_div3 {
      position: fixed;
      top: 665px;
      right: 45px;
      width:194px;
      height:209px;
      background:rgba(247,133,128,1);
      opacity:1;
      img {
        width: 95px;
        height: 95px;
        margin-top: 20px;
      }
       P {
          font-size:12px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:25px;
          color:rgba(255,255,255,1);
          opacity:1;
       }
    }
  }
  @media screen and (max-width: 1366px) {
    .honIndex{
      .top{
        .top-yyy {
          padding-left: 300px;
        }
      }
      .indexHeader {
        .heater-div {
          width: 1200px;
        }
      }
      .shfbvv {
        .fuchuang_top {
          width: 1200px;
        }
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .honIndex{
      .top{
        .top-yyy {
          padding-left: 300px;
        }
      }
      .indexHeader {
        .heater-div {
          width: 1200px;
        }
      }
      .shfbvv {
        .fuchuang_top {
          width: 1200px;
        }
      }
    }
  }

</style>
