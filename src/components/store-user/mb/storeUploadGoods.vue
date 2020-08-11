<template>
<div class="page">
  <div class="page-bd">
    <div class="sc-content">
      <el-form ref="form" :model="form" label-width="85px" :rules="rules" @submit.native.prevent label-position="left">
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
              <img v-if="form.goodsPic" :src="form.goodsPic" class="goods-pic">
              <i v-else class="el-icon-plus goods-pic-uploader__icon"></i>
            </div>
          </el-upload>
          <p class="pic-size-tip">（图片大小不能超过1mb）</p>
          <el-upload
            class="goods-pic-uploader-btn"
            :action="actions.uploadGoodsPic + '&bindId=' + form.id"
            list-type="text"
            accept="image/*"
            :show-file-list="false"
            :before-upload="handleUploadGoodsPicBefore"
            :on-error="handleUploadGoodsPicError"
            :on-success="handleUploadGoodsPicSuccess">
            <button class="upload-btn">
              上传商品展示图
            </button>
          </el-upload>
        </div>
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上架平台" prop="type">
          <el-checkbox-group v-model="type"> -->
            <!-- <el-checkbox label="拼多多" name="type"></el-checkbox> -->
            <!-- <el-checkbox label="天猫" name="1"></el-checkbox>
            <el-checkbox label="淘宝" name="2"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <!--  -->
        <el-form-item label="上架平台" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="拼多多" name="type"></el-checkbox>
            <el-checkbox label="天猫" name="type"></el-checkbox>
            <el-checkbox label="淘宝" name="type"></el-checkbox>
          </el-checkbox-group>
          <!-- <el-radio-group v-model="form.type">
            <el-radio label="天猫"></el-radio>
            <el-radio label="淘宝"></el-radio>
          </el-radio-group> -->
          <!-- <el-radio-group v-model="form.type">
            <el-radio label="天猫"></el-radio>
            <el-radio label="淘宝"></el-radio>
          </el-radio-group> -->
        </el-form-item>

        <el-form-item label="商品分类" prop="cid" class="goods-category-item">
          <el-select v-model="form.cid" multiple placeholder="请选择所属商品分类">
            <el-option v-for="item in contentCategoryStoreData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品规格" prop="guige">
          <el-input v-model="form.guige" placeholder="规格/大小/尺码/鞋码"></el-input>
        </el-form-item>
        <el-form-item label="店铺价" prop="MarketPrice">
          <el-input v-model="form.MarketPrice" placeholder="推荐价格"></el-input>
        </el-form-item>
        <el-form-item label="劵后价" prop="Couponprice">
          <el-input v-model="form.Couponprice" placeholder="卷后价格"></el-input>
        </el-form-item>
        <!-- <el-form-item label="优惠劵金额" prop="coupon">
          <el-input v-model="form.coupon" placeholder="输入优惠劵金额"></el-input>
        </el-form-item> -->
        <el-form-item label="优惠劵金额" prop="coupon1">
          <el-input v-model="coupon" placeholder="输入优惠劵金额" disabled></el-input>
        </el-form-item>
        <el-form-item label="佣金比例" prop="commission">
          <el-input v-model="form.commission" placeholder="输入比例"></el-input>
        </el-form-item>
        <el-form-item label="优惠劵数量" prop="couponNumber">
          <el-input v-model="form.couponNumber" placeholder="输入优惠劵数量"></el-input>
        </el-form-item>
        <el-form-item label="商品链接" prop="links">
          <el-input v-model="form.links" placeholder="该商品在对应平台上商品详情页链接"></el-input>
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="该商品在对应平台上的商品ID"></el-input>
        </el-form-item>
        <div class="goods-pic-box">
          <el-upload
            class="goods-pic-uploader"
            :action="actions.uploadGoodsPic2 + '&bindId=' + form.id"
            :show-file-list="true"
            list-type="picture-card"
            accept="image/*"
            :before-upload="handleUploadGoodsPicBefore"
            :on-error="handleUploadGoodsPicError"
            :on-success="handleUploadGoodsPicSuccess1">
            <div class="upload-animation-box"
              v-loading="loading"
              element-loading-text="拼命上传中">
              <!-- <img v-if="form.goodsPic" :src="form.goodsPic" class="goods-pic"> -->
              <!-- <i v-else class="el-icon-plus goods-pic-uploader__icon"></i> -->
              <i class="el-icon-plus goods-pic-uploader__icon"></i>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"  :src="form.goodsPic1" alt="">
          </el-dialog>
        </div>
        <!--  -->
        <el-form-item label="" prop="type4" class="read-tip-item">
          <el-checkbox-group v-model="form.type4">
            <!-- <el-checkbox label="拼多多" name="type"></el-checkbox> -->
            <el-checkbox label="本人同意此商品免费寄样" name="1"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--  -->
        <div class="btn-group">
          <button class="btn submit-btn" @click="handleSumbit('form')">
            提交审核
          </button>
        </div>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
import { addGoods, createGoodsId } from '@/api/goods'
// import { getUserId } from '@/utils/auth'
import actions from '@/data/actions'
import { contentCategoryStoreData } from '@/data/common'
const platformMap = {
  '天猫': 1,
  '淘宝': 0
}
export default {
  data () {
    return {
      actions,
      dialogVisible: false,
      contentCategoryStoreData,
      form: {
        title: '',
        type: [],
        type4: [],
        guige: '',
        MarketPrice: '',
        Couponprice: '',
        coupon: '',
        commission: '',
        couponNumber: '',
        links: '',
        goodsId: '',
        goodsPic: null,
        id: ''
        // cid: []
      },
      scBtn: true,
      type: ['选中且禁用', '复选框 A'],
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
          {
            required: true,
            pattern: /[\u4e00-\u9fa5]/gm,
            message: '请输入正确标题',
            trigger: 'blur'
          }
        ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个上架平台', trigger: 'change' }
        // ],
        type: [
          { required: true, message: '请选择一个上架平台', trigger: 'change' }
        ],
        type4: [
          { type: 'array', required: true, message: '请勾选此选项', trigger: 'change' }
        ],
        // cid: [
        //   { required: true, message: '请选择一个商品分类', trigger: 'change' }
        // ],
        guige: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        MarketPrice: [
          { required: true, message: '请输入商品市场价', trigger: 'blur' },
          {
            required: true,
            // pattern: /^\d+$/,
            pattern: /^(\d*)(\.(\d{0,2}))?$/g,
            message: '请输入正确的金额且只能保留2位小数',
            trigger: 'blur'
          }
        ],
        Couponprice: [
          { required: true, message: '请输入商品券后价', trigger: 'blur' },
          {
            required: true,
            // pattern: /^\d+$/,
            pattern: /^(\d*)(\.(\d{0,2}))?$/g,
            message: '请输入正确的金额且只能保留2位小数',
            trigger: 'blur'
          }
        ],
        coupon: [
          { required: true, message: '请输入商品优惠券金额', trigger: 'blur' },
          {
            required: true,
            // pattern: /^\d+$/,
            pattern: /^(\d*)(\.(\d{0,2}))?$/g,
            message: '请输入正确的金额且只能保留2位小数',
            trigger: 'blur'
          }
        ],
        commission: [
          { required: true, message: '请输入商品佣金比例', trigger: 'blur' },
          {
            required: true,
            pattern: /^\d+$/,
            message: '请输入正确的比例',
            trigger: 'blur'
          }
        ],
        couponNumber: [
          { required: true, message: '请输入发放的优惠券的数量', trigger: 'blur' },
          {
            required: true,
            pattern: /^\d+$/,
            message: '请输入正确的比例',
            trigger: 'blur'
          }
        ],
        links: [
          { required: true, message: '请输入商品链接', trigger: 'blur' }
        ],
        goodsId: [
          { required: true, message: '请输入商品ID', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    'coupon' () {
      const { MarketPrice, Couponprice } = this.form
      if (Number(MarketPrice).toString() === 'NaN') return 0
      if (Number(Couponprice).toString() === 'NaN') return 0
      return (MarketPrice - Couponprice).toFixed(2) - 0
    }
  },
  created () {
    this.createGoodsId()
  },
  methods: {
    // 若商品id不存在则创建商品id,
    createGoodsId () {
      if (this.form.id) {
        return
      }
      createGoodsId().then(data => {
        this.form.id = data
      })
    },
    // 是否只保留了俩位小数
    isOnlyKeepTwoDecimal (val) {
      return /^(\d*)(\.(\d{0,2}))?$/g.test(val)
    },
    // 点击上传整体做个校验
    handleSumbit (form) {
      console.log('点击成功')
      // console.log(getUserId())
      console.log(this.form.type)
      // 校验图片是否上传
      if (!this.form.goodsPic) {
        this.$notify({
          title: '警告',
          message: '商品展示图还未上传',
          type: 'warning'
        })
        return
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          addGoods({
            sputitle: this.form.title,
            platform: this.form.type && platformMap[this.form.type],
            specs: this.form.guige,
            orprice: this.form.MarketPrice,
            disprice: this.form.Couponprice,
            coupon: this.coupon,
            proportion: this.form.commission,
            couponnumber: this.form.couponNumber,
            goodsurl: this.form.links,
            goodsId: this.form.goodsId,
            // bindId: getUserId(),
            cid: this.form.cid && this.form.cid.join('|'),
            id: this.form.id
          }).then(data => {
            console.log('这是返回的数据')
            console.log(data)
            this.$router.push({ name: 'storeGoodsMb' })
          })
        }
      })
    },
    handleSumbitSuccessAfter () {
      this.$confirm('审核期间请保持您的联系方式通畅！平台通过审核后，您的商品将会展示在选品榜中供红人们选择。', '上传商品成功', {
        confirmButtonText: '好的',
        type: 'success',
        showCancelButton: false,
        closeOnClickModal: false,
        showClose: false,
        size: 'sm',
        center: true
      }).then(() => {
        this.$router.push({ name: 'storeGoodsMb' })
      })
    },
    handleUploadGoodsPicSuccess (res, file) {
      this.form.goodsPic = URL.createObjectURL(file.raw)
      this.loading = false
    },
    handleUploadGoodsPicSuccess1 (res, file) {
      // this.form.goodsPic = URL.createObjectURL(file.raw)
      this.form.goodsPic2 = URL.createObjectURL(file.raw)
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

<style lang="less" >

.goods-pic-box {
  .goods-pic-uploader__icon {
    width: 148px !important;
    height: 148px !important;
    line-height: 148px !important;
  }
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
.page {
  .page-bd {
    .goods-pic-box .goods-pic-uploader .el-upload {
      width: 50%;
    }
  }
}
.el-form-item__label {
  font-size: 12px;
  font-weight: 700;
}
.el-checkbox__label {
  font-size: 12px;
}
.read-tip-item {
  .el-checkbox__label {
    font-weight: 700;
  }
}
.el-message-box {
  width: 300px;
  .el-message-box__title {
    font-size: 14px;
  }
  .el-message-box__status {
    font-size: 18px !important;
  }
  .el-message-box__message {
    font-size: 13px;
  }
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
</style>

<style lang="less" scoped>

// 商品图片 样式
.goods-pic-box {
  margin-bottom: 25px;
  text-align: center;
  .goods-pic-uploader {
    // display: inline-block;
    // margin-right: 36px;
    vertical-align: bottom;
    height: 100%;
  }
  @imgW: 180px;
  .goods-pic-uploader__icon {
    font-size: 28px;
    color: #8c939d;
    width:@imgW;
    height:@imgW;
    line-height: @imgW;
    text-align: center;
    font-size: 60px;
    color: #dee0e3;
  }
  .goods-pic {
    width:@imgW;
    height:@imgW;
    display: block;
  }
  .goods-pic-uploader-btn {
    // display: inline-block;
    // vertical-align: bottom;
    .upload-btn {
      width:180px;
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
}
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-shangchuan {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 250px;
  box-sizing: border-box;
  .sc-content {
    width: 400px;
    height: 100%;
    border-right-color: aqua;
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
  .ae {
    width: 200px;
    height: 40px;
    margin-right: 20px;
  }
}
</style>
<style lang="less" scoped>
.page {
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 5px;
  .page-bd {
    border-radius: 2px;
    padding: 20px 5px;
    background-color: #ffffff;
    position: sticky;
    top: 120px;
    z-index: 100;
  }
  // 商品图片 样式
  .goods-pic-box {
    margin-bottom: 25px;
    text-align: center;
    .goods-pic-uploader {
      // display: inline-block;
      // margin-right: 36px;
      vertical-align: bottom;
      // height: 130px;
    }
    @imgW: 120px;
    .goods-pic-uploader__icon {
      font-size: 28px;
      color: #8c939d;
      width:@imgW;
      height:@imgW;
      line-height: @imgW;
      text-align: center;
      font-size: 60px;
      color: #dee0e3;
    }
    .goods-pic {
      width:@imgW;
      height:@imgW;
      display: block;
    }
    .goods-pic-uploader-btn {
      .upload-btn {
        width:140px;
        height:30px;
        font-size:13px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        background-color: #fe336a;
        color:#fff;
        line-height:20px;
        letter-spacing: 2px;
        border-radius: 4px;
      }
    }
  }
  .pic-size-tip {
    font-size: 12px;
    color: #888;
  }
  .btn-group {
    text-align: center;
    .submit-btn {
      width:140px;
      height:30px;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      background-color: #fe336a;
      color:#fff;
      line-height:20px;
      letter-spacing: 2px;
      border-radius: 4px;
    }
  }
}
</style>
