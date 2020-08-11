<!--移动版 红人榜 -->
<template>
  <div class="favorite">
    <!-- 导航 -->
    <nav class="nav-bar clearfix">
      <div class="right-box">
        <span class="item-num-display">{{favoriteList.length}} / {{total}}</span>
        <img class="selection-btn__icon" src="@/assets/selection-icon.png" alt="" @click ="drawer = true " />
      </div>
    </nav>
    <!-- 红人列表 -->
    <ul class="favorite-list">
      <favorite-list-item-mb class="favorite-list-item" v-for="item in favoriteList" :key="item.id" :item="item"></favorite-list-item-mb>
    </ul>
    <!-- 加载提示 -->
    <p class="load-tip">{{searchForm.page > 1 ? loadTip : ''}}</p>
    <!-- 抽屉 -->
    <el-drawer
      class="selection-drawer"
      :visible.sync="drawer"
      size="80%"
      title="筛选"
      :show-close="false"
      direction="rtl">
      <!-- 所属平台 -->
      <div class="section">
        <p class="section__title">所属平台</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in platformData"
              :key="item.value"
              :class="item.value === activedItem.platform ? 'active' : ''"
              @click="handleSelectChange('platform', item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 内容分类 -->
      <div class="section">
        <p class="section__title">内容分类</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in contentCategoryData"
              :key="item.value"
              :class="item.value === activedItem.contentstate ? 'active' : ''"
              @click="handleSelectChange('contentstate', item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 粉丝数量 -->
      <div class="section">
        <p class="section__title">粉丝数量</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in fansNumberData"
              :key="item.value"
              :class="item.value === activedItem.fansnumber ? 'active' : ''"
              @click="handleSelectChange('fansnumber', item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 获赞数量 -->
      <div class="section">
        <p class="section__title">获赞数量</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in praisedNumberData"
              :key="item.value"
              :class="item.value === activedItem.toplikes ? 'active' : ''"
              @click="handleSelectChange('toplikes', item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 粉丝偏向 -->
      <div class="section">
        <p class="section__title">粉丝偏向</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in fansNumberData"
              :key="item.value"
              :class="item.value === activedItem.deviationstate ? 'active' : ''"
              @click="handleSelectChange('deviationstate', item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 所在省份 -->
      <div class="section">
        <p class="section__title">所在省份</p>
        <div class="section__body">
          <ul class="selection-list clearfix">
            <li class="selection-list-item"
              v-for="item in provinceData"
              :key="item.value"
              :class="item.value === activedItem.province ? 'active' : ''"
              @click="handleSelectChange('province', item.value)">
              <a >{{item.label}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-group" ref="btnGroup">
        <button class="btn btn-reset" @click="handleReset">重置</button>
      </div>
    </el-drawer>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="35%"
      center>
      <div class="laixihongrentaikuang">
        <div class="laixihongrentaikuang-top">经 纪 人</div>
        <div class="laixihongrentaikuang-center">
          <div>
            <img src="@/assets/客服入口.png" alt="">
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FavoriteListItemMb from '@/components/favorite/FavoriteListItemMb.vue'
import { fetchFavoriteList } from '@/api/favorite'
import { fetchMyInf } from '@/api/user'
import { getUserInf } from '@/utils/auth'
import { debunce } from '@/utils/debunce-throttle'
import { search } from '@/api/common'
import { platformData, contentCategoryData, fansFavoriteData, fansNumberData, praisedNumberData, provinceData } from '@/data/common'

export default {
  name: 'Favorite',
  components: {
    FavoriteListItemMb
  },
  data () {
    return {
      centerDialogVisible: false,
      uuu: {},
      loadTip: '加载中...',
      drawer: false,
      platformData,
      contentCategoryData,
      fansNumberData,
      praisedNumberData,
      fansFavoriteData,
      provinceData,
      favoriteList: [],
      activedItem: {
        platform: '',
        contentstate: '',
        fansnumber: '',
        toplikes: '',
        deviationstate: '',
        province: ''
      },
      searchForm: {
        page: 1,
        row: 10,
        platform: '',
        contentstate: '',
        fansnumber: '',
        toplikes: '',
        deviationstate: '',
        province: '',
        condition: '',
        state: 1
      },
      total: 0,
      page: {
        page: 1,
        row: 10
      },
      showGoTopBtn: false,
      searchVal: null
    }
  },
  beforeRouteUpdate (to, from, next) {
    const searchVal = to.query.searchVal
    this.searchForm.condition = searchVal || ''
    console.group('搜索条件')
    console.log(searchVal)
    console.groupEnd()
    this.getFavoriteList()
    next()
  },
  created () {
    const searchVal = this.$route.query.searchVal
    this.searchForm.condition = searchVal || ''
    // 获取筛选项，若有则进行筛选
    const ctg = this.$route.query.ctg
    const ctgName = this.$route.query.ctgName
    if (ctg && ctgName) {
      this.searchForm[ctgName] = ctg
    }
    this.getFavoriteList()
    this.debunceWrapHandleScroll = debunce(this.handleScroll, 50)
    window.addEventListener('scroll', this.debunceWrapHandleScroll)
  },
  watch: {
    drawer (val) {
      if (val) {
        // 修改body 为固定定位
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        document.body.classList.add('overflow-hiden')
      } else {
        document.body.classList.remove('overflow-hiden')
        window.scrollTo(0, this.scrollTop)
      }
    }
  },
  methods: {
    // 处理窗口滚动
    handleScroll () {
      const scrollNode = document.documentElement
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = scrollNode.clientHeight
      const scrollHeight = scrollNode.scrollHeight
      if (scrollHeight - 100 <= scrollTop + clientHeight) {
        // 写后台加载数据的函数
        console.log('到底')
        const pageNum = this.searchForm.page // 页码
        if (this.total <= pageNum * this.searchForm.row) {
          this.loadTip = '到底了'
          return
        }
        this.searchForm.page = pageNum + 1
        this.getFavoriteList(true)
      }
    },
    search () {
      const searchForm = Object.assign({}, this.searchForm)
      searchForm.condition = this.searchVal
      searchForm.type = '1'
      searchForm.state = '1'
        .searchForm.rows = searchForm.row
      search(searchForm).then(data => {
        this.total = data.total
        this.favoriteList = data.list
      })
    },
    // 获取粉丝列表 isAppend,是否是追加方式
    getFavoriteList (isAppend) {
      let searchForm = this.searchForm
      fetchFavoriteList(searchForm).then(data => {
        console.log(data)
        this.total = data.total
        this.favoriteList = isAppend ? this.favoriteList.concat(data.list) : data.list
        // 若果每次不是追加的话，就滚回到顶部
        if (!isAppend) this.scrollTop = 0
      })
    },
    // 处理页码改变
    handleChangePageNum (pageNum) {
      this.searchForm.page = pageNum
      this.getFavoriteList()
      window.scrollTo(0, 0) // 回到顶部
    },
    // 确认页
    handlePageOk () {
      this.getFavoriteList()
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
    },
    // 处理选择项发送改变， 重新获取红人榜
    handleSelectChange (type, activedItem) {
      this.activedItem[type] = activedItem
      this.searchForm = Object.assign(this.searchForm, this.page, this.activedItem)
      this.getFavoriteList()
    },
    handleReset () {
      const activedItem = {
        platform: '',
        contentstate: '',
        fansnumber: '',
        toplikes: '',
        deviationstate: '',
        province: ''
      }
      this.activedItem = Object.assign({ }, activedItem)
      this.searchForm = Object.assign(this.searchForm, this.page, this.activedItem)
      this.getFavoriteList()
    },
    // 联系红人
    concactFavorite ({ id }) {
      const { token, state, userType } = getUserInf()
      if (!token || userType !== 2) {
        this.$alert('你还不是商家用户哦，请先登录商家账号', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        })
      } else if (state !== 1) {
        this.$alert('亲，您的账号还未通过审核哦，通过审核后才能联系红人了哦', '温馨提示', {
          confirmButtonText: '确定',
          center: true
        })
      } else {
        fetchMyInf({
          id
        }).then(data => {
          console.log('这是红人信息')
          console.log(data)
          this.uuu = data
        })
        // this.centerDialogVisible = true
        this.centerDialogVisible = true
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.debunceWrapHandleScroll)
  }
}
</script>

<style lang="less" scoped>
.favorite {
  width: 100%;
  height: 100%;
  .favorite-list {
    margin-top: 20px;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
  }
  // 红人列表项
  .favorite-list-item {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0px;
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
     .btn-group {
        position: relative;
        bottom: 10px;
        right: 5px;
        height: 40px;
        margin-top: 25px;
        padding-bottom: 2px;
        .btn {
          position: absolute;
          right: 5px;
          color: #e12039;
          background-color: #eeeeee;
          background: linear-gradient(90deg, #fd3069 0%, #ff4459 100%);
          color: #ffffff;
          line-height: 35px;
          height: 35px;
          text-align: center;
          padding:  2px 30px;
          border-radius: 6px;
          &.btn-reset {
            margin-left: 10px;
          }
          &:hover {
            background: linear-gradient(#c74c6f, #c74c6f);
          }
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
  }
  // 排序
  .nav-bar {
    margin-top: 8px;
    background-color: #ffffff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
    border-bottom: 1px solid #f7f7f7;
    .right-box {
      color: #a8a5a5;
      float: right;
      width: auto;
      margin-right: 0px;
      padding: 0px;
      text-align: left;
      span {
        position: relative;
        height: 40px;
        vertical-align: top;
        line-height: 40px;
      }
      .item-num-display {
        font-size: 14px;
        &::after {
          position: absolute;
          display: block;
          content: ' ';
          height: 12px;
          width: 1px;
          background-color: #f0efef;
          right: -6px;
          top: 50%;
          margin-top: -6px;
        }
      }
      .selection-btn__icon {
        display: inline-block;
        // margin-left: 8px;
        // margin-top: 11px;
        padding: 10px;
        width: 20px;
        height: 20px;
        // padding-left: 3px;
        margin-right: 3px;
      }
    }
  }
  .nav-bar {
    position: sticky;
    top: 120px;
    z-index: 100;
    // border-top: 1px solid #dbdada;
  }
</style>
