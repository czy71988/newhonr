<template>
<!-- 申请取样 -->
  <div class="ApplicationSample">
    <div class="card-body">

      <div class="shop">
        <p class="hear">取样商品</p>
        <p class="hear-top">
          <span>详情</span>
          <span>销量</span>
          <span>优惠券数量</span>
          <span>优惠券金额</span>
        </p>
        <div class="item-shop">
          <span class="dgshop">
            <img :src="item.goodsDrawingUrl" alt="">
            <p class="dgshop_p1">{{item.goodsName}}</p>
            <p class="dgshop_p2">
              <span>¥{{item.goodsDiscountsPrice}}</span>
              <span>¥{{item.goodsPrice}}</span>
            </p>
            <p class="dgshop_p3">
              <span>佣金比例:</span>
              <span>{{item.commissionRate || '暂无'}}%</span>
            </p>
          </span>
          <span class="dgshop1">{{item.goodsSales}}</span>
          <span class="dgshop2">0</span>
          <span class="dgshop3">{{item.discountsCoupon}}</span>
        </div>
        <p class="hear">带货能力&优势描述（必填）</p>
        <div class="kuang">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.textarea2">
          </el-input>
        </div>
        <p class="hear">订单信息</p>
        <p class="xinxi_p">
          <span>联系方式：</span>
          <span v-if="input_show === true">
            <el-input
              placeholder="18321201141"
              v-model="form.input1"
              clearable>
            </el-input>
          </span>
          <span v-else>18321201141</span>
        </p>
        <p class="xinxi_p">
          <span>收货人：</span>
          <span v-if="input_show === true">
            <el-input
              placeholder="陈俊杰"
              v-model="form.input2"
              clearable>
            </el-input>
          </span>
          <span v-else>陈俊杰</span>
        </p>
        <p class="xinxi_p">
          <span>收货地址：</span>
          <span v-if="input_show === true">
            <el-input
              placeholder="上海市青浦区华新镇华志路1685号老一号楼"
              v-model="form.input3"
              clearable>
            </el-input>
          </span>
          <span v-else>上海市青浦区华新镇华志路1685号老一号楼</span>
        </p>
        <div class="xiugai_btn" @click="xiugai">修改</div>
      </div>

      <div class="elseshop">
        <p class="elseshop_top_p">该店铺其他供样商品</p>
        <p class="zhanwu">此 店 铺 暂 无 其 他 商 品</p>
        <div class="wenan">
          <p class="wen_p">取样须知</p>
          <p class="wen_p1">1、申请的样品到样后七天内必须直播，由于样品问题播不了的，七天之内必须退样。 如果不播又不退样的商家反馈到平台，平台对接人负责拉群尽力帮商家将样品追回， 如果主播不按照平台规则处理，平台将主播账号封号三个月，严重者将做永久封号处理。
          </p>
          <p class="wen_p2">
            2、为了改善主播拿样效率，商家的产品一旦被申请，请商家配合务必在两天之内审核。 在审核通过后，三天之内寄样填写寄样单号。超时未审核和未填写寄样单号的订单将自动取消或者做异常处理。
            </p>
          <p class="wen_p3">
            3、为了维护平台的健康持续发展，也为了维护大部分在平台拿样主播的利益。 平台已在商家端开发了主播黑名单功能。对于在平台拿样又不能很好服务于平台上商家的主播， 会越来越难以在平台上拿到样品。
          </p>
        </div>
        <div class="over_btn">提交申请</div>
      </div>

    </div>
  </div>
</template>
<script>
// import { fetchApplicationSampleInf, addApplicationSample } from '@/api/goods'
// import { fetchMyInf, updateMyInf } from '@/api/user'
// import { getToken } from '@/utils/auth.js'
// import { MessageBox } from 'element-ui'
export default {
  data () {
    return {
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
      form: {
        textarea2: '',
        input1: '',
        input2: '',
        input3: ''
      },
      input_show: false,
      item: {}

    }
  },
  created () {
  },
  mounted () {
    this.item = this.$route.query.item
    console.log('带过来的数据', this.item)
  },
  methods: {
    xiugai () {
      this.input_show = true
    }
  }

}
</script>

<style lang="less">
  .kuang {
    .el-textarea__inner {
      width:100%;
      height:126px;
      max-height:126px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(226,226,226,1);
      opacity:1;
      box-sizing: border-box;
    }
  }
  .xinxi_p {
    .el-input__inner {
      display: inline-block;
    }
  }
</style>

<style lang="less" scoped>
  .ApplicationSample {
    background-color: #F7F7F7;
    padding: 80px 480px;
    box-sizing: border-box;
    .card-body {
      width: 100%;
      height: 100%;
      //
      .shop {
        height: 690px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
        border-top: 2px solid #E8251D;
        padding: 0 30px;
        box-sizing: border-box;
        position: relative;
        .hear {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:550;
          line-height:37px;
          color:rgba(85,85,85,1);
          opacity:1;
          margin-top: 20px;
        }
        .hear-top {
          width: 100%;
          border: 1px solid rgba(226,226,226,1);box-sizing: border-box;
          span {
            display: inline-block;
            font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:40px;
            color:rgba(112,112,112,1);
            opacity:1;
            text-align: center;
            background:rgba(247,247,247,1);
            height: 40px;
          }
          span:nth-child(1) {
            width: 50%;
          }
          span:nth-child(2) {
            width: 17%;
          }
          span:nth-child(3) {
            width: 16%;
          }
          span:nth-child(4) {
            width: 17%;
          }
        }
        .item-shop {
          // width: 100%;
          border: 1px solid rgba(226,226,226,1);
          box-sizing: border-box;
          border-top: none;
          height: 130px;
          margin-bottom: 30px;
          span {
            vertical-align: top;
            display: inline-block;
            font-size:18px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(112,112,112,1);
            opacity:1;
          }
          .dgshop {
            width: 50%;
            height: 100%;
            border-left: none;
            box-sizing: border-box;
            padding: 20px;
            img {
              width: 90px;
              height: 90px;
              float: left;
              margin-right: 20px;
            }
            .dgshop_p1 {
              font-size:18px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:27px;
              color:rgba(51,51,51,1);
              opacity:1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              margin-bottom: 10px;
            }
            .dgshop_p2 {
              font-size:14px;
              font-family:PingFang SC;
              font-weight:400;
              line-height:27px;
              color:rgba(112,112,112,1);
              opacity:1;
              margin-bottom: 10px;
              span:nth-child(1) {
                font-size:20px;
                font-family:PingFangSC-Semibold;
                font-weight:400;
                line-height:27px;
                color:#E8251D;
                opacity:1;
                margin-right: 10px;
              }
            }
            .dgshop_p3 {
              font-size:15px;
              font-family:PingFang SC;
              font-weight:400;
              // line-height:27px;
              color:rgba(232,37,29,1);
              opacity:1;
              span:nth-child(2) {
                color: #E8251D;
              }
            }
          }
          .dgshop1 {
            width: 17%;
            text-align: center;
            line-height: 130px;
            border-left: 1px solid rgba(226,226,226,1);
            box-sizing: border-box;
          }
          .dgshop2 {
            width: 16%;
            text-align: center;
            line-height: 130px;
            border-left: 1px solid rgba(226,226,226,1);box-sizing: border-box;
          }
          .dgshop3 {
            width: 17%;
            text-align: center;
            line-height: 130px;
            border-left: 1px solid rgba(226,226,226,1);box-sizing: border-box;
          }
        }
        .kuang {
          width:100%;
          height:126px;
          margin-bottom: 30px;
        }
        .xinxi_p {
          font-size:18px;
          font-family:Source Han Sans CN;
          font-weight:400;
          // line-height:36px;
          color:rgba(112,112,112,1);
          opacity:1;
          margin-top: 20px;
          span {
            display: inline-block;
          }
          span:nth-child(1) {
            display: inline-block;
            width: 90px;
          }
        }
        .xiugai_btn {
          width:96px;
          height:34px;
          border:1px solid rgba(232,37,29,1);
          opacity:1;
          border-radius:21px;
          font-size:14px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:34px;
          color:rgba(232,37,29,1);
          opacity:1;
          text-align: center;
          position: absolute;
          bottom: 30px;
          right: 30px;
        }
      }
      //
      .elseshop {
        height: 820px;
        background:rgba(255,255,255,1);
        padding: 60px 30px;
        box-sizing: border-box;
        .elseshop_top_p {
          font-size:20px;
          font-family:PingFang SC;
          font-weight:600;
          // line-height:37px;
          color:rgba(85,85,85,1);
          opacity:1;
        }
        .zhanwu {
          font-size:45px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:104px;
          color:rgba(156,156,156,1);
          opacity:1;
          text-align: center;
        }
        .wenan {
          width:100%;
          height:425px;
          background:rgb(238, 98, 98);
          opacity:1;
          padding: 30px;
          box-sizing: border-box;
          margin-bottom: 60px;
          p {
            font-size:16px;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:32px;
            color:rgba(255,255,255,1);
            opacity:1;
            margin-top: 30px;
          }
          p:nth-child(1) {
            font-size:20px;
            font-family:Source Han Sans CN;
            font-weight:400;
            line-height:32px;
            color:rgba(255,255,255,1);
            opacity:1;
            text-align: center;
            margin-top: 0;
          }
        }
        .over_btn {
          width:170px;
          height:42px;
          background:rgba(234,64,57,1);
          opacity:1;
          border-radius:10px;
          text-align: center;
          font-size:16px;
          font-family:Source Han Sans CN;
          font-weight:400;
          line-height:42px;
          color:rgba(255,255,255,1);
          opacity:1;
          margin: auto;
        }
      }
    }
  }
</style>
