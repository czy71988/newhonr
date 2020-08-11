<template>
<!-- 注册页 -->
<div class="zhuce">
  <div class="zhuce-1">
    <div class="zhuce-heared">
      <p>欢迎注册</p>
    </div>
  </div>
  <div class="zhuce-2">
    <div class="tabs">
      <div class="tabs__nav">
        <!-- {{id}}tole -->
        <el-radio class="tabs__nav-item" v-model="activedTabName" label="favoritor">我是红人</el-radio>
        <el-radio class="tabs__nav-item" v-model="activedTabName" label="store">我是商家</el-radio>
      </div>
      <div class="tab-panel" >
        <register-hr v-model="regStepIndex" v-if="activedTabName === 'favoritor'" :id="id"></register-hr>
        <register-store v-model="regStepIndex" v-else :id="id"></register-store>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import RegisterHr from '@/components/register/HongRen.vue'
import RegisterStore from '@/components/register/Store.vue'
import { createTempId } from '@/api/user'
export default {
  name: 'Register',
  components: {
    RegisterHr,
    RegisterStore
  },
  data () {
    return {
      id: '', // 用于上传图片
      activedTabName: 'store',
      // activedTabName: 'favoritor',
      regStepIndex: 1 // 注册步骤
    }
  },
  created () {
    this.createTempId()
  },
  watch: {
    activedTabName () {
      // 每次切换回到注册第一步
      this.regStepIndex = 1
    }
  },
  methods: {
    createTempId () {
      if (this.id) return
      createTempId().then(data => {
        console.log('创建id' + JSON.stringify(data))
        // console.log(data)
        this.id = data
      })
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
.tabs {
  .tabs__nav {
    .tabs__nav-item {
      .el-radio__input.is-checked+.el-radio__label {
        color: rgba(50,51,52,1);
      }
      .el-radio__input.is-checked .el-radio__inner {
        border-color: #FF4459;
        background: #FF4459;
      }
    }
  }
}

</style>

<style lang="less" scoped>
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
  width: 1187px;
  height: 100%;
  padding: 50px 207px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e3e3e3;
  margin-top: 50px;
}
.zhuce-1 {
  width: 618px;
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

.tabs {
  .tabs__nav {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 26px 0px;
    padding-bottom: 50px;
    .tabs__nav-item {
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(50,51,52,1);
      &:last-child {
        // margin-left: 187px;
        margin-left: 107px;
      }
      .el-radio__input.is-checked+.el-radio__label {
        color: rgba(50,51,52,1);
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .zhuce {
    width: 100vw;
    padding: 50px 0;
  }
  .zhuce-1 {
    width: 100%;
  }
  .zhuce-heared {
    width: 100%;
  }
  .zhuce-heared p {
    width: 100%;
    text-align: center;
  }
}

</style>
