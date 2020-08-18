<template>
  <div class="store_home_shop">
    <p class="top_p">我的订单</p>
    <div>
      <el-select v-model="value" placeholder="请选择"
        @change="sousuo">
        <el-option
          v-for="item in deliveryStatuData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="shangchuan_btn">
        共<span>{{total}}</span>条
      </div>
    </div>
    <div class="shop_content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="商品信息">
          <template slot-scope="scope">
            <img class="tabel_img1" :src="scope.row.goodsDrawingUrl" alt="">
            <p class="tabel_p">{{scope.row.goodsName}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="红人信息"
          width="180">
          <template slot-scope="scope">
            <p>名称： <span>{{scope.row.rrupd.redskinsName}}</span></p>
            <p>粉丝： <span>{{scope.row.rrupd.fansAmount}}</span>W</p>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="能力描述">
          <template slot-scope="scope">
              {{scope.row.redskinsCapabilityDescription}}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="收货信息">
          <template slot-scope="scope">
            <p v-if="(scope.row.orderStatus !== '1' && scope.row.orderStatus !== '4')" class="sdbieb" @click="mover(3 , scope.row)">查看详情</p>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="订单操作">
          <template slot-scope="scope">
            <p v-if="scope.row.orderStatus === '1'">
            </p>
              <span class="tabel_shangchua" @click="mover(1)">发货</span>
              <span @click="mover(2)">拒绝</span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="订单状态">
          <template slot-scope="scope">
            <p :class="scope.row.orderStatus === '1' ? 'pjk1' : (scope.row.orderStatus === '2' ? 'pjk2' : '')">
              {{scope.row.orderStatus | deliveryStatuFilter}}
            </p>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage4"
          :page-size="row"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <!-- 弹框 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      center>
      <div v-if="sfta === 2">
        <p class="store_dialog_p1">拒绝取样</p>
        <p class="store_dialog_p2">确定拒绝此红人的取样信息</p>
        <div class="store_dialog_div">
          <div class="store_dialog_btn1" @click="chongxinshengqing">取消</div>
          <div class="store_dialog_btn">确定</div>
        </div>
      </div>
      <div v-else-if="sfta === 1">
        <div class="sjgeoreh">
          <p class="store_dialog_p1">确认发货</p>
          <p class="store_dialog_p3">物流名称：</p>
          <el-input v-model="from_fahuo.name" placeholder="请输入内容"></el-input>
          <p class="store_dialog_p3">单号信息：</p>
          <el-input v-model="from_fahuo.danhao" placeholder="请输入内容"></el-input>
        </div>
        <div class="store_dialog_div">
          <div class="store_dialog_btn1" @click="chongxinshengqing">取消</div>
          <div class="store_dialog_btn">确定</div>
        </div>
      </div>
      <div class="floibw" v-else>
        <p class="store_dialog_p1">收货信息</p>
        <p class="store_dialog_p4">
          <span>姓名：</span>
          <span>{{item.deliveryAddressName}}</span>
        </p>
        <p class="store_dialog_p4">
          <span>手机号：</span>
          <span>{{item.deliveryAddressPhone}}</span>
        </p>
        <p class="store_dialog_p4">
          <span>地址：</span>
          <span>{{item.deliveryAddressDetails}} ,{{item.expressOrderNumber}}</span>
        </p>
        <div class="store_dialog_div">
          <div class="store_dialog_btn" @click="chongxinshengqing">确定</div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { deliveryStatuData } from '@/data/common'
import { storeDingDan } from '@/api/newshopList'
export default {
  data () {
    return {
      deliveryStatuData,
      centerDialogVisible: false,
      sfta: 1,
      token: sessionStorage.getItem('token'),
      from_fahuo: {
        name: '',
        danhao: ''
      },
      page: 1,
      row: 10,
      tableData: [],
      value: '',
      total: 0,
      item: {},
      currentPage4: 1
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    mover (y, item) {
      this.sfta = y
      this.item = item
      console.log(this.sfta)
      this.centerDialogVisible = !this.centerDialogVisible
    },
    chongxinshengqing () {
      this.centerDialogVisible = !this.centerDialogVisible
    },
    getlist () {
      storeDingDan({
        sessionId: this.token,
        filters: {
          orderStatus: this.value,
          goodsId: '',
          marketPlatform: '',
          platformGoodsId: ''
        },
        page: this.page,
        rows: this.row
      }).then(data => {
        this.total = data.totalCount
        this.tableData = data.result
      })
    },
    // fenye
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.row = val
      this.getlist()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getlist()
    },
    // 订单状态筛选
    sousuo () {
      console.log(this.value)
      this.getlist()
    }
  }
}
</script>

<style lang="less">
  .store_home_shop {
    .el-select {
      margin: 25px 0;
      margin-left: 30px;
      display: inline-block;
      .el-input__inner {
      width:131px;
      height:34px;
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      border-radius:17px;
      line-height: 34px;
      }
    }
    .el-table th, .el-table tr {
        height:42px;
        background:rgba(247,247,247,1);
        opacity:1;
        text-align: center;
        font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        line-height:42px;
        color:rgba(85,85,85,1);
        opacity:1;
    }
    .el-table--enable-row-transition .el-table__body td {
      background-color: #fff;text-align: center;
    }
    .el-dialog {
      width:460px;
      background:rgba(255,255,255,1);
      opacity:1;
      border-radius:10px;
      .el-dialog__header {
        display: none;
      }
    }
  }
  .sjgeoreh {
    padding: 0 85px;
    box-sizing: border-box;
    .el-input__inner {
      height:42px;
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      border-radius:10px;
    }
  }
</style>

<style lang="less" scoped>
  .store_home_shop {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .top_p {
      padding-left: 30px;
      box-sizing: border-box;
      line-height: 66px;
      border-bottom: 2px solid rgba(208,208,208,1);
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(85,85,85,1);
      opacity:1;
    }
    .shangchuan_btn {
      display: inline-block;
      padding: 0 12px;
      box-sizing: border-box;
      height:34px;
      opacity:1;
      border-radius:17px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:34px;
      color:#999999;
      opacity:1;
      margin-left: 20px;
      border:1px solid rgba(226,226,226,1);
      span {
        color: #F17D78;
      }
    }
    .shop_content {
      padding: 0 30px;
      box-sizing: border-box;
      .tabel_img1 {
        width: 86px;
        height: 86px;
        float: left;
        margin-right: 20px;
      }
      .tabel_p {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        // letter-spacing:15px;
        opacity:1;
        text-align: left;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
      }
      .tabel_shangchua {
        // display: inline-block;
        margin-right: 10px;
      }
      .pjk1 {
        color: #1DE88A;
      }
      .pjk2 {
        color: #E8251D;
      }
    }
    .store_dialog_p1 {
      font-size:20px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      opacity:1;
      text-align: center;
      margin-top: 50px;
      padding: 0 70px;
      box-sizing: border-box;
    }
    .store_dialog_p2 {
      font-size:14px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      opacity:1;
      text-align: center;
      margin-top: 50px;
      margin-bottom: 50px;
      padding: 0 70px;
      box-sizing: border-box;
    }
    .store_dialog_p3 {
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(144,144,144,1);
      opacity:1;
      margin: 20px 0;
    }
    .store_dialog_btn {
      display: inline-block;
      width:137px;
      height:40px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:40px;
      color:rgba(255,255,255,1);
      opacity:1;
      margin: auto;
    }
    .store_dialog_btn1 {
      display: inline-block;
      width:137px;
      height:40px;
      border:1px solid rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:40px;
      color:rgba(234,64,57,1);
      opacity:1;
      margin-right: 20px;
    }
    .store_dialog_div {
      text-align: center;
      margin-top: 50px;
    }
    .sdbieb {
      color: #21BBFF;
    }
    .floibw {
      padding: 0 85px;
      box-sizing: border-box;
    }
    .store_dialog_p4 {
      line-height: 42px;
      span {

        display: inline-block;
      }
      span:nth-child(1) {
        display: inline-block;
        width: 64px;
        text-align: right;
      }
    }
    .block {
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
