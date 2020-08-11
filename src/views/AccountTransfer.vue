<template>
  <div class="account-transfer">
    <div class="com-section nav-box">
      <div class="com-section__bd">
        <router-link :to="{name: 'accountBuy'}" class="nav-btn">我要求购</router-link>
        <router-link :to="{name: 'accountSale'}" class="nav-btn">我要出售</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'AccountTransfer'
}
</script>

<style lang="less" scoped>
.account-transfer {
  width: 100%;
  .com-section {
    .com-section__bd {
      width: 1190px;
    }
    &.nav-box {
      margin-top: 20px;
    }
  }

  .nav-box {
    .nav-btn {
      display: inline-block;
      width:110px;
      height:36px;
      line-height: 36px;
      text-align: center;
      text-decoration: none;
      // background:rgba(255,67,90,1);
      background:rgba(255,255,255,1);
      border-radius:2px;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:#333333;
      margin-right: 10px;
    }
    .router-link-active {
      background:rgba(255,67,90,1);
      color: #ffffff;
    }
  }
}
</style>
