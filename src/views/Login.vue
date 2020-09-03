<template>
<div class="login_container">
  <img src="../assets/new/组 54@2x.png" alt="" class="login_img1">
  <!-- 账号密码登录 -->
  <div class="login_div">
    <div class="login_p2">
      <div class="login_mima" :class="active === 1 ? 'mima' : ''" @click="mima_denglu">密码登录</div>
      <div class="login_phone" :class="active === 2 ? 'mima' : ''" @click="phone_denglu">手机登录</div>
    </div>
    <div class="login_from" v-if="active === 1">
      <el-input placeholder="请输入手机号码" v-model="form1.phone">
        <template slot="prepend"><i class="el-icon-user-solid"></i></template>
      </el-input>
      <el-input placeholder="请输入密码" v-model="form1.passWord" show-password>
        <template slot="prepend"><i class="el-icon-lock"></i></template>
      </el-input>
      <div class="skdfjfbgd">
        <el-input v-model="form1.tuxing" placeholder="请输入内容"></el-input>
        <img :src="imgUrl" alt="" @click="handleTabChange">
      </div>
    </div>
    <!-- 验证码登录 -->
    <div class="login_from" v-else>
      <el-input placeholder="请输入手机号码" v-model="form2.phone">
        <template slot="prepend"><i class="el-icon-user-solid"></i></template>
      </el-input>
          <el-input placeholder="请输入内容" v-model="form2.yanzhengma" class="input-with-select">
            <el-button slot="append" @click="countDown">{{content}}</el-button>
          </el-input>
    </div>
    <div class="login_p2 login_p3">
      <div class="login_mima1" @click="zhuce"><span>还没有账号？</span>免费注册</div>
      <div class="login_phone2" @click="ForgetthePassword">忘记密码？</div>
    </div>
    <div class="login_btn" v-if="this.active ===1" @click="denglu">登陆</div>
    <div class="login_btn" v-else @click="denglu1">登陆</div>
  </div>
  <p class="footer">
    <span>浙江中快网络科技有限公司</span>
    <span>备案号码：沪ICP备17053507号</span>
  </p>
</div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { getToken, encryptionPW } from '@/utils/auth'
import { wangjimima } from '@/api/user'
import { LOGIN, phonecaptch } from '@/api/login'
export default {
  data () {
    return {
      imgUrl: '/zkurtg-red-api/public/captchaImage?timestamp=' + new Date(),
      active: 1,
      // 忘记密码表单数据
      ruleForm: {
        phone: '',
        code: '',
        username: '',
        province: '',
        city: '',
        password: ''
      },
      activeName: 'first',
      wangjimima: false,
      dialogwidth: '',
      // imgUrl: '',
      labelPosition: 'right',
      form1: {
        phone: '',
        password: '',
        tuxing: ''
      },
      form2: {
        phone: '',
        yanzhengma: ''
      },
      token: getToken(),
      verShow: true,
      timer: 60,
      password: '',
      type: '',
      imgCode: '',
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ],
        yanzhengma: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
        ],
        // xingbie: [
        //   { required: true, message: '请输入性别', trigger: ['blur', 'change'] }
        // ],
        province: [
          { required: true, message: '请输入省', trigger: ['blur', 'change'] }
        ],
        city: [
          { required: true, message: '请输入市', trigger: ['blur', 'change'] }
        ],
        tuxing: [
          { required: true, message: '请输入图形验证码', trigger: ['blur', 'change'] }
        ]
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      canClick: true,
      nowTime: ''
    }
  },
  created () {
    this.setDialogWidth()
    this.getTime()
  },
  mounted () {
    this.generateImgCode()

    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }

    // this.gettuxingyanzhnegma()
  },
  methods: {
    // ======================================================================================
    mima_denglu () {
      this.active = 1
    },
    phone_denglu () {
      this.active = 2
    },
    ForgetthePassword () {
      this.$router.push({ name: 'changepassword' })
    },
    zhuce () {
      this.$router.push({ name: 'registered' })
    },
    // 发送验证码
    countDown () {
      if (!this.form2.phone) {
        this.$message({
          message: '请输入手机号',
          type: 'success'
        })
        return
      }
      this.$axios.get('/zkurtg-red-api/public/captchaImageByPhone?phone=' + this.form2.phone).then((response) => {
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
    getTime () {
      setInterval(() => {
        // new Date() new一个data对象，当前日期和时间
        // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString()
      }, 1000)
    },
    // ======================================================================================
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('失败!')
          wangjimima({
            phone: this.ruleForm.phone,
            code: this.ruleForm.code,
            username: this.ruleForm.username,
            // xingbie: this.ruleForm.xingbie,
            province: this.ruleForm.province,
            city: this.ruleForm.city,
            password: this.ruleForm.password
          }, false).then(res => {
            MessageBox('修改密码成功')
            this.wangjimima = false
          }).catch(err => {
            this.$message({
              message: err.message === 'null' ? '填写的信息不正确' : err.message,
              type: 'error',
              duration: 3000
            })
          })
        } else {
          console.log('修改密码失败')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    home () {
      this.$router.push({ name: 'home' })
    },
    generateImgCode () {
      this.imgUrl = '/zkurtg-red-api/public/captchaImage?timestamp=' + new Date()
    },
    onSubmit () {
      console.log('submit!')
    },
    // 登录之后跳转
    redirectAfterLoginSuccess () {
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.$router.push({ path: redirect })
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    handleTabChange (ref) {
      // tab切换重新生成图形验证码
      // this.$nextTick(() => {
      this.generateImgCode()
      // })
    },
    // 登录接口
    denglu () {
      const obj = {
        username: this.form1.phone,
        password: encryptionPW(this.form1.passWord),
        captcha: this.form1.tuxing,
        type: 1
      }
      LOGIN(obj).then(err => {
        sessionStorage.setItem('token', err.sessionId)
        sessionStorage.setItem('type', err.loginPersonnelType)
        this.$router.push({ name: 'index' })
      })
    },
    // 登录接口
    denglu1 () {
      console.log(this.form2.phone)
      console.log(this.form2.yanzhengma)
      console.log(Date.parse(new Date()))
      console.log(this.form2.phone + '_' + this.form2.yanzhengma + '_' + Date.parse(new Date()))
      const obj = {
        username: this.form2.phone,
        captcha: this.form2.yanzhengma,
        password: encryptionPW(this.form2.phone + '_' + this.form2.yanzhengma + '_' + Date.parse(new Date())),
        type: 2
      }
      LOGIN(obj).then(err => {
        sessionStorage.setItem('token', err.sessionId)
        sessionStorage.setItem('type', err.loginPersonnelType)
        this.$router.push({ name: 'index' })
      })
    },

    // 获取验证码
    huoqu1 () {
      // console.log('huoqu')
      var phone = this.ruleForm.phone
      if (!(/^1\d{10}$/.test(phone))) {
        MessageBox('手机号码有误，请重填')
        return false
      } else {
        this.verShow = false
        var authTimer = setInterval(() => {
          this.timer--
          if (this.timer <= 0) {
            this.verShow = true
            clearInterval(authTimer)
            this.timer = 60
          }
        }, 1000)
        phonecaptch({
          phone: phone
        }).then(data => {
          this.password = data.code
          this.$message({
            message: '手机验证码已发送成功',
            type: 'success'
          })
        })
      }
    },
    // 获取验证码
    huoqu () {
      // console.log('huoqu')
      var phone = this.form2.phone
      if (!(/^1\d{10}$/.test(phone))) {
        MessageBox('手机号码有误，请重填')
        return false
      } else {
        this.verShow = false
        var authTimer = setInterval(() => {
          this.timer--
          if (this.timer <= 0) {
            this.verShow = true
            clearInterval(authTimer)
            this.timer = 60
          }
        }, 1000)
        phonecaptch({
          phone: phone
        }).then(data => {
          this.password = data.code
          this.$message({
            message: '手机验证码已发送成功',
            type: 'success'
          })
        })
      }
    },
    setDialogWidth () {
      // console.log(document.body.clientWidth)
      var val = document.body.clientWidth
      const def = 800 // 默认宽度
      if (val < def) {
        this.dialogWidth = '50%'
      } else {
        this.dialogWidth = def + 'px'
      }
    }
  }
}
</script>
<style lang="less">
.menu__item {
  &.router-link-active {
    background: #ffffff;
  }
}
</style>
<style lang="less" scoped>
  .login_container {
    height: 100vh;
    width: 100vw;
    text-align: center;
    .login_img1 {
      height: 68px;
      margin-bottom: 100px;
      margin-top: 50px;
    }
    .login_div {
      width:483px;
      padding: 10px 0;
      box-sizing: border-box;
      // height:554px;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 8px rgba(0,0,0,0.16);
      opacity:1;
      border-radius:10px;
      margin: auto;
      // margin-top: 50%;
      // transform: rotateX(-50%);

      .login_p1 {
        font-size:21px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:29px;
        color:rgba(0,0,0,1);
        opacity:1;
        margin-top: 23px;
        margin-left: 240px;
      }
      .login_p2 {
        width: 367px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:64px;
        color:rgba(153,153,153,1);
        opacity:1;
        margin: auto;
        margin-top: 20px;
        .login_mima1 {
          float: left;
          text-align: left;
          color:#EA4039 ;
          span {
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            line-height:43px;
            color:#7E7E7E;
            opacity:1;
          }
        }
        .login_phone2 {
          float: right;
          text-align: right;
        }
        .login_mima {
          display: inline-block;
          // float: left;
          margin-right: 20px;
        }
        .login_phone {
          display: inline-block;
        }
        .mima {
          font-size:24px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:64px;
          color:rgba(102,102,102,1);
          opacity:1;
        }
      }
      .login_from {
        margin: auto;
        width: 367px;
      }
      .login_p3 {
        display: inline-block;
        height: 43px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:43px;
        color:rgba(126,126,126,1);
        opacity:1;
        .login_mima {
          color: crimson;
        }
      }
      .login_btn {
        margin: 30px auto;
        width:205px;
        height:51px;
        background:rgba(234,64,57,1);
        opacity:1;
        border-radius:10px;
        text-align: center;
        line-height: 51px;
        font-size:18px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        opacity:1;
      }
    }
    .footer {
      display: block;
      width: 100%;
      color: #999999;
      font-size: 16px;
      position: fixed;
      bottom: 10px;
      span:nth-child(1) {
        margin-right: 30px;
      }
    }
  }
</style>

<style lang="less">
  .login_from {
    .el-input {
      margin-top: 35px;
      height: 44px;
      .el-input__inner {
        height: 44px;
      }
    }
    .skdfjfbgd {
      // float: left;
      height: 44px;
        margin-top: 35px;
      .el-input {
        width: 217px;
        height: 44px;
        margin: 0;
        .el-input__inner {
          height: 44px;
          width: 217px;
        }
      }
      img {
        width: 136px;
        height: 44px;
        float: right;
      }
    }
  }
</style>
