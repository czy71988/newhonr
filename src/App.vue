<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// import { getWxJsTicket } from '@/api/common'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  created () {
    // this.getWxJsTicketAndAuth()
  },
  watch: {
    $route () {
      this.updateShareData()
    }
  },
  methods: {
    // getWxJsTicketAndAuth () {
    //   let index = 0
    //   getWxJsTicket({}, false).then(data => {
    //     // console.group('获取js ticket')
    //     // console.log(data)
    //     // console.groupEnd()
    //     this.authWxConfig(data)
    //   }).catch(() => {
    //     if (index > 5) return
    //     const timeId = setTimeout(() => {
    //       this.getWxJsTicketAndAuth()
    //       clearTimeout(timeId)
    //     }, 1000 * 60 * ++index)
    //   })
    // },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    updateShareData (shareData = {}) {
      this.$wx.updateShareData(shareData)
    },
    authWxConfig ({ appid, ticket }) {
      // const jsapiTicket = 'HoagFKDcsGMVCIY2vOjf9j83UfL7YRaTLS4WOV685cgU4Q09UlmlYFloawQRDes0ICtqn8uZoIEgYJyGCC07yw'
      this.$wx.authConfig({
        appId: appid
      }, ticket)
    }
  }
}
</script>

<!-- common css -->
<style lang="less">
// #app {
//   font-size: calc(100vw/7.5);
// }
.overflow-hiden {
  position: fixed;
  overflow: hidden;
  top: 0px;
  left: 0px;
  width: 100%;
}
// @bdW: 1186px;
.com-section {
  width: auto;
  background-color: rgba(245,245,245,1);
  // padding-bottom: 120px;
  .com-section__bd {
    // width: @bdW;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
}

// .router-link-active {
//   background:rgba(225,32,57,1);
//   height: 100%;
// }
</style>

<!-- 覆盖elementui css -->
<style lang="less">
.el-popper .popper__arrow::after {
  display: none !important;
  border-bottom-color: #f5f5f5;
  // top: 0
}
#search .search-input {
  width:625px;
  border:2px solid rgba(254,58,96,1);
  height: 40px;
  &.el-input-group {
    width: 625px;
  }
  .el-input-group__prepend {
    width: 76px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(108,108,108,1);
    border-radius: 0;
  }
  .el-input-group__append button {
    box-sizing: border-box;
    width: 132px;
    height:100%;
    background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
    border-radius: 0;
    margin-right: -22px;
    margin-top: 0;
    margin-bottom: 0;
    &:hover {
      background:linear-gradient(90deg,rgb(199, 76, 111) 0%,rgb(197, 74, 88) 100%);
    }
  }
  .el-input-group__append {
    height: 100%;
    height: 40px;
    color: #ffffff;
    border:none;
    border-radius: 30px;
  }
  .el-input.is-active .el-input__inner, .el-input__inner:hover {
    border: none;
  }
  .el-input__inner:focus {
    border: none;
  }
  .el-input__inner  {
    border: none;
  }
}

// 广告轮播
#banner {
  position: relative;
  .banner-placement-img {
    width: 100%;
    height: 100%;
    visibility: hidden;
  }
  .el-carousel__container {
    width: 100%;
    height: 100%;
    .banner-img-wrap {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .el-carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
}

// 分页
// .pagination {
//   &.el-pagination.is-background{
//     .el-pager li {
//       background-color: #ffffff;
//       margin: 0 1px;
//       &:not(.disabled):hover {
//         color: rgba(253,48,105,1);
//         &.active {
//           background:linear-gradient(90deg,#e12039 0%,#e12039 100%);
//           color: #ffffff;
//         }
//       }
//     }
//     .btn-next, .btn-prev {
//       background-color: #ffffff;
//       padding: 0 3px;
//     }
//   }
//   .el-pager li {
//     &.active {
//       background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
//     }
//   }
// }

// 其他筛选
#otherCondition {
  .el-input {
    width: 130px;
  }
  .el-input--suffix .el-input__inner {
    height: 28px;
  }
  .el-input__icon {
    line-height: 28px;
  }
  input {
    &::-webkit-input-placeholder {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(148,148,148,1);
    }

    ::-moz-input-placeholder {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(148,148,148,1);
    }

    ::-ms-input-placeholder {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(148,148,148,1);
    }
  }
  .el-input__inner {
    height: 28px;
    border:1px solid rgba(220,220,220,1);
    border-radius: 0;
    border:1px solid rgba(220,220,220,1);
  }
}

// 账号信息提交表单
#accountTransferInfSumbit {
  &.el-form {
    .el-form-item__label {
      width:50px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    .el-input__inner {
      height:28px;
      width: 190px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(220,220,220,1);
    }
    .el-form-item {
      margin-bottom: 6px;
      // 其他状态
      &.other-state-item {
        .el-input__inner {
          width: 135px;
        }
        .el-select {
          margin-right: 20px;
        }
      }
      // 账号标题
      &.account-title-item {
        width: 540px;
        .el-input__inner {
          width: 442px;
        }
      }
      &.register-time-item {
        .el-input__inner {
          width: 135px;
        }
      }
      input {
        font-size: 12px;
        &::-webkit-input-placeholder {
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(148,148,148,1);
        }

        ::-moz-input-placeholder {
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(148,148,148,1);
        }

        ::-ms-input-placeholder {
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(148,148,148,1);
        }
      }
    }
  }
}
// 上传动画box
.upload-animation-box {
  .el-loading-mask {
    z-index: 100;
    background-color: rgba(255,255,255,.60);
    .el-loading-spinner{
      margin-top: -30px;
      .path {
        // stroke: #ff4459;
        stroke: rgba(254, 66, 90, 0.6);
      }
    }
    .el-loading-text {
      // color: rgba(254, 66, 90, 0.8);
    }
  }
}
</style>

<style lang="less">
.modal {
  position: fixed;
  width: 100%;
}

  // .el-menu {
  //   padding: 0 50px !important;
  //   .el-menu-item {
  //     float: left !important;
  //     padding: 0 10px !important;
  //   }
  //   .el-menu--popup {
  //   background-color: #fd3069 !important;
  //   }
  //   .el-submenu.is-active .el-submenu__title {
  //     border-bottom-color: #ffffff !important;
  //   }
  // }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  padding: 0;
  margin: 0;
}

ul {
  list-style-type: none;
}

.clearfix::after, .clearfix::before {
  display: block;
  content: ' ';
  clear: both;
}
button {
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
<!-- element ui 公共修改样式 抽屉组件 -->
<style lang="less">
.selection-drawer {
  .el-drawer {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-drawer__header {
    background-color: #ebe9e9;
    margin-bottom: 8px;
    padding-bottom: 10px;
  }
  .el-drawer__header {
    font-size: 15px;
    position: fixed;
    z-index: 100;
    width: 100%;
  }
  .el-drawer__body {
    padding-top: 60px;
  }
}
</style>
<style lang="less">
.load-tip {
  margin-top: 0px;
  text-align: center;
  font-size: 15px;
  padding-bottom: 4px;
}
</style>
<!-- 移动端 800以下 element-ui 弹窗式修改 -->
<style lang="less">
@media screen and (max-width: 800px) {
  .el-message-box {
    max-width: 90%;
  }
}
</style>
