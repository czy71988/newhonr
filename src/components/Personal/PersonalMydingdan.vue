<template>
  <div class="honrdingdan">
    <div class="content">
      <p>
        <span class="span1">我的订单</span>
      </p>
      <div class="fenxian"></div>
      <el-select v-model="value" placeholder="请选择" @change="sousuo">
        <el-option
          v-for="item in deliveryStatuData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <div class="listform">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label="商品信息">
          <template slot-scope="scope">
            <img :src="scope.row.goodsDrawingUrl" alt="">
          </template>
          </el-table-column>
          <el-table-column
            prop="commissionRate"
            label="佣金比例">
          </el-table-column>
          <el-table-column
            label="订单状态">
          <template slot-scope="scope">
            <p class="tabel_p">{{scope.row.orderStatus===1 ? '待发货' : (scope.row.orderStatus===2 ? '已发货' : (cope.row.orderStatus===3 ? '已收货' : '已拒绝'))}}</p>
          </template>
          </el-table-column>
          <el-table-column
            prop="orderId"
            label="订单编号">
          </el-table-column>
          <el-table-column
            label="订单操作">
          </el-table-column>
        </el-table>
      </div>

      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { deliveryStatuData } from '../../data/common'
import { storeDingDan } from '../../api/newshopList'
export default {
  data () {
    return {
      deliveryStatuData,
      value: '', // 发货状态
      page: '1',
      row: '10',
      tableData: []
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    sousuo () {
      this.getlist()
    },
    getsshow () {
      this.show = !this.show
    },
    baocun () {
      this.show = !this.show
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getlist()
    },
    // 获取订单列表
    getlist () {
      const token = sessionStorage.getItem('token')
      storeDingDan({
        sessionId: token,
        filters: {
          orderStatus: this.value,
          goodsId: '',
          marketPlatform: '',
          platformGoodsId: ''
        },
        page: this.page,
        rows: this.row
      }).then(data => {
        this.tableData = data.result
        console.log('订单信息', this.tableData)
      })
    }
  }
}
</script>

<style lang="less">
.honrdingdan {
  .el-select {
    margin-left: 30px;
    margin-bottom: 30px;
    .el-input__inner {
    width:131px;
    border:1px solid rgba(226,226,226,1);
    opacity:1;
    border-radius:17px;
    }
  }
  .el-table th, .el-table tr {
    width: 100%;
    height:42px;
    background:rgba(247,247,247,1);
    opacity:1;
  }
  .el-table td, .el-table th {
    padding: 0;
  }
  .el-table{
    .cell {
      text-align: center;
      font-size:16px;
      font-family:Source Han Sans CN;
      font-weight:400;
      line-height:42px;
      color:rgba(85,85,85,1);
      opacity:1;
    }
  }
}
</style>

<style lang="less" socped>
  .honrdingdan {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
    .content {
      width: 100%;
      height: 100%;
      p {
        padding-left: 30px;
        box-sizing: border-box;
        .span1 {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(85,85,85,1);
          opacity:1;
          line-height:25px;
          margin-right: 10px;
        }
      }
      .fenxian {
        width: 100%;
        height:2px;
        border:1px solid rgba(208,208,208,1);
        opacity:1;
        box-sizing: border-box;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .listform{
        padding: 30px;
        box-sizing: border-box;
      }
      .block {
        margin: 20px auto;
        text-align: center;
      }
    }
  }
</style>
