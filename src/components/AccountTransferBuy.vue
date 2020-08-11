<!-- 账号转让 我要求购 -->
<template>
  <div class="account-transfer-buy">
    <!-- 交易流程 -->
    <div class="com-section step-box">
      <div class="com-section__bd">
        <div class="title">交易流程</div>
        <com-steps class="step-list" :steps="tranferSteps" :icons="stepIcons"></com-steps>
      </div>
    </div>
    <div class="com-section menu-box">
      <div class="com-section__bd">
        <!-- 所属平台 -->
        <menu-list class="menu-list" :list="platformData" title="所属平台"></menu-list>
        <!-- 内容分类 -->
        <menu-list class="menu-list" :list="contentCategoryData" title="内容分类"></menu-list>
         <!-- 粉丝数量 -->
        <menu-list class="menu-list" :list="fansNumberData" title="粉丝数量"></menu-list>
        <!-- 价格区间 -->
        <menu-list class="menu-list" :list="priceRangeData" title="价格区间"></menu-list>
        <!-- 粉丝偏向 -->
        <menu-list class="menu-list" :list="fansFavoriteData" title="粉丝偏向"></menu-list>
        <!-- 单价均粉 -->
        <div class="menu-list clearfix avg-fans-numer">
          <label class="title">单价均粉</label>
          <div class="main">
            <label class="item text">全部</label>
            <input class="item" type="text">
            <input class="item" type="text">
            <label class="item text">元/粉</label>
            <button>确定</button>
          </div>
        </div>
        <!-- 其他筛选 -->
        <div class="menu-list clearfix other-condition" id="otherCondition">
          <label class="title">其他筛选</label>
          <div class="main">
            <label class="item text">全部</label>
            <el-select class="item" v-model="searchForm.livestate" placeholder="是否开通直播">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="item" v-model="searchForm.windowstate" placeholder="是否开通橱窗">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="item" v-model="searchForm.authenticationstate" placeholder="认证主体">
              <el-option
                v-for="item in authBodyData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-select class="item" v-model="value" placeholder="注册时间">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->
            <el-date-picker class="item"
              v-model="searchForm.registerTime"
              align="right"
              type="date"
              placeholder="注册时间">
            </el-date-picker>
            <button>确定</button>
          </div>
        </div>
      </div>
    </div>
    <div class="com-section account-box">
      <div class="com-section__bd">
        <ul class="account-list clearfix">
          <account-list-item class="account-list-item" v-for="item in accountLst" :item="item" :key="item.id"></account-list-item>
        </ul>
      </div>
    </div>
    <!-- 分页栏 -->
    <div class="com-section pagination-box">
      <div class="com-section__bd">
        <el-pagination class="pagination" prev-text="< 上一页" next-text="下一页 >" :page-size="page.row" layout="prev, pager, next, total, jumper"
          :total="total" background
          @current-change="handleChangePageNum"></el-pagination>
        <button class="btn-ok" v-c-throttle:200.click="handlePageOk">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import ComSteps from '@/components/common/ComSteps.vue'
import AccountListItem from '@/components/account-transfer/AccountListItem.vue'
import MenuList from '@/components/favorite/MenuList.vue'
import { authBodyData, platformData, contentCategoryData, fansFavoriteData, fansNumberData } from '@/data/common'
import { priceRangeData } from '@/data/AccountTransfer'
import { fetchAccountSaleList } from '@/api/account'

export default {
  name: 'AccountTransferBuy',
  components: {
    ComSteps,
    AccountListItem,
    MenuList
  },
  data () {
    return {
      tranferSteps: [
        '选择所需账号',
        '咨询客服了解详情',
        '办理交易相关手续',
        '交易完成'
      ],
      stepIcons: [
        require('@/assets/编组 44.png'),
        require('@/assets/编组 30.png'),
        require('@/assets/编组 30(1).png'),
        require('@/assets/编组 35.png')
      ],
      platformData,
      contentCategoryData,
      fansNumberData,
      fansFavoriteData,
      priceRangeData,
      authBodyData,
      formData: {},
      submitDialogVisible: false,
      belongedPlatformLst: [
        '全部',
        '抖音',
        '快手',
        '微视',
        '小红书',
        '其他'
      ],
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      otherScreenLst: [
        '是否开通直播', '是否开通橱窗', '认证主体', '注册时间'
      ],
      area: null,
      accountLst: [],
      total: 0,
      searchForm: {
        page: 1,
        row: 8,
        platform: '',
        contentCategory: '',
        fansNumber: '',
        priceRange: '',
        fansFavorite: '',
        avgFansNumber: '',
        registerTime: ''
      },
      page: {
        page: 1,
        row: 8
      }
    }
  },
  mounted () {
    // 获取账号出售列表
    this.getAccountSaleList()
  },
  methods: {
    // 获取账号出售的列表
    getAccountSaleList (pages) {
      let searchForm = this.searchForm
      if (pages) {
        searchForm = Object.assign({}, searchForm, pages)
      }
      fetchAccountSaleList(searchForm).then(data => {
        console.group('账号出售列表')
        console.log(data)
        console.groupEnd()
        this.accountLst = data.list
        this.total = data.total
      })
    },
    handleChangePageNum (pageNum) {
      this.page.page = pageNum
      console.log(pageNum)
      this.getAccountSaleList(this.page)
    },
    handlePageOk () {
      this.getAccountSaleList(this.page)
    }
  }
}
</script>

<style lang="less" scoped>
.account-transfer-buy {
  position: relative;
  width: 100%;
  .com-section {
    .com-section__bd {
      width: 1190px;
    }
    // 步骤
    &.step-box {
      .com-section__bd {
        position: relative;
        background-color: #ffffff;
        height:198px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(232,232,232,1);
        overflow: initial;
        &::before {
          position: absolute;
          display: block;
          content: ' ';
          height: 4px;
          background-color: #FF435A;
          top: -3px;
          width: 100%;
        }
      }
    }
    // 菜单
    &.menu-box {
      .com-section__bd {
        margin-top: 20px;
        background-color: #ffffff;
        box-sizing: border-box;
        padding: 0px 28px;
      }
    }
    &.account-box {
      margin-top: 20px;
    }
  }
  // 步骤
  .step-box {
    .title {
      height:18px;
      font-size:18px;
      font-family:PingFang-SC-Bold,PingFang-SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:18px;
      text-align: center;
      padding: 12px 0;
    }
    .step-list {
      margin-left: 125px;
    }
  }
  // 菜单列表
  .menu-list {
    border-bottom: 1px dotted #DEDEDE;
    &:last-child {
      border-bottom: none;
    }
  }

  .section {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid gray;
    padding: 20px 20px;
    margin-bottom: 20px;
  }

  .menu-list {
    .title {
      float: left;
      width: 58px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      padding: 13px 0px;
      margin-right: 40px;
    }
    &.avg-fans-numer, &.other-condition {
      display: flex;
      align-items: center;
      button {
        width:60px;
        height:26px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        border:1px solid rgba(220,220,220,1);
      }
    }
    &.avg-fans-numer {
      input {
        width: 70px;
        height: 26px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,220,220,1);
      }
    }
    .main {
      display: flex;
      align-items: center;
      .item {
        margin-right: 20px;
      }
      .text {
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
    }
  }

  .account-list {
    width: 1200px;
    .account-list-item {
      float: left;
      margin-right: 10px;
      margin-bottom: 16px;
    }
  }
  .pagination-box {
    padding-bottom: 60px;
    .com-section__bd {
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-ok {
        width:46px;
        height:24px;
        line-height: 24px;
        background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
        border-radius:2px;
        border-image:linear-gradient(90deg, rgba(253,48,105,1), rgba(255,68,89,1)) 1 1;
        color: #ffffff;
        &:hover {
          background:linear-gradient(90deg,#e12039 0%, #e12039 100%);
        }
      }
    }
  }
}
</style>
