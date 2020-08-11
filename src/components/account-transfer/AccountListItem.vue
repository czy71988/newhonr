<!-- 我要购买账号面板 -->
<template>
  <li class="account-panel">
    <div class="line"></div>
    <div class="account-panel__header">
      <div class="account-panel__row category-box-wrap">
        <img class="account-panel__icon" :src="item.platform | platformLogoFilter"/>
        <span class="account-panel__tag">{{item.contentstate | contentCategoryFilter}}</span>
      </div>
      <p class="account-panel__title">{{item.userTitle}}</p>
      <div class="account-panel__row">
        <div class="left">
          <div class="account-panel__price">¥{{item.price}}</div>
        </div>
        <div class="right">
          <span class="account-panel__avg-price"><label class="account-panel__avg-price-label">单粉均价</label> ¥{{item.avgPrice || '--'}}</span>
        </div>
      </div>
    </div>
    <div class="account-panel__body">
      <div class="account-panel__item item-1">
        <span class="content">{{item.fansnumber || '--'}}</span>
        <span class="title">粉丝数量</span>
      </div>
      <div class="account-panel__item item-2">
        <span class="content">{{item.authenticationstate | authBodyFilter}}</span>
        <span class="title">认证主体</span>
      </div>
      <div class="account-panel__item-line"></div>
      <div class="account-panel__item item-3">
        <span class="content">{{item.deviationstate | fansFavoriteFilter}}</span>
        <span class="title">粉丝偏向</span>
      </div>
      <div class="account-panel__item item-4">
        <span class="content">{{item.registerTime || '--'}}</span>
        <span class="title">注册时间</span>
      </div>
    </div>
    <button class="account-panel__btn">
      <img class="icon" src="@/assets/speak.png" alt="">
      <span>立即咨询</span>
    </button>
    <!-- <button class="account-panel__btn" @click="submitDialogVisible=true">立即咨询</button> -->
    <!-- 提交模态框 -->
    <!--  -->
    <el-dialog class="submit-dialog" :visible.sync="submitDialogVisible"
      title="亲，您还未登录" center width="350px" :show-close="false" v-if="!token">
      <div style="text-align:center"><span>登录之后就可以咨询了哦</span></div>
      <span slot="footer">
       <el-button class="" type="primary" @click="submitDialogVisible = false">好的</el-button>
      </span>
    </el-dialog>
  </li>
</template>

<script>
import { fansFavoriteData } from '@/data/common'
import ksLogo from '@/assets/logo-ks.jpg'
export default {
  name: 'AccountListItem',
  data () {
    return {
      submitDialogVisible: false,
      token: localStorage.getItem('token'),
      fansFavoriteData,
      ksLogo
    }
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
  },
  methods: {
    lijizixun: function () {
    }
  }
}
</script>

<style lang="less" scoped>
.account-panel {
  position: relative;
  width: 290px;
  height: 352px;
  box-sizing: border-box;
  background:rgba(255,255,255,1);
  .line {
    width: 100%;
    height:8px;
    background:linear-gradient(90deg,rgba(244,181,63,1) 0%,rgba(255,68,89,1) 100%);
  }
  .account-panel__header {
    box-sizing: border-box;
    padding:0px 21px 0px 21px;
    width: 100%;
    border-bottom: 1px solid #F2F2F2;
  }
}

.account-panel {
  .account-panel__body {
    width: 100%;
    box-sizing: border-box;
    // padding: 5px;
  }
  .account-panel__title {
    font-size:16px;
    font-family:PingFang-SC-Bold,PingFang-SC;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:18px;
    text-align: justify;
    overflow: hidden;
    line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .account-panel__row {
    margin: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @iconW: 20px;
    .account-panel__icon {
      width: @iconW;
      height: @iconW;
      background-color: #000;
      margin-right: 16px;
    }

    &.category-box-wrap {
      align-items: center;
      justify-content: flex-end;
    }

    .account-panel__tag {
      height: 30px;
      line-height: 30px;
      background-color: gray;
      border-radius: 4px;
      padding: 3px 10px;
      color: #ffffff;
      width:68px;
      height:17px;
      line-height: 17px;
      background:rgba(252,238,237,1);
      border-radius:9px 9px 9px 9px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(199,66,77,1);
      text-align: center;
    }

    .account-panel__price, .account-panel__avg-price {
      color: red;
    }

    .account-panel__price {
      font-size:18px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(254,58,96,1);
    }

    .account-panel__avg-price {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(254,58,96,1);
    }

    .account-panel__avg-price-label {
      color: #000;
    }

  }
  .btn-wrap {
    width: 100%;
    text-align: center;
  }

  .account-panel__btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    outline: none;
    border: none;
    background-color: rgb(240, 107, 107);
    color: #ffffff;
    border-radius: 4px;
    width:236px;
    height:32px;
    background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
    border-radius:4px;
    @iconW: 17px;
    .icon {
      width: @iconW;
      height: @iconW;
      line-height: 17px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 4px;
    }
    span {
      height: 16px;
      line-height: 16px;
      vertical-align: middle;
      display: inline-block;
      font-size:16px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,255,255,1);
    }
  }
  .account-panel__item-line {
    width: 230px;
    margin-left: 23px;
    height: 1px;
    float: left;
    background-color: #F2F2F2;
  }
  .account-panel__item {
    float: left;
    box-sizing: border-box;
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    &.item-1, &.item-2 {
      // border-bottom: 1px solid #F2F2F2;
      .title {
        margin-top: 3px;
      }
      .content {
        margin-top: 15px;
      }
    }
    &.item-1, &.item-3 {
      border-right: 1px solid #F2F2F2;
    }
    &.item-3, &.item-4 {
      border-bottom: 1px solid #F2F2F2;
      .content {
        margin-top: 16px;
      }
      .title {
        margin-top: 3px;
      }
    }

    .title {
      color: gray;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(148,148,148,1);
    }

    .content {
      font-weight: 400;
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
  }
}
</style>
