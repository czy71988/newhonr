<!-- 我的商品 -->
<template>
<div class="page">
  <div class="page-bd">
    <div class="nav-list-wrap" ref="navWrapNode">
      <ul class="nav-list clearfix" ref="navListNode" :style="{width: navListWidth}">
        <li class="nav-list__item" v-for="item in selectionItems" :key="item.value" :class="activedItem === item.value ? 'active' : ''"
          @click="handleNavChange(item.value, $event)">
          <a>{{item.label}}</a>
        </li>
      </ul>
      <div class="right-box" ref="navRightBoxNode">
        <span class="items-total-inf">{{list.length}} / {{total}}</span>
        <img class="upload-store-btn" @click="handleUploadGoods" src="@/assets/upload.png" alt="">
      </div>
    </div>
  </div>
  <div class="goods-list-wrap">
    <ul class="goods-list">
      <li class="goods-list__item goods-item" v-for="item in list" :key="item.id">
        <div class="goods-item__hd">
          <span class="goods-item__title">{{item.sputitle}}</span>
          <span class="goods-item-audits">
            <span class="goods-item__audit-status">{{item.auditStatus | auditStateFilter}}</span>
            <span class="goods-item__audit-status" @click="shangpinshanchu(item)">删除</span>
            <span class="goods-item__audit-status" @click="shangpinxiugai(item)">修改</span>
            <span v-if="item.auditStatus === 1">
              <span class="goods-item__audit-status1" @click="handleUndercarriage(item)" v-if="item.state === 1">下架</span>
              <span class="goods-item__audit-status2" @click="handleGrounding(item)" v-else>上架</span>
            </span>
          </span>
        </div>
        <div class="main-bd clearfix">
          <div class="col">
            <img class="goods-item__img" :src="item.goodimg" alt="">
          </div>
          <div class="col col-2">
            <p class="row"><span class="label">原价</span>：<span class="value">¥{{item.orprice || '--'}}</span></p>
            <p class="row"><span class="label">折后价</span>：<span class="value">¥{{item.disprice || '--'}}</span></p>
            <p class="row"><span class="label">佣金比例</span>：<span class="value">¥{{item.proportion || '--'}}%</span></p>
            <p class="row" v-if="item.couponnumber > 0"><span class="label">优惠券</span>：<span class="value">¥{{item.orprice - item.disprice}}</span> </p>
          </div>
        </div>
        <div class="goods-item__ft clearfix" v-if="item.auditStatus === 1">
        </div>
        <!-- <div class="goods-item__ft remark" v-else-if="item.auditStatus === 2"> -->
        <div class="goods-item__ft remark" v-else>
          <span class="label remark">备注：</span><span class="value remark">{{item.remarks || '--'}}</span>
        </div>
      </li>
    </ul>
  </div>
  <el-dialog
    title="修改"
    :visible.sync="centerDialogVisible7676"
    width="100%"
    center
    >
    <div class="conent-shangchuan">
      <div class="sc-content">
        <el-form ref="form" :model="form" label-width="90px" @submit.native.prevent>
          <div class="goods-pic-box">
            <el-upload
              class="goods-pic-uploader"
              :action="actions.uploadGoodsPic + '&bindId=' + form.id"
              :show-file-list="false"
              accept="image/*"
              :before-upload="handleUploadGoodsPicBefore"
              :on-error="handleUploadGoodsPicError"
              :on-success="handleUploadGoodsPicSuccess">
              <div class="upload-animation-box"
                  v-loading="loading"
                  element-loading-text="拼命上传中">
                <img v-if="form.goodimg" :src="form.goodimg" class="goods-pic">
                <i v-else class="el-icon-plus goods-pic-uploader__icon"></i>
              </div>
            </el-upload>
            <el-upload
              class="goods-pic-uploader-btn"
              :action="actions.uploadGoodsPic + '&bindId=' + form.id"
              list-type="text"
              accept="image/*"
              :show-file-list="false"
              :before-upload="handleUploadGoodsPicBefore"
              :on-error="handleUploadGoodsPicError"
              :on-success="handleUploadGoodsPicSuccess"
              label-position="left"
              label-width="90px">
              <button class="upload-btn">
                <p>上传商品展示图</p>
                <p>(大小为1M以下)</p>
              </button>
            </el-upload>
          </div>
            <el-form-item label="商品标题">
              <el-input v-model="form.sputitle" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="上架平台">
              <el-radio v-model="form.platform" label="拼多多">拼多多</el-radio>
              <el-radio v-model="form.platform" label="天猫">天猫</el-radio>
              <el-radio v-model="form.platform" label="淘宝">淘宝</el-radio>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-select v-model="form.cid" multiple placeholder="请选择所属商品分类" class="aj6">
                <el-option v-for="item in contentCategoryStoreData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <!--  -->
            <el-form-item label="商品规格">
              <el-input v-model="form.specs" placeholder="规格/大小/尺码/鞋码"></el-input>
            </el-form-item>
            <el-form-item label="店铺价">
              <el-input v-model="form.orprice" placeholder="推荐价格"></el-input>
            </el-form-item>
            <el-form-item label="劵后价">
              <el-input v-model="form.disprice" placeholder="卷后价格"></el-input>
            </el-form-item>
            <el-form-item label="优惠劵金额">
              <el-input v-model="form.coupon" placeholder="输入优惠劵金额" disabled></el-input>
            </el-form-item>
            <el-form-item label="佣金比例">
              <el-input v-model="form.proportion" placeholder="输入比例"></el-input>
            </el-form-item>
            <el-form-item label="优惠劵数量">
              <el-input v-model="form.couponnumber" placeholder="输入优惠劵数量"></el-input>
            </el-form-item>
            <el-form-item label="商品有效期">
              <el-input v-model="form.expirationDate" placeholder="展示的有效期（格式为：2020-01-01）"></el-input>
            </el-form-item>
            <el-form-item label="商品链接">
              <el-input v-model="form.goodsurl" placeholder="该商品在对应平台上商品详情页链接"></el-input>
            </el-form-item>
            <el-form-item label="商品ID">
              <el-input v-model="form.goodsId" placeholder="该商品在对应平台上的商品ID"></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item label="" prop="type4">
              <el-checkbox-group v-model="form.type4">
                <el-checkbox label="本人同意此商品免费寄样" name="1"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!--  -->
            <div class="sc-btn" @click="jiaoyan('form')">
              提交审核
            </div>
          </el-form>
          <!--  -->
          <div class="motai">
            <el-dialog :visible.sync="scBtn">
              <div class="motai1">
                <img src="../../../assets/微信图片_20200109202826.png" alt="">
                <h2>您的商品信息已成功提交！</h2>
                <p>审核期间请保持您的联系方式通畅！平台通过审核后，您的商品将会展示在选品榜中供红人们选择。</p>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="scBtn = false">好 的</el-button>
              </div>
            </el-dialog>
          </div>
          <!--  -->
        </div>
      </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible7676 = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible7676 = false">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 加载提示 -->
  <p class="load-tip">{{searchForm.page > 1 ? loadTip : ''}}</p>
</div>
</template>

<script>
import { fetchMyGoods, updateGoodsState, shanchushangpin, xiugaishangpin } from '@/api/goods'
import { getState } from '@/utils/auth'
import { debunce } from '@/utils/debunce-throttle'
import { makeScrollNodeScrollToMiddle } from '@/utils/mix'
import actions from '@/data/actions'
import { xiugaigoodsshangjia } from '../../../api/user'
import { contentCategoryStoreData } from '@/data/common'

// 状态0待审核1审核通过2审核不通过
const selectionItems = [
  { label: '所有商品', value: '' },
  { label: '待审核', value: 0 },
  { label: '审核通过', value: 1 },
  { label: '审核不通过', value: 2 }
]
const platformMap = {
  '淘宝': 0,
  '天猫': 1,
  '拼多多': 2,
  '京东': 3
}
export default {
  data () {
    return {
      contentCategoryStoreData,
      actions,
      navListWidth: '',
      activeTabName: 'first',
      currentPage: 1,
      centerDialogVisible7676: false,
      selectionItems,
      activedItem: '',
      list: [],
      loading: false,
      form: {
        sputitle: '',
        platform: null,
        type4: [],
        specs: '',
        orprice: '',
        disprice: '',
        coupon: '',
        proportion: '',
        expirationDate: '',
        couponnumber: '',
        goodsurl: '',
        goodsId: '',
        goodimg: null,
        id: ''
        // cid: []
      },
      scBtn: false,
      searchForm: {
        page: 1,
        row: 4,
        auditStatus: '', // 状态0待审核1审核通过2审核不通过
        state: ''
      },
      total: 0,
      page: { // page作为分页初始状态,不可修改
        page: 1,
        row: 4
      },
      loadTip: '加载中...',
      goodsList: []
    }
  },
  created () {
    this.getGoodsList()
    this.debunceWrapHandleScroll = debunce(this.handleScroll, 50)
    window.addEventListener('scroll', this.debunceWrapHandleScroll)
  },
  mounted () {
    this.adjustNavListWidth()
  },
  watch: {
    'list.length' () {
      this.adjustNavListWidth()
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.debunceWrapHandleScroll)
  },
  methods: {
    // 跳转导航栏的宽度
    adjustNavListWidth () {
      const navWrapNode = this.$refs.navWrapNode
      const navRightBoxNode = this.$refs.navRightBoxNode
      this.navListWidth = navWrapNode.clientWidth - navRightBoxNode.clientWidth + 5 + 'px'
    },
    handleNavChange (activedItem, e) {
      makeScrollNodeScrollToMiddle(e.currentTarget, this.$refs.navListNode, 3)
      this.activedItem = activedItem
      this.list = []
      this.searchForm = Object.assign(this.searchForm, this.page, { auditStatus: activedItem })
      this.getGoodsList()
    },
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
        this.getGoodsList(true)
      }
    },
    // 上传商品
    handleUploadGoods () {
      const state = getState()
      // 需账号审核通过
      if (state !== 1) {
        this.$alert('您的账号还未通过审核哦, 请通过审核后操作', '警告', {
          confirmButtonText: '确定',
          center: true
        })
      } else {
        this.$router.push({ name: 'storeUploadGoodsMb' })
      }
    },
    // 处理分页页码改变
    handleCurrentChange (pageNum) {
      this.searchForm.page = pageNum
      this.getGoodsList()
    },
    // 拉取商品列表
    getGoodsList (isAppend) {
      // let searchForm = this.searchForm
      // searchForm.bindId = getUserId()
      fetchMyGoods(this.searchForm).then(data => {
        // this.list = data.list
        this.total = data.total
        this.list = isAppend ? this.list.concat(data.list) : data.list
      })
    },
    // 下架
    handleUndercarriage ({ id }) {
      updateGoodsState({
        id: id,
        state: 0
      }).then(data => {
        this.getGoodsList()
        this.$notify({
          message: '下架成功',
          type: 'success',
          duration: 900,
          showClose: false
        })
      })
    },
    // 上架
    handleGrounding ({ id }) {
      updateGoodsState({
        id: id,
        state: 1
      }).then(data => {
        this.getGoodsList()
        this.$notify({
          message: '上架成功',
          type: 'success',
          duration: 900,
          showClose: false
        })
      })
    },
    // 商品信息修改
    shangpinxiugai ({ id }) {
      this.$confirm('此操作将修改该商品信息, 是否继续?', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // xiugaishangpin({ // 调用商品信息修改接口
        //   id: id
        // })
        this.centerDialogVisible7676 = true
        xiugaigoodsshangjia({
          id: id
        }).then(data => {
          console.log('这是商家商品详情')
          console.log(data)
          const platform = data.platform
          for (const key in platformMap) {
            if (platformMap[key] === platform) {
              data.platform = key
              break
            }
          }
          data.cid = data.cid && data.cid.split('|')
          data.type4 = []
          this.form = data
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    // 点击上传整体做个校验
    jiaoyan (form) {
      // console.log('点击成功')
      // console.log(getUserId())
      // console.log(this.form.type)
      this.$refs[form].validate((valid) => {
        console.log('---------')
        console.log(this.form.type && platformMap[this.form.type])
        if (valid) {
          xiugaishangpin({
            sputitle: this.form.sputitle,
            platform: this.form.type && platformMap[this.form.type],
            specs: this.form.specs,
            orprice: this.form.orprice,
            disprice: this.form.disprice,
            coupon: this.coupon,
            proportion: this.form.proportion,
            couponnumber: this.form.couponnumber,
            goodsurl: this.form.goodsurl,
            goodsId: this.form.goodsId,
            // bindId: getUserId(),
            cid: this.form.cid && this.form.cid.join('|'),
            expirationDate: this.form.expirationDate,
            id: this.form.id,
            auditStatus: 0
          }).then(data => {
            console.log('这是返回的数据')
            console.log(data)
            this.getGoodsList()
            this.centerDialogVisible7676 = false
          })
        } else {
          console.log('这是啥？')
          return false
        }
      })
    },
    // 商品删除
    shangpinshanchu ({ id }) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        shanchushangpin({
          id: id
        }).then(data => {
          console.log(data)
          this.getGoodsList()
        }) // 调用商品信息删除接口
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetForm (form) {
      this.$refs[form].jiaoyan()
    },
    handleUploadGoodsPicSuccess (res, file) {
      this.form.goodsPic = URL.createObjectURL(file.raw)
      this.loading = false
    },
    handleUploadGoodsPicError () {
      this.loading = false
      this.$notify({
        title: '警告',
        message: '上传失败, 请重新上传',
        center: true,
        type: 'warning'
      })
    },
    handleUploadGoodsPicBefore (file) {
      console.log(file)
      // 上传的图片不能超过1M
      if (file.size / 1024 / 1024 > 2) {
        this.$notify({
          title: '警告',
          message: '上传失败, 图片尺寸不能超过1M',
          center: true,
          type: 'warning'
        })
        return false
      }
      // 上传前判断商品id是否存在，不存在则上传失败
      if (this.form.id) {
        this.loading = true
        return
      }
      this.$notify({
        title: '警告',
        message: '上传失败, 请重新上传',
        center: true,
        type: 'warning'
      })
      this.createGoodsId()
      return false
    }
  }
}
</script>

<style lang="less">
.sc-content {
  .el-upload {
    width: 100%;
    margin: 10px auto;
  }
  .el-form-item__label {
    text-align: left;
    // width: 90px !important;
  }
}
.conent-shangchuan {
  .el-dialog__body {
    padding: 0px;
  }
}
</style>

<style lang="less" scoped>

  .goods-pic-uploader-btn {
    // display: inline-block;
    // vertical-align: bottom;
    .upload-btn {
      width:80%;
      height:40px;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      background-color: #fe336a;
      color:#fff;
      line-height:20px;
      letter-spacing: 2px;
      border-radius: 6px;
      p{
        font-size:14px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:#fff;
      }
    }
  }

  .sc-btn {
    width: 170px;
    height: 45px;
    background-color: #fe336a;
    font-size: 18px;
    text-align: center;
    line-height: 45px;
    border-radius: 5px;
    color: #fff;
    margin: 30px auto;
  }
.goods-pic {
  width: 80%;
  height: 80%;
}

.goods-pic-box {
  .goods-pic-uploader {
    .el-upload {
      border:2px solid #dee0e3;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: rgb(202, 219, 236);
      }
    }
    .el-icon-plus:before {
      font-size: 49px;
    }
  }
}
.goods-item-audits {
  display: inline-block;
  width: 170px;
  // float: right;
  position: absolute;
  right: 0;
  background-color: #ffffff;
}
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
    font-size: 12px;
  }
  .page-bd {
    position: relative;
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
      top: 0px;
      right: 0px;
      // margin-right: 2px;
      height: 100%;
      vertical-align: top;
      font-size: 14px;;
      letter-spacing: 0px;
      .upload-store-btn {
        width: 26px;
        padding: 7px 2px;
      }
    }
  }
  .nav-list {
    position: relative;
    margin-top: 3px;
    margin-left: 5px;
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    border-bottom: 1px solid #f7f6f6;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .nav-list__item {
      // float: left;
      font-size: 14px;
      margin-right: 10px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      vertical-align: top;
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

  .goods-list-wrap {
    width: 100%;
    box-sizing: border-box;
    // padding: 5px;
  }
  .goods-list {
    width: 100%;
  }
  .goods-item {
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
          margin-left: 5px;
        }
      }
    }
    .goods-item__img {
      border: 1px solid #f9f6f6;
      height: 98px;
      width: 98px;
      border-radius: 8px;
      // margin-right: 15px;
    }
    .goods-item__title {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      overflow:hidden; /*超出宽度部分的隐藏*/
white-space:nowrap; /*文字不换行*/
text-overflow:ellipsis; /*超出则...代替*/
      font-weight: 800;
    }
    .goods-item__audit-status {
      float: right;
      margin: 0 3px;
      color: red;
    }
    .goods-item__audit-status1 {
      float: right;
      margin: 0 3px;
      color: blue;
    }
    .goods-item__audit-status2 {
      float: right;
      margin: 0 3px;
      color: red;
    }
    .row {
      color: #888;
      line-height: 25px;
      height: 25px;
      font-size: 14px;
    }
    .label {
      display: inline-block;
      width: 68px;
      // font-size: 14;
      text-align: justify;
      text-align-last:justify;
      color: #888;
      &.remark {
        margin-top: 6px;
        width: 60px;
        font-weight: 800;
      }
    }
    .value {
      letter-spacing: 2px;
      color: #888;
      &.remark {
        letter-spacing: 1px;
        text-align: justify;
      }
    }
    .goods-item__hd {
      min-height: 20px;
    }
    .goods-item__ft {
      margin-top: 2px;
      &.remark {
        margin-top: 5px;
        border-top: 1px solid #f7f6f6;
        padding-left: 10px;
      }
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
      }
    }
  }
  .load-tip {
    margin-top: 0px;
    text-align: center;
    font-size: 15px;
    padding-bottom: 4px;
  }
}
.yy {
  color: #fd3069;
}
</style>
