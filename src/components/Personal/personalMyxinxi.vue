<template>
<!-- 我是信息一栏 -->
<div>
  <h2>我的信息</h2>
  <div class="conent-xinxi">
    <div class="top">
      <div class="top-touxiang">
        <!-- 上传头像 -->
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
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
        <div class="dvxcsergritub">点击上传头像(大小为1M以下)</div>

        <!--  -->
      </div>
      <div class="top-xm">
        <p>
          <span class="i89">红人姓名 ：</span>
          <span class="hr-xingming1">{{form.username || '--'}}</span>
        </p>
        <p>
          <span class="i89">账号状态 ：</span>
          <span class="i87">{{form.state | auditStateFilter}}</span>
          <span>
            <el-button type="text"
            @click="fanhuixiugai = true"
            class="shenghezhuangtaixiugai">{{form.state === 1 ? '修改' : (form.state === 2 ? '查看详情' : '修改')}}
            </el-button>
          </span>
        </p>
      </div>
    </div>
    <div class="form">
      <el-form ref="form" :model="form" label-width="100px">
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
        <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px">
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
        </el-form>
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
          <el-time-select v-model="form.startTime" :picker-options="{start: '00:00' ,step: '00:30', end: '23:30'}" placeholder="起始时间" prop="startTime"></el-time-select>
          <el-time-select v-model="form.endTime" :picker-options="{start: '00:00' ,step: '00:30', end: '23:30'}" placeholder="结束时间" prop="endTime"></el-time-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <!-- 这是修改弹出框 -->
  <!-- 这是修改弹出框 -->
  <el-dialog
    :title="form.state===2 ? '驳回原因' : '请修改注册信息'"
    :visible.sync="fanhuixiugai"
    width="50%"
    center>
    <div v-if="form.state === 2">
      <p>{{form.remarks}}</p>
      <div @click="innerVisible=true" class="skdbvisbdiv">前往修改</div>
      <!--  -->
      <el-dialog
        width="50%"
        title="请修改注册信息"
        :visible.sync="innerVisible"
        append-to-body>
        <xiugaiHongRen v-if="fanhuixiugai" :infData="form" v-model="updateRegStepIndex" @updateSuccess = "handleUpdateRegSuccess" ></xiugaiHongRen>
      </el-dialog>
    </div>
    <div v-else>
      <xiugaiHongRen v-if="fanhuixiugai" :infData="form" v-model="updateRegStepIndex" @updateSuccess = "handleUpdateRegSuccess" ></xiugaiHongRen>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { updateMyInf, fetchMyInf } from '@/api/user'
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
    console.log('xiug')
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
    getMyInf () {
      fetchMyInf().then(data => {
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
.dvxcsergritub {
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #fd3069;
  color: #ffffff;
  font-size: 12px;
}
.skdbvisbdiv {
  margin-top: 100px;
  margin: 0 auto;
  width: 100px;
  height: 50px;
  background-color: #fd346a;
  color: #fff;
  text-align: center;
  border-radius: 25px;
  line-height: 50px;
  font-size: 20px;
}
// 上传图片
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
  }
  .avatar-uploader .el-upload:hover {
    position: relative;
    // top: -105px;
  }
  .avatar-uploader-icon {
    position: relative;
    font-size: 28px;
    color: #8c939d;
    width: 87px;
    height: 87px;
    top: 0px;
    border-radius: 50%;
    line-height: 178px;
    // background-color: #fd395f;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
// 上传图片
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-xinxi {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 60px;
  box-sizing: border-box;
  .top {
    width: 600px;
    height: 160px;
    background-color: #fafafa;
    border: 1px solid #cccccc;
    .top-touxiang {
      width: 96px;
      // height: 100%;
      height: 96px;
      margin-top: 10px;
      margin-left: 20px;
      margin-right: 30px;
      float: left;
      text-align: center;
       img {
         display: block;
         width: 87px;
         height: 87px;
         border-radius: 50%;
         background-color: aqua;
       }
       p {
         font-size: 12px;
         color: #888888;
       }
    }
    .top-xm {
      margin-top: 30px;
      .i89 {
        font-size: 16px;
        color: #333333;

      }
      .hr-xingming1 {
        font-size: 16px;
        color: #fd395f;
      }
      .i87 {
        font-size: 16px;
        color: #888888;
      }
    }
  }
  .form {
    margin-top: 38px;
  }
}
</style>

<style lang="less">
.top-touxiang {
  .el-icon-plus:before {
    position: relative;
    top:-42px;
  }
}
.conent-xinxi {
  .el-button--primary {
    margin-left: 100%;
    margin-top: 50px;
    background-color: #fd346a;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__content {
    width: 210px;
    // width: 100%;
  }
  .shouhuo {
    .el-form-item__content {
      width: 500px;
    }
  }
  .demo-form-inline {
    padding-left: 50px;
    box-sizing: border-box;
    .el-form-item {
      width: 130px;
      .el-form-item__label {
        width: 50px !important;
      }
    }
    .el-form-item__content {
      width: 80px;
      .el-input__inner {
        padding: 2px;
      }
    }
  }
  .airtime-item {
    .el-form-item__content {
      width: 500px;
      .el-input {
        margin-right: 20px;
      }
    }
  }
}

.shenghezhuangtaixiugai {
  color: blue;
  margin-left: 15px;
}

.update-inf .el-form-item__content {
  // width: 210px;
  width: 100%;
}
</style>
