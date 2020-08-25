<template>
  <div class="My_shop">
    <p class="p_1">近期直播商品</p>
    <p class="p_2">近期直播商品：</p>
    <ul>
      <li v-for="item in goodslist" :key="item.id">
        <img :src="item.recordUrl" alt="">
        <p>{{item.recordName}}</p>
        <p>
          <span>销量</span>
          <span>{{item.orderCount}}</span>
        </p>
        <img @click="shujushanchu(item.recordId)" class="small_img" src="../../assets/new/组 666.png" alt="">
      </li>
    </ul>
    <p class="p_2">新增直播商品：</p>
    <el-upload
      class="avatar-uploader"
      :action="actions.UploadWithoutPermission + '?type=4'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="from.imageUrl" :src="from.imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="p_2">商品名称：</p>
    <el-input v-model="from.recordName" placeholder="请输入内容"></el-input>
    <p class="p_2">商品销量：</p>
    <el-input v-model="from.orderCount" placeholder="请输入内容"></el-input>

    <div class="over_btn" @click="wancheng">完成</div>
  </div>
</template>

<script>
import { honrMymessage, honrMyshuju, honrMyshujuNew, honrMyOut } from '../../api/newhonrList'
import actions from '../../data/actions'
export default {
  data () {
    return {
      actions,
      from: {
        imageUrl: '',
        recordName: '',
        orderCount: ''
      },
      goodslist: '', // 近期直播商品
      page: '1',
      row: '10'
    }
  },
  mounted () {
    this.getlist1()
  },
  methods: {

    handleAvatarSuccess (response, file, fileList) {
      this.from.imageUrl = response.data.fullPath
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
    },
    // 获取红人主键ID
    getlist1 () {
      const token = sessionStorage.getItem('token')
      honrMymessage({
        sessionId: token,
        redskinsId: ''
      }).then(data => {
        const id = data.redskinsId
        honrMyshuju({
          filters: {
            recordType: 1,
            redskinsId: id
          },
          page: this.page,
          rows: this.row
        }).then(data => {
          console.log('获取的红人详情数据1', data)
          this.goodslist = data.result
        })
      })
    },
    // 新增操作
    wancheng () {
      const token = sessionStorage.getItem('token')
      honrMyshujuNew({
        recordType: 1,
        recordName: this.from.recordName,
        orderCount: this.from.orderCount,
        urlType: 1,
        recordUrl: this.from.imageUrl,
        sessionId: token
      }).then(data => {
        this.from = {
          recordName: '',
          orderCount: '',
          imageUrl: ''
        }
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getlist1()
      })
    },
    // 删除数据
    shujushanchu (id) {
      const ids = id.split()
      const token = sessionStorage.getItem('token')
      // 删除数据
      honrMyOut({
        sessionId: token,
        recordIdList: ids
      }).then(data => {
        this.getlist1()
      })
    }
  }
}
</script>

<style lang="less">
  .My_shop {
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
  .My_shop {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    box-sizing: border-box;
    position: relative;
    .p_1 {
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
    .p_2 {
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:60px;
      color:rgba(144,144,144,1);
      opacity:1;
      padding-left: 40px;
      box-sizing: border-box;
    }
    ul {
      padding-left: 40px;
      box-sizing: border-box;
      li {
        display: inline-block;
        width: 170px;
        height: 237px;
        margin-right: 20px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 4px rgba(0,0,0,0.16);
        opacity:1;
        border-radius:5px;
        position: relative;
        img {
          width: 170px;
          height: 170px;
        }
        p {
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:40px;
          color:rgba(51,51,51,1);
          opacity:1;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          padding: 0 10px;
          box-sizing: border-box;
          span:nth-child(1) {
            font-size:14px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            opacity:1;
            margin-right: 10px;
          }
          span:nth-child(2) {
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(232,37,29,1);
            opacity:1;
          }
        }
        p:nth-child(3) {
          line-height: 16px;
        }
        .small_img {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 8px;
          right: 8px;
        }
      }
    }
    .over_btn{
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
  }
</style>
