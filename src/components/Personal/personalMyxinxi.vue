<template>
  <div class="honrXx">
    <div class="honr_touxiang">
      <el-upload
        class="avatar-uploader"
        :action="actions.UploadWithoutPermission + '?type=3'"
        :show-file-list="false"
        :headers='{"sessionId": token}'
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img :src="data.imageUrl" alt="">
        <img class="img1" src="../../assets/new/组 247.png" alt="">
      </el-upload>
    </div>
    <div class="content">
      <p>
        <span class="span1">我的信息</span>
        <span v-if="show" @click="getsshow" class="span2">修改</span>
      </p>
      <div class="fenxian"></div>
      <p class="p1">红人姓名：</p>
      <p v-if="show" class="p2">{{data.redskinsName || '--'}}</p>
      <el-input v-else v-model="from.redskinsName" placeholder="请输入内容"></el-input>

      <p class="p1">所属平台：</p>
      <p v-if="show" class="p2">
        <ul class="ul1">
          <li v-for="item in pintai" :key="item.id">{{item | platformFilter}}</li>
          <!-- <li>拼多多</li> -->
        </ul>
      </p>
      <el-select v-else v-model="from.redskinsPlatform" placeholder="请选择所属平台">
        <el-option
          v-for="item in platformData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <p class="p1">内容分类：</p>
      <p v-if="show" class="p2">
        <ul class="ul2">
          <li v-for="item in neirong" :key="item.id">{{item | contentCategoryFilter}}</li>
        </ul>
      </p>
      <el-select v-else v-model="from.contentType" multiple placeholder="请选择内容分类">
        <el-option
          v-for="item in contentCategoryData1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <p class="p1">粉丝偏向：</p>
      <p v-if="show" class="p2">{{data.fansType.toString() | fansFavoriteFilter}}</p>
      <el-select v-else v-model="from.fansType" placeholder="请选择粉丝偏向">
        <el-option
          v-for="item in fansFavoriteData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <p class="p1">粉丝数量：</p>
      <p v-if="show" class="p2">{{data.fansAmount || '--'}}万+</p>
      <el-input v-else v-model="from.fansAmount" placeholder="请输入内容"></el-input>

      <p class="p1">最高获赞数量：</p>
      <p v-if="show" class="p2">{{data.highestLikes || '--'}}万+</p>
      <el-input v-else v-model="from.highestLikes" placeholder="请输入内容"></el-input>

      <p class="p1">直播观看数量：</p>
      <p v-if="show" class="p2">{{data.liveStreamingAmount || '--'}}万+</p>
      <el-input v-else v-model="from.liveStreamingAmount" placeholder="请输入内容"></el-input>

      <p class="p1">图文浏览数量：</p>
      <p v-if="show" class="p2">{{data.imageTextView || '--'}}万+</p>
      <el-input v-else v-model="from.imageTextView" placeholder="请输入内容"></el-input>

      <p class="p1">短视频观看数量：</p>
      <p v-if="show" class="p2">{{data.videosWatchedAmount || '--'}}万+</p>
      <el-input v-else v-model="from.videosWatchedAmount" placeholder="请输入内容"></el-input>

      <p class="p1">视频发布数量：</p>
      <p v-if="show" class="p2">{{data.monitorRelease || '--'}}万+</p>
      <el-input v-else v-model="from.monitorRelease" placeholder="请输入内容"></el-input>

      <p class="p1">引导进店数量：</p>
      <p v-if="show" class="p2">{{data.guidanceShop || '--'}}万+</p>
      <el-input v-else v-model="from.guidanceShop" placeholder="请输入内容"></el-input>

      <p class="p1">总销售额：</p>
      <p v-if="show" class="p2">{{data.totalSales}}万+</p>
      <el-input v-else v-model="from.totalSales" placeholder="请输入内容"></el-input>

      <p class="p1">总客单量：</p>
      <p v-if="show" class="p2">{{data.totalSales || '--'}}万+</p>
      <el-input v-else v-model="from.totalCustomerOrders" placeholder="请输入内容"></el-input>

      <p class="p1">均客单价：</p>
      <p v-if="show" class="p2">{{data.averageCustomerUnitprice || '--'}}万+</p>
      <el-input v-else v-model="from.averageCustomerUnitprice" placeholder="请输入内容"></el-input>

      <p class="p1">身高：</p>
      <p v-if="show" class="p2">{{data.redskinsStature || '--'}}CM</p>
      <el-input v-else v-model="from.redskinsStature" placeholder="请输入内容"></el-input>

      <p class="p1">体重：</p>
      <p v-if="show" class="p2">{{data.redskinsWeight || '--'}}KG</p>
      <el-input v-else v-model="from.redskinsWeight" placeholder="请输入内容"></el-input>

      <p class="p1">鞋码：</p>
      <p v-if="show" class="p2">{{data.redskinsShoes || '--'}}</p>
      <el-input v-else v-model="from.redskinsShoes" placeholder="请输入内容"></el-input>

      <p class="p1">尺寸：</p>
      <p v-if="show" class="p2">{{data.codeSize || '--'}}</p>
      <el-input v-else v-model="from.codeSize" placeholder="请输入内容"></el-input>

      <p class="p1">收货人姓名：</p>
      <p v-if="show" class="p2">{{data.deliveryAddressName || '--'}}</p>
      <el-input v-else v-model="from.deliveryAddressName" placeholder="请输入内容"></el-input>

      <p class="p1">收货人电话：</p>
      <p v-if="show" class="p2">{{data.deliveryAddressPhone || '--'}}</p>
      <el-input v-else v-model="from.deliveryAddressPhone" placeholder="请输入内容"></el-input>

      <p class="p1">收货地址：</p>
      <p v-if="show" class="p2">{{data.deliveryAddressProvince || '--'}} {{data.city || '--'}} {{data.district || '--'}}</p>
      <el-input
        v-else
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="from.deliveryAddressDetails">
      </el-input>

      <p class="p1">每天开播时间：</p>
      <p v-if="show" class="p2">{{data.dailyBroadcastStart | timefilter}} - {{data.dailyBroadcastEn | timefilter}}</p>
      <!-- <el-input v-else v-model="this.from.dailyBroadcastStart" placeholder="请输入内容"></el-input> -->
      <p v-else>
        <!-- <el-time-picker
          v-model="from.dailyBroadcastStart"
          placeholder="开始时间">
        </el-time-picker>
        <el-time-picker
          arrow-control
          v-model="from.dailyBroadcastEnd"
          placeholder="结束时间">
        </el-time-picker> -->
        <el-time-select
          placeholder="起始时间"
          v-model="from.dailyBroadcastStart"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }">
        </el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="from.dailyBroadcastEnd"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }">
        </el-time-select>
      </p>

    </div>
    <div @click="baocun" v-if="!show" class="bnt">完成</div>
  </div>
</template>

<script>
import { platformData, contentCategoryData1, fansFavoriteData } from '../../data/common'
import { honrMymessage, honrMymessageModify } from '../../api/newhonrList'
import actions from '../../data/actions'
export default {
  data () {
    return {
      actions,
      show: true,
      platformData,
      contentCategoryData1,
      fansFavoriteData,
      from: {
        redskinsName: '', // 红人姓名
        redskinsPlatform: [], // 所属平台：
        contentType: '', // 内容分类：
        fansType: '', // 粉丝偏向：
        fansAmount: '', // 粉丝数量：
        highestLikes: '', // 最高获赞数量：
        liveStreamingAmount: '', // 直播观看数量：
        imageTextView: '', // 图文浏览数量：
        videosWatchedAmount: '', // 短视频观看数量：
        monitorRelease: '', // 视频发布数量：
        guidanceShop: '', // 引导进店数量：
        totalSales: '', // 总销售额：
        totalCustomerOrders: '', // 总客单量：
        averageCustomerUnitprice: '', // 均客单价：
        redskinsStature: '', // 身高：
        redskinsWeight: '', // 体重：
        redskinsShoes: '', // 鞋码：
        codeSize: '', // 尺寸
        deliveryAddressName: '', // 收货人姓名：
        deliveryAddressPhone: '', // 收货人电话：
        deliveryAddressDetails: '', // 收货地址：
        dailyBroadcastStart: '', // 每天开播时间：
        dailyBroadcastEnd: '' // 每天结束时间：
      },
      data: {},
      pintai: [], // 平台
      neirong: [], // 内容
      id: '',
      token: sessionStorage.getItem('token'),
      imgPath: '',
      imgUrl: ''
    }
  },
  mounted () {
    this.getlist()
  },
  methods: {
    // 点击修改按钮
    getsshow () {
      this.show = !this.show
      this.from = this.data
    },
    // 修改保存按钮
    baocun () {
      this.show = !this.show
      const token = sessionStorage.getItem('token')
      honrMymessageModify({
        sessionId: token,
        redskinsName: this.from.redskinsName, // 红人姓名
        redskinsPlatform: this.from.redskinsPlatform + '', // 所属平台：
        contentType: this.from.contentType + '', // 内容分类：
        fansType: this.from.fansType, // 粉丝偏向：
        fansAmount: this.from.fansAmount, // 粉丝数量：
        highestLikes: this.from.highestLikes, // 最高获赞数量：
        liveStreamingAmount: this.from.liveStreamingAmount, // 直播观看数量：
        imageTextView: this.from.imageTextView, // 图文浏览数量：
        videosWatchedAmount: this.from.videosWatchedAmount, // 短视频观看数量：
        monitorRelease: this.from.monitorRelease, // 视频发布数量：
        guidanceShop: this.from.guidanceShop, // 引导进店数量：
        totalSales: this.from.totalSales, // 总销售额：
        totalCustomerOrders: this.from.totalCustomerOrders, // 总客单量：
        averageCustomerUnitprice: this.from.averageCustomerUnitprice, // 均客单价：
        redskinsStature: this.from.redskinsStature, // 身高：
        redskinsWeight: this.from.redskinsWeight, // 体重：
        redskinsShoes: this.from.redskinsShoes, // 鞋码：
        codeSize: this.from.codeSize, // 尺寸
        deliveryAddressName: this.from.deliveryAddressName, // 收货人姓名：
        deliveryAddressPhone: this.from.deliveryAddressPhone, // 收货人电话：
        deliveryAddressDetails: this.from.deliveryAddressDetails, // 收货地址：
        dailyBroadcastStart: this.from.dailyBroadcastStart, // 每天开播时间：
        dailyBroadcastEnd: this.from.dailyBroadcastEnd // 每天结束时间：
      }).then(data => {
        this.getlist()
      })
    },
    // 获取信息
    getlist () {
      const token = sessionStorage.getItem('token')
      honrMymessage({
        sessionId: token,
        redskinsId: ''
      }).then(data => {
        console.log('oooo', data)
        console.log(data.fansType)
        this.data = data
        this.id = data.redskinsId
        this.pintai = data.redskinsPlatform.split(',')
        this.neirong = data.contentType.split(',')
        console.log('所属平台2', this.pintai)
      })
    },
    // 上传头像
    handleAvatarSuccess (response, res, file) {
      this.imgPath = response.data.path
      this.imgUrl = response.data.fullPath
      this.data.imageUrl = response.data.fullPath
      honrMymessageModify({
        imagePath: this.imgPath,
        redskinsId: this.id,
        imageUrl: this.imgUrl
      }).then(data => {

      })
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
.honrXx {
  .el-input {
    .el-input__inner {
      width:290px;
      height:42px;
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      border-radius:10px;
    }
  }
  .el-textarea {
    .el-textarea__inner {
      width:290px;
      height:97px;
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      border-radius:10px;
      margin-bottom: 20px;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {

      width: 150px;
    .el-input__inner {

      width: 135px;
    }
  }
}
</style>

<style lang="less" socped>
  .honrXx {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top: 2px solid rgba(232,37,29,1);
    padding-left: 45px;
    padding-top: 30px;
    box-sizing: border-box;
    position: relative;
    .honr_touxiang {
      width: 110px;
      float: left;
      img {
        width:110px;
        height:110px;
        background:rgba(217,217,217,1);
        border:3px solid rgba(244,244,244,1);
        border-radius:50%;
        opacity:1
      }
      .img1 {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 125px;
        left: 125px;
      }
    }
    .content {
      width: 100%;
      height: 100%;
      padding-left: 157px;
      box-sizing: border-box;
      p {
        .span1 {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(85,85,85,1);
          opacity:1;
          line-height:25px;
          margin-right: 10px;
        }
        .span2 {
          display: inline-block;
          width:45px;
          height:25px;
          border:1px solid rgba(232,37,29,1);
          opacity:1;
          border-radius:6px;
          font-size:12px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:25px;
          color:rgba(232,37,29,1);
          opacity:1;
          text-align: center;
        }
      }
      .fenxian {
        width: 100%;
        height:2px;
        border:1px solid rgba(208,208,208,1);
        opacity:1;
        box-sizing: border-box;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .p1 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:36px;
        color:rgba(153,153,153,1);
        opacity:1;
      }
      .p2 {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:55px;
        color:rgba(51,51,51,1);
        opacity:1;
        .ul1 {
          li {
            display: inline-block;
            margin-right: 10px;
            padding: 0 8px;
            box-sizing: border-box;
            height:26px;
            line-height: 26px;
            background:rgba(237,35,26,1);
            opacity:0.84;
            border-radius:8px;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            opacity:1;
          }
        }
        .ul2 {
          li {
            display: inline-block;
            margin-right: 10px;
            padding: 0 8px;
            box-sizing: border-box;
            height:26px;
            line-height: 26px;
            background:#E88A1D;
            opacity:0.84;
            border-radius:8px;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            opacity:1;
          }
        }
      }
    }
    .bnt {
      width:170px;
      height:42px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      margin-top: 60px;
      text-align: center;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:42px;
      color:rgba(255,255,255,1);
      opacity:1;
      margin: 60px auto;
    }
  }
</style>
