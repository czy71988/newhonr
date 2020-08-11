<template>
<!-- 申请取样 -->
  <div class="ApplicationSample page">
    <div class="page-bd">
      <!-- 样品信息 -->
      <div class="section">
        <div class="section__bd goods-sample-box">
          <div class="goods-sample-box__hd">
             <span class="platform">所属平台:</span>
             {{goodsInf.platform | platformStoreFilter}}
             <!-- <img class="logo" :src="goodsInf.platform | platformLogoFilter" alt="" /> -->
             <span class="store-name">店铺名称:</span>{{goodsInf.shopname || '--'}}
          </div>
          <div class="goods-sample-box__bd">
            <p class="title">
              取样商品
            </p>
            <div class="ctn-box goods-box">
              <div class="goods-img-wrap">
                <img class="goods-img" :src="goodsInf.goodimg" alt="">
              </div>
              <p class="goods-title">{{goodsInf.sputitle}}</p>
              <p class="price-inf-row">
                <span class="disprice">¥{{goodsInf.disprice - 0}}<span class="orprice">¥{{goodsInf.orprice - 0}}</span></span>
              </p>
              <p class="inf-row">
                佣金比例:
                <span>{{goodsInf.proportion}}%</span>
              </p>
              <p class="inf-row">
                销量:
                <span>{{goodsInf.monthvolume}}</span>
              </p>
              <!-- <p class="inf-row">
                优惠劵数量:
                <span>{{goodsInf.couponnumber}}</span>
              </p> -->
              <p class="inf-row">
                优惠劵金额:
                <span>{{goodsInf.coupon}}</span>
              </p>
            </div>
            <p class="title">
              带货能力&优势描述（必填）
            </p>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请填写带货能力&优势描述（必填）"
              v-model="textarea" ref="textArea">
            </el-input>
            <p class="title"></p>
            <p class="title">
              订单信息
            </p>
            <div class="ctn-box">
              <p class="inf-row">联系方式：{{orderInf.rephone}}</p>
              <p class="inf-row">收货人：{{orderInf.consigneeName}}</p>
              <p class="inf-row">收货地址：{{orderInf.consigneeAddress}}</p>
              <button class="update-order-inf-btn" @click="showUpdateInfoDialog = true">修改</button>
            </div>
          </div>
        </div>
      </div>
      <div class="section other-goods-sample-box">
        <p class="section__title">该店铺其他供样商品</p>
        <div class="section__bd">
          <div class="tip" v-if="!otherGoodsList || otherGoodsList.length === 0">
            此店铺暂无其他商品
          </div>
          <ul class="goods-list-wrap">
            <li class="goods-list__item goods-item" v-for="(item, index) in otherGoodsList" :key="item.id">
              <el-checkbox v-model="otherGoodsList[index].checked" class="check-box" type="otherSampleList">申请该样品</el-checkbox>
              <div class="main-bd">
                <div class="col">
                  <img class="goods-item__img" :src="item.goodimg" alt="">
                </div>
                <div class="col col-2">
                  <!-- <span class="row"><span class="label">销量</span>：<span class="value">{{item.monthvolume || 0}}</span></p> -->
                  <p class="row"><span class="label">原价</span>：<span class="value">¥{{item.disprice - 0 || '--'}}</span></p>
                  <p class="row"><span class="label">折后价</span>：<span class="value">¥{{item.orprice - 0 || '--'}}</span></p>
                  <p class="row"><span class="label">佣金比例</span>：<span class="value">¥{{item.proportion - 0 || '--'}}%</span></p>
                  <p class="row" v-if="item.couponnumber > 0"><span class="label">优惠券</span>：<span class="value">¥{{item.disprice - item.orprice}}</span> </p>
                </div>
              </div>
              <div class="goods-item__ft remark">
                <!-- <span class="goods-item__title">{{item.sputitle}}</span> -->
                <span class="label remark">标题:</span> <span class="value remark">{{item.sputitle || '--'}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 取样须知 -->
      <div class="tip-box">
        <p class="tip__title">取样须知</p>
        <p class="tip__item"> 1、申请的样品到样后七天内必须直播，由于样品问题播不了的，七天之内必须退样。
        如果不播又不退样的商家反馈到平台，平台对接人负责拉群尽力帮商家将样品追回，
        如果主播不按照平台规则处理，平台将主播账号封号三个月，严重者将做永久封号处理。</p>
        <p class="tip__item">2、为了改善主播拿样效率，商家的产品一旦被申请，请商家配合务必在两天之内审核。
        在审核通过后，三天之内寄样填写寄样单号。超时未审核和未填写寄样单号的订单将自动取消或者做异常处理。</p>
        <p class="tip__item">3、为了维护平台的健康持续发展，也为了维护大部分在平台拿样主播的利益。
        平台已在商家端开发了主播黑名单功能。对于在平台拿样又不能很好服务于平台上商家的主播，
        会越来越难以在平台上拿到样品。</p>
      </div>
      <!-- 提交按钮 -->
      <div class="btn-group">
        <button class="btn" @click="ApplicationSampleBtn">
          提交申请
        </button>
      </div>
    </div>
    <el-dialog title="修改收货地址" :visible.sync="showUpdateInfoDialog" width="90%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules" @submit.native.prevent>
        <el-form-item label="联系方式" prop="rephone">
          <el-input v-model="form.rephone"></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="consigneeName">
          <el-input v-model="form.consigneeName"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="consigneeAddress">
          <el-input v-model="form.consigneeAddress"></el-input>
        </el-form-item>
        <div class="btn-group">
          <button class="btn" @click="submitForm('form')">保存</button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { fetchApplicationSampleInf, addApplicationSample } from '@/api/goods'
import { fetchMyInf, updateMyInf } from '@/api/user'
import { MessageBox } from 'element-ui'
export default {
  data () {
    return {
      textarea: '',
      checked: false,
      checked1: false,
      otherGoodsList: [],
      checkedGoodsList: [],
      img: '',
      orderInf: {},
      goodsInf: {},
      showUpdateInfoDialog: false,
      form: {
        rephone: '',
        consigneeName: '',
        consigneeAddress: ''
      },
      rules: {
        rephone: [
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] },
          {
            required: true,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码',
            trigger: ['blur', 'change']
          }
        ],
        consigneeName: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        consigneeAddress: [
          { required: true, message: '请输入收货人地址', trigger: 'blur' }
        ]
      },
      bindId: '',
      data: null

    }
  },
  mounted () {
    this.getGoodsInf()
    this.getOrderInf()
  },
  watch: {
    showUpdateInfoDialog (val) {
      if (val) {
        // 修改body 为固定定位
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        document.body.classList.add('overflow-hiden')
      } else {
        document.body.classList.remove('overflow-hiden')
        window.scrollTo(0, this.scrollTop)
      }
    }
  },
  methods: {
    // 拉取页面数据
    getGoodsInf () {
      console.log('正在拉取数据')
      const id = this.$route.query.gid
      const bindId = this.$route.query.bindId
      console.log(id)
      fetchApplicationSampleInf({
        id: id,
        bindId: bindId
      }).then(data => {
        console.log(data)
        this.goodsInf = data.goods
        this.otherGoodsList = data.listgood && data.listgood.map(item => {
          return Object.assign({ checked: false }, item)
        })
      })
    },
    // 获取订单信息
    getOrderInf () {
      fetchMyInf({}).then(data => {
        console.log(data)
        this.orderInf = data
      })
    },
    // 点击提交申请
    ApplicationSampleBtn () {
      const id = this.$route.query.gid
      const bindId = this.$route.query.bindId
      if (!this.textarea) {
        this.$notify({
          message: '请填写带货能力&优势描述',
          type: 'warning',
          duration: 1000
        })
        this.$refs.textArea.focus()
        return
      }
      addApplicationSample({
        bindId: bindId,
        goodsId: id,
        depcit: this.textarea
      }).then(data => {
        console.log(data)
        // this.reload()
        MessageBox('申请成功')
      })
    },
    // 校验
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          updateMyInf({
            rephone: this.form.rephone,
            consigneeName: this.form.consigneeName,
            consigneeAddress: this.form.consigneeAddress
          }).then(data => {
            MessageBox('修改成功')
            this.showUpdateInfoDialog = false
          })
        }
      })
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
    padding: 18px;
    background-color: #ffffff;
  }
  .section {
    .section__title {
      font-size: 14px;
      font-weight: 700;
      padding: 15px 0px;
      // padding-left: 18px;
    }
    .goods-sample-box {
      padding: 10px;
      border: 1px solid #da1c1c;
    }
    .goods-sample-box__hd {
      font-size: 14px;
      border-bottom: 1px solid #DEDEDE;
      padding-bottom: 10px;
      span {
        vertical-align: middle;
        height: 25px;
        line-height: 25px;
      }
      .platform {
        font-size: 14px;
        font-weight: 700;
        margin-right: 15px;
      }
      .store-name {
        margin-left: 15px;
        font-weight: 700;
        margin-right: 15px;
      }
      .logo {
        width: 30px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .goods-sample-box__bd {
      .title {
        font-size: 14px;
        font-weight: 700;
        padding: 10px 0px;
      }
    }
    &.other-goods-sample-box {
      .tip {
        font-size: 20px;
        text-align: center;
        padding: 20px;
        padding-top: 10px;
      }
    }
    .ctn-box {
      position: relative;
      .inf-row {
        font-size: 14px;
        letter-spacing: 1px;
        line-height: 30px;
      }
      .update-order-inf-btn {
        background-color: #ffffff;
        position: absolute;
        right: 0px;
        height: 30px;
        line-height: 30px;
        right: 5px;
        top: 50%;
        margin-top: -15px;
        color: #FE3A60;
      }
      &.goods-box {
        border-bottom: 1px solid #DEDEDE;
        .goods-title {
          font-size: 14px;
        }
        .inf-row {
          font-size: 14px;
        }
        .goods-img-wrap {
          width: 100%;
          text-align: center;
          .goods-img {
            width: 120px;
            height: 120px;
          }
        }
        .price-inf-row {
          .disprice {
            font-size: 14px;
            color: #fe3a60;
          }
          .orprice {
            padding-left: 5px;
            font-size: 12px;
            text-decoration: line-through;
            color: #888;
          }
        }
      }
    }
  }
  .tip-box {
    // padding: 18px;
    .tip__title {
      text-align: center;
      font-size: 15px;
      font-weight: 800;
      margin-bottom: 10px;
    }
    .tip__item {
      font-size: 14px;
      text-align: justify;
      line-height: 22px;
      margin-bottom: 5px;
      letter-spacing: 1px;
    }
  }
  .btn-group {
    width: 100%;
    text-align: center;
    .btn {
      background-color: #fff;
      font-size:14px;
      width: 80%;
      max-width: 120px;
      height: 35px;
      line-height: 35px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:#ffffff;
      border: none;
      background: linear-gradient(90deg, #fd3069 0%, #ff4459 100%);
      border-radius: 6px;
    }
  }
   .goods-list {
    width: 100%;
  }
  .goods-item {
    position: relative;
    border: 1px solid #d6cfcf;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 14px;
    .check-box {
      position: absolute;
      top: 15px;
      left: 10px;
    }
    .main-bd {
      margin-top: 8px;
      width: 100%;
      // height: 100px;
      .col {
        // float: left;
        // height: 100px;
        text-align: center;
        &.col-2 {
          text-align: left;
          // float: right;
          // margin-right: 20px;
          // margin-left: 10%;
          margin-left: 10px;
        }
      }
    }
    .goods-item__img {
      border: 1px solid #f9f6f6;
      height: 98px;
      width: 98px;
      border-radius: 8px;
      // margin-right: 15px;
    }
    .goods-item__title {
      font-weight: 800;
    }
    .goods-item__audit-status {
      float: right;
      color: orange;
    }
    .row {
      color: #888;
      line-height: 25px;
      height: 25px;
      font-size: 14px;
    }
    .label {
      display: inline-block;
      width: 68px;
      // font-size: 14;
      text-align: justify;
      text-align-last:justify;
      color: #888;
      &.remark {
        margin-top: 6px;
        // width: 60px;
        font-weight: 700;
        text-align: left;
        width: auto;
      }
    }
    .value {
      letter-spacing: 0px;
      color: #888;
    }
    .goods-item__hd {
      min-height: 20px;
    }
    .goods-item__ft {
      margin-top: 2px;
      &.remark {
        margin-top: 2px;
        // border-top: 1px solid #f7f6f6;
        padding-left: 10px;
        letter-spacing: 0px;
        text-align: left;
      }
    }
    .btn-group {
      float: right;
      .btn {
        background-color: #fd3269;
        color: #ffffff;
        padding: 0 8px;
        height: 35px;
        width: 80px;
        line-height: 35px;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
}
</style>
