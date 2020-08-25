<template>
  <div class="zhuce_hr">

    <div class="fanhui" @click="btn" v-if="index !==1"><i class="el-icon-arrow-left"></i>上一步</div>
    <div class="onw" v-if="index === 1">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="姓名" prop="redskinsName">
          <el-input v-model="from.vendorName" placeholder="请输入商家姓名"></el-input>
        </el-form-item>

        <div class="dizhixuanze">
          <!-- <el-form-item label="地址">
            <el-select v-model="from.province" placeholder="省" @focus="handleProvinceChange">
              <el-option
                v-for="item in provinceMap"
                :key="item[0]"
                :label="item[1]"
                :value="item[1]">
              </el-option>
            </el-select>
            <el-select v-model="from.city" placeholder="市" @focus="handleCitySelect" @change="handleCityChange">
              <el-option v-for="item in cityMap" :key="item[0]" :label="item[1]" :value="item[1]">
              </el-option>
            </el-select> -->
            <!-- <el-select v-model="from.district" placeholder="区">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select> -->
          <!-- </el-form-item> -->
          <!--省市三级联动-->
          <el-cascader
            placeholder="请选择"
            v-model="location"
            :options="china" :props="{value:'label'}"
          ></el-cascader>
        </div>

        <el-form-item label="请选择所属平台" prop="platform">
          <el-select v-model="from.redskinsPlatform" placeholder="请选择平台">
            <el-option
              v-for="item in platformshangjia"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请选择内容分类" prop="contentstate">
          <el-select v-model="from.contentType" placeholder="请选择内容分类">
            <el-option
              v-for="item in contentCategoryData1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="请输入店铺名称" prop="fansnumber">
          <el-input v-model="from.shopName" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn" @click="btn1">下一步</div>
    </div>

    <div class="two" v-if="index === 2">
      <el-form ref="form" :model="from">
        <el-form-item label="企业名称">
          <el-input v-model="from.enterpriseName" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="社会信用代码">
          <el-input v-model="from.enterpriseUnifiedsocialCreditcode" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="企业营业执照照片">
          <el-upload
            class="avatar-uploader"
            :action="actions.uploadBusinessLicense + '?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="法人身份证照片">
          <el-upload
            class="avatar-uploader"
            :action="actions.uploadBusinessLicense + '?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            :action="actions.uploadBusinessLicense + '?type=0'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div class="btn" @click="btn1">下一步</div>
    </div>

    <div class="three" v-if="index === 3">
      <el-form ref="form" :model="from" :rules="rules">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" v-model="from.captcha" class="input-with-select">
            <el-button slot="append" @click="countDown">{{content}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="pwdagain">
          <el-input v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwdagain">
          <el-input v-model="from.username"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码">
          <el-input v-model="from.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn" @click="btn2">完成注册</div>
    </div>

    <!-- 会员开通提示 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <p class="dialog_p">是否开通会员拥有更多权限</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Nokaitong">暂 不</el-button>
        <el-button type="primary" @click="Yeskaitong">查 看</el-button>
      </span>
    </el-dialog>

    <!-- 会员开通页面 -->
    <div class="huiyuan_kaitong" v-if="index === 4">
      <p class="xufei_p">选择会员金额</p>
      <div class="uanzejinr">
        <div class="snfnrfe" :class="active === 1 ? 'jine1' : ''">
          <p>
            <span>10000</span>
            <span>元/1年</span>
          </p>
          <p>续费会员</p>
        </div>
        <div class="snfnrfe" :class="active ? 'jine1' : ''">
          <p>
            <el-input></el-input>
            <span>元</span>
          </p>
          <p>自定义金额</p>
        </div>
      </div>
      <p class="xufei_p">
        <span>选择支付方式</span>
        <span>支付即同意《红人带货服务合同》</span>
      </p>
      <div>
        <el-radio v-model="radio" label="1">支付宝支付</el-radio>
        <el-radio v-model="radio" label="2">微信支付</el-radio>
        <el-radio v-model="radio" label="3">银行卡</el-radio>
      </div>

      <div v-if="radio === '1'" class="fangshi_xuanze">
        <p class="zhifu_fangshi_xuane">
          <span>应付金额：</span>
          <span>10000元</span>
        </p>
        <img src="../../assets/new/%E4%BA%8C%E7%BB%B4%E7%A0%81%E5%9B%BE%E7%89%87_8%E6%9C%887%E6%97%A515%E6%97%B626%E5%88%8602%E7%A7%92.png" alt="">
        <p class="zhifubao_icon">
          <img src="@/assets/new/zhifubao.png" alt="">
          <span>跳转到支付宝网页版支付</span>
        </p>
      </div>
      <div v-if="radio === '2'" class="fangshi_xuanze">
        <p class="zhifu_fangshi_xuane">
          <span>应付金额：</span>
          <span>10000元</span>
        </p>
        <img src="../../assets/new/%E4%BA%8C%E7%BB%B4%E7%A0%81%E5%9B%BE%E7%89%87_8%E6%9C%887%E6%97%A515%E6%97%B626%E5%88%8602%E7%A7%92.png" alt="">
        <p class="zhifubao_icon">
          <img src="@/assets/new/weixin.png" alt="">
          <span>使用微信扫码支付</span>
        </p>
      </div>
      <div v-if="radio === '3'" class="fangshi_xuanze">
        <p class="zhifu_fangshi_xuane">
          <span>应付金额：</span>
          <span>10000元</span>
        </p>
        <p class="skjhfd_eae1">注意  付款后联系客服开通VIP权限</p>
        <p class="skjhfd_eae">
          <span>银行卡号：</span>
          <span>216400100100090343</span>
        </p>
        <p class="skjhfd_eae">
          <span>开户行：</span>
          <span>兴业银行上海青浦支行</span>
        </p>
        <p class="skjhfd_eae">
          <span>客服电话：</span>
          <span>187367230826</span>
        </p>
      </div>

      <div class="xufei_wenan">
        <p class="wenan_p1">开通后您将获得以下权限</p>
        <p>1、直播带货服务（入驻服务+单次服务+ROI服务，平台提供直播匹配服务红人/明星/渠道）；</p>
        <p>2、红人带货为商家推荐快递、仓储、快运服务并提供专属售后对接解决；</p>
        <p>3、价值人民币贰万元（刊例价）的广告/渠道发布服务（广告发布渠道：如包裹贴、快递短信、模板消息、社群团购及微信公众号等）；</p>
        <p>4、为期一年的 “有蜜APP”注册会员使用权限（价值人民币伍万元）；</p>
        <p>5、红人带货专业的平台产品发布及相关问题的咨询服务；</p>
        <p>6、平台定制化数据分析及应用服务。</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { zhuceHR } from '../../api/login'
import { platformshangjia, contentCategoryData1 } from '../../data/common'
// import { getProvinceMap, getCityMap } from '@/utils/china-location'
import { china } from '../../data/ChinaLocation'
import actions from '@/data/actions'
export default {
  data () {
    // let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    // var validateNewPwd = (rule, value, callback) => {
    //   if (!reg.test(value)) {
    //     callback(new Error('密码应是6-12位数字+字母组合！'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateComfirmPwd = (rule, value, callback) => {
    //   if (this.formThree.password !== value) {
    //     callback(new Error('确认密码与新密码不一致！'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      actions,
      platformshangjia,
      china,
      location: '',
      contentCategoryData1,
      centerDialogVisible: false,
      radio: '1',
      index: 1,
      from: {
        username: '', // 手机号
        password: '', // 密码
        captcha: '', // 验证码
        type: 2,
        vendorName: '', // 商家姓名
        shopName: '', // 店铺名称
        contentType: '', // 内容分类
        enterpriseName: '', // 企业名称
        enterpriseUnifiedsocialCreditcode: '', // 信用代码
        wechatAccount: '', // 微信号
        enterpriseBusinessLicense: '', // 营业执照照片url
        eblPath: '', // 营业执照照片PATH
        cardFrontUrl: '', // 法人身份证正面URL
        cfPath: '', // 法人身份证正面PATH
        cardReverseUrl: '', // 法人身份证反面URL
        crPath: '' // 法人身份证反面PATH
      },
      options: [
        { value: '1', label: '男' },
        { value: '2', label: '女' }
      ],
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      canClick: true
    }
  },
  methods: {
    countDown () {
      this.$axios.get('/zkurtg-red-api/public/captchaImageByPhone?phone=' + this.from.username).then((response) => {
        console.log(response.data)
        this.$message({
          message: '验证码发送成功',
          type: 'success'
        })
      })

      if (!this.canClick) return // 改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 10
          this.canClick = true // 这里重新开启
        }
      }, 1000)
    },
    zhuce () {
      // zhuceHR(this.fromOnw).then(data => {
      //   console.log(data)
      // })
    },
    btn1 () {
      this.index = this.index + 1
    },
    btn () {
      this.index = this.index - 1
    },
    // 完成注册
    btn2 () {
      this.centerDialogVisible = true
    },
    // 不开通会员
    Nokaitong () {
      this.centerDialogVisible = false
    },
    // 开通会员
    Yeskaitong () {
      this.centerDialogVisible = false
      this.index = this.index + 1
    },
    // 处理省份改变
    handleProvinceChange () {
      this.from.city = null
      this.from.district = null
    },
    // 处理城市改变
    handleCityChange () {
      this.from.district = null
    },
    // 处理城市选择
    handleCitySelect () {
      if (this.from.province) {
        console.log(this.from.province)
        // this.cityMap = getCityMap(this.from.province)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .zhuce_hr {
    .huiyuan_kaitong {
      .xufei_p {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:32px;
        color:rgba(153,153,153,1);
        opacity:1;
        margin-bottom: 30px;
        span:nth-child(2) {
          margin-left: 10px;
          color:rgba(234,64,57,1);
        }
      }
      .uanzejinr {
        margin-bottom: 60px;
        height:84px;
        vertical-align:top;
        .snfnrfe {
          padding: 10px;
          box-sizing: border-box;
          border:1px solid rgba(226,226,226,1);
          box-sizing: border-box;
          opacity:0.9;
          border-radius:5px;
          margin-right: 20px;
          display: inline-block;vertical-align:top;
          P {
            text-align: center;
            color:rgba(153,153,153,1);
          }
          p:nth-child(1) {
            line-height: 50px;
            text-align: center;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:400;
            opacity:1;
            span:nth-child(1) {
              font-size: 22px;
              color: #EA4039;
            }
          }
        }
        div:hover {
          border:1px solid rgba(234,64,57,1);
          p {
            color:rgba(51,51,51,1);
          }
        }
        .jine1 {
          width:140px;
          height:84px;
          border:1px solid rgba(234,64,57,1);
          opacity:1;
          border-radius:5px;
          box-sizing: border-box;vertical-align:top;
        }
      }
      .fangshi_xuanze {
        margin-left: 50px;
        margin-top: 40px;
        margin-bottom: 20px;
        .zhifu_fangshi_xuane {
          span:nth-child(1) {
            font-size:16px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:32px;
            color:#333333;
            opacity:1;
          }
          span:nth-child(2) {
            font-size:22px;
            font-family:PingFang SC;
            font-weight:500;
            line-height:32px;
            color:#EA4039;
            opacity:1;
          }
        }
        img {
          margin-top: 20px;
          width: 187px;
          height: 187px;
        }
        .zhifubao_icon {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(33,154,215,1);
          opacity:1;
          img {
            width: 22px;
            height: 22px;
            margin-top: 0;
            margin-right: 8px;
            // vertical-align:top;
          }
          span {
            vertical-align:top;
          }
        }
        .skjhfd_eae {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:32px;
          color:rgba(51,51,51,1);
          opacity:1;
          span:nth-child(1) {
            color: #999999;
          }
        }
        .skjhfd_eae1 {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:32px;
          color:rgba(234,64,57,1);
          opacity:1;
        }
      }
      .xufei_wenan {
        p {
          font-size:14px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:32px;
          color:rgba(153,153,153,1);
          opacity:1;
        }
        .wenan_p1 {
          font-size:16px;
          font-family:PingFang SC;
          font-weight:400;
          line-height:32px;
          color:rgba(102,102,102,1);
          opacity:1;
        }
      }
    }
    .dialog_p {
      text-align: center;
    }
    .fanhui {
      position: absolute;
      top: 200px;
      left: 580px;
      font-size:18px;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(232,37,29,1);
      opacity:1;
      i {
        margin-right: 10px;
      }
    }
    .onw {
      .p {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:64px;
        color:rgba(102,102,102,1);
        opacity:1;
      }
      .btn {
        width: 100%;
        height:51px;
        background:rgba(234,64,57,1);
        opacity:1;
        border-radius:10px;
        font-size:17px;
        font-family:PingFang SC;
        font-weight:400;
        line-height:51px;
        color:rgba(255,255,255,1);
        opacity:1;
        text-align: center;
        margin-top: 60px;
      }
    }
    .two {
      .img_yanglitupian {
        width: 169px;
        height: 127px;
        vertical: top;

      }
      .p_yanglitupian {
        text-align: right;
      }
      .sdfoerg {
        display: inline-block;
        width: 180px;
        height: 195px;
      }
    }
    .btn {
      width: 100%;
      height:51px;
      background:rgba(234,64,57,1);
      opacity:1;
      border-radius:10px;
      font-size:17px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:51px;
      color:rgba(255,255,255,1);
      opacity:1;
      text-align: center;
      margin-top: 60px;
    }
  }
</style>

<style lang="less">

  .uanzejinr {
    .el-input {
      display: inline-block;
      width: 90px;
      height: 32px;
      border: none;
      // background-color: #e3e3e3;
      margin-top: 10px;
      line-height: 22px;
      border: none;
      .el-input__inner {
      width: 88px;
      height: 32px;
      // border: none;
      background-color: #e3e3e3;
      }
    }
  }
  .zhuce_hr {
    .el-form-item__label {
        font-size:16px;
        font-family:PingFang SC;
        font-weight:400;
        // line-height:64px;
        color:rgba(102,102,102,1);
        opacity:1;
        width: 100%;
        text-align: left;
    }
    .el-select {
      width: 100%;
    }
    .avatar-uploader {
      display: inline-block;
      margin-right: 20px;
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
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
  }
  .dizhixuanze {
    .el-select {
      width: 30%;
      margin-right: 13px;
    }
  }

</style>
