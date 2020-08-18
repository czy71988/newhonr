<template>
  <div class="honrXx">
    <div class="honr_touxiang">
      <img src="../../assets/new/测试.png" alt="">
      <img class="img1" src="../../assets/new/组 247.png" alt="">
    </div>
    <div class="content">
      <p>
        <span class="span1">我的信息</span>
        <span v-if="show" @click="getsshow" class="span2">修改</span>
      </p>
      <div class="fenxian"></div>
      <p class="p1">红人姓名：</p>
      <p v-if="show" class="p2">张银攀</p>
      <el-input v-else v-model="this.from.redskinsName" placeholder="请输入内容"></el-input>

      <p class="p1">所属平台：</p>
      <p v-if="show" class="p2">
        <ul class="ul1">
          <li>淘宝</li>
          <li>拼多多</li>
        </ul>
      </p>
      <el-select v-else v-model="this.from.redskinsPlatform" multiple placeholder="请选择">
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
          <li>淘宝</li>
          <li>拼多多</li>
        </ul>
      </p>
      <el-select v-else v-model="this.from.contentType" multiple placeholder="请选择">
        <el-option
          v-for="item in contentCategoryData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <p class="p1">粉丝偏向：</p>
      <p v-if="show" class="p2">男粉多</p>
      <el-select v-else v-model="this.from.fansType" multiple placeholder="请选择">
        <el-option
          v-for="item in fansFavoriteData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <p class="p1">粉丝数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.fansAmount" placeholder="请输入内容"></el-input>

      <p class="p1">最高获赞数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.highestLikes" placeholder="请输入内容"></el-input>

      <p class="p1">直播观看数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.liveStreamingAmount" placeholder="请输入内容"></el-input>

      <p class="p1">图文浏览数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.imageTextView" placeholder="请输入内容"></el-input>

      <p class="p1">短视频观看数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.videosWatchedAmount" placeholder="请输入内容"></el-input>

      <p class="p1">视频发布数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.monitorRelease" placeholder="请输入内容"></el-input>

      <p class="p1">引导进店数量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.guidanceShop" placeholder="请输入内容"></el-input>

      <p class="p1">总销售额：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.totalSales" placeholder="请输入内容"></el-input>

      <p class="p1">总客单量：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.totalCustomerOrders" placeholder="请输入内容"></el-input>

      <p class="p1">均客单价：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.averageCustomerUnitprice" placeholder="请输入内容"></el-input>

      <p class="p1">身高：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.redskinsStature" placeholder="请输入内容"></el-input>

      <p class="p1">体重：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.redskinsWeight" placeholder="请输入内容"></el-input>

      <p class="p1">鞋码：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.redskinsShoes" placeholder="请输入内容"></el-input>

      <p class="p1">尺寸：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.codeSize" placeholder="请输入内容"></el-input>

      <p class="p1">收货人姓名：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.deliveryAddressName" placeholder="请输入内容"></el-input>

      <p class="p1">收货人电话：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input v-else v-model="this.from.deliveryAddressPhone" placeholder="请输入内容"></el-input>

      <p class="p1">收货地址：</p>
      <p v-if="show" class="p2">59846万+</p>
      <el-input
        v-else
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="this.from.deliveryAddressDetails">
      </el-input>

      <p class="p1">每天开播时间：</p>
      <p v-if="show" class="p2">59846万+</p>
      <!-- <el-input v-else v-model="this.from.dailyBroadcastStart" placeholder="请输入内容"></el-input> -->
      <p v-else>
        <el-time-picker
          v-model="this.from.dailyBroadcastStart"
          placeholder="开始时间">
        </el-time-picker>
        <el-time-picker
          arrow-control
          v-model="this.from.dailyBroadcastEnd"
          placeholder="结束时间">
        </el-time-picker>
      </p>

    </div>
    <div @click="baocun" v-if="!show" class="bnt">完成</div>
  </div>
</template>

<script>
import { platformData, contentCategoryData, fansFavoriteData } from '../../data/common'
export default {
  data () {
    return {
      show: true,
      platformData,
      contentCategoryData,
      fansFavoriteData,
      from: {
        redskinsName: '', // 红人姓名
        redskinsPlatform: [], // 所属平台：
        contentType: [], // 内容分类：
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
      }
    }
  },
  methods: {
    getsshow () {
      this.show = !this.show
    },
    baocun () {
      this.show = !this.show
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
