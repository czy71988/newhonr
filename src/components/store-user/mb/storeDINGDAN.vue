<template>
<div class="ygsf">
  <div class="conent-danding">
    <el-tabs v-model="activeTabName" @tab-click="handleTabChange">
      <el-tab-pane label="所有订单" name="first">
        <div class="dd-top">
          <!-- <span class="a1">商品信息</span>
          <span class="a2">红人信息</span>
          <span class="a3">能力描述</span>
          <span class="a4">收货信息</span>
          <span class="a5">红人名称</span>
          <span class="a6">订单操作</span> -->
        </div>
        <div class="dd-conent">
          <ul class="clearfix">
            <li v-for="item in orderList" :key="item.id">
              <div class="p8524">
                <img :src="item.shopUrl">
              </div>
              <div class="spPP">
                <p class="spP">{{item.shopName}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.actualMoney}}</span>
                  <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
                </p>
              </div>
              <div class="spP2">
                <p><span>身高:</span><span>{{item.height}}</span></p>
                <p><span>体重:</span><span>{{item.weight}}</span></p>
                <p><span>鞋码:</span><span>{{item.shoeSize}}</span></p>
                <p><span>尺码:</span><span>{{item.size}}</span></p>
              </div>
              <div class="spP2-1">
                <p><span>粉丝量：</span><span>{{item.fansnumber}}</span></p>
                <p><span>所属平台：</span><span>{{item.platform | platformFilter}}</span></p>
                <p><span>内容分类：</span><span>{{item.contentstate | contentCategoryFilter}}</span></p>
                <p><span>粉丝偏向：</span><span>{{item.deviationstate | fansFavoriteFilter}}</span></p>
              </div>
                <el-tooltip :content="item.depcit" placement="top" :disabled="!item.depcit">
                  <div class="spP3">
                    <p>{{item.depcit || '--'}}</p>
                    <div class="spP3-1" v-if="item.depcit">详情<i class="el-icon-bottom"></i></div>
                  </div>
                </el-tooltip>
              <div class="xiangguan">
                <p>{{item.name}}</p>
                <p>{{item.phone}}</p>
                <p class="dizhi-t">地址：{{item.address}}</p>
              </div>
              <div class="dingdanzt">{{item.userName}}</div>
              <div class="dd-btn" v-if="item.deliveryStatus===0">
                <el-button class="dd-btn-1" @click="querenjiyang(item.id)">确认寄样</el-button>
                <el-button class="dd-btn-2" @click="jujue(item.id)">拒接寄样</el-button>
              </div>
              <div class="dd-btn" v-else-if="item.deliveryStatus===1">
                <!-- <img src="../../assets/used-1.png" alt=""> -->
                已发货
              </div>
              <div class="dd-btn" v-else-if="item.deliveryStatus===3">
                <!-- <img src="../../assets/used-1.png" alt=""> -->
                已收货
              </div>
              <div class="dd-btn" v-else>
                <!-- <img src="../../assets/used-1.png" alt=""> -->
                已拒绝
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-size="searchForm.row"
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
          <span class="a2">红人信息</span>
          <span class="a3">能力描述</span>
          <span class="a4">收货信息</span>
          <span class="a5">红人名称</span>
          <span class="a6">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul class="clearfix">
           <li v-for="item in orderList" :key="item.id">
              <div class="p8524">
                <img :src="item.shopUrl">
              </div>
              <div class="spPP">
                <p class="spP">{{item.shopName}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.actualMoney}}</span>
                  <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
                </p>
              </div>
              <div class="spP2">
                <p><span>身高:</span><span>{{item.height}}</span></p>
                <p><span>体重:</span><span>{{item.weight}}</span></p>
                <p><span>鞋码:</span><span>{{item.shoeSize}}</span></p>
                <p><span>尺码:</span><span>{{item.size}}</span></p>
              </div>
              <div class="spP2-1">
                <p><span>粉丝量：</span><span>{{item.fansnumber}}</span></p>
                <p><span>所属平台：</span><span>{{item.platform | platformFilter}}</span></p>
                <p><span>内容分类：</span><span>{{item.contentstate | contentCategoryFilter}}</span></p>
                <p><span>粉丝偏向：</span><span>{{item.deviationstate | fansFavoriteFilter}}</span></p>
              </div>
                <el-tooltip :content=item.depcit placement="top"  :disabled="!item.depcit">
                  <div class="spP3">
                    <p>{{item.depcit || '--'}}</p>
                    <div class="spP3-1" v-if="item.depcit">详情<i class="el-icon-bottom"></i></div>
                  </div>
                </el-tooltip>
              <div class="xiangguan">
                <p>{{item.name}}</p>
                <p>{{item.phone}}</p>
                <p class="dizhi-t">地址：{{item.address}}</p>
              </div>
              <div class="dingdanzt">{{item.userName}}</div>
              <div class="dd-btn">
                <el-button class="dd-btn-1" @click="querenjiyang(item.id)">确认寄样</el-button>
                <el-button class="dd-btn-2" @click="jujue(item.id)">拒接寄样</el-button>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="已发货" name="third">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">红人信息</span>
          <span class="a3">能力描述</span>
          <span class="a4">收货信息</span>
          <span class="a5">红人名称</span>
          <span class="a6">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul class="clearfix">
            <li v-for="item in orderList" :key="item.id">
              <div class="p8524">
                <img :src="item.shopUrl">
              </div>
              <div class="spPP">
                <p class="spP">{{item.shopName}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.actualMoney}}</span>
                  <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
                </p>
              </div>
              <div class="spP2">
                <p><span>身高:</span><span>{{item.height}}</span></p>
                <p><span>体重:</span><span>{{item.weight}}</span></p>
                <p><span>鞋码:</span><span>{{item.shoeSize}}</span></p>
                <p><span>尺码:</span><span>{{item.size}}</span></p>
              </div>
              <div class="spP2-1">
                <p><span>粉丝量：</span><span>{{item.fansnumber}}</span></p>
                <p><span>所属平台：</span><span>{{item.platform | platformFilter}}</span></p>
                <p><span>内容分类：</span><span>{{item.contentstate | contentCategoryFilter}}</span></p>
                <p><span>粉丝偏向：</span><span>{{item.deviationstate | fansFavoriteFilter}}</span></p>
              </div>
                <el-tooltip :content=item.depcit placement="top" :disabled="!item.depcit">
                  <div class="spP3">
                    <p>{{item.depcit || '--'}}</p>
                    <div class="spP3-1" v-if="item.depcit">详情<i class="el-icon-bottom"></i></div>
                  </div>
                </el-tooltip>
              <div class="xiangguan">
                <p>{{item.name}}</p>
                <p>{{item.phone}}</p>
                <p class="dizhi-t">地址：{{item.address}}</p>
              </div>
              <div class="dingdanzt">{{item.userName}}</div>
              <div class="dd-btn">
                <!-- <img src="../../assets/used-1.png" alt=""> -->
                已发货
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="已收货" name="fourth">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">红人信息</span>
          <span class="a3">能力描述</span>
          <span class="a4">收货信息</span>
          <span class="a5">红人名称</span>
          <span class="a6">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul class="clearfix">
            <li v-for="item in orderList" :key="item.id">
              <div class="p8524">
                <img :src="item.shopUrl">
              </div>
              <div class="spPP">
                <p class="spP">{{item.shopName}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.actualMoney}}</span>
                  <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
                </p>
              </div>
              <div class="spP2">
                <p><span>身高:</span><span>{{item.height}}</span></p>
                <p><span>体重:</span><span>{{item.weight}}</span></p>
                <p><span>鞋码:</span><span>{{item.shoeSize}}</span></p>
                <p><span>尺码:</span><span>{{item.size}}</span></p>
              </div>
              <div class="spP2-1">
                <p><span>粉丝量：</span><span>{{item.fansnumber}}</span></p>
                <p><span>所属平台：</span><span>{{item.platform | platformFilter}}</span></p>
                <p><span>内容分类：</span><span>{{item.contentstate | contentCategoryFilter}}</span></p>
                <p><span>粉丝偏向：</span><span>{{item.deviationstate | fansFavoriteFilter}}</span></p>
              </div>
                <el-tooltip :content=item.depcit placement="top" :disabled="!item.depcit">
                  <div class="spP3">
                    <p>{{item.depcit || '--'}}</p>
                    <div class="spP3-1" v-if="item.depcit">详情<i class="el-icon-bottom"></i></div>
                  </div>
                </el-tooltip>
              <div class="xiangguan">
                <p>{{item.name}}</p>
                <p>{{item.phone}}</p>
                <p class="dizhi-t">地址：{{item.address}}</p>
              </div>
              <div class="dingdanzt">{{item.userName}}</div>
              <div class="dd-btn">
                <!-- <img src="../../assets/used-1.png" alt=""> -->
                已收货
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="已拒绝" name="fix">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">红人信息</span>
          <span class="a3">能力描述</span>
          <span class="a4">收货信息</span>
          <span class="a5">红人名称</span>
          <span class="a6">订单操作</span>
        </div>
        <div class="dd-conent">
          <ul class="clearfix">
            <li v-for="item in orderList" :key="item.id">
              <div class="p8524">
                <img :src="item.shopUrl">
              </div>
              <div class="spPP">
                <p class="spP">{{item.shopName}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.actualMoney}}</span>
                  <span class="spPS2"><s>¥{{item.actualMoney}}</s></span>
                </p>
              </div>
              <div class="spP2">
                <p><span>身高:</span><span>{{item.height}}</span></p>
                <p><span>体重:</span><span>{{item.weight}}</span></p>
                <p><span>鞋码:</span><span>{{item.shoeSize}}</span></p>
                <p><span>尺码:</span><span>{{item.size}}</span></p>
              </div>
              <div class="spP2-1">
                <p><span>粉丝量：</span><span>{{item.fansnumber}}</span></p>
                <p><span>所属平台：</span><span>{{item.platform | platformFilter}}</span></p>
                <p><span>内容分类：</span><span>{{item.contentstate | contentCategoryFilter}}</span></p>
                <p><span>粉丝偏向：</span><span>{{item.deviationstate | fansFavoriteFilter}}</span></p>
              </div>
                <el-tooltip :content="item.depcit" placement="top" :disabled="!item.depcit">
                  <div class="spP3">
                    <p>{{item.depcit || '--'}}</p>
                    <div class="spP3-1" v-if="item.depcit">详情<i class="el-icon-bottom"></i></div>
                  </div>
                </el-tooltip>
              <div class="xiangguan">
                <p>{{item.name}}</p>
                <p>{{item.phone}}</p>
                <p class="dizhi-t">地址：{{item.address}}</p>
              </div>
              <div class="dingdanzt">{{item.userName}}</div>
              <div class="dd-btn">
                <!-- <img src="../../assets/used-1.png" alt=""> -->
                已拒绝
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="ebiv">
      <!--  -->
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="快递公司" :label-width="formLabelWidth" prop="kuaidi">
            <el-input v-model="form.kuaidi" autocomplete="off" placeholder="输入快递公司"></el-input>
          </el-form-item>
          <el-form-item label="快递单号" :label-width="formLabelWidth" prop="courierNumber">
            <el-input v-model="form.courierNumber" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="dksivnr44" @click="queding('form')">提交</div>
        </div>
      </el-dialog>
      <!--  -->
      <!--  -->
      <el-dialog title="请填写拒绝寄样理由" :visible.sync="shouhuo1">
        <el-form :model="form"  :rules="rules" ref="formReject">
          <el-form-item :label-width="formLabelWidth" prop="remarks">
            <el-input type="textarea" v-model="form.remarks" autocomplete="off" placeholder="*必填"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="shouhuo1 = false">取 消</el-button>
          <el-button type="primary" @click="jujuejiyang('formReject')">确 定</el-button>
          <!-- <div class="dksivnr44">提交</div> -->
        </div>
      </el-dialog>
      <!--  -->
    </div>
  </div>
</div>
</template>

<script>
import { fetchMyOrder, addDeliveryOrder } from '@/api/order'
// import { getUserId } from '@/utils/auth'
// import { ConfirmReceipt } from '@/api/user'
export default {
  inject: ['reload'],
  data () {
    return {
      myOrder: {},
      activeTabName: 'first',
      form: {
        kuaidi: '',
        courierNumber: '',
        remarks: '',
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
      lists: [
        { Id: 1, title: '商品商品商品商品商品商品商品商品商品商品商品商品商品', yuanjia: '9.90', xianjia: '19.90', yongjin: '20%', zhuangtai: '待发货', xinxi: '中通' },
        { Id: 2, title: '商品商品商品商品商品商品商品商品商品商品商品商品商品', yuanjia: '9.90', xianjia: '19.90', yongjin: '20%', zhuangtai: '待发货', xinxi: '中通' },
        { Id: 3, title: '商品商品商品商品商品商品商品商品商品商品商品商品商品', yuanjia: '9.90', xianjia: '19.90', yongjin: '20%', zhuangtai: '待发货', xinxi: '中通' },
        { Id: 4, title: '商品商品商品商品商品商品商品商品商品商品商品商品商品', yuanjia: '9.90', xianjia: '19.90', yongjin: '20%', zhuangtai: '待发货', xinxi: '中通' },
        { Id: 5, title: '商品商品商品商品商品商品商品商品商品商品商品商品商品', yuanjia: '9.90', xianjia: '19.90', yongjin: '20%', zhuangtai: '待发货', xinxi: '中通' }
      ],
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
        remarks: [
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
  mounted () {
    this.getMyOrderInf()
    this.ConfirmReceipt()
    // this.queding()
  },
  methods: {
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
    // tab页切换
    handleTabChange (tab) {
      // 订单状态 deliveryStatus 0待发货1已发货2已拒绝3已收货
      // 每次切换tab, 切换到初始化的搜索的page页
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
      this.orderList = []
      this.searchForm = Object.assign(this.searchForm, this.page, { deliveryStatus })
      this.getMyOrderInf()
    },
    // 处理分页页码改变
    handleCurrentChange (pageNum) {
      this.searchForm.page = pageNum
      this.getMyOrderInf()
    },
    getMyOrderInf () {
      // let searchForm = this.searchForm
      // console.log(this.searchForm)
      // searchForm.bindId = getUserId()
      fetchMyOrder(this.searchForm).then(data => {
        this.orderList = data.list
        console.log('我拉去到了数据')
        const id = data.list
        this.total = data.total
        this.remarks = data.remarks
        console.log(id)
        console.log(data)
      })
    },
    // 确认寄样
    queding (form) {
      const id = this.id
      this.$refs[form].validate(valid => {
        if (valid) {
          addDeliveryOrder({
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
          addDeliveryOrder({
            id: id,
            remarks: this.form.remarks,
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

<style lang="less">
.ygsf {
  padding: 5px;
  .el-tabs__nav-scroll {
    background-color: #ffffff;
  }
  .el-tabs__nav {
    width: 275px;
    .el-tabs__item {
      padding: 0;
      margin-right: 10px;
    }
    .el-tabs__active-bar {
      display: none;
    }
  }
  .el-tabs__item:hover {
    color: #fd3069;
  }
}
</style>

<style lang="less" scoped>

</style>
