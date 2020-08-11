<template>
<div>
  <h2>商品修改</h2>
  <div class="conent-shangchuan">
    <div class="sc-content">
      <el-form ref="form" :model="form" label-width="138px" :rules="rules" @submit.native.prevent>
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
              <p>上传商品展示图</p>
              <p>(大小为1M以下)</p>
            </button>
          </el-upload>
        </div>
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="上架平台" prop="type">
          <el-radio v-model="form.type" label="拼多多">拼多多</el-radio>
          <el-radio v-model="form.type" label="天猫">天猫</el-radio>
          <el-radio v-model="form.type" label="淘宝">淘宝</el-radio>
        </el-form-item>
        <el-form-item label="商品分类" prop="cid">
          <el-select v-model="form.cid" multiple placeholder="请选择所属商品分类" class="aj6">
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
        <el-form-item label="优惠劵金额" prop="coupon1">
          <el-input v-model="coupon" placeholder="输入优惠劵金额" disabled></el-input>
        </el-form-item>
        <el-form-item label="佣金比例" prop="commission">
          <el-input v-model="form.commission" placeholder="输入比例"></el-input>
        </el-form-item>
        <el-form-item label="预计发放优惠劵数量" prop="couponNumber">
          <el-input v-model="form.couponNumber" placeholder="输入优惠劵数量"></el-input>
        </el-form-item>
        <el-form-item label="商品有效期" prop="expirationDate">
          <el-input v-model="form.expirationDate" placeholder="展示的有效期（格式为：2020-01-01）"></el-input>
        </el-form-item>
        <el-form-item label="商品链接" prop="links">
          <el-input v-model="form.links" placeholder="该商品在对应平台上商品详情页链接"></el-input>
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
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
            <img src="../../assets/微信图片_20200109202826.png" alt="">
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
</div>
</template>

<script>
import { addGoods, createGoodsId } from '@/api/goods'
// import { getUserId } from '@/utils/auth'
import actions from '@/data/actions'
// import { getgoodsshangjia } from '../../api/user'
import { contentCategoryStoreData } from '@/data/common'
const platformMap = {
  '淘宝': 0,
  '天猫': 1,
  '拼多多': 2,
  '京东': 3
}
export default {
  data () {
    return {
      actions,
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
        expirationDate: '',
        couponNumber: '',
        links: '',
        goodsId: '',
        goodsPic: null,
        id: ''
        // cid: []
      },
      scBtn: false,
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
        expirationDate: [
          { required: true, message: '请输入发放的优惠券的数量', trigger: 'blur' },
          {
            required: true,
            pattern: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/,
            message: '请输入正确的时间格式',
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
    this.getxinxi()
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
    jiaoyan (form) {
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
        console.log('---------')
        console.log(this.form.type && platformMap[this.form.type])
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
            expirationDate: this.form.expirationDate,
            id: this.form.id,
            auditStatus: 0
          }).then(data => {
            console.log('这是返回的数据')
            console.log(data)
            this.$router.push('/personal/shangjiamyshangping')
          })
        } else {
          console.log('这是啥？')
          return false
        }
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
    },
    // 获取商品信息
    getxinxi () {

    }
  }
}
</script>

<style lang="less">
  .sc-content {
    .el-form-item {
      height: 24px;
      margin-bottom: 20px;
    }
    .el-form-item__label {
      font-size: 12px;
      height: 24px;
      color: #323232;
    }
    .el-input__inner {
      font-size: 12px;
      height: 24px;
    }
    .el-checkbox-group {
      float: left;
      font-size: 12px;
      height: 24px;
    }
    .el-form-item__content {
      height: 24px;
      // line-height: 24px;
    }
    .el-checkbox {
      height: 24px;
      font-size: 12px;
      margin-right: 10px;
    }
    .el-checkbox__label {
      font-size: 12px;
      padding-left: 2px;
    }
    .el-checkbox:last-of-type {
      margin-right: 0;
    }
    .el-form-item__error {
      padding-top: 10px;
    }
  }
  .motai {
    .el-dialog {
      padding: 0 50px;
      width: 500px;
      text-align: center;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .el-button {
      background-color: #fe336a;
      color: #fff;
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
// 商品图片 样式
.goods-pic-box {
  margin-bottom: 25px;
  text-align: center;
  .goods-pic-uploader {
    // display: inline-block;
    // margin-right: 36px;
    vertical-align: bottom;
    height: 190px;
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
</style>
