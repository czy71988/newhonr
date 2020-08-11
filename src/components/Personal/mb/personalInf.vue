<template>
<!-- 我是信息一栏 -->
<div class="page personal-inf-page">
  <div class="page-bd">
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :data="uploadHeaderData"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      list-type="picture"
      :before-upload="beforeAvatarUpload">
      <div class="upload-animation-box"
        v-loading="loading"
        element-loading-text="拼命上传中">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
    <p class="upload-pic-tip">点头像可更换(大小1M以下)</p>
    <el-form ref="form" :model="form" label-width="100px" @submit.native.prevent>
        <el-form-item label="红人姓名" class="sm-item">
          {{form.username || '--'}}
        </el-form-item>
        <el-form-item label="账号状态" prop="contentstate" class="sm-item">
          {{form.state | auditStateFilter}}
          <button type="text"
            class="btn update-inf-btn"
            @click="fanhuixiugai = true" >{{form.state === 1 ? '修改' : (form.state === 2 ? '查看详情' : '修改')}}
          </button>
        </el-form-item>
        <el-form-item label="所属平台" prop="platform">
          <el-select v-model="form.platform" multiple placeholder="所属平台">
            <el-option v-for="item in platformData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容分类" prop="contentstate">
          <el-select v-model="form.contentstate"  multiple placeholder="搞笑娱乐">
            <el-option v-for="item in contentCategoryData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="粉丝偏向" prop="deviationstate">
          <el-select v-model="form.deviationstate" placeholder="男女均衡">
            <el-option v-for="item in fansFavoriteData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="粉丝数量" prop="fansnumber">
          <el-input v-model="form.fansnumber" placeholder="请输入你的粉丝数量"></el-input>
        </el-form-item>
        <el-form-item label="最高获赞数" prop="toplikes">
          <el-input v-model="form.toplikes" placeholder="请输入你的最高获赞数"></el-input>
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="form.height" placeholder="CM"></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="form.weight" placeholder="KG"></el-input>
        </el-form-item>
        <el-form-item label="鞋码" prop="shoeSize">
          <el-input v-model="form.shoeSize" placeholder="码数"></el-input>
        </el-form-item>
        <el-form-item label="尺码" prop="size">
          <el-select v-model="form.size" placeholder="请选择">
            <el-option v-for="(item, index) in sizeData" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货地址" class="shouhuo" prop="consigneeAddress">
          <el-input type="textarea" v-model="form.consigneeAddress" placeholder="请输入详细收货地址"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名" prop="consigneeName">
          <el-input v-model="form.consigneeName" placeholder="请填写您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话" prop="rephone">
          <el-input v-model="form.rephone" placeholder="请填写您的联系电话"></el-input>
        </el-form-item>
        <el-form-item label="每天开播时间" class="airtime-item">
          <el-time-select v-model="form.startTime" :picker-options="{start: '00:00' ,step: '00:30', end: '23:30'}" placeholder="起始" prop="startTime"></el-time-select>
          <el-time-select v-model="form.endTime" :picker-options="{start: '00:00' ,step: '00:30', end: '23:30'}" placeholder="结束" prop="endTime"></el-time-select>
        </el-form-item>
        <div class="btn-group">
          <button class="submit-btn" @click="onSubmit">保存</button>
        </div>
      </el-form>
  </div>
  <!-- 这是修改弹出框 -->
  <el-dialog
    :title="form.state === 2 ? '驳回原因' : '请修改注册信息'"
    :visible.sync="fanhuixiugai"
    width="95%"
    center>
    <div v-if="form.state === 2 && !innerVisible">
      <p>{{form.remarks}}</p>
      <div @click="innerVisible=true" class="skdbvisbdiv">前往修改</div>
    </div>
    <div v-if="form.state !== 2 || (innerVisible && form.state === 2)">
      <xiugaiHongRen v-if="fanhuixiugai" :infData="form" v-model="updateRegStepIndex" @updateSuccess = "handleUpdateRegSuccess" ></xiugaiHongRen>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { updateMyInf, fetchMyInf, uploadHeadPotrait } from '@/api/user'
import { getToken } from '@/utils/auth'
import { platformData, contentCategoryData, fansFavoriteData, sizeData } from '@/data/common'
import xiugaiHongRen from '@/components/register/UpdateHongRen.vue'
import actions from '@/data/actions'
export default {
  data () {
    return {
      imageUrl: '', // 上传图片
      platformData, // 所属平台
      contentCategoryData, // 内容分类
      fansFavoriteData, // 粉丝偏向
      sizeData, // 尺码
      loading: false,
      tempForm: {
        platform: [],
        contentstate: [],
        deviationstate: '',
        fansnumber: '',
        toplikes: '',
        height: '',
        weight: '',
        shoeSize: '',
        size: '',
        consigneeName: '', // 收货人姓名
        consigneeAddress: '', // 收货人地址
        rephone: '', // 收货人电话
        startTime: '', // 开播开始时间
        endTime: '' // 开播结束时间
      },
      form: {
        platform: [],
        contentstate: [],
        deviationstate: '',
        fansnumber: '',
        toplikes: '',
        height: '',
        weight: '',
        shoeSize: '',
        size: '',
        consigneeName: '', // 收货人姓名
        consigneeAddress: '', // 收货人地址
        rephone: '', // 收货人电话
        startTime: '', // 开播开始时间
        endTime: '' // 开播结束时间
      },
      uploadHeaderData: {
        // id: getUserId()
      },
      action: actions.uploadHeadPotrait + '?token=' + getToken(),
      fanhuixiugai: false,
      innerVisible: false,
      updateRegStepIndex: 2 // 修改注册信息步骤
    }
  },
  components: {
    xiugaiHongRen
  },
  created () {
    this.getMyInf()
    console.log('我的信息被挂在了')
  },
  methods: {
    // 上传图片
    handleAvatarSuccess (res, file) {
      console.log('success')
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.loading = false
    },
    handleAvatarError () {
      this.loading = false
      this.$notify({
        title: '警告',
        message: '修改头像失败',
        type: 'warning'
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 <= 1
      if (isJPG && isLt2M) {
        this.loading = true
        return
      }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      } else if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return false
    },
    // 修改我的信息
    updateMyInf () {
      const form = Object.assign({}, this.form)
      delete form.state
      console.group('修改信息form')
      console.log(form)
      console.groupEnd()
      form.contentstate = form.contentstate && form.contentstate.join('|')
      form.platform = form.platform && form.platform.join('|')
      const tempForm = Object.keys(this.tempForm).reduce((result, key) => {
        result[key] = form[key]
        return result
      }, {})
      updateMyInf(tempForm, false).then(data => {
        console.group('修改我的信息')
        console.log(data)
        console.groupEnd()
        this.$notify({
          title: '保存成功',
          // message: '这是一条成功的提示消息',
          type: 'success'
        })
      }).catch(() => {
        this.$notify({
          title: '保存失败',
          // message: '保存失败',
          type: 'error'
        })
      })
    },
    shangchuantouxiang () {
      console.log('dianji')
      // const userId = getUserId()
      uploadHeadPotrait({
        // id: userId
      }).then(data => {
        console.log('afd')
      })
    },
    getMyInf () {
      // const userId = getUserId()
      console.group('获取我的个人信息')
      // console.log(userId)
      console.groupEnd()
      fetchMyInf({
        // id: userId
      }).then(data => {
        console.group('获取我的个人信息')
        console.log(data)
        console.groupEnd()
        this.form = this.formatMyInfData(data)
        this.imageUrl = data.headimgurl
      })
    },
    // 保存
    onSubmit () {
      this.updateMyInf()
    },
    formatMyInfData (data) { // 格式化我的个人信息数据
      // const platform = data.platform
      // 将平台，内容分类拼接字符串改成数组
      data.platform = data.platform && data.platform.split('|')
      data.contentstate = data.contentstate && data.contentstate.split('|')
      return data
    },
    // 修改注册信息成功
    // 重新获取信息
    handleUpdateRegSuccess () {
      this.fanhuixiugai = false
      this.getMyInf()
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 5px;
  .page-bd {
    border-radius: 10px;
    padding: 20px 5px;
    background-color: #ffffff;
  }
  .upload-pic-tip {
    font-size: 12px;
    color: #888;
    text-align: center;
    margin-bottom: 20px;
  }
  .update-inf-btn {
    padding: 1px 6px;
    border-radius: 4px;
    margin-left: 15px;
    color: #ffffff;
    background-color:  #ff4459;
  }
  .btn-group {
    text-align: center;
  }
  .submit-btn {
    width:140px;
    height:35px;
    line-height: 35px;
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
// 上传图片
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  width: 87px;
  height: 87px;
  border-radius: 50%;
  position: relative;
  top: -105px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    border: 1px solid #f7f4f4;
  }
}
.avatar-uploader .el-upload:hover {
  position: relative;
  top: -105px;
}
.avatar-uploader-icon {
  position: relative;
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  border: 1px solid #f7f4f4;
  top: 0px;
  border-radius: 50%;
  line-height: 120px;
  // background-color: #fd395f;
  text-align: center;
  margin-bottom: 10px;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
  border-radius: 50%;
}
</style>

<style lang="less">
.personal-inf-page {
  .sm-item {
    margin-bottom: 10px;
    .el-form-item__content {
      height: 30px;
      line-height: 30px;
      color: #888;
    }
    .el-form-item__label {
      height: 30px;
      line-height: 30px;
    }
  }
  .el-form-item__label {
    font-weight: 700;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item__content {
    // width: 100%;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
