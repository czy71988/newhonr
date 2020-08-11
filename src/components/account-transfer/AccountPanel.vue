<!-- 我要购买账号面板 -->
<template>
  <div class="account-panel">
    <div class="account-panel__header">
      <p>账号标题账号标题账号标题账号标题账号标题账号标题</p>
      <div class="account-panel__row">
        <div class="left">
          <div class="account-panel__icon"></div>
        </div>
        <div class="right">
          <span class="account-panel__tag">搞笑娱乐</span>
        </div>
      </div>
      <div class="account-panel__row">
        <div class="left">
          <div class="account-panel__price">$9999.99</div>
        </div>
        <div class="right">
          <span class="account-panel__avg-price"><label class="account-panel__avg-price-label">单粉均价</label> $9.99</span>
        </div>
      </div>
    </div>
    <div class="account-panel__body">
      <div class="account-panel__item item-1">
        <span class="content">12.30w</span>
        <span class="title">粉丝数量</span>
      </div>
      <div class="account-panel__item item-2">
        <span class="content">个人认证</span>
        <span class="title">认证主体</span>
      </div>
      <div class="account-panel__item item-3">
        <span class="content">男女均衡</span>
        <span class="title">粉丝偏向</span>
      </div>
      <div class="account-panel__item item-4">
        <span class="content">2018</span>
        <span class="title">注册时间</span>
      </div>
    </div>
    <div class="account-panel__footer">
      <button class="account-panel__btn" @click="submitDialogVisible=true">立即咨询</button>
    </div>
    <!-- 提交模态框 -->
    <!--  -->
    <el-dialog class="submit-dialog" :visible.sync="submitDialogVisible"
      title="亲，您还未登录" center width="350px" :show-close="false" v-if="!token">
      <div style="text-align:center"><span>登录之后就可以咨询了哦</span></div>
      <span slot="footer">
       <el-button class="" type="primary" @click="submitDialogVisible = false">好的</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AccountPanel',
  data () {
    return {
      submitDialogVisible: false,
      token: localStorage.getItem('token')
    }
  },
  props: {
    account: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    lijizixun: function () {

    }
  }
}
</script>

<style lang="less" scoped>
.account-panel {
  width: 350px;
  box-sizing: border-box;
  border: 1px solid gray;
  .account-panel__header {
    box-sizing: border-box;
    padding: 4px;
    width: 100%;
    border-bottom: 1px solid #000;
  }
}

.account-panel {
  .account-panel__body, .account-panel__footer {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
  }
  .account-panel__row {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @iconW: 35px;
    .account-panel__icon {
      width: @iconW;
      height: @iconW;
      background-color: #000;
    }

    .account-panel__tag {
      height: 30px;
      line-height: 30px;
      background-color: gray;
      border-radius: 4px;
      padding: 3px 10px;
      color: #ffffff;
    }

    .account-panel__price, .account-panel__avg-price {
      color: red;
    }

    .account-panel__avg-price-label {
      color: #000;
    }

  }

  .account-panel__btn {
    width: 100%;
    height: 40px;
    outline: none;
    border: none;
    background-color: rgb(240, 107, 107);
    color: #ffffff;
    border-radius: 4px;
    margin-top: 30px;
  }

  .account-panel__item {
    float: left;
    box-sizing: border-box;
    width: 50%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    &.item-1, &.item-2 {
      border-bottom: 1px solid gray;
      .title {
        margin-bottom: 30px;
      }
    }
    &.item-1, &.item-3 {
      border-right: 1px solid gray;
    }
    &.item-3, &.item-4 {
      .content {
        margin-top: 30px;
      }
    }

    .title {
      color: gray;
    }

    .content {
      font-weight: 400;
    }
  }
}
</style>
