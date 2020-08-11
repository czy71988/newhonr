<template>
<!-- 注册页 -->
<div>
  <!-- 第一步 formOne -->
  <el-form class="form"
  :model="formOne"
  status-icon
  :rules="rules"
  v-if="value === 1"
  ref="formOne"
  @submit.native.prevent
  >

    <el-form-item label="" prop="username" required>
      <el-input v-model="formOne.username" autocomplete="off" placeholder="请输入姓名  （必 填）" prop="username"></el-input>
    </el-form-item>
    <el-form-item prop="sex" >
      <el-select v-model="formOne.sex" placeholder="请选择性别  （必 填）" class="aj6" prop="sex">
        <el-option label="男" value="0"></el-option>
        <el-option label="女" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="province">
      <el-select v-model="formOne.province" placeholder="省  （必 填）" class="aj6" prop="province" @focus="handleProvinceChange">
        <el-option v-for="item in provinceMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="city">
      <el-select v-model="formOne.city" placeholder="市  （必 填）" class="aj6" @focus="handleCitySelect" @change="handleCityChange">
        <el-option v-for="item in cityMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="platform">
      <el-select v-model="formOne.platform" multiple placeholder="请选择推广平台  （必 填）" class="aj6">
        <el-option v-for="item in platformData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="contentstate">
      <el-select v-model="formOne.contentstate" multiple placeholder="请选择所属内容分类  （必 填）" class="aj6">
        <el-option v-for="item in contentCategoryData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="deviationstate">
      <el-select v-model="formOne.deviationstate" placeholder="请选择粉丝偏向  （必 填）" class="aj6">
        <el-option v-for="item in fansFavoriteData" :key="item.value"
            :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="fansnumber">
      <el-input v-model="formOne.fansnumber" autocomplete="off" placeholder="请填写目前拥有粉丝数量  （必 填）" prop="resource"></el-input>
    </el-form-item>
    <el-form-item prop="toplikes">
      <el-input v-model="formOne.toplikes" autocomplete="off" placeholder="请填写最高获赞数量  （必 填）"></el-input>
    </el-form-item>
    <button class="zhuce-btn" @click="handleStepNext('formOne')">下一步</button>
  </el-form>
  <!-- 第二步 formTwo -->
  <el-form v-else-if="value === 2" @submit.native.prevent>
    <p class="tip">上传身份证照片（<span class="tip__notes">请保证上传照片的信息清晰可读</span>）</p>
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
          :before-upload="file => handleUploadPicBefore(file, 'back')"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'back')"
          :on-error="(error, file) => handleUploadPicError(error, 'back')">
          <button class="upload-btn">
            <p>选择图片</p>
            <p>(大小为1M以下)</p>
          </button>
        </el-upload>
      </div>
    </div>
    <p class="tip">上传手持身份证照片（<span class="tip__notes">请保证照片的人物清晰，且身份证上的信息清</span>）</p>
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
          :before-upload="file => handleUploadPicBefore(file, 'hold')"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'hold')"
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
  <el-form class="svbrivbpsierbv form" v-else :model="formThree" status-icon :rules="rules" ref="formThree" @submit.native.prevent>
    <el-form-item prop="phone">
      <el-input v-model="formThree.phone" placeholder="请输入手机号  （必 填）"></el-input>
    </el-form-item>
    <el-form-item prop="code" class="code-input-box" :validate-event="false">
      <el-input v-model="formThree.code" placeholder="请输入验证码  （必 填）" autocomplete="off" :validate-event="false"></el-input>
      <div v-show="verShow" class="t456" @click="huoqu">获取验证码</div>
      <div v-show="!verShow" class="t456"><span>{{timer}}</span>秒后重新获取</div>
    </el-form-item>
    <!-- 图形验证码 -->
    <el-form-item prop="imagecode" class="code-input-box">
      <el-input v-model="formThree.imagecode" placeholder="请输入图形验证码  （必 填）" autocomplete="off"></el-input>
      <!-- <canvas class="img-code-box" @click="generateImgCode" ref="imgCodeCanvas">获取验证码</canvas> -->
      <div class="img-code-box">
        <canvas class="img-code__image" ref="imgCodeCanvas"></canvas>
        <span class="img-code__btn" @click="generateImgCode">换一张</span>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="formThree.password" placeholder="请设置账号密码  （必 填）"></el-input>
    </el-form-item>
    <el-form-item prop="pwdagain">
      <el-input type="password" v-model="formThree.pwdagain" placeholder="请再次输入账号密码  （必 填）"></el-input>
    </el-form-item>
    <!-- <el-form-item label="" prop="type4">
      <el-checkbox-group v-model="formThree.type4">
        <el-checkbox label="请仔细阅读此协议" name="1"></el-checkbox>
      </el-checkbox-group>
    </el-form-item> -->
    <div class="pay-protocal-box">
        <!-- <el-radio-group class="pay-protocal-tip" fill="#FD3069" v-model="formFour.yuedu">
            <el-radio :label="3">我已阅读并同意 <span>《用户支付协议》</span></el-radio>
          </el-radio-group> -->
      <el-checkbox
        class="pay-protocal-tip"
        v-model="formThree.agree"
        name="yuedu">
        我已阅读并遵守
          <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0o71f434c574284515bb1164b9a0e3d791?mode=embed" target="_blank">《红人带货网站服务条款》/</a></span>
          <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0oa2028ffb85694be085cb233d58de5dc6?mode=embed" target="_blank">《隐私政策》/</a></span>
          <span><a href="https://writer.zohopublic.com.cn/writer/published/xse0o2c20fa5e00624e78b04457d3cb1a0a7e?mode=embed" target="_blank">《红人合作合同》/</a></span>
        <!-- <span><router-link :to="{name:'fuwuxieyi'}">《红人带货网站服务条款》/</router-link></span>
        <span><router-link :to="{name:'yisizhengce'}">《隐私政策》/</router-link></span> -->
      </el-checkbox>
    </div>
    <button class="btn--11" @click="handleStepBack">返回上一步</button>
    <button class="btn--22" @click="handleSubmitReg('formThree')">完成注册</button>
  </el-form>
  <el-dialog
  title="!!提示!!"
  :visible.sync="centerDial"
  width="30%"
  center>
  <p class="xintianjia">信息未完善</p>
  <p class="xintianjia">请先前往个人中心完善我的信息</p>
  <p class="xintianjia xintianjia1">否则无法审核通过</p>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDial3">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { register, fetchPhoneCode } from '@/api/user'
// import { saveUserToLocation } from '@/utils/auth'
import { getProvinceMap, getCityMap, getRegionMap } from '@/utils/china-location'
import { fansFavoriteData, contentCategoryData, platformData } from '@/data/common'
import frontIdCardPlaceholderPic from '@/assets/idcard-front.png'
import backIdCardPlaceholderPic from '@/assets/idcard-back.png'
import holdIdCardPlaceholderPic from '@/assets/hold-idcard.png'
import actions from '@/data/actions'
import generateImgCode from '@/utils/generate-img-code'

export default {
  props: {
    value: {
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
      provinceMap: getProvinceMap(),
      cityMap: null,
      centerDial: false,
      // areaMap: null,
      frontIdCardPlaceholderPic, // 身份证正面占位图
      backIdCardPlaceholderPic, // 身份证反面占位图
      holdIdCardPlaceholderPic,
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: ['blur', 'change'] }
        ],
        // type4: [
        //   { type: 'array', required: true, message: '请勾选此选项', trigger: 'change' }
        // ],
        city: [
          { required: true, message: '请选择市', trigger: ['blur', 'change'] }
        ],
        // area: [
        // ],
        platform: [
          { required: true, message: '请选择推广平台', trigger: 'change' }
        ],
        contentstate: [
          { required: true, message: '请选择内容分类', trigger: ['blur', 'change'] }
        ],
        deviationstate: [
          { required: true, message: '请选择粉丝偏向', trigger: ['blur', 'change'] }
        ],
        fansnumber: [
          { required: true, message: '请输入粉丝数量', trigger: ['blur', 'change'] },
          {
            required: true,
            pattern: /^\d+$/,
            message: '只能填写数字',
            trigger: 'blur'
          }
        ],
        toplikes: [
          { required: true, message: '请输入最高获赞数量', trigger: ['blur', 'change'] },
          {
            required: true,
            pattern: /^\d+$/,
            message: '只能填写数字',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }
          // {
          //   required: true,
          //   pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur'
          // }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
        ],
        imagecode: [
          { required: true, message: '请输入图形验证码' },
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
        agree: [{ required: true, message: '请勾选同意协议', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        pwdagain: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ]
      },
      loading: { // 加载对象， true 加载中， false 未加载中, 用于显示加载动画
        frontIdCardPic: false,
        backIdCardPic: false,
        holdIdCardPic: false
      },
      fansFavoriteData, // 分享偏爱
      contentCategoryData, // 粉丝分类
      platformData, // 平台
      showReg: true,
      formOne: {
        username: '',
        sex: '',
        province: '',
        city: '',
        // area: '',
        platform: [],
        contentstate: [],
        deviationstate: '',
        fansnumber: '',
        toplikes: ''
      },
      formTwo: {
        frontIdCardPic: null,
        backIdCardPic: null,
        holdIdCardPic: null
      },
      formThree: {
        phone: '',
        nickname: '',
        password: '',
        type: '',
        imagecode: '',
        code: '',
        address: '',
        token: '',
        usertype: '1',
        wechat: '',
        state: '',
        realnameStatus: '',
        extime: '',
        headimgurl: '',
        shopname: '',
        pwdagain: '',
        agree: ''
        // type4: []
      },
      verShow: true,
      timer: 60,
      activeName: 'first',
      formLabelWidth: '120px',
      checked: true,
      zhuce: false,
      imgCode: ''
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
    // 注册完成前往个人中心完善信息
    centerDial3 () {
      this.centerDial = false
      this.$router.push('/home')
    },
    createTempId () {
      this.$parent.createTempId()
    },
    generateImgCode () {
      const imgCodeCanvas = this.$refs['imgCodeCanvas']
      this.imgCode = generateImgCode(imgCodeCanvas)
    },
    handleStepNext (formName) {
      if (formName === 'formTwo') {
        const formTwo = this.formTwo
        let msg = ''
        if (!formTwo.frontIdCardPic) {
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
        this.$refs[formName].validate(valid => {
        // 正确可下一步
          if (valid) {
            this.$emit('input', this.value + 1)
          }
        })
      }
    },
    handleStepBack () {
      this.$emit('input', this.value - 1)
    },
    // 提交注册
    submitReg () {
      const form = Object.assign({
        usertype: '1' // 红人
      }, this.formOne, this.formThree, {
        token: this.id
      })
      form.contentstate = form.contentstate && form.contentstate.join('|')
      form.platform = form.platform && form.platform.join('|')
      register(form).then(data => {
        console.group('红人注册====成功')
        console.log(data)
        console.groupEnd()
        this.centerDial = true
        // this.g()
      })
    },
    // g () {
    //   // 请求小蜜蜂
    //   this.$axios({
    //     method: 'post',
    //     url: 'http://10.1.204.120:80/Wengwenglog/HrApproval',
    //     params: {
    //       Telephone: '18521364048',
    //       Content: '来生意了！有个（' + this.formThree.phone + '）红人宝宝来了，待审核'
    //     }
    //   }).then(Message => {
    //     console.log('----------------------------------------------------------------------------------------------------')
    //     console.log(Message)
    //   }).catch(Message => {
    //     console.log('----------------------------------------------------------------------------------------------------')
    //     console.log(Message)
    //   })
    // },
    // 提交注册事件
    handleSubmitReg (formName) {
      console.group('红人注册step-2')
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
      if (operatorType === 'front') {
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
    // 处理上次身份证失败
    handleUploadPicError (error, operatorType) {
      console.log(error)
      let message = null
      if (operatorType === 'front') {
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
    handleUploadPicBefore (file, operatorType) { // operatorType 操作类型
      // 上传的图片不能超过2M
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
        if (operatorType === 'front') {
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
    }
  }
}
</script>

<style lang="less">
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

.id-card-box {
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
</style>

<style lang="less" scoped>
.xintianjia {
  text-align: center;
}
.xintianjia1 {
  color: #fd3069;
  font-size: 18px;
}
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

  .t456{
    display: inline-block;
    width: 117px;
    margin-left: 2px;
    height: 40px;
    background-color: #e3e3e3;
    right: 0px;
    text-align: center;
    line-height: 40px;
    vertical-align: bottom;
    border-radius: 1px;
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
      // margin-top: 19px;
      // margin-bottom: 24px;
      padding: 2px;
      border: 2px dashed #eee8e8;
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

.button-group {
  text-align: center;
}
</style>
