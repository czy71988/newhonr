<!-- 商家用户 我的信息 -->
<template>
<div class="page update-pwd-page">
  <div class="page-bd">
    <div class="content">
      <div class="content-top">
        <el-form ref="form" :model="form" label-width="110px" :rules="rules">
          <el-form-item label="请输入原密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="包含一位大写字母+数字,不包含特殊字符"></el-input>
          </el-form-item>
          <el-form-item label="请输入手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="输入当前手机号"></el-input>
          </el-form-item>
          <el-form-item class="code-box" label="请输入验证码" prop="yanzhemgma">
            <el-input v-model="form.code" placeholder="输入验证码"></el-input>
            <span class="code-btn" v-show="verShow" @click="handleGetCode">获取验证码</span>
            <span class="code-btn remain-time" v-show="!verShow">{{timer}}s</span>
          </el-form-item>
          <el-form-item label="请输入新密码" prop="xpwd">
            <el-input type="password" v-model="form.xpwd" placeholder="包含一位大写字母+数字,不包含特殊字符"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="comfirmPwd">
            <el-input type="password" v-model="form.comfirmPwd" placeholder="包含一位大写字母+数字,不包含特殊字符"></el-input>
          </el-form-item>
          <div class="btn-group">
            <button class="btn" @click="handleUpdatePwd('form')">确定修改密码</button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { updatePassword, fetchPhoneCode } from '@/api/user'
// import { getUserId } from '@/utils/auth'
export default {
  data () {
    let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
    var validateNewPwd = (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error('密码应是6-12位数字+字母组合！'))
      } else if (this.form.password === value) {
        callback(new Error('新密码与旧密码不可一致！'))
      } else {
        callback()
      }
    }
    var validateComfirmPwd = (rule, value, callback) => {
      if (this.form.xpwd !== value) {
        callback(new Error('确认密码与新密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        phone: '',
        code: '',
        xpwd: '',
        comfirmPwd: ''
      },
      verShow: true,
      timer: 60,
      rules: {
        password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            required: true,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的身份证号码',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        xpwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        comfirmPwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validateComfirmPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleUpdatePwd (form) {
      console.groupEnd()
      this.$refs[form].validate(valid => {
        if (valid) {
          updatePassword({
            password: this.form.password,
            phone: this.form.phone,
            code: this.form.code,
            xpwd: this.form.xpwd
            // comfirmPwd: this.form.comfirmPwd
          }).then(data => {
            console.log(data)
            console.groupEnd()
            if (data.success) {
              // console.log('失败了')
              alert('修改密码失败')
            } else {
              alert('修改密码成功')
              this.form = { brand_right: 0 }
            }
          })
        }
      })
    },
    // 获取验证码
    handleGetCode () {
      // 倒计时
      if (this.form.phone === '' || null) {
        this.$message({
          message: '手机手机号为空',
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
      const { phone } = this.form
      fetchPhoneCode({
        type: 3,
        phone: phone
      }).then(data => {
        this.$message({
          message: '手机验证码已发送成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="less">
.update-pwd-page {
  .el-form-item__label {
    font-size: 12px;
    font-weight: 700;
  }
  .el-input__inner {
    &::placeholder {
      font-size: 12px;
    }
  }
  .code-box {
    .el-input {
      .el-input__inner {
        // width: calc(100% - 120px);
      }
      width: calc(100% - 100px);
      min-width: 80px;
      // margin-right: 10px;
    }
  }
}
</style>

<style lang="less" scoped>
.page {
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 5px;
  .page-bd {
    border-radius: 10px;
    padding: 20px 5px;
    background-color: #ffffff;
  }
  .code-box {
    .code-btn {
      text-align: center;
      width: 80px;
      height: 38px;
      border-radius: 4px;
      top: 1px;
      right: 0;
      position: absolute;
      font-size: 14px;
      text-align: center;
      line-height: 38px;
      color: #545454;
      background-color: #ededed;
      &.remain-time {
        color: #ff4459;
      }
    }
  }
  .btn-group {
    text-align: center;
    .btn {
      width:140px;
      height:35px;
      line-height: 35px;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      background-color: #fe336a;
      color:#fff;
      line-height:20px;
      letter-spacing: 2px;
      border-radius: 4px;
    }
  }
}
.conent-xiugaihandleUpdatePwd {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 200px;
  box-sizing: border-box;
  .content {
    margin-left: 30px;
    .content-top {
      .shangjiaxiugaihandleUpdatePwd {
        position: relative;
        .yanzhengma {
          width: 100px;
          height: 38px;
          top: 1px;;
          right: 0px;
          position: absolute;
          font-size: 14px;
          text-align: center;
          line-height: 38px;
          color: #545454;
          background-color: #ededed;
        }
      }
    }
  }
}
</style>
