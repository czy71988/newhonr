<template>
<div class="container">
  <!-- 顶部栏 登录注册 -->
  <div class="com-section navbar" v-if="!token">
    <div class="com-section__bd">
      <div class="menu">
        <router-link to="login" class="menu__item">登录</router-link>
        <router-link :to="{name:'registered'}" class="menu__item">注册</router-link>
      </div>
    </div>
  </div>
  <!-- logo -->
  <div class="com-section search" id="search">
    <div class="com-section__bd">
      <div class="search-wrap">
        <img class="logo" src="../assets/logo.png" alt="" @click="home">
      </div>
    </div>
  </div>
  <!-- 登录注册 -->
  <div class="login-gig">
    <!-- <img src="../assets/20200107145209.jpg" alt=""> -->
    <div class="login-djfnsb">
      <div class="login">
        <div class="log-top">
          <h1>欢迎登陆-红人带货</h1>
        </div>
        <div class="log-tabs">
          <el-tabs :rules="rules" v-model="activeName" @tab-click="handleTabChange">
            <el-tab-pane label="账号密码登陆" name="first">
              <el-form :label-position="labelPosition" :model="form1" :rules="rules" ref="form1">
                <el-form-item prop="phone">
                  <el-input v-model="form1.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                  <el-input type="password" v-model="form1.passWord" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="img-code-item" prop="tuxing">
                  <el-input v-model="form1.tuxing" placeholder="请输入图形验证码"></el-input>
                  <div class="img-code-box">
                    <!-- <canvas class="img-code__image" ref="imgCodeCanvas1"></canvas>
                    <span class="img-code__btn" @click="generateImgCode">换一张</span> -->
                     <img @click="getImg" class="verImg" :src="imgUrl">
                  </div>
                </el-form-item>
                <div class="jdsilvbi">
                  <span><router-link class="jbaibvisbfv" :to="{name:'registered'}">免费注册</router-link></span>
                  <span class="k89" @click="wangjimima = true">忘记密码？</span>
                </div>
                <div class="j852" v-c-throttle:1000.click="() => handleLogin('form1')">确 认 登 录</div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机验证登陆" name="second">
              <el-form :label-position="labelPosition" :model="form2" :rules="rules" ref="form2">
                <el-form-item prop="phone">
                  <el-input v-model="form2.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="yanzhengma">
                  <el-input v-model="form2.yanzhengma" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item class="img-code-item" prop="tuxing">
                  <el-input v-model="form2.tuxing" placeholder="请输入图形验证码"></el-input>
                  <div class="img-code-box">
                      <img @click="getImg" class="verImg" :src="imgUrl">
                    <!-- <canvas class="img-code__image" ref="imgCodeCanvas2"></canvas>
                    <span class="img-code__btn" @click="generateImgCode">换一张</span> -->
                  </div>
                </el-form-item>
                <div>
                  <span><router-link  class="jbaibvisbfv" :to="{name:'registered'}">免费注册</router-link></span>
                  <span class="k89" @click="wangjimima = true">忘记密码？</span>
                </div>
                <div class="j852" v-c-throttle:1000.click="() => handleLogin('form2')">确 认 登 录</div>
                <div v-show="verShow" class="t456" @click="huoqu">获取验证码</div>
                <div v-show="!verShow" class="t456"><span>{{timer}}</span>秒后重新获取</div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 忘记密码弹框 -->
      <el-dialog
        title="修改密码"
        :visible.sync="wangjimima"
        :width="dialogwidth"
        center>
        <!-- ----------------------------------------------------------- -->
        <div class="iagvibsvudvdsvd">
        <el-form :model="ruleForm" status-icon label-position=left :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="phone">
            <el-input type="phone" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input type="code" v-model="ruleForm.code" autocomplete="off" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input type="username" v-model="ruleForm.username" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="xingbie">
            <el-input type="xingbie" v-model="ruleForm.xingbie" autocomplete="off" placeholder="请输入性别"></el-input>
          </el-form-item> -->
          <el-form-item prop="province">
            <el-input type="province" v-model="ruleForm.province" autocomplete="off" placeholder="省"></el-input>
          </el-form-item>
          <el-form-item prop="city">
            <el-input type="city" v-model="ruleForm.city" autocomplete="off" placeholder="市"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="age">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="再次输入新密码"></el-input>
          </el-form-item> -->
          <el-form-item>
            <div class="ksjdbvfibsiv">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
                <div v-show="verShow" class="ttttt6" @click="huoqu1">获取验证码</div>
                <div v-show="!verShow" class="ttttt6"><span>{{timer}}</span>秒后重新获取</div>
        </el-form>
        </div>
        <!-- ----------------------------------------------------------- -->
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="wangjimima = false">取 消</el-button>
          <el-button type="primary" @click="wangjimima = false">确 定</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>
  <div class="com-section footer-box">
        <span class="company">杭州有蜜科技有限责任公司</span>
        <span>
      <a class="ijsiobvisb" href="http://www.beian.miit.gov.cn" target="_blank">备案号码：沪ICP备17053507号</a></span>
    </div>
</div>
</template>

<script>
// import { JSEncrypt } from 'jsencrypt'
import { MessageBox } from 'element-ui'
// import { getToken, encryptionPW, rememberPW, rememberForCheckUser, getRemembePW, deleteRememberPW } from '@/utils/auth'
import { getToken, encryptionPW } from '@/utils/auth'
import { wangjimima, fetchPhoneCode } from '@/api/user'
import { accountLogin, CodeLogin } from '@/api/login'
// import { tuxingyanzhengma } from '@/api/login'
// import generateImgCode from '@/utils/generate-img-code'
// import { log } from 'util'
// window.onresize = function () {
//   var offsetWid = document.documentElement.clientWidth
//   var offsetHei = document.documentElement.clientHeight
// }
export default {
  data () {
    return {
      imgUrl: '/zkurtg-red-api/public/captchaImage?timestamp=' + new Date(),
      // 忘记密码表单数据
      ruleForm: {
        phone: '',
        code: '',
        username: '',
        // xingbie: '',
        province: '',
        city: '',
        password: ''
      },
      activeName: 'first',
      wangjimima: false,
      dialogwidth: '',
      labelPosition: 'right',
      form1: {
        phone: '',
        password: '',
        tuxing: ''
      },
      form2: {
        phone: '',
        yanzhengma: '',
        tuxing: ''
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
    console.log(accountLogin)
    console.log(CodeLogin)
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
    // 获取图形验证码
    getImg () {
      this.imgUrl = '/zkurtg-red-api/public/captchaImage?timestamp=' + new Date()
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
    handleLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === 'form1') {
            this.denglu()
          } else {
            this.denglu1()
          }
        } else {
          this.generateImgCode()
        }
      })
    },
    denglu () {
      const obj = {
        username: this.form1.phone,
        password: encryptionPW(this.form1.passWord),
        captcha: this.form1.tuxing,
        type: 1
      }
      accountLogin(obj)
      // login({
      //   type: 1,
      //   phone: this.form1.phone,
      //   password: this.form1.passWord
      // }).then(data => {
      //   // console.log(data)
      //   // saveUserToLocation(data)
      //   setTimeout(() => {
      //     this.redirectAfterLoginSuccess()
      //   }, 200)
      // })
      // }
    },
    denglu1 () {
      let str = this.form2.phone + '_' + this.form2.yanzhengma + '_' + new Date().getTime()
      const obj = {
        username: this.form2.phone,
        password: encryptionPW(str),
        captcha: this.form2.tuxing,
        type: 2
      }

      this.$axios.put('/zkurtg-red-api/rtg/portalLogin', obj).then(res => {
        console.log(res)
      })
      CodeLogin(obj)
      // this.$axios({
      //   method: 'post',
      //   url: '/api/user/login',
      //   params: {
      //     type: 2,
      //     phone: this.form2.phone,
      //     password: this.form2.yanzhengma
      //   }
      // }).then(res => {
      //   if ((res.data.code) === '10000') {
      //     const data = res.data.data
      //     // console.log('这是用户信息')
      //     console.log(data)
      //     // saveUserToLocation({
      //     //   token: data.token,
      //     //   userType: data.usertype,
      //     //   state: data.state,
      //     //   userId: data.id,
      //     //   username: data.username,
      //     //   paymentstate: data.paymentstate
      //     // })
      //     // console.log(data.username)
      //     // 影藏登陆模态框
      //     // console.log(res.data.msg)
      //     // Message('登录' + res.data.msg)
      //     MessageBox('登录' + res.data.msg)
      //     this.redirectAfterLoginSuccess()
      //   } else {
      //     MessageBox(res.data.msg)
      //     this.generateImgCode() // 重新获取验证码
      //   }
      // })
    },
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
        fetchPhoneCode({
          phone: phone,
          type: 4
        }).then(data => {
          this.password = data.code
          this.$message({
            message: '手机验证码已发送成功',
            type: 'success'
          })
        })
      }
    },
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
        fetchPhoneCode({
          phone: phone,
          type: 1
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
.ijsiobvisb {
    color:rgba(164,164,164,1);
}
.login-djfnsb {
  margin: 0 auto;
  width: 1200px;
  height: 100%;
}
.ksjdbvfibsiv {
  width: 200px;
  height: 100%;
  margin: 0 auto;
}
.dialog-footer {
  // text-align: center;
  margin: 0 auto;
}
.container {
  width: 100%;
  height: 100%;
  background-color: rgba(245,245,245,1);
  .com-section
  {
    // background-color: rgba(245,245,245,1);
    // 顶部栏
    &.navbar {
      background:rgba(242,242,242,1);
      border:1px solid rgba(229,229,229,1);
      height: 33px;
      .menu {
        line-height: 33px;
        font-size: 14px;
        float: right;
        line-height: 33px;
        font-size: 14px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color: rgba(187,187,187,1);
        vertical-align: middle;
        text-decoration: none;
        margin-left: 20px;
        .menu__item {
          line-height: 33px;
          font-size: 14px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color: rgba(187,187,187,1);
          vertical-align: middle;
          text-decoration: none;
          margin-left: 20px;
        }
      }
    }
    &.search {
      background: #ffffff;
      .logo {
        width: 330px;
        width: 300px;
        height: 90px;
        height: 105px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .search-wrap {
        display: flex;
        align-items: center;
      }
    }
  }
}
.login-gig {
  width: 100%;
  float: right;
  // height: 800px;
  // background:url("../assets/20200107145209.jpg") 100% 100% no-repeat;
  background-image: url('../assets/20200107145209.jpg');
  img {
    width: 100%;
    height: 100%;
  }
  .login {
    width: 500px;
    background-color: #ffffff;
    // margin-bottom: 300px;
    // margin-top: 300px;
    // float: right;
    flex: 1;
    float: right;
    margin: 200px 0;
    .log-top {
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    .log-tabs {
      margin: 0 70px;
    }
  }
}
.footer-box {
  display: flex;
  align-items: center;
  justify-content: center;
  .company {
    margin-right: 84px;
  }
}

.com-section.test {
  .test-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    width: 200px;
    height: 350px;
    background-color: #FE3A60;
  }
}
.footer-box {
    width: 100%;
    height: 90px;
    // background:rgba(40,40,40,1);
    background-color: #282828;
    color:rgba(164,164,164,1);
  }
  .zhanghaoyanzhengma {
    width: 120px;
    height: 40px;
    border: 1px soild #e3e3e3;
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
  .l356 {
    float: right;
    width: 125px;
    height: 40px;
    background-color: aqua;
  }
  .k89 {
    // font-size: 20px;
    font-size: 18px;
    float: right;
  }

  .jbaibvisbfv {
    font-size: 18px;
  }
  .j852 {
    font-size: 18px;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: 20px;
    margin-bottom: 60px;
    border-radius: 5px;
    color: #fff;
    background-color: #FE3A60;
  }
  .t456 {
    width: 120px;
    height: 40px;
    background-color: #e3e3e3;
    position: absolute;
    top: 62px;
    right: 0px;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
  }
  .ttttt6 {
    width: 120px;
    height: 40px;
    background-color: #e3e3e3;
    position: absolute;
    top: 142px;
    right: 26px;
    text-align: center;
    line-height: 40px;
  }

// 图形验证码
.img-code-item {
  .el-input {
    width: 237px;
  }
}
// 移动版 媒体查询
@media screen and (max-width: 800px) {
  .container {
    width: device-width;
  }
  .ttttt6 {
    width: 120px;
    height: 40px;
    background-color: #e3e3e3;
    position: absolute;
    top: 155px;
    right: 26px;
    text-align: center;
    line-height: 40px;
  }

  // &width: device-width;
  .navbar {
    display:none;
  }
  .container .com-section.search .logo {
    // text-align: center;
    margin: 0 auto;
  }
  .container .com-section.search .search-wrap {
    width: 100vw;
    margin-top: 20px;
  }
  .login-gig {
    width: 100vw;
    height: 100%;
    background-image: none;
    float: none;
    .login {
        width: 100vw;
      background-color: #ffffff;
      // height: 100vh;
      flex: 1;
      float: none;
      margin: 0;
      .log-top {
        // text-align: center;
        margin: 0 auto;
        h1 {
        font-size: .8rem;
        // text-align: center;
        }
      }
      .log-tabs {
        width: 9.333333rem;
        // height: 100vh;
        // padding: 1.5rem;
        // box-sizing: border-box;
        margin: 0 auto;
      }
    }
  }

// 图形验证码
.img-code-item {
  .el-input {
    width: 100%;
  }
}
  .k89 {
    // font-size: .266667rem;
  }
  .login-djfnsb {
  margin: 0 auto;
  width: 100vw;
  height: 100%;
}
.ttttt6 {
  font-size: .24rem;
}
.footer-box {
    width: 100%;
    height: 1.2rem;
    font-size: .24rem;
    // background:rgba(40,40,40,1);
    background-color: #282828;
    color:rgba(164,164,164,1);
    position:fixed;
    bottom: 0;
    z-index: 999;
  }
}
</style>

<style lang="less">
.iagvibsvudvdsvd {
  .el-form-item__content {
    .element.style {
    margin-left: 0;
    }
  }
}
.log-tabs {
  .el-tabs__item {
    float: left;
    margin: 0 30px;
  }
  .el-tabs__active-bar{
    background-color: #e3e3e3;
  }
  .el-tabs__item:hover {
    color: #FE3A60;
  }
  .el-tabs__item.is-active {
        color: red;
  }

}
.l56 {
  .el-input__inner {
    display: inline-block;
    width: 150px;
    border-right: none;
  }
}
// 图形验证码
.img-code-item {
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
  // .jbaibvisbfv {
  //   font-size: ;
  // }
  .hjkbskvhbsibfv {
    float: left;
  }
  .jdsilvbi {
    a {
      display: none;
    }
  }
  .jsdjvbs {
    font-size: .24rem;
  }

  .k89 {
    // font-size: 20px;
    font-size: 18px;
    // float: right;
    display: inline;
    margin-right: 0;
  }
}
.el-dialog {
  width: 100%;
}
@media screen and (max-width: 800px) {
  .img-code-item{
    width: 100%;
    height: 40px;
    position: relative;
    .img-code-box {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .login-djfnsb {
    .el-dialog {
      width: 100%;
    }
    .el-tabs__nav {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
    }
    .log-tabs .el-tabs__item.is-active {
      float: left;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child {
      float: right;
    }
    .log-tabs .el-tabs__item {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
