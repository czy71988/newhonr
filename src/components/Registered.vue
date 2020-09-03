<template>
  <div class="re_zhuce">
    <div class="re_zhuce_top">
      <img @click="goback" src="../assets/new/组 54@2x.png" alt="">
      <p class="p_name">欢迎注册</p>
    </div>
    <div class="tab-panel" >
      <p class="p_xuanze">
        <span :class="index === 1 ? 'span1' : ''" @click="active1">我是红人</span>
        <span :class="index === 2 ? 'span1' : ''" @click="active2">我是商家</span>
      </p>
      <register-hr v-if="index === 1"></register-hr>
      <register-store v-else></register-store>
    </div>
  </div>
</template>

<script>
import RegisterHr from '@/components/register/HongRen.vue'
import RegisterStore from '@/components/register/Store.vue'
export default {
  name: 'Register',
  components: {
    RegisterHr,
    RegisterStore
  },
  data () {
    return {
      index: 1
    }
  },
  methods: {
    active1 () {
      this.index = 1
    },
    active2 () {
      this.index = 2
    },
    goback () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
  .re_zhuce {
    width: 100vw;
    .re_zhuce_top {
      img {
        height: 76px;
        float: left;
        position: absolute;
        margin-top: 35px;
        margin-left: 165px;
      }
      .p_name {
        font-size:24px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:105px;
        color:rgba(126,126,126,1);
        opacity:1;
        padding-top: 25px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(226,226,226,1);
        // float: left;
        text-align: center;
      }
    }
    .tab-panel {
      width: 398px;
      margin: auto;
      .p_xuanze {
        padding: 10px 40px;
        box-sizing: border-box;
        line-height: 65px;
        font-size:18px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(126,126,126,1);
        opacity:1;
        border-bottom: 1px solid #DCDFE6;
        margin-bottom: 20px;
        .span1 {
          color:rgba(232,37,29,1);
        }
        span {
          display: inline-block;
          height: 65px;
          width: 50%;
        }
        span:nth-child(1) {
          text-align: left;
        }
        span:nth-child(2) {
          text-align: right;
        }
      }
    }
  }
</style>
