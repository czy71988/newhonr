<template>
<!-- 关于我们 -->
  <div class="about">
    <!-- 顶部banner图 -->
    <div class="top">
      <!-- <img src="../assets/new/rexiao/摄图网_501103724_现代仓库展示区（企业商用）@3x.png" alt=""> -->
      <p class="Topp1">中通运仓科技</p>
      <p class="Topp2">实现仓储、配送、运输一体化、打造扁平化的供应链</p>
    </div>
    <div class="fjgbeirger">
      <div class="jiaceng animate__animated animate__slideInUp">
        <div>
          <img src="../assets/new/rexiao/组 528@3x.png" alt="">
          <p>方案设计</p>
          <p>运营问题诊断、运营数据分析、订制解决方案、物流结构规划 运作流程设计、管理系统设定、仓库选择规划、库内施改造、 库内设备配置</p>
        </div>
        <div>
          <img src="../assets/new/rexiao/组 529@3x.png" alt="">
          <p>仓库管理</p>
          <p>入仓管理、收货请点、商品质检、循环盘点货品拣选、多品 包装、出仓验货、包裹发运、退货处理</p>
        </div>
        <div>
          <img src="../assets/new/rexiao/组 530@3x.png" alt="">
          <p>物流配送</p>
          <p>为企业提供干线运输、区域配送、分仓调拨快递配送、平 台入仓、智能筛选、线路优化、包裹跟踪、以及其他个性 化的配送需求，满足客户的不同物流服务需求</p>
        </div>
      </div>
    </div>
    <div class="two animate__animated animate__slideInUp">
      <p>
        <span @click="jjjj = '1'" :class="jjjj === '1' ? 'spanHover' : ''">市场开发</span>
        <span @click="jjjj = '2'" :class="jjjj === '2' ? 'spanHover' : ''">运营团队</span>
        <span @click="jjjj = '3'" :class="jjjj === '3' ? 'spanHover' : ''">系统开发</span>
      </p>
      <div class="twos" v-if="jjjj === '1'">
        <img src="../assets/new/rexiao/图像 333@3x.png" alt="">
        <p>市场开发</p>
        <p>公司市场开发核心团队均来自仓储、物流、电商及传统行业的 领军人物、拥有丰富的行业客户资源及市场开发经验。</p>
      </div>
      <div class="twos" v-if="jjjj === '2'">
        <img src="../assets/new/rexiao/图像 352@2x.png" alt="">
        <p>运营团队</p>
        <p>超过10年的年仓配经验的专业运营团队，完善且专业的体制和仓内流程，确保客户库存准确和发货效率。</p>
      </div>
      <div class="twos" v-if="jjjj === '3'">
        <img src="../assets/new/rexiao/图像 353@2x.png" alt="">
        <p>系统研发</p>
        <p>技术团队有电商仓储10年业务技术经验，团队核心成员由阿里、菜鸟、京东、其他顶级电商服务商成员的精英组成。</p>
      </div>
    </div>
    <div class="lun">
      <el-carousel :interval="4000" type="card" height="316px">
        <el-carousel-item>
          <img src="../assets/new/rexiao/组 615@2x.png" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/new/rexiao/组 619@2x.png" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/new/rexiao/组 620@2x.png" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/new/rexiao/组 621@2x.png" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/new/rexiao/组 622@2x.png" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../assets/new/rexiao/组 623@2x.png" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="th">
      <div class="hengxian">
        <p class="huoban">合作伙伴</p>
        <div></div>
      </div>
      <div class="bottom">
        <img src="../assets/new/rexiao/101595905106_.pic_hd@3x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // activedTabName: 'tab3'
      jjjj: '1'
    }
  },
  methods: {
    // handleClick (tab, event) {
    //   console.log(tab, event)
    // }
  }
}
</script>

<style lang="less">
.lun {
  width: 1000px;
  margin: auto;
  padding-top: 60px;
  box-sizing: border-box;
  .el-carousel {
    width: 1000px;
      // height: 316px;
    .el-carousel__item {
      // width: 700px;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.about {
  position: relative;
  .top {
    height: 522px;
    width: 100%;
    // background: #000;
    //   opacity: 0.5;
    background-image: url('../assets/new/rexiao/组 532@2x.png');
    background-size: 100% 100%;
    position: relative;
    margin-bottom: 30px;
    .Topp1 {
      font-size:48px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:108px;
      color:rgba(255,255,255,1);
      letter-spacing:16px;
      opacity:1;
      text-align: center;
      padding-top: 100px;
      box-sizing: border-box;
      z-index: 99;
    }
    .Topp2 {
      font-size:28px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:74px;
      color:rgba(255,255,255,1);
      letter-spacing:16px;
      opacity:1;
      text-align: center;
    }
  }
  .fjgbeirger {
    position: absolute;
    top: 340px;
    left: 50%;
    transform: translateX(-50%);
  }
  .jiaceng {
    width:1590px;
    height:454px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    opacity:1;
    border-radius:24px;
    div {
      width: 33.3333%;
      height: 100%;
      float: left;
      text-align: center;
      img {
        width: 92px;
        height: 92px;
        margin-top: 70px;
      }
      p {
        text-align: center;
        font-size:26px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:80px;
        color:rgba(40,40,40,1);
        opacity:1;
      }
      p:nth-child(3) {
        display: block;
        width: 326px;
        margin: auto;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(126,126,126,1);
        // letter-spacing:px;
        opacity:1;
      }
    }
  }
  .two {
    width: 100%;
    height: 686px;
    margin-top: 330px;
    background:rgba(247,247,247,1);
    opacity:1;
    p {
      text-align: center;
      span {
        display: inline-block;
        width:147px;
        height:53px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(112,112,112,1);
        opacity:1;
        border-radius:27px;
        font-size:26px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:53px;
        color:rgba(0,0,0,1);
        // letter-spacing:16px;
        opacity:1;
        text-align: center;
        margin: 50px 20px;
      }
      span:hover {
        border:1px solid rgba(232,37,29,1);color:rgba(232,37,29,1);
      }
      .spanHover {
        border:1px solid rgba(232,37,29,1);color:rgba(232,37,29,1);
        display: inline-block;
        width:147px;
        height:53px;
        background:rgba(255,255,255,1);
        // border:1px solid rgba(112,112,112,1);
        opacity:1;
        border-radius:27px;
        font-size:26px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:53px;
        // color:rgba(0,0,0,1);
        // letter-spacing:16px;
        opacity:1;
        text-align: center;
        margin: 50px 20px;
      }
    }
    .twos {
      width:1170px;
      height:473px;
      background:rgba(255,255,255,1);
      box-shadow:0px 3px 6px rgba(0,0,0,0.16);
      opacity:1;
      border-radius:24px;
      padding: 30px;
      box-sizing: border-box;
      margin: auto;
      img {
        width: 413px;
        height: 413px;
        float: left;
        margin-right: 30px;
      }
      p:nth-child(2) {
        font-size:28px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:26px;
        color:rgba(40,40,40,1);
        opacity:1;
        text-align: left;
        margin-bottom: 30px;
      }
      p:nth-child(3) {
        text-align: left;
        font-size:20px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(126,126,126,1);
        // letter-spacing:16px;
        opacity:1;
      }
    }
  }
  .th {
    background-color: #fff;
    padding: 0px 165px;
    box-sizing: border-box;
    .hengxian {
        margin-top: 105px;
        text-align: center;
      .huoban {
        font-size:36px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:36px;
        color:rgba(40,40,40,1);
        opacity:1;
        margin-bottom: 10px;
        // text-align: center;
      }
      div {
        width:74px;
        height:0px;
        border:4px solid rgba(232,37,29,1);
        border-radius: 4px;
        opacity:1;
        margin: auto;
      }
    }
    .bottom {
      width: 100%;
      height: 751px;
      margin-top: 40px;
      img {
        width: 100%;
        height: 751px;
      }
    }
  }
}

@media (max-width:1366px) {
  .about {
    width: calc(100vw - 45px);
    .fjgbeirger {
      .jiaceng {
        width: 1200px;
      }
    }
  }
}
@media (max-width:1600px) {
  .about {
    width: calc(100vw - 45px);
    .fjgbeirger {
      .jiaceng {
        width: 1400px;
      }
    }
  }
}

.clearfix::after, .clearfix::before {
  display: block;
  content: ' ';
  clear: both;
}
</style>
