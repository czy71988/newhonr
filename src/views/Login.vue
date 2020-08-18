<template>
<div class="login_container">
  <div class="login_img">
    <img src="../assets/new/组 735@2x.png" alt="">
  </div>
  <div class="login_div">
    <img src="../assets/new/组 54@2x.png" alt="" class="login_img1">
    <p class="login_p1">
      欢迎登录红人带货
    </p>
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
        <img :src="imgUrl" alt="">
      </div>
    </div>
    <div class="login_from" v-else>
      222
    </div>
    <div class="login_p2 login_p3">
      <div class="login_mima" @click="mima_denglu">免费注册</div>
      <div class="login_phone" @click="phone_denglu">忘记密码？</div>
    </div>
    <div class="login_btn" v-if="this.active ===1" @click="denglu">登陆</div>
    <div class="login_btn" v-else @click="denglu1">登陆</div>
  </div>
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
      }
    }
  },
  created () {
    this.setDialogWidth()
    // console.log(accountLogin)
    // console.log(CodeLogin)
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
      const obj = {
        username: this.form2.phone,
        password: encryptionPW(this.form2.phone),
        type: 2
      }
      LOGIN(obj).then(err => {
        sessionStorage.setItem('token', err.sessionId)
        sessionStorage.setItem('type', err.loginPersonnelType)
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
        display: flex;
    .login_img {
      width: 100%;
        height: 100vh;
      img {
        height: 100vh;
      }
    }
    .login_div {
      float: right;
      width: 100%;
      height: 100vh;
      .login_img1 {
        height: 83px;
        margin-top: 240px;
        margin-left: 200px;
      }
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
        font-size:18px;
        height:64px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:64px;
        color:rgba(102,102,102,1);
        opacity:1;
        margin-left: 144px;
        margin-top: 20px;
        .login_mima {
          float: left;
          text-align: left;

        }
        .login_phone {
          float: right;
          text-align: right;
        }
        .mima {
          color: crimson;
        }
      }
      .login_from {
        margin-left: 144px;
        width: 367px;
      }
      .login_p3 {
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
        margin-left: 226px;
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
