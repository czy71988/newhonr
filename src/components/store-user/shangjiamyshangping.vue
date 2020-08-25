<template>
  <div class="store_home_shop">
    <p class="top_p">我的商品</p>
    <div>
      <el-select v-model="value" placeholder="请选择" @change="sousuo">
        <el-option
          v-for="item in auditStateData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="shangchuan_btn" @click="shangchuan">上传商品</div>
      <div>批量删除</div>
    </div>
    <div class="shop_content">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="商品信息">
          <template slot-scope="scope">
            <img class="tabel_img1" :src="scope.row.goodsDrawingUrl" alt="">
            <p class="tabel_p">{{scope.row.goodsName}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="commissionRate"
          label="佣金比例"
          width="180">
        </el-table-column>
        <el-table-column
          width="100"
          label="审核状态">
          <template slot-scope="scope">
            <p :class="scope.row.auditStatus === '1' ? 'pjk1' : (scope.row.auditStatus === '2' ? 'pjk2' : '')">
              {{scope.row.auditStatus | auditStateFilter}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="auditDetails"
          width="180"
          label="备注">
        </el-table-column>
        <el-table-column
          width="120"
          label="操作">
          <template>
            <span class="tabel_shangchua" @click="mover">删除</span>
            <span>修改</span>
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
          :total="totalCount">
        </el-pagination>
      </div>
    </div>

    <!-- 弹框 -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      center>
      <p class="store_dialog_p1">删除商品</p>
      <p class="store_dialog_p2">是否确定删除次商品</p>
      <div class="store_dialog_div">
        <div class="store_dialog_btn1" @click="chongxinshengqing">取消</div>
        <div class="store_dialog_btn">重新申请</div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { auditStateData } from '@/data/common'
import { storeShopList } from '@/api/newshopList'
export default {
  data () {
    return {
      value: '',
      currentPage4: 1,
      auditStateData,
      token: sessionStorage.getItem('token'),
      centerDialogVisible: false,
      tableData: [],
      totalCount: 0,
      row: 10,
      page: 1,
      multipleSelection: []
    }
  },
  mounted () {
    this.getlits()
  },
  methods: {
    // 搜索
    sousuo () {
      this.getlits()
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.row = val
      this.getlits()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getlits()
    },
    // 删除按钮
    mover () {
      this.centerDialogVisible = !this.centerDialogVisible
    },
    // 弹窗取消按钮
    chongxinshengqing () {
      this.centerDialogVisible = !this.centerDialogVisible
    },
    // 上传按钮
    shangchuan () {
      this.$router.push({ name: 'shangchaun' })
    },
    // 获取列表
    getlits () {
      storeShopList({
        sessionId: this.token,
        filters: {
          auditStatus: this.value
        },
        page: this.page,
        rows: this.row
      }).then(data => {
        console.log(data)
        this.totalCount = data.totalCount
        console.log(this.totalCount)
        this.tableData = data.result
      })
    },
    // 批量操作
    handleSelectionChange (val) {
      this.multipleSelection = val.map(item => {
        return item.goodsId
      })
      // this.multipleSelection = val

      console.log('批量', this.multipleSelection)
    }

    // handleSelectionChange (val) {
    //   console.log('1', val)
    //   this.multipleSelection = val.goodsId
    //   console.log('批量', this.multipleSelection)
    // }
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
      width:104px;
      height:34px;
      background:rgba(241,125,120,1);
      opacity:1;
      border-radius:17px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:34px;
      color:rgba(255,255,255,1);
      opacity:1;
      margin-left: 20px;
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
      }
      .tabel_shangchua {
        // display: inline-block;
        margin-right: 10px;
      }
      .pjk1 {
        color: palegreen;
      }
      .pjk2 {
        color: red;
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
    }
    .block {
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
