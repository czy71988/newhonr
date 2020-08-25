<template>
  <div class="PersonalMyVide0">
    <p class="Video_p1">种草视频</p>
    <p class="Video_p">红人视频：</p>
    <ul>
      <li v-for="item in goodslist" :key="item.id">
        <!-- <video :src="goodslist.recordUrl" alt="" class="Video_ul"></video> -->

            <video
            class="Video_ul"
              :src="item.recordUrl"
              controls>
            </video>
            <!-- <p>{{item.recordUrl}}</p> -->
            <img src="../../assets/new/组 666.png" alt="" class="img_icon" @click="shanchu(item.recordId)">
      </li>
    </ul>
    <p class="Video_p">新增种草视频：</p>
    <el-upload
      class="avatar-uploader"
      :action="actions.UploadWithoutPermission + '?type=4'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <video v-if="imageUrl" :src="imageUrl" class="avatar" controls></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="Video_btn" @click="wancheng">完成</div>
  </div>
</template>

<script>
import { honrMymessage, honrMyshuju, honrMyshujuNew, honrMyOut } from '../../api/newhonrList'
import actions from '../../data/actions'
export default {
  name: 'TestTwo',
  data () {
    return {
      actions,
      goodslist: '', // 近期直播商品
      page: '1',
      row: '10',
      imageUrl: ''
    }
  },
  mounted () {
    this.getlist1()
  },
  methods: {
    handleAvatarSuccess (response, file, fileList) {
      this.imageUrl = response.data.fullPath
      alert(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
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
            recordType: 3,
            redskinsId: id
          },
          page: this.page,
          rows: this.row
        }).then(data => {
          console.log('获取的红人详情数据3', data)
          this.goodslist = data.result
        })
      })
    },
    // 新增操作
    wancheng () {
      const token = sessionStorage.getItem('token')
      honrMyshujuNew({
        recordType: 3,
        urlType: 2,
        recordUrl: this.imageUrl,
        sessionId: token
      }).then(data => {
        this.imageUrl = ''
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.getlist1()
      })
    },
    // 删除操作
    shanchu (id) {
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
        width: 240px;
        height: 333px;
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
        position: relative;
        width: 240px;
        height: 333px;
        margin-right: 20px;
        .Video_ul {
          width: 240px;
          height: 333px;
        }
        .img_icon {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 8px;
          right: 8px;
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
