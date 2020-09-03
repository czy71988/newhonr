<template>
<!-- 关于我们 -->
  <div class="about">

    <div class="k1 animate__animated animate__zoomIn">
      <!-- <img class="img1" src="../assets/new/组 645@3x.png" alt=""> -->
      <img src="../assets/new/组 598@2x.png" alt="" class="img2" v-if="k3 !== 1" @click="xiangqian">
      <img src="../assets/new/组 599@2x.png" alt="" class="img3" v-if="k3 !== 3" @click="xianghou">
      <div class="content animate__animated animate__slideInLeft" v-if="k3 === 1">
        <img src="../assets/new/91596006188_.pic_hd@2x.png" alt="" class="img4">
        <img src="../assets/new/资源 1@4x@2x(1).png" alt="" class="img5">
        <p>
          111中通快递创建于2002年5月8日，是一家以快递为核心业务，集跨境、快运、商业、云仓、航空、金融、智能、传媒等生态版块于一体的综合物流服务企业，2016年10月27日在美国纽交所上市，向全世界打开了一扇了解中国快递发展的窗口。
        </p>
        <p>
          自创建以来，中通快递紧抓邮政体制改革、经济转型升级、产业结构调整、电商蓬勃发展等政策和市场机遇，从“利己”、“利他”到“利社会”，帮助更多人创业就业，实现美好新生活；帮助客户削减成本，提升效益，创造价值；帮助社会解决问题，降低物流成本，实现“工厂到用户”、“田头到餐桌”的全链路管理。
        </p>
        <p>
          截至2019年9月30日，全网服务网点近30000个，转运中心89个，直接网络合作伙伴逾4750家，干线运输车辆逾6,600辆（其中逾3,950辆为高运力甩挂车），干线运输线路超过2,400条，网络通达98%以上的区县，乡镇覆盖率超过89%
        </p>
      </div>
      <div class="content animate__animated animate__slideInLeft" v-if="k3 === 2">
        <img src="../assets/new/51596682028_.pic_hd@2x.png" alt="" class="img4">
        <img src="../assets/new/资源 1@4x@2x.png" alt="" class="img6">
        <p>
          上海中快文化传媒有限公司是中通快递集团旗下控股公司，是一家业务覆盖全国、目前年净利润数千万元（人民币）的大型互联网广告传媒公司，以中国快递电商发展为依托，通过快递业务的新零售、社交化场景，将每年服务的数百亿用户人次进行挖掘和沉淀，用专业化、智能化的技术和线上线下相结合的互联网形式，实现用户流量的广告“变现”。目前合作伙伴主要有:阿里妈妈、蚂蚁金服、拼多多、京东、网易、中国银联、招商银行等
        </p>
      </div>
      <div class="content animate__animated animate__slideInRight" v-if="k3 === 3">
        <img src="../assets/new/11596680914_.pic_hd@2x.png" alt="" class="img4">
        <img src="../assets/new/资源 1@4x@2x(2).png" alt="" class="img7">
        <p>
          红人带货是中通快递集团旗下中快传媒主推的达人直播、社群拼团的选品链接平台，助力商家快速有效寻找达人／团长，帮助达人／团长快速匹配优质产品进行流量变现。目前，旗下已聚集达人／团长超2000位，服务品牌及商家超500家，并为商家、达人／团长提供一站式高效便捷的快递及仓储配套服务。目前覆盖的直播和社交团购平台有淘宝直播、抖音、快手、腾讯看点直播、有蜜团购等。

        </p>
        <p>
          <span class="span1">
            合作客户：
          </span>
          君乐宝、白象食品、凤祥食品、盼盼食品 隆力奇 、粒上皇、袁隆平大米、杞里香
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      k3: 1
    }
  },
  methods: {
    xiangqian () {
      this.k3 = this.k3 - 1
      console.log(this.k3)
    },
    xianghou () {
      this.k3 = this.k3 + 1
      console.log(this.k3)
    }
  }
}
</script>

<style lang="less">
</style>

<style lang="less" scoped>
  .clearfix::after, .clearfix::before {
    display: block;
    content: ' ';
    clear: both;
  }
  .about {
    width: calc(100vw - 45px);
    height: calc(100vh - 200px);
    .k1 {
      width: calc(100vw - 45px);
      height: calc(100vh - 200px);
      float: left;
      text-align: center;
      background: url('../assets/new/组 692.png') no-repeat center center;
      background-size: cover;
      background-attachment: fixed;
      // background-size: 100%,100%;
      position: relative;
    }
    .img2 {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 50%;
      left: 165px;
      transform: translateY(-50%);
    }
    .img3 {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 50%;
      right: 165px;
      transform: translateY(-50%);
    }
    .content {
      margin: auto;
      width: 1170px;
      height: 468px;
      position: relative;
      top: 50%;
      margin-top: -234px;
      text-align: left;
      .img4 {
        width: 468px;
        height: 468px;
        float: left;
        margin-right: 50px;
      }
      .img5 {
        width: 215px;
        height: 38px;
        margin-bottom: 30px;
      }
      .img7 {
        width: 176px;height: 66px;
        margin-bottom: 30px;
      }
      .img6 {
        width: 173px;height: 41px;
        margin-bottom: 30px;
      }
      p {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(255,255,255,1);
        // letter-spacing:16px;
        opacity:1;
        span {
          display: block;
        }
      }
      p:nth-child(3) {
        margin-bottom: 40px;
      }
      p:nth-child(4) {
        margin-bottom: 40px;
      }
    }
  }
  // ======

  @media (max-width: 1366px) {
    .about {
      .img3 {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 50%;
      right: 15px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      }

    .img2 {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 50%;
      left: 15px;
      transform: translateY(-50%);
    }
    }
  }
  // ======

  @media (max-width: 1600px) {
    .about {
      .img3 {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 50%;
      right: 50px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      }

    .img2 {
      width: 52px;
      height: 52px;
      position: absolute;
      top: 50%;
      left: 50px;
      transform: translateY(-50%);
    }
    }
  }
</style>
