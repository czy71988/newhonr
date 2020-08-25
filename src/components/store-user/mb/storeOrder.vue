<template>
<div class="page">
  <div class="page-bd">
    <div class="nav-list-wrap" ref="navWrapNode">
      <ul class="nav-list clearfix" :style="{width: navListWidth}" ref="navListNode">
        <li class="nav-list__item" v-for="item in selectionItems" :key="item.value" :class="activedItem === item.value ? 'active' : ''"
          @click="handleNavChange(item.value, $event)">
          <a>{{item.label}}</a>
        </li>
      </ul>
      <div class="right-box" ref="navRightBoxNode">
         <span class="items-total-inf">{{orderList.length}} / {{total}}</span>
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
          <span class="label order-inf">商品标题：</span><span class="value order-inf">{{item.shopName || '--'}}</span>
        </div>
        <!-- <div class="order-item__ft pxark" v-else-if="item.auditStatus === 2"> -->
        <!-- <div class="order-item__ft line pxark">
          <span class="label pxark">备注：</span><span class="value pxark">{{item.pxarks || '--'}}</span>
        </div> -->
        <div class="order-item__ft line order-more-item">
          <div class="box-title" @click="item.favoriteActived = !item.favoriteActived" :class="item.favoriteActived ? 'active' : ''">红人信息
            <i class="el-icon-caret-right"></i>
            <div class="favorite-hd-inf">
              <span class="value user-name">{{item.userName}}</span>
              <svg width="15" height="15" t="1584172991136" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2608"><path d="M373.837 1024c-68.563-139.627-78.21-231.542-37.327-299.86 13.739-19.845 22.074-44.07 25.005-72.675 47.26 5.473 72.622 23.899 76.087 55.278 79.406-87.323 93.864-226.95 83.02-279.367 180.608 122.23 260.014 391.046 155.308 586.57C1231.88 706.63 813.056 249.25 740.769 200.312c25.3 52.305 28.914 139.628-21.577 181.493C636.172 74.604 379.507 0 379.507 0c25.3 157.137-35.768 343.42-144.089 472.834-3.614-62.855-7.228-104.72-43.153-167.576-7.448 115.047-97.916 205.85-122.887 321.12C36.848 783.404 153.58 901.77 373.837 1024z" p-id="2609" fill="#ff4459"></path></svg>
              <span class="value fansnumber">{{item.fansnumber | numMoreThanTensOfThousandsFilter}}</span>
            </div>
          </div>
          <el-collapse-transition>
            <div class="inf-box" v-if="item.favoriteActived">
              <div class="row">
                <div class="col"><span class="label">红人姓名</span>：<span class="value">{{item.userName || '--'}}</span></div>
              </div>
              <div class="row">
                <div class="col"><span class="label">身高</span>：<span class="value">{{item.height || '--'}}</span></div>
                <div class="col"><span class="label">体重</span>：<span class="value">{{item.weight || '--'}}</span></div>
              </div>
              <div class="row">
                <div class="col"><span class="label">鞋码</span>：<span class="value">{{item.shoeSize || '--'}}</span></div>
                <div class="col"><span class="label">尺码</span>：<span class="value">{{item.size || '--'}}</span></div>
              </div>
              <div class="row">
                <div class="col"><span class="label">粉丝量</span>：<span class="value">{{item.fansnumber | numMoreThanTensOfThousandsFilter}}</span></div>
                <div class="col"><span class="label">粉丝偏向</span>：<span class="value">{{item.deviationstate | fansFavoriteFilter}}</span></div>
              </div>
              <div class="row">
                <span class="label">所属平台</span>：<span class="value">{{item.platform | platformFilter}}</span>
              </div>
              <div class="row">
                <span class="label">内容分类</span>：<span class="value">{{item.contentstate | contentCategoryFilter}}</span>
              </div>
              <div class="box-ft">
                <span class="label">能力描述</span>：<span class="value">{{item.depcit || '--'}}</span>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <div class="order-item__ft line order-more-item">
          <div class="box-title" @click="item.addressActived = !item.addressActived" :class="item.addressActived ? 'active' : ''">地址信息
            <i class="el-icon-caret-right" @click="!addressActived"></i>
          </div>
          <el-collapse-transition>
            <div class="inf-box address-inf-box"  v-if="item.addressActived">
              <div class="row">
                <div class=""><span class="label">收货人</span>：<span class="value">{{item.name || '--'}}</span></div>
              </div>
              <div class="row">
                <div class=""><span class="label">手机号</span>：<span class="value">{{item.phone || '--'}}</span></div>
              </div>
              <div class="box-ft address-box-ft">
                <span class="label">地址</span>：<span class="value">{{item.address || '--'}}</span>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <div class="order-item__ft clearfix" v-if="item.deliveryStatus === 0">
          <div class="btn-group">
            <button class="btn" @click="querenjiyang(item.id)">确认寄样</button>
            <button class="btn reject-btn" @click="jujue(item.id)">拒接寄样</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- 加载提示 -->
  <p class="load-tip">{{orderList.length > 4 ? loadTip : ''}}</p>
</div>
</template>

<script>
import { fetchMyOrder, addOrUpdateDeliveryOrder } from '@/api/order'
// import { getUserId } from '@/utils/auth'
import { debunce } from '@/utils/debunce-throttle'
import { makeScrollNodeScrollToMiddle } from '@/utils/mix'
// import { ConfirmReceipt } from '@/api/user'
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
      myOrder: {},
      navListWidth: '',
      selectionItems,
      activedItem: '',
      loadTip: '加载中...',
      form: {
        kuaidi: '',
        courierNumber: '',
        pxarks: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dialogFormVisible: false,
      shouhuo1: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      orderList: [],
      id: null,
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
      rules: {
        pxarks: [
          { required: true, message: '请输入拒绝理由', trigger: 'blur' }
        ],
        kuaidi: [
          { required: true, message: '请输入快递公司', trigger: 'blur' }
        ],
        courierNumber: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'orderList.length' () {
      this.adjustNavListWidth()
    }
  },
  created () {
    this.getMyOrderInf()
    // this.ConfirmReceipt()
    this.debunceWrapHandleScroll = debunce(this.handleScroll, 50)
    window.addEventListener('scroll', this.debunceWrapHandleScroll)
  },
  mounted () {
    this.adjustNavListWidth()
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
        this.getMyOrderInf(true)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // 点击确认寄样
    querenjiyang (id) {
      this.id = id
      this.dialogFormVisible = true
    },
    shuangchuan () {
      console.log('aaa')
      this.$router.push({ name: 'shangchaun' })
    },
    jujue (id) {
      this.id = id
      this.shouhuo1 = true
    },
    handleNavChange (activedItem, e) {
      makeScrollNodeScrollToMiddle(e.currentTarget, this.$refs.navListNode, 3)
      this.activedItem = activedItem
      this.orderList = []
      this.searchForm = Object.assign(this.searchForm, this.page, { deliveryStatus: activedItem })
      this.getMyOrderInf()
      // this.adjustNavListWidth()
    },
    getMyOrderInf (isAppend) {
      // let searchForm = this.searchForm
      // console.log(this.searchForm)
      // searchForm.bindId = getUserId()
      fetchMyOrder(this.searchForm).then(data => {
        const list = data.list && data.list.map(item => {
          item.addressActived = false
          item.favoriteActived = false
          return item
        })
        this.orderList = isAppend ? this.orderList.concat(list) : list
        console.log('我拉去到了数据')
        const id = data.list
        this.total = data.total
        this.pxarks = data.pxarks
        console.log(id)
        console.log(data)
      })
    },
    // 确认寄样
    queding (form) {
      const id = this.id
      this.$refs[form].validate(valid => {
        if (valid) {
          addOrUpdateDeliveryOrder({
            id: id,
            kuaidi: this.form.kuaidi,
            courierNumber: this.form.courierNumber,
            deliveryStatus: 1
          }).then(data => {
            this.reload()
            console.log('确认寄样')
            console.log(data)
            this.dialogFormVisible = false
            this.reload()
          })
        }
      })
    },
    // 拒绝寄样
    jujuejiyang (form) {
      const id = this.id
      this.$refs[form].validate(valid => {
        if (valid) {
          addOrUpdateDeliveryOrder({
            id: id,
            pxarks: this.form.pxarks,
            deliveryStatus: 2
          }).then(data => {
            console.log('拒绝寄样')
            console.log(data)
            this.shouhuo1 = false
            this.reload()
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.shangchuan-btn {
  width: 156px;
  height: 40px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  float: right;
  margin-top: -50px;
  background-color: #fd3269;
}
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-danding {
  width: 100%;
  height: 100%;
  font-size: 12px;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 60px;
  box-sizing: border-box;
  .dd-top {
    width: 100%;
    height: 36px;
    background-color: #f5f5f5;
    span {
      color: #333333;
      font-size: 12px;
      font-weight: 500;
      line-height: 36px;
    }
    .a1 {
      margin-left: 110px;
      margin-right: 123px;
    }
    .a2 {
      margin-right: 112px;
    }
    .a3 {
      margin-right: 56px;
    }
    .a4 {
      margin-right: 58px;
    }
    .a5 {
      margin-right: 40px;
    }
  }
  .dd-conent {
    margin-top: 15px;
    ul {
      li {
        width: 100%;
        height: 100px;
        padding: 18px 10px;
        box-sizing: border-box;
        float: left;
        background-color: #fcfcfc;
        border: 1px solid #cccccc;
        .spP {
          width: 129px;
          font-size: 12px;
          float: left;
          // margin-left: 15px;
          color: #565656;
          display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
          -webkit-box-orient: vertical; //设置伸缩盒子对象的子元素的排列方式
          -webkit-line-clamp: 2; //用来限制在一个块元素显示的文本的行数
          overflow: hidden; //超出部分隐藏
          text-overflow: ellipsis; // 不完全显示的末尾加上省略号
        }
        .p8524 {
          width: 75px;
          height: 62px;
            float: left;
            margin-right: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .spP1 {
          width: 100px;
          .spPS1 {
            display: inline-block;
            font-size: 16px;
            // margin-left: 15px;
            margin-top: 10px;
            color: #ff435b;
          }
          .spPS2 {
            font-size: 12px;
            // margin-left: 10px;
            color: #999999;
          }
        }
        .spP2 {
          float: left;
          font-size: 12px;
          color: #777777;
          width: 76px;
          // margin-left: 65px;
        }
        .spP2-1 {
          float: left;
          color: #777777;
          width: 130px;
        }
        .spPP {
          float: left;
          margin-right: 13px;
        }
        .spP3 {
          width: 80px;
          text-align: center;
          float: left;
          font-size: 12px;
          color: #777777;
          margin-right: 10px;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .spP3-1 {
            // width: 50px;
            height: 20px;
            color: #ff455a;
            text-align: center
          }
        }
        .xiangguan {
          width: 95px;
          float: left;
          font-size: 12px;
          color: #777777;
          margin-left: 10px;
          // margin-left: 120px;
          .dizhi-t {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .dingdanzt {
          width: 50px;
          font-size: 12px;
          color: #777777;
          float: left;
          margin-left: 20px;
        }
        .dd-btn {
          float: left;
          width: 80px;
          height: 100%;
          font-size: 12px;
          text-align: center;
          margin-left: 30px;
          color: #777777;
          .dd-btn-1 {
            width: 80px;
            height: 26px;
            line-height: 26px;
            color: #fff;
            background-color: #fd3267;
            // // border-radius: 5px;
          }
          .dd-btn-2 {
            margin-top: 10px;
            width: 80px;
            height: 26px;
            line-height: 26px;
            color: #fff;
            background-color: #a9a9a9;
            // border-radius: 5px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .foot {
    margin-top: 50px;
    text-align: center;
  }
}
.dksivnr44 {
  width: 90px;
  height: 40px;
  color: #fff;
  background-color: #fe3569;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
}

</style>
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
    // letter-spacing: 2px;
    margin-right: 2px;
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
    white-space: nowrap;
    overflow: auto;
    border-bottom: 1px solid #f7f6f6;
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
    .box-title {
      .favorite-hd-inf {
        float: right;
        .label {
          letter-spacing: 0px;
          width: auto;
        }
        .value {
          letter-spacing: 0px;
        }
        .user-name {
          margin-right: 6px;
          color: rgb(32, 32, 32);
          font-size: 14px;
          font-weight: 600;
        }
        .fansnumber {
          font-weight: 700;
          color: orange;
          margin-right: 2px;
        }
        .icon {
          position: relative;
          top: 2px;
          color: red;
          path {
            fill: orange;
          }
        }
      }
      // margin: 5px 0px;
      // padding: 5px 0;
      font-weight: 800;
      padding: 6px 0px;
      .el-icon-caret-right {
        transition: transform .2s linear;
      }
      // border-bottom: 1px solid #f7f6f6;
      &.active {
        .el-icon-caret-right {
          transform: rotate(90deg);
        }
      }
      &:hover {
        background-color: #fdfdfd;
      }
    }
    .inf-box {
      color: #888;
      .box-ft {
        margin-top: 5px;
        .label {
          width: 75px;
          // letter-spacing: 2px;
          font-weight: 700;
          text-align: justify;
        }
        .value {
          letter-spacing: 0px;
        }
      }
      .row {
        line-height: normal;
        height: auto;
        display: flex;
        .label {
          width: 75px;
          font-weight: 700;
        }
        .value {
          letter-spacing: 0px;
        }
        .col {
          width: 50%;
          float: left;
        }
      }
      &.address-inf-box {
        .box-ft {
          .label {
            width: 50px;
          }
        }
        .row {
          .label {
            width: 50px;
          }
        }
      }
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
      &.label {
        width: aut;
        margin-top: 5px;
        border-top: 1px solid #f7f6f6;
        padding-left: 2px;
      }
      &.line {
        margin-top: 5px;
        border-top: 1px solid #f7f6f6;
      }
      // &.order-inf {
      //   margin-top: 5px;
      //   border-top: 1px solid #f7f6f6;
      //   padding-left: 2px;
      // }
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
        margin-right: 5px;
        &:last-child {
          margin-right: 0;
        }
        &.reject-btn {
          background-color: #909399;
        }
      }
    }
  }
  .load-tip {
    margin-top: 0px;
    text-align: center;
    font-size: 15px;
    padding-bottom: 4px;
  }
  .down-leave-active,.down-enter-active{
    transition: all 1s ease;
  }
  .down-leave-active,.down-enter{
    opacity: 0;
    height: 0px;
  }
  .down-leave,.down-enter-active{
    opacity: 1;
    // height: auto;
  }
}
</style>
