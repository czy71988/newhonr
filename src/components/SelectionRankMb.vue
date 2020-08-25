<!-- 选品榜 -->
<template>
  <!-- 移动版 -->
  <div class="selection-rank mb-mode">
    <!-- 排序 -->
    <nav class="order-condition">
      <ul class="order-list clearfix">
        <li class="order-item" :class="activedOrderItem === '' ? 'active' :''" @click="handleOrderItemChange('')">
          <span class="label">默认</span>
        </li>
        <li class="order-item" v-for="item in orderItems" :key="item.id" :class="activedOrderItem === item.id ? 'active' :''" @click="handleOrderItemChange(item.id)">
          <span class="label">{{item.label}}</span>
          <span class="tri-icon-wrap">
            <div class="tri-icon tri-icon__up" :class="isUp ? 'active' : ''"></div>
            <div class="tri-icon tri-icon__down" :class="isUp ? '' : 'active'"></div>
          </span>
        </li>
        <li class="order-item right-box rigth-box">
          <span class="item-num-display">{{goodsList.length}} / {{total}}</span>
          <img class="selection-btn__icon" src="@/assets/selection-icon.png" alt="" @click ="drawer = true">
          <!-- <span class="selection-btn"><img class="selection-btn__icon" src="@/assets/selection-icon.png" alt=""></span> -->
        </li>
      </ul>
    </nav>
    <ul class="goods-list clearfix" ref="goodsList">
      <mb-goods-item v-for="item in goodsList" :key="item.id" :item='item'></mb-goods-item>
    </ul>
    <!-- 加载提示 -->
    <p class="goods-list-bottom">{{searchFormData.page > 1 ? tip : ''}}</p>
    <!-- 抽屉 -->
    <el-drawer
      class="selection-drawer"
      :visible.sync="drawer"
      size="80%"
      title="筛选"
      :show-close="false"
      direction="rtl">
      <div class="section">
        <p class="section__title">内容分类</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in contentCategoryStoreData"
              :key="item.value"
              :class="item.value === activedSelectItem ? 'active' : ''"
              @click="handleSelectChange(item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
      <div class="line"  v-show="showRangeBox"></div>
      <div class="section"  v-show="showRangeBox">
        <p class="section__title">{{rangeTitle}}</p>
        <div class="section__body">
          <div class="range-box">
            <div class="input-group">
              <input type="text" v-model.number="searchFormData.lowRange" :placeholder="'最低' + rangePlaceHolder">
              <label for="" class="percent" :class="showPercent ?  'active' : ''">%</label>
            </div>
            -
            <div class="input-group high-input">
              <input type="text" v-model.number="searchFormData.higeRange" :placeholder="'最高' + rangePlaceHolder">
              <label for="" class="percent" :class="showPercent ?  'active' : ''">%</label>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-group" ref="btnGroup">
        <button class="btn btn-reset" @click="handleReset">重置</button>
        <button class="btn btn-ok" @click="handleRangeOk">确定</button>
      </div>
    </el-drawer>
   </div>
</template>

<script>
// import { orderList } from '../data/SelectionRank.js'
import { contentCategoryStoreData } from '@/data/common'
import { fetchGoodsList } from '@/api/goods'
import { search } from '@/api/common'
import { debunce } from '@/utils/debunce-throttle'
import mbGoodsItem from '@/components/home/MbGoodsItem'
let scrolltop1 = 0
export default {
  name: 'SelectionRank',
  components: {
    mbGoodsItem
  },
  data () {
    return {
      scrolltop1,
      contentCategoryStoreData: [{ value: '', label: '全部' }, ...contentCategoryStoreData],
      orderItems: [{ id: 'price', label: '价格' }, { id: 'commission', label: '佣金' }, { id: 'sales', label: '销量' }],
      activedOrderItem: '',
      isUp: false,
      activedSelectItem: '',
      activedOrderListItemIndex: 0,
      goodsList: [],
      drawer1: true,
      searchFormData: { // 搜索
        cid: '',
        disprice: '', // 价格
        proportion: '', // 佣金
        monthvolume: '', // 销量
        row: 32, // 条数
        page: 1, // 页码
        lowRange: '',
        higeRange: '',
        condition: '',
        state: 1 // 已上架的
      },
      total: 0,
      page: {
        row: 32, // 条数
        page: 1 // 页码
      },
      tip: '加载中...',
      drawer: false,
      debunceWrapHandleScroll: null,
      searchVal: '', // 搜索值
      rangePlaceHolder: '价', // 区间范围
      rangeTitle: '价格',
      showRangeBox: false, // 显示范围
      showPercent: false // 显示百分比
    }
  },
  watch: {
    drawer (val) {
      if (val) {
        // 修改body 为固定定位
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        document.body.classList.add('overflow-hiden')
      } else {
        document.body.classList.pxove('overflow-hiden')
        window.scrollTo(0, this.scrollTop)
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    const searchVal = to.query.searchVal
    this.searchFormData.condition = searchVal || ''
    this.getGoodsList()
    console.log('update')
    console.log(to.query.searchVal)
    next()
  },
  created () {
    const searchVal = this.$route.query.searchVal
    this.searchFormData.condition = searchVal || ''
    // 获取类别参数， 有就进行筛选
    // 并激活当前类别按钮
    const category = this.$route.query.category
    if (category) {
      this.searchFormData.cid = category
      this.activedSelectItem = category
    }
    this.getGoodsList()
    // 注册 监听窗口变化
    this.windowHeight = window.innerHeight
    window.addEventListener('resize', this.handleWindowResize)
  },
  mounted () {
    this.debunceWrapHandleScroll = debunce(this.handleScroll, 50)
    window.addEventListener('scroll', this.debunceWrapHandleScroll)
  },
  destroyed () {
    window.pxoveEventListener('scroll', this.debunceWrapHandleScroll)
    window.pxoveEventListener('resize', this.handleWindowResize)
  },
  methods: {
    handleWindowResize () {
      if (!this.$refs.btnGroup) return
      this.$refs.btnGroup.style.display = window.innerHeight < this.windowHeight && document.activeElement.tagName === 'INPUT' ? 'none' : 'block'
    },
    handleScroll () {
      const scrollNode = document.documentElement
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = scrollNode.clientHeight
      const scrollHeight = scrollNode.scrollHeight
      this.showGoTopBtn = scrollTop > 200
      // 拉去数据
      console.log(scrollTop)
      console.log(clientHeight)
      console.log(scrollHeight)
      if (scrollHeight - 100 <= scrollTop + clientHeight) {
        // 写后台加载数据的函数
        console.log('到底')
        const pageNum = this.searchFormData.page // 页码
        if (this.total <= pageNum * this.searchFormData.row) {
          this.tip = '到底了'
          return
        } else {
          this.tip = '加载中... '
        }
        this.searchFormData.page = pageNum + 1
        this.getGoodsList(true)
      }
    },
    search () {
      const searchForm = Object.assign({}, this.searchFormData)
      searchForm.condition = this.searchVal
      searchForm.type = '2'
      searchForm.rows = searchForm.row
      search(searchForm).then(data => {
        this.total = data.total
        this.favoriteList = data.list
      })
    },
    handleSelectChange (activedSelectItem) {
      this.activedSelectItem = activedSelectItem // 激活项索引
      this.searchFormData = Object.assign(this.searchFormData, this.page, { cid: activedSelectItem })
      this.getGoodsList()
    },
    handleOrderItemChange (activedOrderItem) {
      // this.activedOrderListItemIndex = index
      const { disprice, proportion, monthvolume } = this.searchFormData
      // 0: 默认 1 价格 2 佣金 3 销量 排序规则：1由低到高 2由高到低
      this.isUp = this.activedOrderItem === activedOrderItem ? !this.isUp : false
      if (this.activedOrderItem !== activedOrderItem) {
        window.scrollTo(0, 0)
      }
      this.activedOrderItem = activedOrderItem
      switch (activedOrderItem) {
        case 'price':
          this.searchFormData.proportion = ''
          this.searchFormData.monthvolume = ''
          this.searchFormData.disprice = disprice !== 2 ? 2 : 1
          this.rangePlaceHolder = '价'
          this.rangeTitle = '价格'
          break
        case 'commission':
          this.searchFormData.disprice = ''
          this.searchFormData.monthvolume = ''
          this.searchFormData.proportion = proportion !== 2 ? 2 : 1
          this.rangePlaceHolder = '佣金'
          this.rangeTitle = '佣金'
          break
        case 'sales':
          this.searchFormData.disprice = ''
          this.searchFormData.proportion = ''
          this.searchFormData.monthvolume = monthvolume !== 2 ? 2 : 1
          this.rangePlaceHolder = '销量'
          this.rangeTitle = '销量'
          break
        default :
          this.searchFormData.disprice = ''
          this.searchFormData.proportion = ''
          this.searchFormData.monthvolume = ''
          this.rangePlaceHolder = ''
      }
      this.searchFormData.higeRange = ''
      this.searchFormData.lowRange = ''
      this.showRangeBox = activedOrderItem !== ''
      this.showPercent = activedOrderItem === 'commission'
      this.searchFormData = Object.assign(this.searchFormData, this.page)
      this.getGoodsList()
    },
    // 范围确定
    handleRangeOk () {
      this.searchFormData = Object.assign(this.searchFormData, this.page)
      this.getGoodsList()
      window.scrollTo(0, 0)
    },
    // 重置选项
    handleReset () {
      this.activedSelectItem = ''
      this.searchFormData.higeRange = ''
      this.searchFormData.lowRange = ''
      this.searchFormData.cid = ''
      this.getGoodsList()
    },
    // 获取商品列表
    getGoodsList (isAppend) {
      let searchFormData = this.searchFormData
      fetchGoodsList(searchFormData).then(data => {
        this.total = data.total
        const list = data.list
        this.goodsList = isAppend ? this.goodsList.concat(list) : list
        // 若果每次不是追加的话，就滚回到顶部
        if (!isAppend) this.scrollTop = 0
      })
    },
    handleApplicateSample (index) {
      // 申请取样
      this.$router.push('application')
    },
    // 处理页码改变
    handleChangePageNum (pageNum) {
      // this.showLoading()
      this.searchFormData.page = pageNum
      this.getGoodsList()
      window.scrollTo(0, 0) // 回到顶部
    },
    // 确认页
    handlePageOk () {
      // this.showLoading()
      this.getGoodsList()
    },
    showLoading () {
      this.loading = this.$loading({
        text: '拼命加载中',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    },
    closeLoading () {
      if (this.loading) {
        this.loading.close()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .selection-drawer {
    .section {
      margin-bottom: 5px;
      padding-left: 10px;
      .section__title {
        font-size: 14px;
        margin-bottom: 8px;
        color: #909399;
      }
      .section__body {
        padding-left: 1px;
      }
    }
    .line {
      height: 1px;
      background-color: #f4f4f5;
      width: 100%;
      margin: 4px 2px;
      margin-bottom: 8px;
      border-radius: 2px;
    }
    .selection-list {
      position: relative;
      font-size:14px;
      font-family:PingFang-SC-Bold,PingFang-SC;
      font-weight:bold;
      color:rgba(254,58,96,1);
      // display: flex;
      // flex-wrap: wrap;
      // justify-content: space-between;
      // margin: 0px;
      &::after {
        content: "";
        display: block;
        flex: 1;
      }
      .selection-list-item {
        display: block;
        width: 90px;
        // margin-right: 8px;
        text-align: center;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        color: #909399;
        margin-bottom: 5px;
        border-radius: 6px;
        margin-right: 6px;
        float: left;
        line-height: 40px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        // &:last-child {
        //   margin-right: auto;
        // }
      }

      .selection-list-item.active {
        color: red;
      }
    }
    // 范围
    .range-box {
      // height: 100%;
      // float: left;
      // display: flex;
      // align-items: center;
      // margin-left: 20px;
      color: #909399;
      .input-group {
        display: inline-block;
        margin-right: 10px;
        border-radius: 2px;
        // height: 30px;
        // line-height: 30px;
        &.high-input {
          margin-left: 10px;
        }
        input:first-child {
          margin-right: 0px;
        }
        .percent {
          display: none;
          margin-left: 4px;
          font-size: 16px;
          color: #6d6d6d;
          &.active {
            display: inline-block;
          }
        }
      }
      input {
        height: 28px;
        width: 80px;
        line-height: 28px;
        padding:0px 5px;
        border-radius: 2px;
        border: none;
        border: 1px solid #b9b8b8;
        outline: none;
      }
    }
    .btn-group {
      position: absolute;
      bottom: 10px;
      right: 5px;
      .btn {
        color: #e12039;
        background-color: #eeeeee;
        background: linear-gradient(90deg, #fd3069 0%, #ff4459 100%);
        color: #ffffff;
        line-height: 35px;
        height: 35px;
        text-align: center;
        padding:  2px 30px;
        border-radius: 6px;
        &.btn-ok {
          margin-left: 10px;
        }
        &:hover {
          background: linear-gradient(#c74c6f, #c74c6f);
        }
      }
    }
  }
  .goods-list-bottom {
    margin-top: 0px;
    text-align: center;
    font-size: 15px;
    padding-bottom: 4px;
  }

  .selection-rank {
    // 排序
    .order-list {
      border-bottom: 1px solid #f7f7f7;
      margin-top: 8px;
      background-color: #ffffff;
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-bottom: 5px;
      .order-item {
        text-align: center;
        font-size: 14px;
        // float: left;
        display: inline-block;
        width: 60px;
        height: 40px;
        line-height: 50px;
        padding: 0px 2px;
        vertical-align: top;
        // margin-right: 8px;
        &.active {
          color: rgba(255,36,83,1);
          .tri-icon-wrap {
            .tri-icon {
              &.tri-icon__up {
                &.active {
                  border-bottom-color: rgba(255,36,83,1);
                }
              }
              &.tri-icon__down {
                &.active {
                  border-top-color: rgba(255,36,83,1);
                }
              }
            }
          }
        }
        &:first-child {
          margin-left: 0px;
          margin-right: 0px;
          padding: 0px;
        }
        .label {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          // line-height: 100%;
          vertical-align: top;
        }
        .tri-icon-wrap {
          display: inline-block;
          vertical-align: top;
          margin-left: 2px;
          height: 40px;
          line-height: 40px;
          // width: 40px;
          &:first-child {
            margin-left: 2px;
          }
          &:last-child {
            margin-right: 0px;
          }
          @triSize: 4px;
          .tri-icon {
            margin-top: 10px;
            display: block;
            border: @triSize solid transparent;
            &.tri-icon__up {
              border-bottom: @triSize solid rgba(111,111,111,1);
              margin-bottom: 2px;
            }
            &.tri-icon__down {
              margin-top: 0px;
              border-top: @triSize solid rgba(111,111,111,1);
            }
          }
        }
        &.rigth-box {
          color: #a8a5a5;
          float: right;
          width: auto;
          margin-right: 0px;
          // width: 125px;
          padding: 0px;
          text-align: left;
          span {
            position: relative;
            height: 40px;
            vertical-align: top;
            line-height: 40px;
          }
          .item-num-display {
            &::after {
              position: absolute;
              display: block;
              content: ' ';
              height: 12px;
              font-size: 12px;
              width: 1px;
              background-color: #f0efef;
              right: -6px;
              top: 50%;
              margin-top: -6px;
            }
          }
          .selection-btn__icon {
            display: inline-block;
            // padding-left: 8px;
            padding: 10px;
            padding-left: 8px;
            // margin-top: 11px;
            width: 20px;
            height: 20px;
            padding-right: 10px;
          }
        }
      }
    }
  }
  .order-condition {
    position: sticky;
    top: 120px;
    z-index: 100;
    // border-top: 1px solid #dbdada;
  }
</style>

<style lang="less" scoped>
  // 移动版 媒体查询
@media screen and (max-width: 800px) {
  .selection-rank {
    &.mb-mode {
      background-color: #f5f5f5;
    }
  }
  // 商品列表
  .goods-list {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 5px;
    &.scroll-box {
      overflow-x: auto;
      overflow-y: hidden;
      text-align: center;
      white-space: nowrap;
      margin-bottom: 6px;
      transition: all .3s linear;
      // height: 320px;
      &::-webkit-scrollbar {
        display: none;
      }
      .goods-item {
        display: inline-block;
        float: none;
        width: 180px;
        height: 290.4px;
        margin-right: 5px;
        // overflow: hidden;
        vertical-align: bottom;
        background:rgba(255,255,255,1);
        &:nth-child(odd) {
          padding-right: 0px;
        }
        &:nth-child(2n) {
          padding-left: 0px;
        }
        &:last-child {
          margin-left: 0px;
        }
        &.more {
          // display: block;
          box-sizing: border-box;
          padding: 10px 9px;
        }
      }
    }
    .goods-item {
      box-sizing: border-box;
      float: left;
      width: 50%;
      margin-bottom: 5px;
      .item-img {
        width: 100%;
        height: 100%;
      }
      &:nth-child(odd) {
        padding-right: 2px;
      }
      &:nth-child(2n) {
        padding-left: 2px;
      }
    }
  }
}

@media screen and (max-width: 360px) {
  .selection-rank {
    // 排序
    .order-list {
      .order-item {
        width: 54px;
        padding: 0px;
      }
    }
  }
}
</style>
