<!-- 移动版红人项 -->
<template>
  <li class="favorite-item">
    <div class="item-headpotrait-wrap" :id="item">
      <!-- <img class="item-headpotrait" src="@/assets/headpotrait.png" alt=""> -->
      <img class="item-headpotrait" src="@/assets/load-err.png" alt="" v-real-src="item.headimgurl">
    </div>
    <div class="item-name">{{item.username}}</div>
    <div class="inner-box-wrap">
      <div class="inner-box"><span>粉丝数量</span><span>{{item.fansnumber | numMoreThanTensOfThousandsFilter}}</span></div>
      <div class="inner-box"><span>最高获赞量</span><span>{{item.toplikes | numMoreThanTensOfThousandsFilter}}</span></div>
    </div>
    <button class="item-btn" @click.stop="handleContactFavorite(item); ">
      <img class="icon" src="@/assets/speak.png" alt="">
      <span>联系红人</span>
    </button>
  </li>
</template>

<script>
export default {
  name: 'MbFavoriteItem',
  props: {
    item: {
      type: Object,
      default () {}
    }
  },
  methods: {
    handleContactFavorite (item) {
      this.$parent.handleContactFavorite(item)
    }
  }
}
</script>

<style lang="less" scoped>
.favorite-item {
  display: flex;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 180px;
  height: 280px;
  background:rgba(255,255,255,1);
  padding: 10px 9px;
  // margin: 0px 14px 20px 0px;
  // cursor: pointer;
  // pointer-events: none;
  &:hover {
    .item-headpotrait-wrap::after {
      position: absolute;
      content: ' ';
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      opacity: .2;
      // z-index: 100;
    }
  }
}
.item-name {
  font-size: 14px;
}
.item-headpotrait-wrap {
  margin-bottom: 5px;
  position: relative;
  width: 120px;
  height: 120px;
  width: 100%;
  // height: 100%;
  border-radius: 50%;
  font-size: 14px;
  text-align: center;
  .item-headpotrait {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
}
.inner-box-wrap {
  margin-top: 10px;
  width: 100%;
  height: 70px;
  display: flex;
  .inner-box {
    justify-content: space-around;
    flex: 1;

  font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.inner-box-wrap {
  font-size: 14px;
}
.item-btn {
  display: inline-block;
  height: 35px;
  width: 100%;
  line-height: 35px;
  border-radius: 24px;
  background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
  border-radius:30px;
  font-size:14px;
  font-family:PingFangSC-Semibold,PingFang SC;
  font-weight:600;
  color:rgba(255,255,255,1);
  display: flex;
  align-items: center;
  justify-content: center;
  // line-height:28px;
  text-align: center;
  .icon {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
  &:hover {
    background:linear-gradient(90deg,#E12039 0%,#E12039 100%);
  }
}
</style>
