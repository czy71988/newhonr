<!-- 好货榜 -->
<template>
  <div class="GoodProductList">
    <div class="Top">
      <p>
        <span @click="gonyingshang('1')">淘宝</span>
        /
        <span @click="gonyingshang('2')">天猫</span>
        /
        <span @click="gonyingshang('3')">京东</span>
        /
        <span @click="gonyingshang('4')">拼多多</span>
        /
        <span @click="gonyingshang('5')">供应商</span>
      </p>
      <ul>
        <li v-for="item in contentCategoryStoreData" :key="item.value" @click="neirongshaixuan(item.value)">{{item.label}}</li>
      </ul>
    </div>
    <div class="shauix">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          排序<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">默认</el-dropdown-item>
          <el-dropdown-item command="1">价格</el-dropdown-item>
          <el-dropdown-item command="2">佣金</el-dropdown-item>
          <el-dropdown-item command="3">销量</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- pc版 商品列表 -->
    <div class="com-section">
      <div class="com-section__bd">
         <ul class="goods-list clearfix">
            <goods-list-item class="goods-list__item" v-for="item in goodsList" :key="item.id" :item="item"></goods-list-item>
            <!-- <goods-list-item class="goods-list__item"></goods-list-item> -->
          </ul>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import { orderList } from '../data/SelectionRank.js'
import { contentCategoryStoreData, platformshangjia } from '@/data/common'
import GoodsListItem from '@/components/selection-rank/GoodsListItem.vue'
// import { fetchGoodsList } from '@/api/goods'
// import { getUserInf, judgeUserType } from '@/utils/auth'
import { newshoplist } from '@/api/newshopList'
// import { debunce } from '@/utils/debunce-throttle'
// console.log(contentCategoryStoreData)
export default {
  name: 'SelectionRank',
  components: {
    GoodsListItem
  },
  data () {
    return {
      // =================================================================
      contentCategoryStoreData,
      platformshangjia,
      goodsList: [],

      sortType: '',
      goodsType: '',
      marketPlatform: '',
      rows: '20',
      page: '1',
      currentPage4: 1,
      total: 0
    }
    // =================================================================
  },

  mounted () {
    this.getlist()
  },
  methods: {
    // =====================================================================
    // 列表
    getlist () {
      newshoplist({
        filters: {
          sortType: this.sortType,
          goodsType: this.goodsType,
          marketPlatform: this.marketPlatform
        },
        // page: '1',
        // rows: '10'
        page: this.page,
        rows: this.rows
      }).then(data => {
        this.total = data.totalCount
        console.log(data)
        this.goodsList = data.result
        console.log('shop列表', this.goodsList)
      })
    },
    neirongshaixuan (value) {
      this.goodsType = value
      this.getlist()
    },
    gonyingshang (y) {
      console.log(y)
      this.marketPlatform = y
      this.getlist()
    },
    handleCommand (command) {
      console.log(command)
      this.sortType = command
      this.getlist()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.rows = val
      this.getlist()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getlist()
    }
    // =====================================================================
  }
}
</script>

<style lang="less" scoped>

.goods-list {
  clear: both;
  overflow: hidden;
  width: 100%;
  position: relative;
  .goods-list__item {
    box-sizing: border-box;
    float: left;
    margin: 0px 20px 20px 0px;
  }
}
.pagination-box {
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
@btnW: 40px;
.go-top-btn {
  width: @btnW;
  height: @btnW;
  position: fixed;
  right: 280px;
  bottom: 100px;
  right: 50%;
  transform: translateX(1186px / 2px + 83px);
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 0px 4px rgba(253,48,105,1);
  }
}
  .com-section {
    background-color: #ffffff;
    .com-section__bd {
      box-sizing: border-box;
      background-color: #ffffff;
    }
    &.category-box {
      .com-section__bd {
        padding: 0px 28px;
        border:1px solid rgba(232,232,232,1);
      }
    }
    &.order-box {
      margin-top: 20px;
      .com-section__bd {
        background:rgba(245,245,245,1);
        border:1px solid rgba(232,232,232,1);
      }
    }
    &.goods-box {
      margin-top: 20px;
    }
    &.pagination-box {
      padding-bottom: 60px;
    }
  }
 .GoodProductList {
   .Top {
     padding: 0 165px;
     box-sizing: border-box;
     width: 100%;
     height: 120px;
     background:rgba(247,247,247,1);
    p {
      span {
        display: inline-block;
        margin: 0 30px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:60px;
        color:rgba(144,144,144,1);
        opacity:1;
      }
      span:nth-child(1) {
        margin-left: 0;
      }
      span:hover {
        font-weight: 700;
        color: #000000;
        font-family: PingFangSC-Medium;
      }
    }
    ul {
      li {
        display: inline-block;
        margin-right: 30px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:60px;
        color:rgba(144,144,144,1);
        opacity:1;
      }
      li:hover {
        font-weight: 700;
        color: #000000;
        font-family: PingFangSC-Medium;
      }
    }
   }
   .shauix {
     padding: 0 165px;
     .el-dropdown-link {
      display: block;
      width:93px;
      height:34px;
      border:1px solid rgba(102,102,102,1);
      opacity:1;
      border-radius:8px;
      text-align: center;
      line-height: 34px;
      margin: 25px 0;
     }
   }
   .com-section {
     padding: 0 165px;
     background-color: #fff;
   }
 }

  .block {
    text-align: center;
    margin: 20px 0;
  }
</style>
