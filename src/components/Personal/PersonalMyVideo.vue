<template>
  <div class="PersonalMyVide0">
    <p class="Video_p1">种草视频</p>
    <p class="Video_p">红人视频：</p>
    <ul>
      <li>
        <img src="../../assets/new/测试.png" alt="" class="Video_ul">
      </li>
    </ul>
    <p class="Video_p">新增种草视频：</p>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="Video_btn">完成</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .PersonalMyVide0 {
    // 图片上传样式
    .avatar-uploader .el-upload {

        width: 240px;
        height: 333px;
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
      line-height: 333px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

<style lang="less" scoped>
  .PersonalMyVide0 {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .Video_p1 {
      line-height: 66px;
      padding-left: 40px;
      box-sizing: border-box;
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(85,85,85,1);
      opacity:1;
      border-bottom: 1px solid rgba(208,208,208,1);
    }
    .Video_p {
      line-height: 60px;
      padding-left: 40px;
      box-sizing: border-box;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      opacity:1;
    }
    ul {
      padding-left: 40px;
      box-sizing: border-box;
      li {
        display: inline-block;
        width: 240px;
        height: 333px;
        margin-right: 20px;
        .Video_ul {
          width: 240px;
          height: 333px;
        }
      }
    }
    .Video_btn {
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
