<template>
<!-- 注册页 -->
<div class="zhuce2">
  <!-- 第一步 formOne -->
  <el-form class="form" :model="formOne" status-icon :rules="rules" v-if="value === 1" ref="formOne" @submit.native.prevent>
    <el-form-item prop="username">
      <el-input v-model="formOne.username" autocomplete="off" placeholder="请输入姓名  （必 填）"></el-input>
    </el-form-item>
    <el-form-item prop="province">
      <el-select v-model="formOne.province" placeholder="省  （必 填）" class="aj6" @change="handleProvinceChange">
        <el-option v-for="item in provinceMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="city">
      <el-select v-model="formOne.city" placeholder="市  （必 填）" class="aj6" @focus="handleCitySelect" @change="handleCityChange">
        <el-option v-for="item in cityMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="platform">
      <el-select v-model="formOne.platform" multiple placeholder="请选择店铺所属平台  （必 填）" class="aj6">
        <el-option v-for="item in platformshangjia" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="contentstate">
      <el-select v-model="formOne.contentstate" multiple placeholder="请选择所属内容分类  （必 填）" class="aj6">
        <el-option v-for="item in contentCategoryStoreData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="shopname">
      <el-input v-model="formOne.shopname" autocomplete="off" placeholder="请输入店铺名称  （必 填）"></el-input>
    </el-form-item>
    <button class="zhuce-btn" @click.stop="handleStepNext('formOne')">下一步</button>
  </el-form>
  <!-- 第二步 formTwo -->
  <el-form class="formTwo" :rules="rules" :model="formTwo" v-else-if="value === 2" @submit.native.prevent  ref="formTwo">
    <el-form-item prop="epname">
      <el-input v-model="formTwo.epname" autocomplete="off" placeholder="请填写企业名称（与营业执照一致）"></el-input>
    </el-form-item>
    <el-form-item prop="creditcoding">
      <el-input v-model="formTwo.creditcoding" autocomplete="off" placeholder="请填写企业统一社会信用代码"></el-input>
    </el-form-item>
    <p class="tip">上传企业营业执照照片</p>
    <div class="business-license-ctn">
      <el-upload
        class="business-license-uploader"
        accept="image/*"
        :action="actions.uploadBusinessLicense + '&token=' + id"
        :show-file-list="false"
        :on-success="(res, file) => handleUploadPicSuccess(file, 'business')"
        :before-upload="file => handleUploadPicBefore(file, 'business')"
        :on-error="(error, file) => handleUploadPicError(error, 'business')">
        <div class="upload-animation-box"
            v-loading="loading.businessLicensePic"
            element-loading-text="拼命上传中">
          <img v-if="formTwo.businessLicensePic" :src="formTwo.businessLicensePic" class="business-license">
          <i v-else class="el-icon-plus business-license-uploader-icon"></i>
        </div>
      </el-upload>
      <el-upload
        class="business-license-uploader-btn"
        accept="image/*"
        :action="actions.uploadBusinessLicense + '&token=' + id"
        list-type="text"
        :on-success="(res, file) => handleUploadPicSuccess(file, 'business')"
        :before-upload="file => handleUploadPicBefore(file, 'business')"
        :on-error="(error, file) => handleUploadPicError(error, 'business')">
        <button class="upload-btn">
          <p>选择图片</p>
          <p>(大小为1M以下)</p>
        </button>
      </el-upload>
    </div>
    <p class="tip">上传法人身份证照片</p>
    <div class="id-card-ctn">
      <div class="id-card-box">
        <p class="title">正面</p>
        <div class="img-wrap upload-animation-box"
            v-loading="loading.frontIdCardPic"
            element-loading-text="拼命上传中">
          <img :src="formTwo.frontIdCardPic || frontIdCardPlaceholderPic" class="id-card-img" alt="">
        </div>
        <el-upload
          :action="actions.uploadFrontIDCard + '&token=' + id"
          list-type="text"
          accept="image/*"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'front')"
          :before-upload="file => handleUploadPicBefore(file, 'front')"
          :on-error="(error, file) => handleUploadPicError(error, 'front')">
          <button class="upload-btn">
            <p>选择图片</p>
            <p>(大小为1M以下)</p>
          </button>
        </el-upload>
      </div>
      <div class="id-card-box">
        <p class="title">反面</p>
        <div class="img-wrap upload-animation-box"
            v-loading="loading.backIdCardPic"
            element-loading-text="拼命上传中">
          <img :src="formTwo.backIdCardPic || backIdCardPlaceholderPic" class="id-card-img" alt="">
        </div>
        <el-upload
          :action="actions.uploadBackIDCard + '&token=' + id"
          list-type="text"
          accept="image/*"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'back')"
          :before-upload="file => handleUploadPicBefore(file, 'back')"
          :on-error="(error, file) => handleUploadPicError(error, 'back')">
          <button class="upload-btn">
            <p>选择图片</p>
            <p>(大小为1M以下)</p>
          </button>
        </el-upload>
      </div>
    </div>
    <p class="tip">上传法人手持身份证照片（<span class="tip__notes">请保证照片的人物清晰，且身份证上的信息清</span>）</p>
    <div class="id-card-ctn">
      <div class="id-card-box">
        <div class="img-wrap upload-animation-box"
            v-loading="loading.holdIdCardPic"
            element-loading-text="拼命上传中">
          <img :src="formTwo.holdIdCardPic || holdIdCardPlaceholderPic" class="id-card-img" alt="">
        </div>
        <el-upload
          :action="actions.uploadHoldIDCard + '&token=' + id"
          list-type="text"
          accept="image/*"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'hold')"
          :before-upload="file => handleUploadPicBefore(file, 'hold')"
          :on-error="(error, file) => handleUploadPicError(error, 'hold')">
          <button class="upload-btn">
            <p>选择图片</p>
            <p>(大小为1M以下)</p>
          </button>
        </el-upload>
      </div>
      <div class="id-card-box">
        <img src="@/assets/hold-idcard-sample.png" class="id-card-img" alt="">
        <span class="tip">样例图片</span>
      </div>
    </div>
    <div class="button-group">
      <button class="btn--11 go-back-btn" @click="handleStepBack">返回上一步</button>
      <button class="btn--22 go-next-btn" @click="handleStepNext('formTwo')">下一步</button>
    </div>
  </el-form>
  <!-- 第三步 formThree -->
  <el-form class="form" :model="formThree" status-icon :rules="rules" v-else-if="value === 3" ref="formThree" @submit.native.prevent>
    <el-form-item prop="phone">
      <el-input v-model="formThree.phone" placeholder="请输入手机号  （必 填）"></el-input>
    </el-form-item>
    <el-form-item prop="code" class="code-input-box">
      <el-input v-model="formThree.code" placeholder="请输入验证码  （必 填）" autocomplete="off"></el-input>
      <div v-show="verShow" class="t456" @click="huoqu">获取验证码</div>
      <div v-show="!verShow" class="t456"><span>{{timer}}</span>秒后重新获取</div>
    </el-form-item>
    <el-form-item prop="imagecode" class="code-input-box">
      <el-input v-model="formThree.imagecode" placeholder="请输入图形验证码  （必 填）" autocomplete="off"></el-input>
      <div class="img-code-box">
        <canvas class="img-code__image" ref="imgCodeCanvas"></canvas>
        <span class="img-code__btn" @click="generateImgCode">换一张</span>
      </div>
    </el-form-item>
    <el-form-item>
      <el-input v-model="formThree.wechat" placeholder="请输入微信账号  （选 填）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="formThree.dingding" placeholder="请输入钉钉账号  （选 填）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="formThree.wangwang" placeholder="请输入旺旺账号  （选 填）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="formThree.telePhone" placeholder="请输入电话  （选 填）"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="formThree.password" placeholder="请设置账号密码  （必 填）"></el-input>
    </el-form-item>
    <el-form-item prop="pwdagain">
      <el-input type="password" v-model="formThree.pwdagain" placeholder="请再次输入账号密码  （必 填）"></el-input>
    </el-form-item>
    <div class="button-group">
      <button class="btn--11 go-next-btn small" @click="handleStepBack">返回上一步</button>
      <button class="btn--22 go-next-btn small" @click="handleStepNext('formThree')">下一步</button>
    </div>
  </el-form>
  <!-- 第四步 -->
  <el-form class="formTJAHSBVK" :model="formFour" status-icon :rules="rules" v-else-if="value === 4" ref="formFour" @submit.native.prevent>
  <!-- <el-form class="formTJAHSBVK" :model="formFour" status-icon :rules="rules" ref="formFour" @submit.native.prevent> -->
    <div class="formTwo-a11">
      <p>选择会员期限</p>
    </div>
    <div class="formTwo-aa">
      <div class="formTwo-a1">
        <el-radio-group fill="#FD3069" v-model="formFour.memberTimelimit">
          <div>
            <el-radio :label="1">限时优惠：一年会员<span>￥10000</span></el-radio>
          </div>
        </el-radio-group>
      </div>
      <div class="formTwo-a2">
        选择支付方式
        <el-radio-group fill="#FD3069" v-model="formFour.openstate1">
          <el-radio :label="0">支付宝支付（默认）</el-radio>
          <el-radio :label="1">银行卡支付</el-radio>
        </el-radio-group>
      </div>
      <!-- ------------ -->
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
        <el-radio-group fill="#FD3069" v-model="formFour.openstate" @change="agreeChange">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </div>
      <div class="formTwo-a3" v-if="formFour.openstate === 1">
        <p class="formTwo-a4">
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
            <el-input placeholder="填写银行账号" v-model.number="formFour.bankNumber"></el-input>
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
          <!-- <span><router-link :to="{name:'fuwuxieyi'}" target="_blank">《红人带货网站服务条款》/</router-link></span> -->
          <!-- <span><a href="" target="_blank">《红人带货网站服务条款》/</a></span> -->
          <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0o71f434c574284515bb1164b9a0e3d791?mode=embed" target="_blank">《红人带货网站服务条款》/</a></span>
          <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0oa2028ffb85694be085cb233d58de5dc6?mode=embed" target="_blank">《隐私政策》/</a></span>
          <!-- <span><router-link :to="{name:'yisizhengce'}" target="_blank">《隐私政策》/</router-link></span> -->
          <!-- <span><router-link :to="{name:'huiyuanfuwuhetong'}" target="_blank">《红人带货会员服务合同》</router-link></span> -->
          <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0o201742ac28d246d3b05becf37a7d9740?mode=embed" target="_blank">《红人带货会员服务合同》</a></span>
        </el-checkbox>
      </div>
    </div>
    <div class="button-group-4">
      <button class="btn--11 go-back-btn small" @click="handleStepBack">返回上一步</button>
      <button v-show="formFour.openstate1 === 0" class="btn--22 small" @click="handleSubmitReg('formFour')">立即支付</button>
      <button v-show="formFour.openstate1 === 1" class="btn--22 small" @click="handleSubmitReg('formFour')">立即支付</button>
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
</template>

<script>
import { register, fetchPhoneCode } from '@/api/user'
// import { saveUserToLocation } from '@/utils/auth'
import { getProvinceMap, getCityMap, getRegionMap } from '@/utils/china-location'
import { platformshangjia, contentCategoryStoreData, fansFavoriteData } from '@/data/common'
import frontIdCardPlaceholderPic from '@/assets/idcard-front.png'
import backIdCardPlaceholderPic from '@/assets/idcard-back.png'
import holdIdCardPlaceholderPic from '@/assets/hold-idcard.png'
import actions from '@/data/actions'
import generateImgCode from '@/utils/generate-img-code'

export default {
  props: {
    value: { // 步骤一
      type: Number,
      default: 1
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    var validateNewPwd = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('密码应是6-12位数字+字母组合！'))
      } else {
        callback()
      }
    }
    var validateComfirmPwd = (rule, value, callback) => {
      if (this.formThree.password !== value) {
        callback(new Error('确认密码与新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      actions,
      provinceMap: getProvinceMap(), // 省份
      cityMap: null, // 城市
      // areaMap: null, // 地区
      platformshangjia,
      contentCategoryStoreData,
      frontIdCardPlaceholderPic, // 身份证正面占位图
      backIdCardPlaceholderPic, // 身份证反面占位图
      holdIdCardPlaceholderPic,
      btnstatus: true,
      rules: {
        epname: [
          { required: true, message: '请填写企业名称', trigger: 'change' }
        ],
        creditcoding: [
          { required: true, message: '请填写企业统一社会信用代码', trigger: 'change' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'change' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择所在省份', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择所在市', trigger: 'change' }
        ],
        platform: [
          { required: true, message: '请选择店铺所属平台', trigger: 'change' }
        ],
        contentstate: [
          { required: true, message: '请选择内容分类', trigger: ['blur', 'change'] }
        ],
        shopname: [
          { required: true, message: '请输入店铺名称', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入手机验证码', trigger: ['blur', 'change'] }
        ],
        imagecode: [
          { required: true, message: '请输入图形验证码', trigger: ['blur', 'change'] },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入图形验证码'))
              } else if (this.imgCode !== this.formThree.imagecode.toLowerCase()) {
                callback(new Error('图形验证码不正确'))
                this.generateImgCode()
              } else {
                callback()
              }
            },
            trigger: [ 'blur' ]
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        pwdagain: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ],
        rise: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
        risetype: [{ required: true, message: '请选择抬头类型', trigger: 'blur' }],
        dutyParagraph: [{ required: true, message: '请输入税号', trigger: 'blur' }],
        agree: [{ required: true, message: '请勾选同意协议', trigger: 'blur' }],
        registerAddress: [{ required: true, message: '请填写注册地址', trigger: 'blur' }]
      },
      fansFavoriteData, // 分享偏爱
      showReg: true,
      formOne: {
        username: '',
        province: '',
        city: '',
        // area: '',
        platform: null,
        shopname: '',
        contentstate: []
      },
      loading: { // 加载对象， true 加载中， false 未加载中, 用于显示加载动画
        businessLicensePic: false,
        frontIdCardPic: false,
        backIdCardPic: false,
        holdIdCardPic: false
      },
      formTwo: {
        epname: '', // 企业名称
        creditcoding: '', // 信用编码
        frontIdCardPic: null,
        backIdCardPic: null,
        holdIdCardPic: null,
        businessLicensePic: null
      },
      formThree: {
        wechat: '',
        dingding: '',
        wangwang: '',
        telePhone: '',
        phone: '',
        code: '',
        imagecode: '',
        password: '',
        pwdagain: ''
        // type4: []
      },
      formFour: {
        memberTimelimit: 1, // 会员期限
        openstate: 0, // 是否开发票
        openstate1: 0, // 支付方式
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
        bankNumber: ''
        // subject: '商家会员' + this.formThree.phone
      },
      verShow: true,
      timer: 60,
      activeName: 'first',
      formLabelWidth: '120px',
      checked: true,
      zhuce: false,
      imagecode: ''
    }
  },
  watch: {
    show (value) {
      if (value === false) {
        this.$emit('registerclick')
      }
    },
    value (val) {
      // 生成图形验证码
      if (val === 3) {
        this.$nextTick(() => this.generateImgCode())
      }
      // 滚动条回到到顶端
      window.scrollTo(0, 0)
    }
  },
  methods: {
    agreeChange: function (val) {
      let that = this
      that.btnstatus = val
    },
    agreeChange1: function (val) {
      let that = this
      that.btnstatus1 = val
    },
    createTempId () {
      this.$parent.createTempId()
    },
    // 生成图形验证码
    generateImgCode () {
      const imgCodeCanvas = this.$refs['imgCodeCanvas']
      this.imgCode = generateImgCode(imgCodeCanvas)
    },
    // 下一步
    handleStepNext (formName) {
      this.$refs[formName].validate(valid => {
        // 正确可下一步
        if (valid) {
          if (formName === 'formTwo') {
            const formTwo = this.formTwo
            let msg = ''
            if (!formTwo.businessLicensePic) {
              msg = '营业执照未上传'
            } else if (!formTwo.frontIdCardPic) {
              msg = '身份证正面未上传'
            } else if (!formTwo.backIdCardPic) {
              msg = '身份证反面未上传'
            } else if (!formTwo.holdIdCardPic) {
              msg = '手持身份证未上传'
            } else {
              this.$emit('input', this.value + 1)
            }
            if (msg) {
              this.$notify({
                title: '警告',
                message: msg,
                type: 'warning'
              })
            }
          } else {
            this.$emit('input', this.value + 1)
          }
        }
      })
    },
    // 返回
    handleStepBack () {
      this.$emit('input', this.value - 1)
    },
    // 提交注册
    submitReg () {
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
      // 支付宝支付
      // formFour.price = memberTimelimit === 1 ? 10000 : (memberTimelimit === 2 ? 11976 : 17964)
      formFour.price = memberTimelimit === 1 ? 0.01 : (memberTimelimit === 2 ? 0.02 : 0.03)
      const form = Object.assign({
        epname: this.formTwo.epname,
        creditcoding: this.formTwo.creditcoding,
        token: this.id,
        usertype: '2' // 商家
      }, this.formOne, this.formThree, formFour, {
        subject: '商家会员' + '(' + this.formThree.phone + ')'
      })
      form.contentstate = form.contentstate && form.contentstate.join('|')
      form.platform = form.platform && form.platform.join('|')
      console.log(form)
      register(form).then(data => {
        console.group('商家注册====成功')
        console.log(data)
        console.groupEnd()
        // this.$alert('注册成功')
        // this.$router.push('/home')
        // saveUserToLocation({
        //   token: data.token
        //   // state: data.state
        //   // userId: data.id
        // })
        if (formFour.openstate1 === 0) {
          console.log('支付宝支付')
          this.redirectToPay(data.result)
        } else {
          console.log('银行卡支付')
          // 顶顶顶
          // 请联系在线客服进行审核
          this.$confirm('请联系在线客服进行审核', '注册成功', {
            title: '注册成功',
            type: 'success',
            message: '请联系在线客服进行审核',
            center: true,
            showCancelButton: false,
            confirmButtonText: '确定'
          }).then(res => {
            this.$router.push({ name: 'index' })
          })
        }
      })
    },
    // g () {
    //   // 请求小蜜蜂
    //   this.$axios({
    //     method: 'post',
    //     url: 'http://10.1.204.120:80/Wengwenglog/HrApproval',
    //     params: {
    //       Telephone: '18521364048',
    //       Content: '来生意了！有个（' + this.formThree.phone + '）商家宝宝来了，待审核'
    //     }
    //   }).then(Message => {
    //     console.log('----------------------------------------------------------------------------------------------------')
    //     console.log(Message)
    //   }).catch(Message => {
    //     console.log('----------------------------------------------------------------------------------------------------')
    //     console.log(Message)
    //   })
    // },
    redirectToPay (result) {
      document.body.innerHTML = result
      document.forms[0].submit()
    },
    handleSubmitReg (formName) {
      if (!this.formFour.agree) {
        this.$message({
          message: '请勾选是否同意用户支付协议',
          type: 'error'
        })
        // this.$notify({ title: '请勾选同意用户支付协议', type: 'warning' })
        return
      }
      console.group('商家注册step-2')
      console.log(this.formThree)
      console.log(formName)
      console.groupEnd()
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitReg()
        } else {
          // 验证失败，重新获取验证码
          this.generateImgCode()
        }
      })
    },
    huoqu () {
      if (this.formThree.phone === '' || null) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        })
        return false
      } else {
        this.verShow = false
        var authTimer = setInterval(() => {
          this.timer--
          if (this.timer <= 0) {
            this.verShow = true
            this.timer = 60
            clearInterval(authTimer)
          }
        }, 1000)
      }
      // 获取验证码
      const { phone } = this.formThree
      console.log('====')
      fetchPhoneCode({
        type: 2,
        phone
      }).then(data => {
        this.$message({
          message: '手机验证码已发送成功',
          type: 'success'
        })
      })
    },
    // 处理省份改变
    handleProvinceChange () {
      this.formOne.city = null
      this.formOne.area = null
    },
    // 处理城市改变
    handleCityChange () {
      this.formOne.area = null
    },
    // 处理城市选择
    handleCitySelect () {
      if (this.formOne.province) {
        console.log(this.formOne.province)
        this.cityMap = getCityMap(this.formOne.province)
      }
    },
    // 处理地区选择
    handleAreaSelect () {
      if (this.formOne.city) {
        this.areaMap = getRegionMap(this.formOne.city)
      }
    },
    // operatorType: front(上传正面身份证) back(上传反面身份证) hold(上传手持身份证)
    handleUploadPicSuccess (file, operatorType) {
      if (operatorType === 'business') {
        this.formTwo.businessLicensePic = URL.createObjectURL(file.raw)
        this.loading.businessLicensePic = false
      } else if (operatorType === 'front') {
        this.formTwo.frontIdCardPic = URL.createObjectURL(file.raw)
        this.loading.frontIdCardPic = false
      } else if (operatorType === 'back') {
        this.formTwo.backIdCardPic = URL.createObjectURL(file.raw)
        this.loading.backIdCardPic = false
      } else {
        this.formTwo.holdIdCardPic = URL.createObjectURL(file.raw)
        this.loading.holdIdCardPic = false
      }
    },
    // 处理上次图片失败
    handleUploadPicError (error, operatorType) {
      console.log(error)
      let message = null
      if (operatorType === 'business') {
        this.loading.businessLicensePic = false
        message = '上传营业执照照片失败，请重新上传'
      } else if (operatorType === 'front') {
        this.loading.frontIdCardPic = false
        message = '上传正面身份证照片失败，请重新上传'
      } else if (operatorType === 'back') {
        this.loading.backIdCardPic = false
        message = '上传反面身份证照片失败，请重新上传'
      } else {
        this.loading.holdIdCardPic = false
        message = '上传手持身份证照片失败，请重新上传'
      }
      this.$notify({
        title: '警告',
        message,
        center: true,
        type: 'warning'
      })
    },
    // 图片上传之前
    handleUploadPicBefore (file, operatorType) { // operatorType 操作类型
      // 上传的图片不能超过1M
      if (file.size / 1024 / 1024 > 1) {
        this.$notify({
          title: '警告',
          message: '上传失败, 图片尺寸不能超过1M',
          center: true,
          type: 'warning'
        })
        return false
      }
      // 上传图片之前检查是否创建了用户id，
      // 未创建则上传失败，重新创建用户id
      if (this.id) {
        console.log(operatorType)
        if (operatorType === 'business') {
          this.loading.businessLicensePic = true
        } else if (operatorType === 'front') {
          this.loading.frontIdCardPic = true
        } else if (operatorType === 'back') {
          this.loading.backIdCardPic = true
        } else {
          this.loading.holdIdCardPic = true
        }
        return
      }
      this.$notify({
        title: '警告',
        message: '上传失败, 请重新上传',
        center: true,
        type: 'warning'
      })
      this.createTempId()
      return false
    },
    handleUploadBusinessLicenseSuccess (res, file) {
      this.formTwo.businessLicensePic = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang="less">
.formTwo-aa {
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(50,51,52,1);
  .el-radio__input.is-checked+.el-radio__label {
    color: rgba(50,51,52,1);
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #FF4459;
    background: #FF4459;
  }
  .el-form-item__label {
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(50,51,52,1);
  }
}

.zhuce-1 {
  .zhuce-2 {
    font-size: 12px;
    .el-tabs__nav {
      position: none;
    }
    .el-tabs__active-bar {
      width: 0px !important;
      background-color: none;
    }
    .el-tabs__item:hover {
      color: #FD3069;
    }
    .el-tabs__item {
      width: 60px;;
      margin: 10px 45px;
    }
    .el-tabs__item.is-active {
      color: #FD3069;
    }
  }
  .l56 {
    .el-input__inner {
      display: inline-block;
      width: 150px;
      border-right: none;
    }
  }
}
.formTwo {
  .el-input__inner {
    width: 100%;
    height: 38px;
  }
}
.pay-protocal-box {
  margin-top: 20px;
  width: 100%;
  margin-bottom: 10px;
  .pay-protocal-tip {
    // margin-left: 100px;
  }
}
.formTwo-a3 {
  .el-input__inner {
    width: 100%;
    height: 40px;
  }
}
.business-license-uploader .el-upload {
  border: 1px solid #d9d9d9;
  border:2px solid rgba(198,200,208,1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.business-license-uploader .el-upload:hover {
  border-color: rgb(202, 219, 236);
}

.business-license-uploader .el-icon-plus:before {
  font-size: 49px;
}

.business-license-uploader-btn {
  .el-upload-list {
    display: none;
  }
}

// 验证码输入
.code-input-box {
  .el-input {
    width: 219px;
  }
}
.pay-protocal-box .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #FD3069;
  border: #FD3069;
}
@media screen and (max-width: 800px) {
  .zhuce2 {
    .pay-protocal-box {
      .el-checkbox__label {
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}
</style>

<style lang="less" scoped>

.formTwo-a11 {
  p {
    font-size: 16px;
  }
}
.formTwo-a2 {
  font-size: 16px;
  margin-bottom: 20px;
}
.sdfffg {
  margin-top: 20px;
}
.hhh2 {
  width: 100px;
}
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
    margin-left: 160px;
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
// -----------------------
.btn--11 {
  width: 100px;
  height: 40px;
  background-color: rgb(37, 96, 207);
  color: #fff;
  border-radius: 5px;
  margin-left: 45px;
  margin-right: 50px;
}
.btn--22 {
  width: 100px;
    height: 40px;
    background-color: #FD3069;
    color: #fff;
    border-radius: 5px;
}
  .t456 {
    display: inline-block;
    width: 117px;
    height: 40px;
    margin-left: 2px;
    background-color: #e3e3e3;
    // position: absolute;
    top: 62px;
    right: 0px;
    text-align: center;
    line-height: 40px;
  }
.svbrivbpsierbv {
  font-size: 12px;
}

  .l356 {
    float: right;
    width: 105px;
    height: 40px;
    background-color: aqua;
  }
    .h789 {
      margin-left: 10px;
    }
.l456 {
    width: 80px;
    height: 38px;
    // float: left;
    position: absolute;
    left: 145px;
    top: 124px;
    margin: 0;
    border: 1px solid #DCDFE6;
    border-left: none;
    // background-color: aqua;
    span {
      line-height: 40px;
    }
    img {
      width: 20px;
      height: 20px;
      vertical-align:middle;
    }
    .h789 {
      margin-left: 10px;
    }
  }
.zhuce{
  margin: 0 auto;
  width: 1200px;
  height: 100%;
  padding: 50px 200px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e3e3e3;
  margin-top: 50px;
}
.zhuce-1 {
  width: 500px;
  margin: 0 auto;
}
.aj {
  width: 295px;
}
.registered-btn {
  font-size: 20px;
  line-height: none;
  width: 140px;
}
.aj2 {
  width: 200px;
}
.aj3 {
  width: 140px;
}
.aj4 {
  margin-right: 8px;
}
.aj6 {
  width: 100%;
}
.aj7 {
  margin-top: 25px;
}
.zhuce-2 {
  height: 100%;
  padding: 0 80px;
}
.zhuce-btn {
  width: 100%;
  height: 40px;
  background-color: #FD3069;
  color: #fff;
  border-radius: 5px;
}
.zhuce-heared {
  border-bottom: 1px solid #e3e3e3;
  p {
    margin: 0 auto;
    width: 100px;
    display: block;
    text-align: center;
    border-bottom: 2px solid #FD3069;
  }

  .l356 {
    float: right;
    width: 125px;
    height: 40px;
    background-color: aqua;
  }
}

.tip {
  // width:112px;
  // height:22px;
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(50,51,52,1);
  line-height:22px;
  .tip__notes {
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(228,91,80,1);
    line-height:22px;
  }
}

.form {
  width: 340px;
  margin: 0 auto;
}

.id-card-ctn {
  margin-top: 30px;
  margin-bottom: 55px;
  display: flex;
  .id-card-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(50,51,52,1);
      line-height:20px;
    }
    .img-wrap {
      margin-top: 19px;
      margin-bottom: 24px;
    }
    .id-card-img {
      width: 278px;
      height: 208px;
      padding: 2px;
      border: 2px dashed #eee8e8;
    }
    .tip {
      display: inline-block;
      width:120px;
      height:40px;
      font-size:18px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(50,51,52,1);
      line-height:40px;
      text-align: center;
    }
  }
}

    .upload-btn {
      width:120px;
      height:40px;
      background:rgba(231,50,81,1);
      border-radius:2px;
      // font-size:18px;
      // font-family:PingFangSC-Semibold,PingFang SC;
      // font-weight:600;
      // color:rgba(255,255,255,1);
      // line-height:25px;
      p {
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      color:rgba(255,255,255,1);
      font-weight:600;
      line-height:20px;
      }
    }
.button-group {
  text-align: center;
}
button.small {
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin-left: 0px;
  margin-right: 0px;
  font: 400 13.3333px Arial;
  &:first-child {
    margin-right: 38px;
  }
}
.button-group-4 {
  text-align: center;
}
.go-back-btn, .go-next-btn {
  width: 300px;
  height: 46px;
}

.go-back-btn {
  background-color: #fff;
  font-size:18px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(255,154,168,1);
  line-height:25px;
  border: 1px solid rgba(255,154,168,1);
}

// 营业执照 样式
.business-license-ctn {
  margin-top: 35px;
  margin-bottom: 65px;
}
.business-license-uploader {
  display: inline-block;
  margin-right: 36px;
  vertical-align: bottom;
  height: 244px;
}

.business-license-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width:240px;
  height:240px;
  line-height: 240px;
  text-align: center;
}
.business-license {
   width:240px;
  height:240px;
  display: block;
}
.business-license-uploader-btn {
  display: inline-block;
  vertical-align: bottom;
  .upload-btn {
    width:122px;
    height:42px;
    font-size:18px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(231,50,81,1);
    line-height:25px;
  }
}
.img-code-box {
  display: inline-block;
  position: relative;
  width: 117px;
  height: 40px;
  margin-left: 2px;
  vertical-align: bottom;
  .img-code__image {
    width: 115px;
    height: 38px;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .img-code__btn {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    color:#fff;
    font-size: 18px;
    cursor: pointer;
  }
  &:hover {
    .img-code__btn {
      display: inline-block;
    }
  }
}

@media screen and (max-width: 800px) {
  .zhuce2 {
    width: 100vw;
    padding: 0 20px;
    box-sizing: border-box;
    .el-form {
      .formTwo {
        .el-input__inner {
          width: 100%;
        }
      }
    }
  }
  .id-card-ctn .id-card-box .id-card-img {
    width: 95%;
    height: 140px;
    padding: 0;
  }
  .button-group {
    width: 100%;
  }
  .btn--11 {
    margin: 0;
    width: 100%;
  }
  .btn--22 {
    margin: 0;
    width: 100%;
  }
  .formTJAHSBVK {
    padding: 0;
  }
  .formTwo-a3 {
    width: 100%;
    margin-left: 0;
  }
  .pay-protocal-box .pay-protocal-tip {
    width: 100%;
    margin-left: 0;
  }
  .dsevoervber .dsevoervber-2 {
    width: 100%;
    margin-left: 0;
    position: static;
  }
  .jdpovdger[data-v-e6cc5436] {
    margin-top: 50px;
  }
}
</style>
