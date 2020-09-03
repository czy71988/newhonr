<template>
  <div class="zhuce_hr">

    <div class="fanhui" @click="btn" v-if="index !==1"><i class="el-icon-arrow-left"></i>上一步</div>
    <div class="onw" v-if="index === 1">
      <el-form ref="form" :model="from" :rules="rules">
        <el-form-item label="姓名" prop="redskinsName">
          <el-input v-model="from.redskinsName" placeholder="请输入红人姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="redskinsGender">
          <el-select v-model="from.redskinsGender" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="dizhixuanze">
          <el-form-item label="地址" >
            <!-- 省市区 -->
            <v-distpicker @selected="selected"></v-distpicker>
          </el-form-item>
        </div>

        <el-form-item label="电子邮箱">
          <el-input v-model="from.electronicMail" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>

        <el-form-item label="请选择推广平台" prop="redskinsPlatform">
          <el-select v-model="from.redskinsPlatform" placeholder="请选择平台">
            <el-option
              v-for="item in platformData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属内容分类" prop="contentType">
          <el-select v-model="from.contentType" placeholder="请选择内容分类">
            <el-option
              v-for="item in contentCategoryData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="目前拥有粉丝最高数量" prop="fansAmount">
          <el-input v-model="from.fansAmount" placeholder="请输入粉丝最高数量"></el-input>
        </el-form-item>

        <el-form-item label="粉丝偏向" prop="fansType">
          <el-select v-model="from.fansType" placeholder="请选择粉丝偏向">
            <el-option
              v-for="item in fansFavoriteData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="最高获赞量" prop="highestLikes">
          <el-input v-model="from.highestLikes" placeholder="请输入获赞量"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn" @click="btn1">下一步</div>
    </div>

    <div class="two" v-if="index === 2">
      <el-form ref="form" :model="from">
        <el-form-item label="上传身份证照片（请保证上传照片的信息清晰可见）">
          <el-upload
            class="avatar-uploader"
            :action="actions.uploadBusinessLicense + '?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="from.cardFrontUrl" :src="from.cardFrontUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            :action="actions.uploadBusinessLicense + '?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1">
            <img v-if="from.cardReverseUrl" :src="from.cardReverseUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传手持身份证照片（请保证上传照片的人物清晰 且身份证上面的信息清晰可读）">
          <el-upload
            class="avatar-uploader"
            :action="actions.uploadBusinessLicense + '?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2">
            <img v-if="from.cardHandheldUrl" :src="from.cardHandheldUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="sdfoerg">
            <img class="img_yanglitupian" src="../../assets/new/组 738@2x.png" alt="">
            <p class="p_yanglitupian">示例照片</p>
          </div>
          <div class="btn" @click="btn1">下一步</div>
        </el-form-item>
      </el-form>
    </div>

    <div class="three" v-if="index === 3">
      <el-form ref="form" :model="from" :rules="rules">
        <el-form-item label="手机号" prop="username">
          <el-input v-model="from.username" @change="jiance"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input placeholder="请输入验证码" v-model="from.captcha" class="input-with-select">
            <el-button slot="append" @click="countDown">{{content}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="from.password"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="password1">
          <el-input v-model="password1"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn" @click="btn2">完成注册</div>
    </div>

  </div>
</template>
<script>
import { zhuceHR, zhucePhone } from '../../api/login'
import { encryptionPW } from '@/utils/auth'
import { platformData, contentCategoryData, fansFavoriteData } from '../../data/common'
import actions from '@/data/actions'
import VDistpicker from 'v-distpicker' // 引入省市区三级联动插件

export default {
  components: {
    VDistpicker // 注册省市区三级联动组件
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
      // provinceMap: getProvinceMap(),
      platformData,
      contentCategoryData,
      fansFavoriteData,
      index: 1,
      from: {
        redskinsName: '', // 红人姓名
        redskinsGender: '', // 性别
        province: '', // 省
        city: '', // 市
        district: '', // 区
        redskinsPlatform: [], // 推广平台0-其他，1-淘宝，2-抖音，3-快手，4-微视，5-小红书
        contentType: [], //  内容分类：0-其他，1-母婴玩具，2-科技生活，3-美妆护肤，4-美食攻略，5-服装穿搭，6-家具百货，
        fansAmount: '', // 粉丝数量
        highestLikes: '', // 最高获赞数量
        electronicMail: '', //  电子邮箱
        //
        username: '', // 手机号
        password: '', // 密码要 使用RSA加密
        captcha: '', // 验证码
        type: 1,
        fansType: '', // 粉丝偏向：1-男女均衡，2-男粉多，3-女粉多
        cardFrontUrl: '', // 身份证正面照片URL
        cfPaht: '', // 身份证正面照片PATH
        cardReverseUrl: '', // 身份证反面照片URL
        crPath: '', // 身份证反面照片PATH
        cardHandheldUrl: '', // 身份证手持图片URL
        chPath: '' // 身份证手持图片PATH
      },
      options: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ],
      rules: {
        redskinsName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
        ],
        redskinsGender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ],
        // type4: [
        //   { type: 'array', required: true, message: '请勾选此选项', trigger: 'change' }
        // ],
        city: [
          { required: true, message: '请选择市', trigger: 'blur' }
        ],
        // area: [
        // ],
        redskinsPlatform: [
          { required: true, message: '请选择推广平台', trigger: 'blur' }
        ],
        contentType: [
          { required: true, message: '请选择内容分类', trigger: 'blur' }
        ],
        fansType: [
          { required: true, message: '请选择粉丝偏向', trigger: 'blur' }
        ],
        fansAmount: [
          { required: true, message: '请输入粉丝数量', trigger: 'blur' }
          // {
          //   required: true,
          //   pattern: /^\d+$/,
          //   message: '只能填写数字',
          //   trigger: 'blur'
          // }
        ],
        highestLikes: [
          { required: true, message: '请输入最高获赞数量', trigger: 'blur' }
          // {
          //   required: true,
          //   pattern: /^\d+$/,
          //   message: '只能填写数字',
          //   trigger: 'blur'
          // }
        ],
        username: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
          // {
          //   required: true,
          //   pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur'
          // }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
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
            trigger: 'blur'
          }
        ],
        agree: [{ required: true, message: '请勾选同意协议', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ]
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      canClick: true,
      cityMap: '',
      password1: ''
    }
  },
  methods: {
    // 省市区选择最后一项触发
    selected (data) {
      this.from.province = data.province.value
      this.from.city = data.city.value
      this.from.district = data.area.value
      console.log(this.from.province)
      console.log(this.from.city)
      console.log(this.from.district)
      // console.log()
    },
    countDown () {
      this.$axios.get('/zkurtg-red-api/public/captchaImageByPhone?phone=' + this.from.username).then((response) => {
        console.log(response.data)
        this.$message({
          message: '验证码发送成功',
          type: 'success'
        })
      })

      if (!this.canClick) return // 改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 10
          this.canClick = true // 这里重新开启
        }
      }, 1000)
    },
    btn1 () {
      this.index = this.index + 1
    },
    // 完成注册
    btn2 () {
      this.from.password = encryptionPW(this.from.password)
      zhuceHR(this.from).then(data => {
        this.$message({
          message: '注册成功',
          type: 'success'
        })
        this.$router.push({ name: 'login' })
      })
    },
    btn () {
      this.index = this.index - 1
    },
    // 上传图片获取url和path
    handleAvatarSuccess (response, file, fileList) {
      this.from.cardFrontUrl = response.data.fullPath
      this.from.cfPaht = response.data.path
    },
    handleAvatarSuccess1 (response, file, fileList) {
      this.from.cardReverseUrl = response.data.fullPath
      this.from.crPath = response.data.path
    },
    handleAvatarSuccess2 (response, file, fileList) {
      this.from.cardHandheldUrl = response.data.fullPath
      this.from.chPath = response.data.path
    },
    // 检查手机号是否注册过
    jiance () {
      zhucePhone({
        loginName: this.from.username
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .zhuce_hr {
    .fanhui {
      position: absolute;
      top: 200px;
      left: 580px;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(232,37,29,1);
      opacity:1;
      i {
        margin-right: 10px;
      }
    }
    .onw {
      .p {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:64px;
        color:rgba(102,102,102,1);
        opacity:1;
      }
      .btn {
        width: 100%;
        height:51px;
        background:rgba(234,64,57,1);
        opacity:1;
        border-radius:10px;
        font-size:17px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:51px;
        color:rgba(255,255,255,1);
        opacity:1;
        text-align: center;
        margin-top: 60px;
      }
    }
    .two {
      .img_yanglitupian {
        width: 169px;
        height: 127px;
        vertical: top;

      }
      .p_yanglitupian {
        text-align: right;
      }
      .sdfoerg {
        display: inline-block;
        width: 180px;
        height: 195px;
      }
    }
      .btn {
        width: 100%;
        height:51px;
        background:rgba(234,64,57,1);
        opacity:1;
        border-radius:10px;
        font-size:17px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:51px;
        color:rgba(255,255,255,1);
        opacity:1;
        text-align: center;
        margin-top: 60px;
      }
  }

  @media (max-width: 1366px) {
    .zhuce_hr{
      .fanhui {
        position: absolute;
        top: 200px;
        left: 260px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #e8251d;
        opacity: 1;
      }
    }
  }
  @media (max-width: 1600px) {
    .zhuce_hr{
      .fanhui {
        position: absolute;
        top: 200px;
        left: 420px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #e8251d;
        opacity: 1;
      }
    }
  }
</style>

<style lang="less">
  .zhuce_hr {
    .el-form-item__label {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        // line-height:64px;
        color:rgba(102,102,102,1);
        opacity:1;
        width: 100%;
        text-align: left;
    }
    .el-select {
      width: 100%;
    }
    .avatar-uploader {
      display: inline-block;
      margin-right: 20px;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 175px;
      height: 175px;
      line-height: 175px;
      text-align: center;
    }
    .avatar {
      width: 175px;
      height: 175px;
      display: block;
    }
  }
  .dizhixuanze {
    .el-select {
      width: 30%;
      margin-right: 13px;
    }
    .distpicker-address-wrapper select {
      font-size: 16px;
      height: 44px;
      width: 130px;
      border-radius: 5px;
      padding: 5px;
    }
  }
</style>
