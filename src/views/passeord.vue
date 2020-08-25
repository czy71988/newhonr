<template>
  <div class="ciu_passeord">
    <img src="../assets/new/组 54@2x.png" alt="">
    <div class="content">
      <p class="p_top">重置密码</p>
      <p class="p">手机号</p>
      <el-input v-model="from.phone" placeholder="请输入内容"></el-input>
      <p class="p">验证码</p>
      <el-input placeholder="请输入内容" class="input-with-select" v-model="from.yanzheng">
        <el-button slot="append" @click="countDown">{{content}}</el-button>
      </el-input>
      <p class="p">请输入新密码</p>
      <el-input v-model="from.neweorf" placeholder="请输入内容" show-password></el-input>
      <p class="p">请再次输入新密码</p>
      <el-input v-model="from.newword1" placeholder="请输入内容" show-password></el-input>
      <button class="btn" @click="wancheng">完成</button>
    </div>
  <p class="footer">
    <span>浙江中快网络科技有限公司</span>
    <span>备案号码：沪ICP备17053507号</span>
  </p>
  </div>
</template>

<script>
import { changepasswordApi } from '../api/login'
import { encryptionPW } from '@/utils/auth'
export default {
  data () {
    return {
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      canClick: true,
      from: {
        phone: '',
        yanzheng: '',
        neweorf: '',
        newword1: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    countDown () {
      // if (this.from.phone === '' || this.from.phone === null) {
      //   this.$message({
      //     message: '请输入手机号码',
      //     type: 'warning',
      //     center: true
      //   })
      // } else {
      this.$axios.get('/zkurtg-red-api/public/captchaImageByPhone?phone=' + this.from.phone).then((response) => {
        console.log(response.data)
        this.$message({
          message: '验证码发送成功',
          type: 'success'
        })
      })
      // }
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
    wancheng () {
      console.log('修改密码')
      changepasswordApi({
        loginName: this.from.phone,
        loginPwd: encryptionPW(this.from.neweorf),
        captcha: this.from.yanzheng
      }).then(data => {
        console.log('请求成功', data)
        this.from = {
          phone: '',
          yanzheng: '',
          neweorf: '',
          newword1: ''
        }
        this.$message({
          message: '修改密码成功',
          type: 'success'
        })
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ciu_passeord {
  width: 100vw;
  height: 100vh;
  background:rgba(255,255,255,1);
  opacity:1;
  text-align: center;
  background: url('../assets/new/组 732@2x.png');
  background-size: 100% 100%;
  img {
    height: 68px;
    margin: 20px 0 ;
  }
  .content {
    width:605px;
    padding: 60px 120px;
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 6px rgba(231,31,23,0.18);
    opacity:1;
    border-radius:10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .p_top {
      font-size:21px;
      font-family:PingFang SC;
      font-weight:400;
      // line-height:29px;
      color:rgba(0,0,0,1);
      opacity:1;
      text-align: center;
    }
    .p {
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:64px;
      color:rgba(102,102,102,1);
      opacity:1;
      text-align: left;
    }
    .btn {
      width:257px;
      height:51px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:51px;
      color:rgba(255,255,255,1);
      opacity:1;
      text-align: center;
      // margin: auto;
      margin-left: 50%;
      margin-top: 60px;
      transform: translateX(-50%);
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
