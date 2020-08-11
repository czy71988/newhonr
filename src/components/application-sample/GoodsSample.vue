<!-- 取样商品 -->
<template>
  <div class="goods-sample">
    <label v-if="checkbox" class="goods-sample__choockbox">
      <input type="checkbox"
      name="goodsSample">
    </label>
    <img class="goods-sample__img" src="" alt="">
    <div class="goods-sample-col">
      <p class="goods-sample__title">
        {{item.title}}
      </p>
      <div class="goods-sample-amount">
        <span class="goods-sample__amount-discount">¥{{item.discountedAmount}}</span>
        <span class="goods-sample__amount">¥{{item.amount}}</span>
      </div>
      <div class="goods-sample__commission">
        佣金比例：{{item.commission}}
      </div>
    </div>
    <div class="goods-sample-col last-col">
      <div class="goods-sample-row">
        <span>销量</span><span>优惠券数量</span><span>优惠券金额</span>
      </div>
      <div class="goods-sample-row">
          <span>{{item.salesVolume}}</span>
          <span>{{item.couponCount}}</span>
          <span>{{item.coupon}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'GoodsSample',
  props: {
    checkbox: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      item: { id: 1,
        title: '商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标商品标题标',
        img: '',
        amount: '19.99',
        discountedAmount: '9.99',
        coupon: '10',
        commission: '20%',
        salesVolume: 888,
        couponCount: 1000
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log(from)
    Message({
      content: '请先登录',
      type: 'error'
    })
  }
}
</script>

<style lang="less" scoped>
.goods-sample {
  position: relative;
  width: 100%;
  @imgW: 150px;
  .goods-sample__img {
    width: @imgW;
    height: @imgW;
    background-color: burlywood;
  }

  .goods-sample-col {
    height: @imgW;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .goods-sample__title {
    width: 360px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    letter-spacing: 1px;
  }

  .goods-sample-row {
    margin-left: 120px;
    span {
      display: inline-block;
      width: 200px;
    }
  }

  .goods-sample-col {
    margin-left: 10px;
  }

  .goods-sample__amount-discount {
    padding: 15px 0px;
    color: red;
    font-size: 25px;
    padding: 20px 0;
  }

  .goods-sample__amount {
    text-decoration: line-through;
    color: #000;
    margin-left: 5px;
    font-size: 14px;
  }

  .goods-sample__commission {
    color: red;
    font-size: 25px;
  }
  @checkboxW: 25px;
  @checkboxRadius: 2px;
  .goods-sample__choockbox {
    position: relative;
    width: @checkboxW;
    height: @checkboxW;
    border-radius: @checkboxRadius;
    border: 1px solid #e4e4e6;
    box-shadow: 0px 0px 2px #e4e4e6;
    background-color: #fff;
    margin-right: 12px;
    input {
      visibility: hidden;
      width: @checkboxW;
      height: @checkboxW;
    }

    input:checked {
      visibility: visible;
    }

    input:checked::before {
      display: block;
      position: absolute;
      content: '\2713';
      display: block;
      background-color: #409eff;
      width: @checkboxW;
      height: @checkboxW;
      color: #fff;
      border-radius: @checkboxRadius;
      border: 1px solid #409eff;
      line-height: @checkboxW;
      text-align: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
  }

  .last-col {
    justify-content: space-around;
  }
}
</style>
