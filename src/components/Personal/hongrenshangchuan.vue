<template>
  <div class="hrshuju">
    <h2>上传数据</h2>
    <div class="shuju-content">
      <p class="shuju-xm">
        <span class="shuju-let">红人姓名</span>
        <span>{{uuu.username}}</span>
      </p>
      <!-- 上传直播商品 -->
      <div class="hr-shangchuan">
        <div class="shuju-let">近期直播商品</div>
        <el-upload
          class="avatar-uploader cust-uploader"
          :action="uploadGoodsPic4 + '&token=' + token"
          :on-success="(res, file) => handleUploadSuccess('liveAbout', file, res)"
          list-type="picture-card">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="file" slot-scope="{file}">
              <img
                style="width:148px;height:148px"
                :src="file.url" alt=""
              >
              <input style="width:148px" type="text" v-model ="file.liveLink" placeholder="直播链接">
               <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemoveFileByCust(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
            </span>
            </div>
        </el-upload>
      </div>
      <!-- 上传合作商家 -->
      <div class="hr-shangchuan">
        <div class="shuju-let">近期合作商家</div>
        <div>
          <el-upload
            list-type="picture-card"
            class="avatar-uploader"
            :action="uploadGoodsPic3 + '&token=' + token"
            :on-success="(res, file) => handleUploadSuccess('storeAbout', file, res)"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="hr-shangchuan">
        <div class="shuju-let" >直播数据</div>
          <div class="live-list">
            <div v-for="(item, index) of liveList" :key="index" style="margin-bottom: 10px">
              <button class="btn" type="text" style="width: 12px" @click="handleRemoveLiveRow(index)">x</button>
              <input class="input1" type="text" placeholder="商家名称" v-model="item.businessname">
              <input type="text" placeholder="销售量" v-model="item.sales">
            </div>
          </div>
          <div class="tianjia-btn" @click="handleNewLiveRow">点击继续添加</div>
      </div>
      <div class="hr-shangchuan">
        <div class="shuju-let">种草视频</div>
        <el-upload
          class="avatar-uploader cust-uploader"
          :action="uploadGoodsPic5 + '&token=' + token"
          :on-success="(res, file) => handleUploadSuccess('video', file, res)"
          list-type="picture-card">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="file" slot-scope="{file}">
              <video
                style="width:148px;height:148px"
                controls
                :src="file.url" alt=""
              />
            </div>
        </el-upload>
      </div>
      <div class="yiyiyiyi2">
        <el-button class="yiyiyiyi" type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import actions from '../../data/actions'
import { getToken } from '@/utils/auth'
import { fetchMyInf } from '@/api/user'
import { uploadFavoriteInf } from '@/api/favorite'
const { uploadGoodsPic4, uploadGoodsPic3, uploadGoodsPic5 } = actions
export default {
  data () {
    return {
      // userId: getUserId(),
      token: getToken(),
      imageUrl: '',
      uploadGoodsPic4,
      uuu: '',
      uploadGoodsPic3,
      uploadGoodsPic5,
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      },
      liveList: [{ businessname: '', sales: '' }],
      uploadedFiles: {
        liveAbout: [], // 近期直播有关文件
        storeAbout: [],
        video: []
      },
      videoList: []
    }
  },
  mounted () {
    this.getMyInf()
  },
  methods: {
    handleRemoveLiveRow (index) {
      this.liveList.splice(index, 1)
    },
    handleNewLiveRow () {
      // 添加直播数据
      this.liveList.push({
        businessname: '',
        sales: ''
      })
    },
    // 自定义移除文件
    handleRemoveFileByCust (file) {
      console.log(file)
    },
    // 提交
    handleSubmit () {
      console.log(this.uploadedFiles)
      let linkHasFill = true // 链接是否填写了
      const liveAboutInf = this.uploadedFiles['liveAbout'].map(file => {
        if (!file.liveLink) linkHasFill = false
        return {
          id: file.id,
          livelink: file.liveLink
        }
      })
      if (!linkHasFill || liveAboutInf.length < 1) {
        this.$message({
          message: liveAboutInf.length < 1 ? '请上传近期直播商品' : '请填写完直播商品中的链接',
          type: 'error'
        })
        return
      }
      const storeFiles = this.uploadedFiles['storeAbout']
      if (storeFiles.length < 1) {
        this.$message({
          message: '请上传近期合作商家',
          type: 'error'
        })
        return
      }
      const liveList = this.liveList
      if (!liveList || liveList.length < 1) {
        this.$message({
          message: liveList.length < 1 ? '请填写直播数据' : '请填写完直播数据',
          type: 'error'
        })
        return
      }
      for (let i = 0; i < liveList.length; i++) {
        const { businessname, sales } = liveList[i]
        if (businessname === '' || businessname === null || sales === '' || sales === null) {
          this.$message({
            message: '请填写完直播数据',
            type: 'error'
          })
          return
        }
      }
      const videoList = this.uploadedFiles['video']
      if (!videoList || videoList.length < 1) {
        this.$message({
          message: '请上传种草视频',
          type: 'error'
        })
        return
      }
      const form = {
        // bindId: this.userId,
        link: liveAboutInf,
        message: liveList
      }
      uploadFavoriteInf(form).then(data => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      }).catch(err => {
        console.log('上传失败' + err.message)
      })
    },
    handleUploadSuccess (type, file, res) {
      file.id = res.data.id
      file.url = res.data.url
      // 直播商品文件上传，添加liveLink 属性
      if (type === 'liveAbout') {
        file.liveLink = ''
      }
      this.uploadedFiles[type].push(file)
      console.log(this.uploadedFiles[type])
    },
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
    },
    // 上传前回调
    beforeUploadVideo (file) {
      var fileSize = file.size / 1024 / 1024 < 50
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
        // $ael.msg('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        // layer.msg('视频大小不能超过50MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    // 上传成功回调
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.Code === 0) {
        this.videoForm.showVideoPath = res.Data
      } else {
      }
    },
    getMyInf () {
      fetchMyInf({
        // id: this.userId
      }).then(data => {
        this.uuu = data
      })
    }

  }
}
</script>

<style lang="less">
.hrshuju {
  .cust-uploader {
    // margin-left: 10px;
    .el-upload-list--picture-card .el-upload-list__item {
      overflow: inherit;
    }
    .el-upload-list__item {
      margin-bottom: 55px;
    }
  }
  .el-button--primary {
    background-color: #fd3069;
    border-color: #fd3069;
    text-align:center;
    margin:0 auto;
  }
  input {
    width: 178px;
  }
  .el-upload-list {
    height: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 148px;
    height: 148px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
}
</style>

<style lang="less" socped>
.yiyiyiyi2 {
  text-align: center;
}
.yiyiyiyi {
  margin: 20px auto;
}
.input1 {
  margin-right: 20px;
}
.shuju-let {
  display: block;
  width: 100px;
  margin-right: 30px;
}
  h2 {
    height: 60px;
    width: 100%;
    line-height: 60px;
  }
  .shuju-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20px 20px;
    box-sizing: border-box;
    border: 1px solid #dddddd;
    .shuju-xm {
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:12px;
      display: flex;
      margin-bottom: 20px;
    }
    .hr-shangchuan {
      display: flex;
      display: -webkit-box;
      margin-top: 20px;
      height: 100%;
      .tianjia-btn {
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
        text-align: center;
        cursor: pointer;
        color: #ffffff;
        background-color: #fd3069;
      }
      input {
        padding: 5px;
        box-sizing: border-box;
      }
    }
  }
  .live-list {
    .btn {
      color: #888;
      margin-right: 10px;
      &:hover {
        color: rosybrown;
      }
    }
  }
</style>
