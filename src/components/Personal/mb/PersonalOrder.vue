<template>
<div class="page">
  <div class="page-bd">
    <div class="nav-list-wrap" ref="navWrapNode">
      <ul class="nav-list clearfix" ref="navListNode" :style="{width: navListWidth}">
        <li class="nav-list__item" v-for="item in selectionItems" :key="item.value" :class="activedItem === item.value ? 'active' : ''"
          @click="handleNavChange(item.value, $event)">
          <a >{{item.label}}</a>
        </li>
      </ul>
      <div class="right-box" ref="navRightBoxNode">
        <span class="items-total-inf">{{orderList.length}}/{{total}}</span>
      </div>
    </div>
  </div>
  <div class="order-list-wrap">
    <ul class="order-list">
      <li class="order-list__item order-item" v-for="item in orderList" :key="item.id">
        <div class="order-item__hd">
          <span class="order-item__title">订单编号 {{item.goodsId}}</span>
          <span class="order-item__delivery-status">{{item.deliveryStatus | deliveryStatuFilter}}</span>
        </div>
        <div class="main-bd clearfix">
          <div class="col">
            <img class="order-item__img" :src="item.shopUrl" alt="">
          </div>
          <div class="col col-2">
            <p class="row"><span class="label">原价</span>：<span class="value">¥{{item.totalMoney || '--'}}</span></p>
            <p class="row"><span class="label">折后价</span>：<span class="value">¥{{item.actualMoney || '--'}}</span></p>
            <p class="row"><span class="label">佣金比例</span>：<span class="value">¥{{item.proportion || '--'}}%</span></p>
          </div>
        </div>
        <div class="order-item__ft order-inf">
          <span class="label order-inf">商品描述：</span><span class="value order-inf">{{item.shopName || '--'}}</span>
        </div>
        <div class="order-item__ft clearfix" v-if="item.deliveryStatus !== 2">
          <div class="btn-group">
            <button class="btn" v-if="item.deliveryStatus === 1" @click="handleConfirmReceipt(item.id)">确认收货</button>
          </div>
        </div>
        <!-- <div class="order-item__ft pxark" v-else-if="item.auditStatus === 2"> -->
        <div class="order-item__ft pxark" v-else>
          <span class="label pxark">备注：</span><span class="value pxark">{{item.pxarks || '--'}}</span>
        </div>
      </li>
    </ul>
  </div>
  <!-- 加载提示 -->
  <p class="load-tip">{{searchForm.page > 1 ? loadTip : ''}}</p>
</div>
</template>

<script>
import { fetchMyOrderForFavorite, addOrUpdateDeliveryOrder } from '@/api/order'
// import { getToken } from '@/utils/auth'
import { debunce } from '@/utils/debunce-throttle'
import { makeScrollNodeScrollToMiddle } from '@/utils/mix'
// 订单状态 deliveryStatus 0待发货1已发货2已收货3已拒绝
const selectionItems = [
  { label: '所有订单', value: '' },
  { label: '待发货', value: 0 },
  { label: '已发货', value: 1 },
  { label: '已收货', value: 2 },
  { label: '已拒绝', value: 3 }
]
export default {
  inject: ['reload'],
  data () {
    return {
      // chakanxiangqing1: false,
      item: {},
      navListWidth: '',
      selectionItems,
      activedItem: '',
      loadTip: '加载中...',
      page: { // page作为分页初始状态,不可修改
        row: 4,
        page: 1
      },
      total: 0,
      searchForm: {
        row: 4,
        page: 1,
        deliveryStatus: ''
      },
      orderList: []
    }
  },
  created () {
    this.getOrderList()
    this.debunceWrapHandleScroll = debunce(this.handleScroll, 50)
    window.addEventListener('scroll', this.debunceWrapHandleScroll)
  },
  mounted () {
    this.adjustNavListWidth()
  },
  watch: {
    'orderList.length' () {
      this.adjustNavListWidth()
    }
  },
  destroyed () {
    window.pxoveEventListener('scroll', this.debunceWrapHandleScroll)
  },
  methods: {
    // 跳转导航栏的宽度
    adjustNavListWidth () {
      const navWrapNode = this.$refs.navWrapNode
      const navRightBoxNode = this.$refs.navRightBoxNode
      this.navListWidth = navWrapNode.clientWidth - navRightBoxNode.clientWidth + 5 + 'px'
    },
    handleScroll () {
      const scrollNode = document.documentElement
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = scrollNode.clientHeight
      const scrollHeight = scrollNode.scrollHeight
      if (scrollHeight - 100 <= scrollTop + clientHeight) {
        // 写后台加载数据的函数
        const pageNum = this.searchForm.page // 页码
        if (this.total <= pageNum * this.searchForm.row) {
          this.loadTip = '到底了'
          return
        }
        this.searchForm.page = pageNum + 1
        this.getOrderList(true)
      }
    },
    // 获取订单列表
    getOrderList (isAppend) {
      let searchForm = this.searchForm
      console.log(this.searchForm)
      // searchForm.userId = getUserId()
      console.log(searchForm)
      fetchMyOrderForFavorite(searchForm).then(data => {
        this.total = data.total
        this.orderList = isAppend ? this.orderList.concat(data.list) : data.list
      })
    },
    handleNavChange (activedItem, e) {
      makeScrollNodeScrollToMiddle(e.currentTarget, this.$refs.navListNode, 3)
      this.activedItem = activedItem
      this.orderList = []
      this.searchForm = Object.assign(this.searchForm, this.page, { deliveryStatus: activedItem })
      this.getOrderList()
    },
    // 确认收货
    handleConfirmReceipt (id) {
      this.$confirm('你确定已经收到商家样品了么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addOrUpdateDeliveryOrder({
          id: id,
          deliveryStatus: 3
        }).then(data => {
          console.log(data)
          this.reload()
        })
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 5px;
  .items-total-inf {
    display: inline-block;
    color: #888;
    height: 40px;
    line-height: 40px;
    vertical-align: top;
    font-size: 14px;
    letter-spacing: 2px;
  }
  .page-bd {
    border-radius: 2px;
    padding: 0px;
    background-color: #ffffff;
    position: sticky;
    top: 120px;
    z-index: 100;
  }
  .nav-list-wrap {
    position: relative;
    width: 100%;
    .right-box {
      position: absolute;
      background-color: #ffffff;
      background: linear-gradient(to right,rgba(255, 255, 255, .5) 0%,rgb(255, 255, 255) 5px);
      padding-left: 10px;
      padding-right: 3px;
      top: 0px;
      right: 0px;
      // margin-right: 2px;
      height: 100%;
      vertical-align: top;
      font-size: 14px;;
      letter-spacing: 0px;
    }
  }
  .nav-list {
    margin-top: 3px;
    margin-left: 5px;
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f7f6f6;
    overflow: auto;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-list__item {
      // float: left;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      margin-right: 10px;
      height: 40px;
      line-height: 40px;
      &.active {
        color: #fd395f;
        a {
          position: relative;
          &::after {
            position: absolute;
            bottom: -6px;
            display: block;
            content: ' ';
            width: 8px;
            height: 2px;
            border-radius: 20px;
            background-color: #fd3069;
            left: 50%;
            margin-left: -4px;
          }
        }
      }
      &:last-child {
        margin-right: 10px;
      }
    }
  }
  .order-list-wrap {
    width: 100%;
    box-sizing: border-box;
    // padding: 5px;
  }
  .order-list {
    width: 100%;
  }
  .order-item {
    margin-bottom: 10px;
    width: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 14px;
    .main-bd {
      margin-top: 8px;
      width: 100%;
      height: 100px;
      .col {
        float: left;
        height: 100px;
        &.col-2 {
          // float: right;
          // margin-right: 20px;
          margin-left: 20px;
        }
      }
    }
    .order-item__img {
      border: 1px solid #f9f6f6;
      height: 98px;
      width: 98px;
      border-radius: 8px;
      // margin-right: 15px;
    }
    .order-item__title {
      font-weight: 800;
    }
    .order-item__delivery-status {
      float: right;
      color: orange;
    }
    .row {
      color: #888;
      line-height: 25px;
      height: 25px;
      font-size: 14px;
    }
    .label {
      display: inline-block;
      width: 68px;
      // font-size: 14;
      text-align: justify;
      text-align-last:justify;
      color: #888;
      &.pxark {
        margin-top: 6px;
        width: 60px;
        font-weight: 800;
      }
      &.order-inf {
        margin-top: 6px;
        width: 80px;
        font-weight: 700;
      }
    }
    .value {
      letter-spacing: 2px;
      color: #888;
      &.pxark {
        letter-spacing: 1px;
        text-align: justify;
      }
      &.order-inf {
        letter-spacing: 1px;
        text-align: justify;
      }
    }
    .order-item__hd {
      min-height: 20px;
    }
    .order-item__ft {
      margin-top: 2px;
      &.pxark {
        margin-top: 5px;
        border-top: 1px solid #f7f6f6;
        padding-left: 10px;
      }
      &.order-inf {
        margin-top: 5px;
        border-top: 1px solid #f7f6f6;
        padding-left: 2px;
      }
    }
    .btn-group {
      float: right;
      .btn {
        background-color: #fd3269;
        color: #ffffff;
        padding: 0 8px;
        height: 35px;
        width: 80px;
        line-height: 35px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
  .load-tip {
    margin-top: 0px;
    text-align: center;
    font-size: 15px;
    padding-bottom: 4px;
  }
}
</style>
