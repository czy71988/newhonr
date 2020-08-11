
<!-- 移动版 红人列表项 -->
<template>
  <li class="cpt-favorite-list-item">
    <div class="list-item__col col-1">
      <div class="list-item__headpotrait-wrap">
        <img @click="hongenshuju(item.id)" src="@/assets/load-err.png" class="list-item__headpotrait" alt="" v-real-src="item.headimgurl">
        <img class="btn concact-favorite-btn" src="@/assets/concact-icon.png" alt="" @click="$parent.concactFavorite(item)">
      </div>
      <p class="list-item__name">{{item.username}}</p>
      <!-- <span class="line"></span> -->
    </div>
    <div class="list-item__col col-2">
      <div class="box"><span class="box__value">{{item.contentstate | contentCategoryFilter}}</span><label class="box__label">内容分类</label></div>
      <div class="box"><span class="box__value">{{item.fansnumber | numMoreThanTensOfThousandsFilter}}</span><label class="box__label">粉丝数量</label></div>
      <div class="box"><span class="box__value">{{item.toplikes | numMoreThanTensOfThousandsFilter}}</span><label class="box__label">最高获赞量</label></div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'FavoriteListItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    hongenshuju (id) {
      // this.$router.push({ name: 'hongrenshuju', query: id })
    }
  }
}
</script>

<style lang="less" scoped>
.cpt-favorite-list-item {
  position: relative;
  width: 100%;
  height: 150px;
  background:rgba(255,255,255,1);
  box-sizing: border-box;
  padding: 0px 5px;
  .list-item__col {
    float: left;
    &.col-1 {
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
    &.col-2 {
      display: flex;
      height: 100%;
      justify-content: space-between;
      width: calc(100% - 125px);
      box-sizing: border-box;
    }
    .list-item__headpotrait {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      // box-shadow: 0px 0px 1px #f8f8f8;
    }
    .list-item__name {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-right: 0px;
      width:100%;
      max-width: 100px;
      text-align: center;
      height: auto;
      font-size:12px;
      font-family:PingFang-SC-Bold,PingFang-SC;
      font-weight:bold;
      color:rgba(51,51,51,.5);
    }
    .list-item__headpotrait-wrap {
      position: relative;
      width: 100px;
      height: 100px;
      margin-bottom: 5px;
      .btn {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 100%;
        margin-left: -8px;
        top: 0px;
        transform: rotate(3deg);
        transition: all .2s ease-in-out;
        &:hover {
          width: 21px;
          // height: 20px;
          transform: rotate(12deg);
        }
      }
    }
    .line {
      display: inline-block;
      height: 80%;
      width: 1px;
      background-color: #EDEDED;
    }
    .box {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-left: 5px;
      .box__value {
        margin-bottom: 30px;
        font-size:14px;
        font-family:PingFang-SC-Bold,PingFang-SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:16px;
        height: 16px;
      }
      .box__label {
        font-size:13px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        height: 14px;
        line-height: 14px;
      }
    }
  }
  .list-item__btn {
    position: absolute;
    display: inline-block;
    right: 2px;
    width:100px;
    height:30px;
    line-height: 0px;
    top: 55px;
    background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
    border-radius:2px;
    color: #ffffff;
    @iconW: 15px;
    &:hover {
      background: linear-gradient(90deg, #E12039 0%, #E12039 100%)
    }
    .icon {
      width: @iconW;
      height: @iconW;
      line-height: 15px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 4px;
    }
    span {
      height: 16px;
      line-height: 16px;
      vertical-align: middle;
      display: inline-block;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,255,255,1);
    }
  }
}
@media screen and (max-width: 360px) {
  .cpt-favorite-list-item {
    .list-item__col {
      .box {
        .box__label {
          font-size: 12px;
        }
        .box__value {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
