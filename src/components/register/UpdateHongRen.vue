<template>
<!-- 修改注册页 -->
<div>
  <!-- 第一步 formOne -->
  <el-form class="formOne form" :model="formOne" status-icon :rules="rules" v-if="value === 1" ref="formOne" @submit.native.prevent>
    <el-form-item prop="username" required>
      <el-input v-model="formOne.username" autocomplete="off" placeholder="请输入姓名" prop="username"></el-input>
    </el-form-item>
    <el-form-item prop="sex" >
      <el-select v-model="formOne.sex" placeholder="请选择性别" class="aj6" prop="sex">
        <el-option label="男" :value="0"></el-option>
        <el-option label="女" :value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="province">
      <el-select v-model="formOne.province" placeholder="省" class="aj6" prop="province" @focus="handleProvinceChange">
        <el-option v-for="item in provinceMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="city">
      <el-select v-model="formOne.city" placeholder="市" class="aj6" @focus="handleCitySelect" @change="handleCityChange">
        <el-option v-for="item in cityMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item prop="area">
      <el-select v-model="formOne.area" placeholder="区/县" class="aj6" @focus="handleAreaSelect">
        <el-option v-for="item in areaMap" :key="item[0]" :label="item[1]" :value="item[1]"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item prop="platform">
      <el-select v-model="formOne.platform" multiple placeholder="请选择推广平台" class="aj6">
        <el-option v-for="item in platformData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="contentstate">
      <el-select v-model="formOne.contentstate" multiple placeholder="请选择所属内容分类" class="aj6">
        <el-option v-for="item in contentCategoryData" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="deviationstate">
      <el-select v-model="formOne.deviationstate" placeholder="请选择粉丝偏向" class="aj6">
        <el-option v-for="item in fansFavoriteData" :key="item.value"
            :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="fansnumber">
      <el-input v-model="formOne.fansnumber" autocomplete="off" placeholder="请填写目前拥有粉丝数量" prop="resource"></el-input>
    </el-form-item>
    <el-form-item prop="toplikes">
      <el-input v-model="formOne.toplikes" autocomplete="off" placeholder="请填写最高获赞数量"></el-input>
    </el-form-item>
    <button class="zhuce-btn" @click="handleStepNext('formOne')">下一步</button>
  </el-form>
  <!-- 第二步 formTwo -->
  <el-form class="form" v-else-if="value === 2" @submit.native.prevent>
    <p class="tip upload-pic-tip"><span class="tip__notes">* 请注意：上传的图片大小不能超过1M</span></p>
    <p class="tip">上传身份证照片（<span class="tip__notes">请保证上传照片的信息清晰可读</span>）</p>
    <div class="id-card-ctn">
      <div class="id-card-box">
        <p class="title">正面</p>
        <div class="img-wrap upload-animation-box"
            v-loading="loading.frontIdCardPic"
            element-loading-text="拼命上传中">
          <img :src="formTwo.cardFrontimg || frontIdCardPlaceholderPic" class="id-card-img" alt="">
        </div>
        <el-upload
          :action="actions.updateFrontIDCard + '&token=' + infData.id"
          list-type="text"
          accept="image/*"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'front')"
          :before-upload="file => handleUploadPicBefore(file, 'front')"
          :on-error="(error, file) => handleUploadPicError(error, 'front')">
          <button class="upload-btn">
            <p>选择图片</p>
          </button>
        </el-upload>
      </div>
      <div class="id-card-box">
        <p class="title">反面</p>
        <div class="img-wrap upload-animation-box"
            v-loading="loading.backIdCardPic"
            element-loading-text="拼命上传中">
          <img :src="formTwo.cardbacktimg || backIdCardPlaceholderPic" class="id-card-img" alt="">
        </div>
        <el-upload
          :action="actions.updateBackIDCard + '&token=' + token"
          list-type="text"
          accept="image/*"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'back')"
          :before-upload="file => handleUploadPicBefore(file, 'back')"
          :on-error="(error, file) => handleUploadPicError(error, 'back')">
          <button class="upload-btn">
            <p>选择图片</p>
          </button>
        </el-upload>
      </div>
    </div>
    <div class="clear"></div>
    <p class="tip">上传手持身份证照片（<span class="tip__notes">请保证照片的人物清晰，且身份证上的信息清</span>）</p>
    <div class="id-card-ctn">
      <div class="id-card-box">
        <div class="img-wrap upload-animation-box"
            v-loading="loading.holdIdCardPic"
            element-loading-text="拼命上传中">
          <img :src="formTwo.cardholdimg || holdIdCardPlaceholderPic" class="id-card-img" alt="">
        </div>
        <el-upload
          :action="actions.updateHoldIDCard + '&token=' + token"
          list-type="text"
          accept="image/*"
          :on-success="(res, file) => handleUploadPicSuccess(file, 'hold')"
          :before-upload="file => handleUploadPicBefore(file, 'hold')"
          :on-error="(error, file) => handleUploadPicError(error, 'hold')">
          <button class="upload-btn">
            <p>选择图片</p>
          </button>
        </el-upload>
      </div>
      <div class="id-card-box">
        <img src="@/assets/hold-idcard-sample.png" class="id-card-img" alt="">
        <span class="tip simple-pic-tip">样例图片</span>
      </div>
    </div>
    <div class="clear"></div>
    <div class="button-group">
      <button class="btn--11 go-back-btn mb-btn" @click="handleStepBack">返回上一步</button>
      <button class="btn--22 submit-btn mb-btn" @click="handleSubmit('formTwo')">完成修改</button>
    </div>
  </el-form>
</div>
</template>

<script>
import { fetchPhoneCode, updateMyRegInf } from '@/api/user'
// import { saveUserToLocation } from '@/utils/auth'
import { getProvinceMap, getCityMap, getRegionMap } from '@/utils/china-location'
import { fansFavoriteData, contentCategoryData, platformData } from '@/data/common'
import frontIdCardPlaceholderPic from '@/assets/idcard-front.png'
import backIdCardPlaceholderPic from '@/assets/idcard-back.png'
import holdIdCardPlaceholderPic from '@/assets/hold-idcard.png'
import actions from '@/data/actions'
import { getToken } from '@/utils/auth'
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    infData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      actions,
      token: getToken(),
      provinceMap: getProvinceMap(),
      cityMap: null,
      areaMap: null,
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
        city: [
          { required: true, message: '请选择市', trigger: ['blur', 'change'] }
        ],
        area: [
        ],
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
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] },
          {
            required: true,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
        ],
        imagecode: [
          { required: true, message: '请输入图形验证码', trigger: ['blur', 'change'] }
        ],
        password: [
          { min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              if (this.formThree.pwdagain !== '') {
                this.$refs.formThree.validateField('pwdagain')
              }
              callback()
            }
          },
          trigger: 'blur' }
        ],
        pwdagain: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.formThree.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
          trigger: 'blur',
          required: true }
        ]
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
        area: '',
        platform: [],
        contentstate: [],
        deviationstate: '',
        fansnumber: '',
        toplikes: ''
      },
      loading: { // 加载对象， true 加载中， false 未加载中, 用于显示加载动画
        frontIdCardPic: false,
        backIdCardPic: false,
        holdIdCardPic: false
      },
      formTwo: {
        cardFrontimg: null,
        cardbacktimg: null,
        cardholdimg: null
        // type4: []
      },
      verShow: true,
      timer: 60,
      activeName: 'first',
      formLabelWidth: '120px',
      checked: true,
      zhuce: false
    }
  },
  created () {
    const infData = this.infData
    const formOne = this.formOne
    const formTwo = this.formTwo
    Object.keys(formOne).forEach(item => {
      formOne[item] = infData[item]
    })
    Object.keys(formTwo).forEach(item => {
      formTwo[item] = infData[item]
    })
    this.formOne = formOne
    this.formTwo = formTwo
    this.$emit('input', 1)
  },
  watch: {
    show (value) {
      if (value === false) {
        this.$emit('registerclick')
      }
    }
  },
  methods: {
    handleStepNext (formName) {
      if (formName === 'formTwo') {
        const formTwo = this.formTwo
        let msg = ''
        if (!formTwo.businessimg) {
          msg = '营业执照未上传'
        } else if (!formTwo.cardFrontimg) {
          msg = '身份证正面未上传'
        } else if (!formTwo.cardbacktimg) {
          msg = '身份证反面未上传'
        } else if (!formTwo.cardholdimg) {
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
    // 修改提交
    handleSubmit () {
      const form = Object.assign({
        state: 0
      }, this.formOne)
      form.contentstate = form.contentstate && form.contentstate.join('|')
      form.platform = form.platform && form.platform.join('|')
      updateMyRegInf(form).then(data => {
        this.$alert('修改成功')
        this.$emit('updateSuccess')
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
        this.formTwo.cardFrontimg = URL.createObjectURL(file.raw)
        this.loading.frontIdCardPic = false
      } else if (operatorType === 'back') {
        this.formTwo.cardbacktimg = URL.createObjectURL(file.raw)
        this.loading.backIdCardPic = false
      } else {
        this.formTwo.cardholdimg = URL.createObjectURL(file.raw)
        this.loading.holdIdCardPic = false
      }
    },
    // 处理上次身份证失败
    handleUploadPicError (error, operatorType) {
      console.log(error)
      let message = null
      if (operatorType === 'front') {
        this.loading.frontIdCardPic = false
        message = '修改正面身份证照片失败，请重新上传'
      } else if (operatorType === 'back') {
        this.loading.backIdCardPic = false
        message = '修改反面身份证照片失败，请重新上传'
      } else {
        this.loading.holdIdCardPic = false
        message = '修改手持身份证照片失败，请重新上传'
      }
      this.$notify({
        title: '警告',
        message,
        center: true,
        type: 'warning'
      })
    },
    handleUploadPicBefore (file, operatorType) {
      // 上传的图片不能超过1M
      if (file.size / 1024 / 1024 > 1) {
        this.$notify({
          title: '警告',
          message: '修改失败, 图片尺寸不能超过1M',
          center: true,
          type: 'warning'
        })
        return false
      }
      if (operatorType === 'front') {
        this.loading.frontIdCardPic = true
      } else if (operatorType === 'back') {
        this.loading.backIdCardPic = true
      } else {
        this.loading.holdIdCardPic = true
      }
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
</style>

<style lang="less" scoped>
.form {
  max-width: 900px;
  margin: 0 auto;
  &.formOne, &.formThree {
    max-width: 340px;
  }
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

.go-back-btn, .go-next-btn, .submit-btn {
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

  .t456 {
    width: 120px;
    height: 40px;
    background-color: #e3e3e3;
    position: absolute;
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

.id-card-ctn {
  margin-top: 30px;
  margin-bottom: 55px;
  display: flex;
  // float: left;
  .id-card-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    float: left;
    .title {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(50,51,52,1);
      line-height:20px;
    }
    .id-card-img {
      width: 278px;
      height: 208px;
      margin-top: 19px;
      margin-bottom: 24px;
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

<style lang="less" scoped>
// 移动端注册适配
@media screen and (max-width: 800px) {
  .tip {
    font-size: 14px;
    .tip__notes {
      font-size: 13px;
    }
    &.upload-pic-tip {
      .tip__notes {
        font-weight: 700;
      }
    }
  }
  .id-card-ctn {
    margin-top: 15px;
    margin-bottom: 30px;
    float: left;
    display: block;
    text-align: center;
    width: 100%;
    font-size: 14px;
    .id-card-box {
      margin-top: 20px;
      display: block;
      float: none;
      .title {
        font-weight: 700;
      }
      .id-card-img {
        width: 240px;
        height: 160px;
        display: inline-block;
      }
      .tip {
        &.simple-pic-tip {
          display: block;
          text-align: center;
          margin: 0 auto;
        }
      }
    }
  }
  .clear {
    display: block;
    content: ' ';
    clear: both;
  }
  .button-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mb-btn {
      margin-left: 0px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }
}
</style>
