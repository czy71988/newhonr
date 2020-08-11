<!-- 商家用户 我的信息 -->
<template>
<div>
  <h2>我的信息</h2>
  <div class="conent-danding">
    <div class="content">
      <div class="content-top">
        <div class="top-xm">
          <p>
            <span class="i89">我的姓名 ：</span>
            <span class="hr-xingming1">{{myInf.username || myInf.nickname}}</span>
          </p>
          <p>
            <span class="i89">账号状态 ：</span>
            <span class="i87">{{myInf.state === 1 ? '审核通过' : (myInf.state === 2 ? '审核未通过' : '待审核')}}</span>
            <span>
              <el-button type="text"
              @click="fanhuixiugai = true"
              class="shenghezhuangtaixiugai">{{myInf.state === 1 ? '修改' : (myInf.state === 2 ? '查看详情' : '修改')}}
              </el-button>
            </span>
          </p>
          <p>
            <!-- 会员状态 -->
            <span class="i89">会员状态 ：</span>
            <!-- <span class="huiyuanzhuangtai-7">
              <span class="i87"><img src="../../assets/VIP-shixiao.png" alt="">无效</span>
              <span>
                <button class="huiyuan-xufei">续费</button>
              </span>
            </span> -->
            <span class="huiyuanzhuangtai-7">
              <span class="jbadifvbiav" v-if="paymentstate === 1">
                <img src="../../assets/VIP-tongguo.png" alt="">
                {{endTime}}
              </span>
              <span class="jbadifvbiav" v-else>
                <img src="../../assets/VIP-shixiao11.png" alt="">
              </span>
              <span>
                <button class="huiyuan-xufei" @click="xufeitanchuang=true">续费</button>
              </span>
            </span>
          </p>
        </div>
        <div class="content-content">
          <p>
            <img src="../../assets/地区.png" alt="">
            <span class="yu1">所属地区：</span><span class="yu2">{{myInf.province || '--'}} {{myInf.city || '--'}} {{myInf.area || '--'}}</span>
          </p>
          <p>
            <img src="../../assets/平台管理.png" alt="">
            <span class="yu1">所属平台：</span><span class="yu2">{{myInf.platform | platformStoreFilter}}</span>
          </p>
          <p>
            <img src="../../assets/店铺.png" alt="">
            <span class="yu1">店铺名称：</span><span class="yu2">{{myInf.shopname || '--'}}</span>
          </p>
          <p>
            <img src="../../assets/手机.png" alt="">
            <span class="yu1">手机号：</span><span class="yu2">{{myInf.phone || '--'}}</span>
          </p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
  <!-- 这是修改弹出框 -->
  <el-dialog
    :title="myInf.state===2 ? '驳回原因' : '请修改注册信息'"
    :visible.sync="fanhuixiugai"
    width="50%"
    center>
    <div v-if="myInf.state === 2">
      <p>{{myInf.remarks}}</p>
      <div @click="innerVisible=true" class="skdbvisbdiv">前往修改</div>
      <!--  -->
      <el-dialog
        width="50%"
        title="请修改注册信息"
        :visible.sync="innerVisible"
        append-to-body>
        <xiugaiStore v-if="fanhuixiugai" :infData="myInf" v-model="updateRegStepIndex" @updateSuccess = "handleUpdateRegSuccess" ></xiugaiStore>
      </el-dialog>
    </div>
    <div v-else>
      <xiugaiStore v-if="fanhuixiugai" :infData="myInf" v-model="updateRegStepIndex" @updateSuccess = "handleUpdateRegSuccess" ></xiugaiStore>
    </div>
  </el-dialog>
  <!-- 这是续费弹窗 -->
  <el-dialog
    :visible.sync="xufeitanchuang"
    width="50%"
    :before-close="handleClose">
    <div>
      <el-form class="formTJAHSBVK" :model="formFour" status-icon :rules="rules" ref="formFour" @submit.native.prevent>
        <div class="formTwo-a11">
          <p>选择会员期限</p>
        </div>
        <div class="formTwo-aa">
          <div class="formTwo-a1">
            <el-radio-group fill="#FD3069" v-model="formFour.memberTimelimit">
              <div>
                <el-radio :label="1">一年会员<span>￥10000</span></el-radio>
              </div>
              <!-- <div>
                <el-radio :label="2">二年期会员<span>11976</span>元</el-radio>
              </div>
              <div>
                <el-radio :label="3">三年期会员<span>17964</span>元</el-radio>
              </div> -->
            </el-radio-group>
          </div>
          <div class="formTwo-a2">
            选择支付方式
            <!-- <el-radio-group fill="#FD3069" v-model="formFour.openstate1" @change="agreeChange"> -->
            <el-radio-group fill="#FD3069" v-model="formFour.openstate1">
              <el-radio :label="0">支付宝支付（默认）</el-radio>
              <el-radio :label="1">银行卡支付</el-radio>
            </el-radio-group>
          </div>
          <div class="formTwo-a3" v-if="formFour.openstate1 === 1">
            <p class="yinghangzhifu3">
              <span>注意：请付款后联系客服开通VIP权限</span>
            </p>
            <p class="yinghangzhifu"><span class="yinghangzhifu1">开户行：</span><span class="yinghangzhifu2">兴业银行上海青浦支行</span></p>
            <p class="yinghangzhifu"><span class="yinghangzhifu1">银行账号：</span><span class="yinghangzhifu2">2164 0010 0100 0903 43</span></p>
            <p></p>
          </div>
          <div class="formTwo-a2">
            是否需要开票
            <el-radio-group fill="#FD3069" v-model="formFour.openstate">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </div>
          <div class="formTwo-a3" v-if="formFour.openstate === 1">
            <p class="formTwo-a4">
              <!-- 抬头类型 ： -->
              <el-form-item label="抬头类型" label-width="90px" prop="risetype">
                <el-radio-group fill="#FD3069" v-model="formFour.risetype">
                  <el-radio :label="1">专用发票</el-radio>
                  <el-radio :label="2">普通发票</el-radio>
                </el-radio-group>
              </el-form-item>
            </p>
            <div>
              <el-form-item label="发票抬头" label-width="90px" prop="rise">
                <el-input placeholder="请填写发票抬头" v-model="formFour.rise"></el-input>
              </el-form-item>
              <el-form-item label="税 号" label-width="90px" prop="dutyParagraph">
                <el-input placeholder="请填写税号" v-model="formFour.dutyParagraph"></el-input>
              </el-form-item>
              <!-- 专用发票 注册电话 开户行 银行账号必填 否选填 -->
              <el-form-item label="注册地址" prop="registerAddress" label-width="90px" >
                <el-input placeholder="请填写注册地址" v-model="formFour.registerAddress"></el-input>
              </el-form-item>
              <el-form-item label="注册电话" prop="registerTelephone" label-width="90px" :rules="{ required: formFour.risetype === 1, message: '请填写注册电话', trigger: 'blur' }">
                <el-input placeholder="填写注册电话" v-model="formFour.registerTelephone"></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="bankName" label-width="90px" :rules="{ required: formFour.risetype === 1, message: '请填写银行账号', trigger: 'blur' }">
                <el-input placeholder="填写账号行" v-model="formFour.bankName"></el-input>
              </el-form-item>
              <el-form-item  label="银行账号" prop="bankNumber" label-width="90px" :rules="{ required: formFour.risetype === 1,  message: '请填写开户行', trigger: 'blur' }">
                <el-input placeholder="填写银行账号" v-model="formFour.bankNumber"></el-input>
              </el-form-item>
              <el-form-item label="备 注" label-width="90px" prop="invoiceremark">
                <el-input placeholder="填写备注" v-model="formFour.invoiceremark"></el-input>
              </el-form-item>
            </div>
          </div>
          <!-- <div v-else></div> -->
          <div class="pay-protocal-box">
            <!-- <el-radio-group class="pay-protocal-tip" fill="#FD3069" v-model="formFour.yuedu">
                <el-radio :label="3">我已阅读并同意 <span>《用户支付协议》</span></el-radio>
              </el-radio-group> -->
            <el-checkbox
              class="pay-protocal-tip"
              v-model="formFour.agree"
              name="yuedu">
              我已阅读并遵守
              <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0o201742ac28d246d3b05becf37a7d9740?mode=embed" target="_blank">《红人带货会员服务合同》</a></span>
            </el-checkbox>
          </div>
        </div>
        <div class="button-group-4">
          <button class="jsbdivbaibvoafivbdbv" @click="handlePay('formFour')">立即支付</button>
        </div>
        <div class="dsevoervber">
          <div class="dsevoervber-1"></div>
          <div class="dsevoervber-2">开通会员后您将获得以下权益</div>
        </div>
        <div class="jdpovdger">
          <p>1、6次带货服务（单次带货服务过程中产生的佣金及相关合理费用由商家自行承担）；</p>
          <p>2、为商家推荐快递、仓储服务商，并提供专属客服对接服务；</p>
          <p>3、价值人民币贰万元（刊例价）的广告发布服务（广告发布渠道：如电子面单、包裹贴、短信、模板消息及微信公众号等）；</p>
          <p>4、为期一年的 “AI小蜜蜂”系统使用权限（价值人民币伍万元）；</p>
          <p>5、专业的平台使用及相关问题的咨询服务；</p>
          <p>6、定制化平台数据应用服务（待开发）。</p>
        </div>
      </el-form>
    </div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="xufeitanchuang = false">取 消</el-button>
      <el-button type="primary" @click="xufeitanchuang = false">确 定</el-button>
    </span> -->
  </el-dialog>
</div>
</template>

<script>
import { fetchMyInf, pay } from '@/api/user'
// import { getToken } from '@/utils/auth'
import xiugaiStore from '@/components/register/UpdateStore.vue'
export default {
  name: 'StoreUserMyInf',
  data () {
    return {
      rules: {
        rise: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
        risetype: [{ required: true, message: '请选择抬头类型', trigger: 'blur' }],
        dutyParagraph: [{ required: true, message: '请输入税号', trigger: 'blur' }],
        agree: [{ required: true, message: '请勾选同意协议', trigger: 'blur' }],
        registerAddress: [{ required: true, message: '请填写注册地址', trigger: 'blur' }]
      },
      xufeitanchuang: false,
      myInf: {},
      fanhuixiugai: false,
      paymentstate: '',
      endTime: '',
      phone: '',
      innerVisible: false,
      updateRegStepIndex: 1,
      formFour: {
        memberTimelimit: 1, // 会员期限
        openstate: 0, // 是否开发票
        rise: '', // 抬头
        risetype: '', // 抬头类型 1 企业 2 个人
        dutyParagraph: '',
        invoiceremark: '', // 发票备注
        openstate1: 0,
        price: '',
        agree: '',
        body: '',
        bankName: '',
        registerTelephone: '',
        registerAddress: '',
        bankNumber: ''
      }
    }
  },
  components: {
    xiugaiStore
  },
  mounted () {
    this.getMyInf()
  },
  methods: {
    getMyInf () {
      // const userId = getUserId()
      fetchMyInf({ }).then(data => {
        this.myInf = this.formatMyInfData(data)
        if (this.myInf.paymentstate === 1) {
          this.endTime = this.myInf.endTime.slice(0, 10)
          console.log('---===---===---===---')
          console.log(this.endTime)
        }
        console.log('--------------------这是我的信息---------------------')
        console.log(data)
        this.paymentstate = data.paymentstate
        console.log(this.paymentstate)
        this.phone = data.phone
        console.log(this.phone)
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 修改注册信息成功
    // 重新获取信息
    handleUpdateRegSuccess () {
      this.fanhuixiugai = false
      this.getMyInf()
    },
    formatMyInfData (data) { // 格式化我的个人信息数据
      // const platform = data.platform
      // 将平台，内容分类拼接字符串改成数组
      data.platform = data.platform && data.platform.split('|')
      data.contentstate = data.contentstate && data.contentstate.split('|')
      return data
    },
    // 提交支付
    handleSubmitPay () {
      // ------
      // ------
      const formFour = Object.assign({}, this.formFour)
      const memberTimelimit = this.formFour.memberTimelimit
      if (formFour.openstate === 0) {
        formFour.rise = ''
        formFour.risetype = ''
        formFour.dutyParagraph = ''
        formFour.invoiceremark = ''
        formFour.registerTelephone = ''
        formFour.bankName = ''
        formFour.registerAddress = ''
        formFour.bankNumber = ''
      }
      // formFour.price = memberTimelimit === 1 ? 10000 : (memberTimelimit === 2 ? 11976 : 17964)
      formFour.price = memberTimelimit === 1 ? 0.01 : (memberTimelimit === 2 ? 0.02 : 0.03)
      const form = Object.assign({}, formFour, {
        subject: '商家会员' + '(' + this.phone + ')'
      })
      if (formFour.openstate1 === 1) {
        pay(form).then(data => {
          // 请联系在线客服进行审核
          this.$confirm('请联系在线客服进行审核', '', {
            title: '',
            center: true,
            showCancelButton: false,
            confirmButtonText: '确定'
          }).then(res => {
            this.xufeitanchuang = false
          })
        })
      } else {
        pay(form).then(data => {
          this.redirectToPay(data.result)
          // this.xufeitanchuang = false
        })
      }
    },
    // 跳转支付页
    redirectToPay (result) {
      document.body.innerHTML = result
      document.forms[0].submit()
    },
    handlePay (formName) {
      if (!this.formFour.agree) {
        this.$message({
          message: '请勾选是否同意用户支付协议',
          type: 'error'
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.handleSubmitPay()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

// -----------商家注册页添加会员样式------------
.dsevoervber {
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(50,51,52,1);
  position: relative;
  .dsevoervber-1 {
    width: 100%;
    height:1px;
    background:rgba(162,162,162,1);
    border-radius:3px;
    position: absolute;
    top: 50px;
  }
  .dsevoervber-2 {
    text-align: center;
    width: 250px;
    height: 20px;
    margin-top: 30px;
    margin-left: 280px;
    position: absolute;
    top: 10px;
    background-color: #fff;
  }
}
.jdpovdger {
    margin-top: 100px;
  p {
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(107,107,107,1);
    margin-bottom: 20px;
  }
}
.formTJAHSBVK {
  padding: 0 90px;
}
.button-group-4 {
  text-align: center;
  margin-top: 25px;
}
.formTwo-a3 {
  width:377px;
  height:269px;
  height:100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 2px 1px rgba(154,154,154,0.2);
  border-radius:3px;
  margin-top: 25px;
  margin-left: 100px;
  margin-bottom: 20px;
  padding: 15px 20px;
  box-sizing: border-box;
  .yinghangzhifu {
    margin-bottom: 20px;
    .yinghangzhifu1 {
      display: inline-block;
      width: 100px;
      font-size: 18px;
    }
    .yinghangzhifu2 {
      font-size: 18px;
    }
  }
  .yinghangzhifu3 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
    color: red;
  }
}
.formTwo-a1 {
  margin-left: 100px;
  div {
    margin-bottom: 25px;
  }
}
.formTwo-a4 {
  margin-bottom: 10px;
}
.jsbdivbaibvoafivbdbv {
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin-left: 0px;
  margin-right: 0px;
  font: 400 13.3333px Arial;
  background-color: #FD3069;
  color: #fff;
  border-radius: 5px;
  margin: 0 auto;
}
// -----------------------
.jbadifvbiav {
  font-size: 18px;
  margin-right: 10px;
  color: #fd3269;
}
.huiyuanzhuangtai-7 {
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
}
.huiyuan-xufei {
  color: #fff;
  background-color: #fd3269;
}
.skdbvisbdiv {
  margin-top: 100px;
  margin: 0 auto;
  width: 100px;
  height: 50px;
  background-color: #fd346a;
  color: #fff;
  text-align: center;
  border-radius: 25px;
  line-height: 50px;
  font-size: 20px;
}

h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-danding {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 250px;
  box-sizing: border-box;
  .content {
    margin-left: 30px;
    .content-top {
      .top-xm {
        margin-top: 30px;
        padding-left: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
        padding-top: 20px;
        width: 322px;
        height: 100%;
        border: 1px solid #cccccc;
        box-sizing: border-box;
        .i89 {
          font-size: 16px;
          color: #333333;
        }
        .hr-xingming1 {
          font-size: 16px;
          color: #fd395f;
        }
        .i87 {
          font-size: 16px;
          color: #888888;
          margin-right: 30px;
        }
      }
      .content-content {
        margin-top: 20px;
        p {
          line-height: 40px;
          margin-left: 20px;
          font-size: 12px;
          img {
            width: 15px;
            height: 15px;
          }
          .yu1 {
            display: inline-block;
            width: 70px;
          color: #333333;
          }
          .yu2 {
          color: #888888;;
          }
        }
      }
    }
  }
}
.shenghezhuangtaixiugai {
  color: blue;
}
</style>
