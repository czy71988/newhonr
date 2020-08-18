<template>
  <div class="store_upload_shop">
    <p class="upload_shop_p1">新增商品</p>
    <div class="upload_cont">
      <p class="upload_cont_p">新增商品</p>
      <el-radio v-for="item in platformshangjia" :key="item.value" v-model="from.marketPlatform" :label="item.value">{{item.label}}</el-radio>

      <p class="upload_cont_p">商品分类：</p>
      <div class="asdf">
        <el-select v-model="from.goodsType" placeholder="请选择">
          <el-option
            v-for="item in contentCategoryData1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <p class="upload_cont_p">商品ID：</p>
      <div class="srter">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="from.platformGoodsId" class="input-with-select">
            <el-button class="element_btn" slot="append">一键填写</el-button>
          </el-input>
        </div>
      </div>

      <p class="upload_cont_p">商品主图：</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="from.goodsDrawingUrl" :src="from.goodsDrawingUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <p class="upload_cont_p">商品名称：</p>
      <el-input v-model="from.goodsName" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">商品规格：</p>
      <el-input v-model="from.goodsSpecification" placeholder="请输入内容"></el-input>
      <!-- <el-input v-model="from.inputs2" placeholder="请输入内容"></el-input>
      <el-input v-model="from.inputs3" placeholder="请输入内容"></el-input> -->

      <p class="upload_cont_p">商品价格：</p>
      <el-input v-model="from.goodsPrice" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">优惠券：</p>
      <el-input v-model="from.discountsCoupon" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">券后价：</p>
      <el-input v-model="from.goodsDiscountsPrice" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">佣金比例：</p>
      <el-input v-model="from.commissionRate" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">商品链接：</p>
      <el-input v-model="from.goodsLinkUrl" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">商品销量：</p>
      <el-input v-model="from.goodsSales" placeholder="请输入内容"></el-input>

      <p class="upload_cont_p">商品有效期：</p>
      <div class="sfrohn">
        <el-date-picker
          v-model="from.startTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-date-picker
          v-model="from.endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>

      <p class="upload_cont_p">商品详情图</p>
      <el-upload
        :action="'/zkurtg-red-api/public/uploadFiles'"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="from.dialogImageUrl" alt="">
      </el-dialog>

      <div class="upload_cont_btn" @click="over">完成</div>
    </div>
  </div>
</template>

<script>
import { platformshangjia, contentCategoryData1 } from '../../data/common'
import { storeShopnew } from '@/api/newshopList'
export default {
  data () {
    return {
      platformshangjia,
      contentCategoryData1,
      from: {
        marketPlatform: '1',
        goodsType: '',
        platformGoodsId: '',
        goodsDrawingUrl: '',
        goodsName: '',
        goodsSpecification: '',
        // inputs2: '',
        // inputs3: '',
        goodsPrice: '',
        discountsCoupon: '',
        goodsDiscountsPrice: '',
        commissionRate: '',
        goodsLinkUrl: '',
        goodsSales: '',
        startTime: '',
        endTime: '',
        goodsDetailsPicture: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 完成按钮
    over () {
      storeShopnew(this.from).then(data => {
        console.log(data)
        this.$router.push({ name: 'shangjiamyshangping' })
      })
    }
  }

}
</script>

<style lang="less">
  .store_upload_shop {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-input {
      margin: 5px 0;
      .el-input__inner {
        width:290px;
        height:42px;
        border:1px solid rgba(226,226,226,1);
        opacity:1;
        border-radius:10px;
      }
    }
  }
  .srter {
    .el-input-group {
      width:290px;
      height:42px;
      opacity:1;
      border-radius:10px;
      .el-input__inner {
        width: 183px;
        height:42px;
        border:1px solid rgba(226,226,226,1);
        border-right: none;
        opacity:1;
        border-radius:10px 0 0 10px;
      }
      .el-input-group__append {
        border-radius:0 10px 10px 0;
      }
    }
  }
  .asdf {
    .el-select {
      .el-input__inner {
        width:290px;
        height:42px;
        border:1px solid rgba(226,226,226,1);
        opacity:1;
        border-radius:10px;
      }
    }
  }
  .sfrohn {
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 150px;
      .el-input__inner {
        width: 135px;
      }
    }
  }
</style>

<style lang="less" scoped>
  .store_upload_shop {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .upload_shop_p1 {
      line-height: 66px;
      border-bottom: 1px solid rgba(208,208,208,1);
      padding-left: 30px;
      box-sizing: border-box;
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(85,85,85,1);
      opacity:1;
    }
    .upload_cont {
      padding-left: 200px;
      box-sizing: border-box;
      .upload_cont_p {
        line-height: 70px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(144,144,144,1);
        opacity:1;
      }
      .upload_cont_btn {
        width:170px;
        height:42px;
        background:rgba(234,64,57,1);
        opacity:1;
        border-radius:10px;
        margin: 60px auto;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:42px;
        color:rgba(255,255,255,1);
        opacity:1;
        text-align: center;
      }
      .element_btn {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(234,64,57,1);
        opacity:1;
      }
    }
  }
</style>
