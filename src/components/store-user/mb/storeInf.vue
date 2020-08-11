<!-- 商家用户 我的信息 -->
<template>
<div class="page">
  <div class="page-bd">
    <div class="inf-box">
      <p class="row">
        <span class="inf__label">我的姓名：</span>
        <span class="inf__value">{{myInf.username || myInf.nickname}}</span>
      </p>
      <p class="row">
        <span class="inf__label">账号状态：</span>
        <span class="inf__value">{{myInf.state === 1 ? '审核通过' : (myInf.state === 2 ? '审核未通过' : '待审核')}}</span>
        <button class="inf__btn" @click="fanhuixiugai=true">{{myInf.state === 1 ? '修改' : (myInf.state === 2 ? '查看详情' : '修改')}}</button>
      </p>
      <p class="row">
        <span class="inf__label">会员状态：</span>
        <span class="inf__value">
          <img v-if="paymentstate === 0" class="inf__img img-member-status" src="@/assets/VIP-shixiao11.png" alt="">
          <img v-else class="inf__img img-member-status" src="@/assets/VIP-tongguo.png" alt="">
          {{myInf.endTime && myInf.endTime.split(' ')[0]}}
        </span>
        <button class="inf__btn renew-btn" @click="xufeitanchuang=true">续费</button>
      </p>
      <p class="row">
        <span class="inf__label">所属地区：</span>
        <img class="inf__img" src="@/assets/地区.png" alt="">
        <span class="inf__value">{{myInf.province || '--'}} {{myInf.city || '--'}} {{myInf.area || '--'}}</span>
      </p>
      <p class="row">
        <span class="inf__label">所属平台：</span>
        <img class="inf__img" src="@/assets/平台管理.png" alt="">
        <span class="inf__value">{{myInf.platform | platformStoreFilter}}</span>
      </p>
      <p class="row">
        <span class="inf__label">店铺名称：</span>
        <img class="inf__img" src="@/assets/店铺.png" alt="">
        <span class="inf__value">{{myInf.shopname || '--'}}</span>
      </p>
      <p class="row">
        <span class="inf__label telphone">手机号</span>
        <span class="inf__label">：</span>
        <img class="inf__img" src="@/assets/手机.png" alt="">
        <span class="inf__value">{{myInf.phone || '--'}}</span>
      </p>
    </div>
  </div>
  <!-- 这是修改弹出框 -->
  <el-dialog
    :title="myInf.state===2 ? '驳回原因' : '请修改注册信息'"
    :visible.sync="fanhuixiugai"
    width="95%"
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
    :width="getWIth"
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
            <el-radio-group fill="#FD3069" v-model="formFour.openstate1" @change="agreeChange">
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
              <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0ob5f93f249d9944c3b85a3f8238a4f157?mode=embed" target="_blank">《红人带货会员服务合同》</a></span>
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
// import { getUserId } from '@/utils/auth'
import xiugaiStore from '@/components/register/UpdateStore.vue'
export default {
  name: 'StoreUserMyInf',
  data () {
    return {
      getWIth: 0,
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
      innerVisible: false,
      updateRegStepIndex: 1,
      paymentstate: 0,
      agreeChange: 0,
      formFour: {
        memberTimelimit: 1, // 会员期限
        openstate: 0, // 是否开发票
        rise: '', // 抬头
        risetype: '', // 抬头类型 1 企业 2 个人
        dutyParagraph: '',
        invoiceremark: '', // 发票备注
        price: '',
        agree: '',
        body: '',
        bankName: '',
        registerTelephone: '',
        registerAddress: '',
        bankNumber: '',
        subject: '达人会员'
      }
    }
  },
  components: {
    xiugaiStore
  },
  created () {
    this.setDialogWidth()
  },
  mounted () {
    this.getMyInf()
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  methods: {
    setDialogWidth () {
      console.log(document.body.clientWidth)
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.getWIth = '95%'
      } else {
        this.getWIth = def + 'px'
      }
    },
    getMyInf () {
      // const userId = getUserId()
      fetchMyInf({}).then(data => {
        this.myInf = this.formatMyInfData(data)
        console.log('这是我的信息')
        console.log(data)
        this.paymentstate = data.paymentstate
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
      formFour.price = memberTimelimit === 1 ? 10000 : (memberTimelimit === 2 ? 11976 : 17964)
      // formFour.price = memberTimelimit === 1 ? 0.01 : (memberTimelimit === 2 ? 0.02 : 0.03)
      const form = Object.assign({ }, formFour)
      pay(form).then(data => {
        this.redirectToPay(data.result)
      })
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
.formTwo-a3 {
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 2px 1px rgba(154,154,154,0.2);
  border-radius:3px;
  padding: 20px 10px;
  box-sizing: border-box;
  p {
    line-height: 40px;
  }
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

.page {
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 5px;
  .page-bd {
    border-radius: 10px;
    padding: 20px;
    background-color: #ffffff;
    padding-left: 10%;
  }
  .row {
    margin-bottom: 10px;
  }
  .inf-box {
    font-size: 14px;
    color: #333;
    .inf__label {
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 2px;
      &.telphone {
        letter-spacing: 7.5px;
      }
    }
    .inf__value {
      color: #888;
      letter-spacing: 1px;
      vertical-align: middle;
    }
    .inf__btn {
      margin-left: 15px;
      // background: linear-gradient(90deg, #fd3069 0%, #ff4459 100%);
      color: #ffffff;
      height: 20px;
      padding: 1px 6px;
      line-height: 18px;
      border-radius: 4px;
      font-size: 14px;
      vertical-align: middle;
      color: #ff4459;
      background-color: #ffffff;
      text-decoration: underline;
      &.renew-btn {
        margin-left: 5px;
      }
    }
    .inf__img {
      display: inline-block;
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

@media screen and (max-width: 800px) {
  .formTwo-a11 {
    margin-bottom: 10px;
  }
  .formTwo-a1 {
    margin-bottom: 20px;
  }
  .formTwo-a2 {
    margin-bottom: 20px;
  }
  .pay-protocal-box {
    margin-bottom: 20px;
  }
  .button-group-4 {
    margin-bottom: 20px;
    // height: auto;
    text-align:center;
    .jsbdivbaibvoafivbdbv {
      width: 100px;
      height: 30px;
      background-color: #fe3a60;
      color: #fff;
      border-radius: 10px;
      margin: 0 auto;
    }
  }
  .dsevoervber-2 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
  .jdpovdger {
    p {
      margin-bottom: 10px;
    }
  }
}
</style>
