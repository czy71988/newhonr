<template>
  <div class="store_new_shenqing">
    <p class="sotre_new_p1">重新申请</p>
    <div class="vontent">
      <p class="p1">请输入姓名：</p>
      <el-input v-model="from.name" placeholder="请输入内容"></el-input>
      <p class="p1">请选择地址：</p>
      <div class="diqu">
        <el-select v-model="value" placeholder="省">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="市">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="区">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <p class="p1">请选择所属平台：</p>
      <el-select v-model="from.pingtai" multiple placeholder="请选择">
        <el-option
          v-for="item in platformshangjia"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p class="p1">请选择内容分类：</p>
      <el-select v-model="from.neirong" multiple placeholder="请选择">
        <el-option
          v-for="item in contentCategoryData1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p class="p1">请输入店铺名称：</p>
      <el-input v-model="from.shop_name" placeholder="请输入内容"></el-input>
      <p class="p1">企业名称：</p>
      <el-input v-model="from.qiye_name" placeholder="请填写企业名称（与营业执照一致）"></el-input>
      <el-input v-model="from.daima" placeholder="请填写企业统一社会信用代码"></el-input>
      <p class="p1">企业营业执照照片：</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="from.img" :src="from.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p class="p1">上传身份证照片：</p>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="from.img1" :src="from.img1" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="from.img2" :src="from.img2" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

    </div>
  </div>
</template>

<script>
import { platformshangjia, contentCategoryData1 } from '../../data/common'
export default {
  data () {
    return {
      platformshangjia,
      contentCategoryData1,
      from: {
        name: '',
        city1: '',
        pingtai: [],
        neirong: [],
        shop_name: '',
        qiye_name: '',
        daima: '',
        img: '',
        img1: '',
        img2: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="less">
  .store_new_shenqing {
    .vontent {
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
        margin: 10px 0;
        .el-input__inner {
          width:290px;
          height:42px;
          border:1px solid rgba(226,226,226,1);
          opacity:1;
          border-radius:10px;
        }
      }
      .diqu {
        .el-select {
          margin: 10px 10px 10px 0;
          .el-input__inner {
            width:83px;
            height:42px;
            border:1px solid rgba(226,226,226,1);
            opacity:1;
            border-radius:10px;
          }
        }
      }
    }
  }

</style>

<style lang="less" scoped>
  .store_new_shenqing {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .sotre_new_p1 {
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
    .vontent {
      padding-left: 200px;
      box-sizing: border-box;
      .p1 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:37px;
        color:rgba(144,144,144,1);
        opacity:1;
      }
    }
  }
</style>
