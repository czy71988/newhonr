<template>
  <div class="Store_min">
    <div v-if="div_show">
      <div class="honr_touxiang">
        <img src="../../assets/new/测试.png" alt="">
        <img class="img1" src="../../assets/new/组 247.png" alt="">
      </div>
      <div class="content">
        <p>
          <span class="span1">我的信息</span>
          <span v-if="show" @click="getsshow" class="span2">修改</span>
        </p>
        <div class="fenxian"></div>
        <p class="p1">商家姓名：</p>
        <p class="p2">{{data.vendorName}}</p>

        <p class="p1">账号状态：</p>
        <!-- <p v-if="show" class="p2 p3">
          审核通过
        </p> -->
        <p class="p2">{{data.accountStatus | auditStateFilter}}
          <span v-if="data.accountStatus === '2'" class="jujue_div" @click="store_jujuesize">查看原因</span>
        </p>

        <p class="p1">会员状态：</p>
        <p class="p2 p4">
          <span>{{data.vipStatus === '0' ?'非会员' : (data.vipStatus === '1' ?'正常' : '已过期')}} （{{data.vipValidityStart}}到期）</span>
          <span class="sotre_span2" @click="div_show1">续费</span>
        </p>

        <p class="p1">所属平台：</p>
        <p class="p2">{{arr | platformStoreFilter}}</p>
        <p class="p1">所属地区：</p>
        <p v-if="show" class="p2">
          <span>{{data.province}}</span>
          <span>{{data.city}}</span>
        </p>
        <el-select v-else v-model="this.from.fansType" multiple placeholder="请选择">
          <el-option
            v-for="item in provinceData"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <p class="p1">店铺名称：</p>
        <p v-if="show" class="p2">{{data.shopName}}</p>
        <el-input v-else v-model="from.shopName" placeholder="请输入内容"></el-input>

        <p class="p1">手机号：</p>
        <p v-if="show" class="p2">{{data.phoneNumber}}</p>
        <el-input v-else v-model="from.phoneNumber" placeholder="请输入内容"></el-input>

        <p class="p1">微信号：</p>
        <p v-if="show" class="p2">{{data.wechatAccount}}</p>
        <el-input v-else v-model="from.wechatAccount" placeholder="请输入内容"></el-input>

      </div>
      <div @click="baocun" v-if="!show" class="bnt">完成</div>
    </div>

    <div v-else>
      <p class="xufei_p1">会员续费</p>
      <div class="fenxian"></div>
      <p class="xufei_p">选择续费金额</p>
      <div class="uanzejinr">
        <div :class="active ? 'jine1' : ''">
          <p>
            <span>10000</span>
            <span>元/1年</span>
          </p>
          <p>续费会员</p>
        </div>
        <div :class="active ? 'jine1' : ''">
          <p>
            <el-input></el-input>
            <span>元</span>
          </p>
          <p>自定义金额</p>
        </div>
      </div>
      <p class="xufei_p">
        <span>选择支付方式</span>
        <span>支付即同意《红人带货服务合同》</span>
      </p>
      <div>
        <el-radio v-model="radio" label="1">支付宝支付</el-radio>
        <el-radio v-model="radio" label="2">微信支付</el-radio>
        <el-radio v-model="radio" label="3">银行卡</el-radio>
      </div>

      <div v-if="radio === '1'" class="fangshi_xuanze">
        <p class="zhifu_fangshi_xuane">
          <span>应付金额：</span>
          <span>10000元</span>
        </p>
        <img src="../../assets/new/%E4%BA%8C%E7%BB%B4%E7%A0%81%E5%9B%BE%E7%89%87_8%E6%9C%887%E6%97%A515%E6%97%B626%E5%88%8602%E7%A7%92.png" alt="">
        <p class="zhifubao_icon">
          <img src="../../assets/new/zhifubao.png" alt="">
          <span>跳转到支付宝网页版支付</span>
        </p>
      </div>
      <div v-if="radio === '2'" class="fangshi_xuanze">
        <p class="zhifu_fangshi_xuane">
          <span>应付金额：</span>
          <span>10000元</span>
        </p>
        <img src="../../assets/new/%E4%BA%8C%E7%BB%B4%E7%A0%81%E5%9B%BE%E7%89%87_8%E6%9C%887%E6%97%A515%E6%97%B626%E5%88%8602%E7%A7%92.png" alt="">
        <p class="zhifubao_icon">
          <img src="../../assets/new/weixin.png" alt="">
          <span>使用微信扫码支付</span>
        </p>
      </div>
      <div v-if="radio === '3'" class="fangshi_xuanze">
        <p class="zhifu_fangshi_xuane">
          <span>应付金额：</span>
          <span>10000元</span>
        </p>
        <p class="skjhfd_eae1">注意  付款后联系客服开通VIP权限</p>
        <p class="skjhfd_eae">
          <span>银行卡号：</span>
          <span>216400100100090343</span>
        </p>
        <p class="skjhfd_eae">
          <span>开户行：</span>
          <span>兴业银行上海青浦支行</span>
        </p>
        <p class="skjhfd_eae">
          <span>客服电话：</span>
          <span>187367230826</span>
        </p>
      </div>

      <div class="xufei_wenan">
        <p class="wenan_p1">开通后您将获得以下权限</p>
        <p>1、直播带货服务（入驻服务+单次服务+ROI服务，平台提供直播匹配服务红人/明星/渠道）；</p>
        <p>2、红人带货为商家推荐快递、仓储、快运服务并提供专属售后对接解决；</p>
        <p>3、价值人民币贰万元（刊例价）的广告/渠道发布服务（广告发布渠道：如包裹贴、快递短信、模板消息、社群团购及微信公众号等）；</p>
        <p>4、为期一年的 “有蜜APP”注册会员使用权限（价值人民币伍万元）；</p>
        <p>5、红人带货专业的平台产品发布及相关问题的咨询服务；</p>
        <p>6、平台定制化数据分析及应用服务。</p>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      center>
      <p class="store_dialog_p1">未通过原因</p>
      <p class="store_dialog_p2">感谢您的联，感谢您的联，感谢您的联，感谢您的联</p>
      <div class="store_dialog_btn" @click="chongxinshengqing">重新申请</div>
    </el-dialog>
  </div>
</template>

<script>
import { provinceData } from '../../data/common'
import { storeContent, storeContentXiugai } from '@/api/newshopList'
export default {
  data () {
    return {
      show: true,
      div_show: true,
      provinceData,
      centerDialogVisible: false,
      radio: '1',
      from: {
        shopName: '',
        phoneNumber: '',
        wechatAccount: ''
      },
      token: sessionStorage.getItem('token'),
      data: {},
      arr: []
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getsshow () {
      this.show = !this.show
    },
    baocun () {
      storeContentXiugai(this.from).then(data => {
        console.log(data)
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        this.show = !this.show
        this.getlist()
      })
    },
    // 获取信息
    getlist () {
      const token = sessionStorage.getItem('token')
      storeContent({
        sessionId: token
      }).then(data => {
        this.data = data.rbud
        this.from = this.data
        var l = this.data.shopPlatform
        // var arr = [] // 定义数组
        // for (var i in l) {
        //   arr.push(l[i])
        // }
        // var obj = l // 定义对象

        for (var i in l) {
          this.arr.push(l[i])
        }

        console.log('pppp1', this.arr)
        console.log('pppp', this.data)
      })
    },
    // 查看拒绝原因
    store_jujuesize () {
      // alert('ooo')
      this.centerDialogVisible = !this.centerDialogVisible
    },
    // 重新申请
    chongxinshengqing () {
      this.centerDialogVisible = !this.centerDialogVisible
      this.$router.push({ name: 'shangjiashengqing' })
    },
    // 点击续费按钮
    div_show1 () {
      this.div_show = !this.div_show
    }
  }
}
</script>

<style lang="less">
.Store_min {
  .el-input {
    .el-input__inner {
      width:290px;
      height:42px;
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      border-radius:10px;
    }
  }
  .el-textarea {
    .el-textarea__inner {
      width:290px;
      height:97px;
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      border-radius:10px;
      margin-bottom: 20px;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {

      width: 150px;
    .el-input__inner {

      width: 135px;
    }
  }
  .el-dialog {
    width:460px;
    background:rgba(255,255,255,1);
    opacity:1;
    border-radius:10px;
    .el-dialog__header {
      display: none;
    }
  }
  .uanzejinr {
    .el-input {
      display: inline-block;
      width: 90px;
      height: 32px;
      border: none;
      background-color: #e3e3e3;
      margin-top: 10px;
      line-height: 22px;
      .el-input__inner {
      width: 88px;
      height: 30px;
      border: none;
      background-color: #e3e3e3;
      }
    }
  }
}
</style>

<style lang="less" socped>
  .Store_min {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    padding-left: 45px;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
    .honr_touxiang {
      width: 110px;
      float: left;
      img {
        width:110px;
        height:110px;
        background:rgba(217,217,217,1);
        border:3px solid rgba(244,244,244,1);
        border-radius:50%;
        opacity:1
      }
      .img1 {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 125px;
        left: 125px;
      }
    }
    .content {
      width: 100%;
      height: 100%;
      padding-left: 157px;
      box-sizing: border-box;
      p {
        .span1 {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(85,85,85,1);
          opacity:1;
          line-height:25px;
          margin-right: 10px;
        }
        .span2 {
          display: inline-block;
          width:45px;
          height:25px;
          border:1px solid rgba(232,37,29,1);
          opacity:1;
          border-radius:6px;
          font-size:12px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:25px;
          color:rgba(232,37,29,1);
          opacity:1;
          text-align: center;
        }
      }
      .fenxian {
        width: 100%;
        height:2px;
        border:1px solid rgba(208,208,208,1);
        opacity:1;
        box-sizing: border-box;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .p1 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:36px;
        color:rgba(153,153,153,1);
        opacity:1;
      }
      .p2 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:55px;
        color:rgba(51,51,51,1);
        opacity:1;
        .jujue_div {
          display: inline-block;
          width:76px;
          height:22px;
          background:rgba(234,64,57,1);
          opacity:0.13;
          border-radius:6px;
          text-align: center;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:22px;
          color:rgba(247,98,92,1);
          opacity:1;
        }
      }
      .p3 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:55px;
        color:rgba(106,199,155,1);
        opacity:1;
      }
      .p4 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:55px;
        color:rgba(198,156,88,1);
        opacity:1;
        .sotre_span2 {
          display: inline-block;
          text-align: center;
          width:45px;
          height:22px;
          // line-height:22px;
          background:rgba(189,150,81,1);
          opacity:1;
          border-radius:6px;
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:22px;
          color:rgba(255,255,255,1);
          opacity:1;
        }
      }
    }
    .bnt {
      width:170px;
      height:42px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      margin-top: 60px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:42px;
      color:rgba(255,255,255,1);
      opacity:1;
      margin: 60px auto;
    }
    .xufei_p1 {

      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      line-height:37px;
      color:rgba(85,85,85,1);
      opacity:1;
    }
    .fenxian {
      width: 100%;
      height:2px;
      border:1px solid rgba(208,208,208,1);
      opacity:1;
      box-sizing: border-box;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .xufei_p {
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:32px;
      color:rgba(153,153,153,1);
      opacity:1;
      margin-bottom: 30px;
      span:nth-child(2) {
        margin-left: 10px;
        color:rgba(234,64,57,1);
      }
    }
    .uanzejinr {
      margin-bottom: 60px;
        height:84px;vertical-align:top;
      div {
        width:140px;
        height:84px;
        border:1px solid rgba(226,226,226,1);
        box-sizing: border-box;
        opacity:0.9;
        border-radius:5px;
        margin-right: 20px;
        display: inline-block;vertical-align:top;
        P {
          text-align: center;
          color:rgba(153,153,153,1);
        }
        p:nth-child(1) {
          line-height: 50px;
          text-align: center;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          opacity:1;
          span:nth-child(1) {
            font-size: 22px;
            color: #EA4039;
          }
        }
      }
      div:hover {
        border:1px solid rgba(234,64,57,1);
        p {
          color:rgba(51,51,51,1);
        }
      }
      .jine1 {
        width:140px;
        height:84px;
        border:1px solid rgba(234,64,57,1);
        opacity:1;
        border-radius:5px;
        box-sizing: border-box;vertical-align:top;
      }
    }
    .fangshi_xuanze {
      margin-left: 50px;
      margin-top: 40px;
      margin-bottom: 20px;
      .zhifu_fangshi_xuane {
        span:nth-child(1) {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:500;
          line-height:32px;
          color:#333333;
          opacity:1;
        }
        span:nth-child(2) {
          font-size:22px;
          font-family:PingFang SC;
          font-weight:500;
          line-height:32px;
          color:#EA4039;
          opacity:1;
        }
      }
      img {
        margin-top: 20px;
        width: 187px;
        height: 187px;
      }
      .zhifubao_icon {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(33,154,215,1);
        opacity:1;
        img {
          width: 22px;
          height: 22px;
          margin-top: 0;
          margin-right: 8px;
          // vertical-align:top;
        }
        span {
          vertical-align:top;
        }
      }
      .skjhfd_eae {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(51,51,51,1);
        opacity:1;
        span:nth-child(1) {
          color: #999999;
        }
      }
      .skjhfd_eae1 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(234,64,57,1);
        opacity:1;
      }
    }
    .xufei_wenan {
      p {
        font-size:14px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(153,153,153,1);
        opacity:1;
      }
      .wenan_p1 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(102,102,102,1);
        opacity:1;
      }
    }

    .store_dialog_p1 {
      font-size:20px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      opacity:1;
      text-align: center;
      margin-top: 50px;
      padding: 0 70px;
      box-sizing: border-box;
    }
    .store_dialog_p2 {
      font-size:14px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      opacity:1;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 50px;
      padding: 0 70px;
      box-sizing: border-box;
    }
    .store_dialog_btn {
      width:137px;
      height:40px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:40px;
      color:rgba(255,255,255,1);
      opacity:1;
      margin: auto;
    }
  }
</style>
