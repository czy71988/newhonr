<template>
  <div class="My_Store">
    <p class="sgre_shop">近期合作商家</p>
    <p class="sgre_shop1">近期合作商家：</p>
    <ul>
      <li v-for="item in goodslist" :key="item.id">
        <img src="../../assets/new/组 666.png" alt="" class="img_icon" @click="shanchu(item.recordId)">
        <img :src="item.recordUrl" alt="" class="img_touxiang">
        <p class="store_p1">
          <span>合作商家：</span>
          <span>{{item.recordName}}</span>
        </p>
        <p class="store_p2">
          <span>销售额：</span>
          <span>{{item.orderSale}}</span>
        </p>
        <p class="store_p3">
          <span>单量：</span>
          <span>{{item.orderCount}}</span>
        </p>
      </li>
    </ul>
    <p class="sgre_shop1">新增合作商家：</p>
    <el-upload
      class="avatar-uploader"
      :action="actions.UploadWithoutPermission + '?type=4'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="from.imageUrl" :src="from.imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="sgre_shop1">商品名称：</p>
    <el-input v-model="from.shop_name" placeholder="请输入内容"></el-input>
    <p class="sgre_shop1">销售额：</p>
    <el-input v-model="from.shop_number" placeholder="请输入内容"></el-input>
    <p class="sgre_shop1">单量：</p>
    <el-input v-model="from.shop_number1" placeholder="请输入内容"></el-input>
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
      imageUrl: '',
      goodslist: [], // 近期直播商品
      page: '1',
      row: '10',
      from: {
        shop_name: '',
        shop_number: '',
        shop_number1: '',
        imageUrl: ''
      },
      ids: []
    }
  },
  mounted () {
    this.getlist1()
  },
  methods: {
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
            recordType: 2,
            redskinsId: id
          },
          page: this.page,
          rows: this.row
        }).then(data => {
          console.log('获取的红人详情数据2', data)
          this.goodslist = data.result
        })
      })
    },

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
    // 新增操作
    wancheng () {
      const token = sessionStorage.getItem('token')
      honrMyshujuNew({
        recordType: 2,
        recordName: this.from.shop_name,
        orderSale: this.from.shop_number,
        orderCount: this.from.shop_number1,
        urlType: 1,
        recordUrl: this.from.imageUrl,
        sessionId: token
      }).then(data => {
        this.from = {
          shop_name: '',
          shop_number: '',
          shop_number1: '',
          imageUrl: ''
        }
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getlist1()
      })
    },
    // 删除操作
    shanchu (id) {
      // return arr
      // this.ids[0].push(id)
      const ids = id.split()
      const token = sessionStorage.getItem('token')
      honrMyOut({
        sessionId: token,
        recordIdList: ids
      }).then(data => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getlist1()
      })
    }
  }
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
