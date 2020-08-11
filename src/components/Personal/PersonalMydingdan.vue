<template>
<div class="personalMydingdan">
  <h2>我的订单</h2>
  <div class="conent-danding">
    <el-tabs v-model="activeName" @tab-click="handleTabChange">
      <el-tab-pane label="所有订单" name="first">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a3">订单状态</span>
          <span class="a4">订单编号</span>
          <span class="a5">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in orderList" :key="item.id">
              <div class="spTp">
                <img src="@/assets/load-err.png" alt="" v-real-src="item.shopUrl">
              </div>
              <div class="spPP">
              <p class="spP">{{item.shopName}}</p>
              <p class="spP1">
                <span class="spPS1">¥{{item.totalMoney}}</span>
                <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
              </p>
              </div>
              <p class="spP2">{{item.proportion || 0}}%</p>
              <p class="spP3">{{item.deliveryStatus | deliveryStatuFilter}}</p>
              <div class="xiangguan">
                <p>{{item.goodsId}}</p>
              </div>
              <div class="dd-btn" v-if="item.deliveryStatus === 2">
                {{item.remarks}}
              </div>
              <div class="dd-btn" v-else-if="item.deliveryStatus === 3">
                <!-- <div class="dd-btn-1" @click="chakanxiangqing(item)">查看详情</div> -->
              </div>
              <div class="dd-btn" v-else-if="item.deliveryStatus === 0">
                <!-- <div class="dd-btn-2" @click="querenshouhuo(item.id)">确认收货</div> -->
                等待商家发货
              </div>
              <div class="dd-btn" v-else>
                <!-- <div class="dd-btn-1" @click="chakanxiangqing(item)">查看详情</div> -->
                <div class="dd-btn-2" @click="querenshouhuo(item.id)">确认收货</div>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="searchForm.row"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="second">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a3">订单状态</span>
          <span class="a4">订单编号</span>
          <span class="a5">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in orderList" :key="item.id">
              <div class="spTp">
                <img src="@/assets/load-err.png" alt="" v-real-src="item.shopUrl">
              </div>
              <div class="spPP">
              <p class="spP">{{item.shopName}}</p>
              <p class="spP1">
                <span class="spPS1">¥{{item.totalMoney}}</span>
                <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
              </p>
              </div>
              <p class="spP2">{{item.proportion || 0}}%</p>
              <p class="spP3">{{item.deliveryStatus | deliveryStatuFilter}}</p>
              <div class="xiangguan">
                <p>{{item.goodsId}}</p>
              </div>
              <div class="dd-btn">
                <!-- <div class="dd-btn-2" @click="querenshouhuo(item.id)">确认收货</div> -->
                等待商家发货
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="searchForm.row"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div></el-tab-pane>
      <el-tab-pane label="已发货" name="third">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a3">订单状态</span>
          <span class="a4">订单编号</span>
          <span class="a5">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in orderList" :key="item.id">
              <div class="spTp">
                <img src="@/assets/load-err.png" alt="" v-real-src="item.shopUrl">
              </div>
              <div class="spPP">
              <p class="spP">{{item.shopName}}</p>
              <p class="spP1">
                <span class="spPS1">¥{{item.totalMoney}}</span>
                <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
              </p>
              </div>
              <p class="spP2">{{item.proportion || 0}}%</p>
              <p class="spP3">{{item.deliveryStatus | deliveryStatuFilter}}</p>
              <div class="xiangguan">
                <p>{{item.goodsId}}</p>
              </div>
              <div class="dd-btn">
                <!-- <div class="dd-btn-1" @click="chakanxiangqing(item)">查看详情</div> -->
                <div class="dd-btn-2" @click="querenshouhuo(item.id)">确认收货</div>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="searchForm.row"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div></el-tab-pane>
      <el-tab-pane label="已收货" name="fourth">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a3">订单状态</span>
          <span class="a4">订单编号</span>
          <span class="a5">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in orderList" :key="item.id">
              <div class="spTp">
                <img src="@/assets/load-err.png" alt="" v-real-src="item.shopUrl">
              </div>
              <div class="spPP">
              <p class="spP">{{item.shopName}}</p>
              <p class="spP1">
                <span class="spPS1">¥{{item.totalMoney}}</span>
                <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
              </p>
              </div>
              <p class="spP2">{{item.proportion || 0}}%</p>
              <p class="spP3">{{item.deliveryStatus | deliveryStatuFilter}}</p>
              <div class="xiangguan">
                <p>{{item.goodsId}}</p>
              </div>
              <div class="dd-btn">
                <!-- <div class="dd-btn-1" @click="chakanxiangqing(item)">查看详情</div> -->
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="searchForm.row"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div></el-tab-pane>
      <el-tab-pane label="已拒绝" name="fix">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a3">订单状态</span>
          <span class="a4">订单编号</span>
          <span class="a5">拒绝理由</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in orderList" :key="item.id">
              <div class="spTp">
                <img src="@/assets/load-err.png" alt="" v-real-src="item.shopUrl">
              </div>
              <div class="spPP">
              <p class="spP">{{item.shopName}}</p>
              <p class="spP1">
                <span class="spPS1">¥{{item.totalMoney}}</span>
                <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
              </p>
              </div>
              <p class="spP2">{{item.proportion || 0}}%</p>
              <p class="spP3">{{item.deliveryStatus | deliveryStatuFilter}}</p>
              <div class="xiangguan">
                <p>{{item.goodsId}}</p>
              </div>
              <div class="dd-btn">
                {{item.remarks}}
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="searchForm.row"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div></el-tab-pane>
    </el-tabs>
  </div>
  <!-- <el-dialog
    title="商家联系方式"
    :visible.sync="chakanxiangqing1"
    width="30%"
    center=true
    :before-close="handleClose">
    <div class="fangshi">
      <div><span class="ty">商家手机号</span><span class="ty1">{{item.tphone}}</span></div>
      <div><span class="ty">商家电话</span><span class="ty1">{{item.telePhone}}</span></div>
      <div><span class="ty">商家微信号</span><span class="ty1">{{item.wechat}}</span></div>
      <div><span class="ty">商家钉钉号</span><span class="ty1">{{item.dingding}}</span></div>
      <div><span class="ty">商家旺旺号</span><span class="ty1">{{item.wangwang}}</span></div>
      <div><span class="ty">快递信息</span><span class="ty1">
        <p>{{item.kuaidi}}</p>
        <p>{{item.courierNumber}}</p>
        </span></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="chakanxiangqing1 = false">确 定</el-button>
    </span>
  </el-dialog> -->
</div>
</template>

<script>
import { fetchMyOrderForFavorite, addOrUpdateDeliveryOrder } from '@/api/order'
// import { getUserId } from '@/utils/auth'
export default {
  inject: ['reload'],
  data () {
    return {
      // chakanxiangqing1: false,
      item: {},
      activeName: 'first',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
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
  },
  methods: {
    // 获取订单列表
    getOrderList () {
      let searchForm = this.searchForm
      console.log(this.searchForm)
      // searchForm.userId = getUserId()
      console.log(searchForm)
      fetchMyOrderForFavorite(searchForm).then(data => {
        this.total = data.total
        this.orderList = data.list
        console.group('红人-我的订单')
        console.log(data)
        console.groupEnd()
      })
    },
    // tab页切换
    handleTabChange (tab) {
      // 订单状态 deliveryStatus 0待发货1已发货2已收货3已拒绝
      // 每次切换tab, 切换到初始化的搜索的page页
      if (this.lastTabName !== tab.name) {
        this.orderList = []
      }
      this.lastTabName = tab.name
      let deliveryStatus = ''
      switch (tab.name) {
        case 'second': // 待发货
          deliveryStatus = 0
          break
        case 'third': // 已发货
          deliveryStatus = 1
          break
        case 'fourth': // 已收货
          deliveryStatus = 3
          break
        case 'fix': // 已拒绝
          deliveryStatus = 2
          break
      }
      this.searchForm = Object.assign(this.searchForm, this.page, { deliveryStatus })
      console.log(this.searchForm)
      this.getOrderList()
    },
    // 处理分页页码改变
    handleCurrentChange (pageNum) {
      console.log('====')
      console.log(pageNum)
      this.searchForm.page = pageNum
      this.getOrderList()
    },
    // 确认收货
    querenshouhuo (id) {
      console.log(id)
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
    },
    quedingshouhuo () {},
    // 查看详情
    handleClose (done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    },
    chakanxiangqing (item) {
      // this.chakanxiangqing1 = true
      this.item = item
    }
  }
}
</script>

<style lang="less">
.personalMydingdan {
  .el-dialog__header {
    background-color: #fd3564;
    .el-dialog__title {
      font-size: 24px;
      color: #fff;
    }
  }
}
</style>

<style lang="less" scoped>
// 查看商家联系方式
.fangshi {
  width: 300px;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0 auto;
  div {
    width: 100%;
    line-height: 50px;
    display: block;
    border-bottom: 1px solid #e3e3e3;
    .ty {
      display: inline-block;
      width: 100px;
      height: 30px;
      font-size: 20px;
      color: #fd3564;
      margin-right: 20px;
    }
    .ty1 {
      font-size: 18px;
      color: #333333
    }
  }
}
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-danding {
  width: 100%;
  height: 100%;
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
      margin: 0 150px;
    }
    .a2 {
      margin-right: 60px;
    }
    .a3 {
      margin-right: 80px;
    }
    .a4 {
      margin-right: 80px;
    }
  }
  .dd-conent {
    margin-top: 15px;
    ul {
      li {
        width: 100%;
        height: 100px;
        padding: 18px ;
        box-sizing: border-box;
        background-color: #fcfcfc;
        border: 1px solid #cccccc;
        .spTp {
          width: 75px;
          height: 60px;
          float: left;
          border: 1px solid #eeeeee;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .spP {
          width: 200px;
          font-size: 12px;
          float: left;
          margin-left: 15px;
          color: #565656;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .spP1 {
          width: 200px;
          .spPS1 {
            display: inline-block;
            font-size: 16px;
            margin-left: 15px;
            margin-top: 10px;
            color: #ff435b;
          }
          .spPS2 {
            font-size: 12px;
            margin-left: 10px;
            color: #999999;
          }
        }
        .spP2 {
          float: left;
          width: 50px;
          font-size: 12px;
          color: #777777;
          margin-left: 45px;
          line-height: 60px;
        }
        .spPP {
          float: left;
        }
        .spP3 {
          float: left;
          font-size: 12px;
          color: #777777;
          line-height: 60px;
          margin-left: 70px;
        }
        .xiangguan {
          width: 130px;
          float: left;
          font-size: 12px;
          color: #777777;
          margin-left: 65px;
          text-align: center;
        }
        .dd-btn {
          float: left;
          width: 80px;
          height: 100%;
          font-size: 12px;
          margin-left: 15px;
          .dd-btn-1 {
            width: 80px;
          color: #fff;
            height: 26px;
            border-radius: 5px;
            line-height: 26px;
            background-color: #a9a9a9;
            text-align: center;
          }
          .dd-btn-2 {
            width: 80px;float: left;
            margin-top: 10px;
            height: 26px;
          color: #fff;
            line-height: 26px;
            border-radius: 5px;
            background-color: #fd3564;
            text-align: center;
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

</style>
