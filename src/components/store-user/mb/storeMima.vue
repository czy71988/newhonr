<!-- 商家用户 我的信息 -->
<template>
      <div class="content-top">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-form-item label="请输入原密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="字母+数字，包含一位大写字母，不包含特殊字符号"></el-input>
          </el-form-item>
          <el-form-item label="请输入手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="输入当前手机号"></el-input>
          </el-form-item>
          <div class="shangjiaxiugaimima">
            <el-form-item label="请输入验证码" prop="yanzhemgma">
              <el-input v-model="form.code" placeholder="输入验证码"></el-input>
            </el-form-item>
            <div v-show="verShow" class="yanzhengma" @click="getcode">获取验证码</div>
            <div v-show="!verShow" class="yanzhengma"><span>{{timer}}</span>秒后重新获取</div>
          </div>
          <el-form-item label="请输入新密码" prop="xpwd">
            <el-input type="password" v-model="form.xpwd" placeholder="字母+数字，包含一位大写字母，不包含特殊字符号"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码" prop="comfirmPwd">
            <el-input type="password" v-model="form.comfirmPwd" placeholder="字母+数字，包含一位大写字母，不包含特殊字符号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="mima('form')">确定修改密码</el-button>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>
import { updatePassword, fetchPhoneCode } from '@/api/user'
// import { getUserId } from '@/utils/auth'
export default {
  data () {
    let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
    var validateNewPwd = (rule, value, callback) => {
      if (this.form.password === value) {
        callback(new Error('新密码与旧密码不可一致！'))
      } else {
        callback()
      }
    }
    var validateComfirmPwd = (rule, value, callback) => {
      if (!reg.test()) {
        callback(new Error('密码应是6-12位数字、字母或字符！'))
      } else if (this.form.xpwd !== value) {
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
    mima (form) {
      updatePassword(this.form).then(data => {
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
    },

    // 获取验证码
    getcode () {
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
      const { phone } = this.form
      // 获取验证码
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
.conent-xiugaimima {
  .el-button--primary {
    background-color: #fd3269;
    border-color: #fd3269;
  }
  .shangjiaxiugaimima {
    // width: 424px;

  }
}
</style>

<style lang="less" scoped>
.content-top {
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  .shangjiaxiugaimima {
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
</style>
