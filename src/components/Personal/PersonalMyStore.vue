<template>
  <div class="My_Store">
    <p class="sgre_shop">近期合作商家</p>
    <p class="sgre_shop1">近期合作商家：</p>
    <ul>
      <li>
        <img src="../../assets/new/组 666.png" alt="" class="img_icon">
        <img src="../../assets/new/测试.png" alt="" class="img_touxiang">
        <p class="store_p1">
          <span>合作商家：</span>
          <span>旺仔牛奶</span>
        </p>
        <p class="store_p2">
          <span>销售额：</span>
          <span>200000</span>
        </p>
        <p class="store_p3">
          <span>单量：</span>
          <span>200000</span>
        </p>
      </li>
    </ul>
    <p class="sgre_shop1">新增合作商家：</p>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="sgre_shop1">商品名称：</p>
    <el-input v-model="shop_name" placeholder="请输入内容"></el-input>
    <p class="sgre_shop1">销售额：</p>
    <el-input v-model="shop_number" placeholder="请输入内容"></el-input>
    <p class="sgre_shop1">单量：</p>
    <el-input v-model="shop_number" placeholder="请输入内容"></el-input>
    <div class="over_btn">完成</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .My_Store {
    // 图片上传样式
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin-left: 40px;
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
      width:223px;
      height:42px;
      opacity:1;
      border-radius:10px;
      margin-left: 40px;
      .el-input__inner {
        width:223px;
        height:42px;
        border:1px solid rgba(226,226,226,1);
        opacity:1;
        border-radius:10px;
      }
    }
  }
</style>

<style lang="less" scoped>
  .My_Store {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .sgre_shop {
      line-height: 66px;
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(85,85,85,1);
      opacity:1;padding-left: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(208,208,208,1);
    }
    .sgre_shop1 {
      line-height: 62px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      opacity:1;
      padding-left: 40px;
      box-sizing: border-box;
    }
    ul {
      li {
        display: inline-block;
        width:400px;
        height:162px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(0,0,0,0.16);
        opacity:1;
        border-radius:5px;
        position: relative;
        margin-left: 40px;
        margin-bottom: 40px;
        .img_icon {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 8px;
          left: 8px;
        }
        .img_touxiang {
          width: 122px;
          height: 122px;
          margin: 20px;
          float: left;
        }
        p {
          span:nth-child(1) {
            display: inline-block;
            width: 90px;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:400;
            // line-height:25px;
            color:rgba(102,102,102,1);
            opacity:1;
            text-align: right;
          }
        }
        .store_p1 {
          margin-bottom: 20px;
          margin-top: 20px;
          span:nth-child(2) {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            opacity:1;
          }
        }
        .store_p2 {
          margin-bottom: 20px;
          span:nth-child(2) {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(188,0,0,1);
            opacity:1;
          }
        }
        .store_p3 {
          margin-bottom: 20px;
          span:nth-child(2) {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(232,138,29,1);
            opacity:1;
          }
        }
      }
    }
    .over_btn {
      width:170px;
      height:42px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:42px;
      color:rgba(255,255,255,1);
      opacity:1;
      text-align: center;
      margin: 60px auto;
    }
  }
</style>
