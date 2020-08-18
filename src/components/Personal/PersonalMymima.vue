<template>
  <div class="honrmima">
    <p class="p_top">修改密码</p>
    <div class="content9">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
        <el-form-item label="请输入原密码" prop="oldLoginPwd">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="请输入手机号码" prop="name1">
          <el-input v-model="ruleForm.name1"></el-input>
        </el-form-item>
        <el-form-item label="请输入验证码" prop="name2">
          <el-input placeholder="请输入内容" v-model="ruleForm.name2" class="input-with-select">
            <el-button slot="append" @click="countDown">{{content}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="name3">
          <el-input v-model="ruleForm.name3"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="name4">
          <el-input v-model="ruleForm.name4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" round>确定修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        oldLoginPwd: '',
        name1: '',
        name2: '',
        name3: '',
        name4: ''

      },
      rules: {
        oldLoginPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, max: 5, message: '字母+数字，包含一位大写字母，不包含特殊字符号', trigger: 'blur' }
        ],
        name1: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 3, max: 5, message: '请输入当前手机号', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        name3: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, max: 5, message: '字母+数字，包含一位大写字母，不包含特殊字符号', trigger: 'blur' }
        ],
        name4: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 3, max: 5, message: '字母+数字，包含一位大写字母，不包含特殊字符号', trigger: 'blur' }
        ]
      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      canClick: true
    }
  },
  methods: {
    countDown () {
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
    }
  }
}
</script>

<style lang="less" scoped>
  .honrmima {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .p_top {
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      line-height:64px;
      color:rgba(85,85,85,1);
      opacity:1;
      border-bottom: 1px solid rgba(208,208,208,1);
      padding-left: 30px;
      box-sizing: border-box;
    }
    .content9 {
      padding: 60px 278px;
      box-sizing: border-box;
    }
  }
</style>
