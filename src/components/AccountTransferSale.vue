<!-- 账号转让 我要出售 -->
<template>
  <div class="account-transfer-sale">
    <!-- 交易流程 -->
    <div class="com-section step-box">
      <div class="com-section__bd">
        <div class="title">交易流程</div>
        <!-- <select-input></select-input> -->
        <com-steps class="step-list" :steps="saleSteps" :line-width="106" :icons="stepIcons"></com-steps>
      </div>
    </div>
    <!-- 信息提交 -->
    <div class="com-section inf-box">
      <div class="com-section__bd">
        <p class="title">信息提交</p>
        <el-form id="accountTransferInfSumbit" class="form" label-position="right" label-width="96px" :model="formData">
          <el-form-item label="账号标题" class="account-title-item" prop="userTitle">
            <el-input v-model="formData.userTitle" placeholder="请填写账号标题" maxlength="35" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="所属平台" prop="platform">
            <el-select v-model="formData.platform" placeholder="请选择推广平台">
              <el-option :label="item.label" :value="item.label" v-for="(item, index) in platformData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容分类" prop="contentstate">
            <el-select v-model="formData.contentstate" placeholder="请选择所属内容分类">
              <el-option :label="item.label" :value="item.label" v-for="(item, index) in contentCategoryData" :key="index" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="粉丝偏向" prop="deviationstate">
            <el-select v-model="formData.deviationstate" placeholder="请选择粉丝偏向">
              <el-option :label="item.label" :value="item.label" v-for="(item, index) in fansFavoriteData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出售价格" prop="price">
            <el-input v-model="formData.price" placeholder="元"></el-input>
          </el-form-item>
          <el-form-item label="粉丝数量" prop="fansnumber">
            <el-input v-model="formData.fansnumber" placeholder="请填写账号的粉丝数量"></el-input>
          </el-form-item>
          <el-form-item class="other-state-item" label="其它状态" prop="otherState">
            <el-select v-model="formData.livestate" placeholder="是否开通直播">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
            <el-select v-model="formData.windowstate" placeholder="是否开通橱窗">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
            <el-select v-model="formData.authenticationstate" placeholder="认证主体">
              <el-option :label="item.label" :value="item.label" v-for="(item, index) in authBodyData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号注册时间" class="register-time-item" prop="grandtime">
            <el-date-picker class="item"
              v-model="formData.grandtime"
              align="right"
              type="date"
              placeholder="注册时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="btn-group">
          <button class="submit-btn" @click="tijiaoshenhe">提交审核</button>
        </div>
      </div>
    </div>
    <!-- 提交模态框 -->
    <!-- <el-dialog class="submit-dialog" :visible.sync="submitDialogVisible"
      title="您的账号信息已提交成功！" center width="350px" :show-close="false">
      <div style="text-align:center"><span>审核期间请保持您的联系方式，会将您的账号信息发布在账号转让页面。</span></div>
      <span slot="footer">
       <el-button class="" type="primary" @click="submitDialogVisible = false">好的</el-button>
      </span>
    </el-dialog> -->
    <!--  -->
    <!-- <el-dialog class="submit-dialog" :visible.sync="submitDialogVisible"
      title="亲，您还未登录" center width="350px" :show-close="false" v-if="!token">
      <div style="text-align:center"><span>请登录之后在查看</span></div>
      <span slot="footer">
       <el-button class="" type="primary" @click="submitDialogVisible = false">好的</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import ComSteps from '@/components/common/ComSteps.vue'
// import SelectInput from '@/components/common/SelectInput.vue'
import { addAccountSale } from '@/api/account'
import { getUserType } from '@/utils/auth'
import { platformData, contentCategoryData, fansFavoriteData, authBodyData } from '@/data/common'

export default {
  name: 'AccountTransferSale',
  components: {
    ComSteps
    // SelectInput
  },
  data () {
    return {
      saleSteps: [
        '填写提交账号信息',
        '平台进行审核',
        '通过审核展示上架',
        '意向沟通',
        '完成交易'
      ],
      stepIcons: [
        require('@/assets/编组 44.png'),
        require('@/assets/sale-step-2.png'),
        require('@/assets/buy-step-3.png'),
        require('@/assets/buy-step-4.png'),
        require('@/assets/exchange-successul.png')
      ],
      platformData, // 所属平台
      contentCategoryData, // 内容分类
      fansFavoriteData, // 粉丝偏向
      authBodyData,
      formData: {
        userTitle: '',
        contentstate: '',
        deviationstate: '',
        price: '',
        fansnumber: '',
        livestate: '',
        windowstate: '',
        authenticationstate: '',
        fasshuliang: '',
        grandtime: ''
      },
      submitDialogVisible: false,
      token: localStorage.getItem('token')
    }
  },
  methods: {
    tijiaoshenhe () {
      // 点击确认后进入到“我的申请”页面, 商家进入商家页面
      const formData = Object.assign({}, this.formData)
      addAccountSale({
        ...formData
      }).then(data => {
        this.$alert('提交成功', {
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          const userType = getUserType()
          this.$router.push({ name: (userType === 'favorite') ? 'personalMyshenqing' : 'shangjiashengqing' })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.account-transfer-sale {
  position: relative;
  width: 100%;
  padding-bottom: 60px;
  .com-section {
    position: relative;
    .com-section__bd {
      width:1190px;
      box-sizing: border-box;
      background:rgba(255,255,255,1);
      border:1px solid rgba(232,232,232,1);
    }
    // 步骤
    &.step-box {
      .com-section__bd {
        position: relative;
        background-color: #ffffff;
        height:198px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(232,232,232,1);
        overflow: initial;
        &::before {
          position: absolute;
          display: block;
          content: ' ';
          height: 4px;
          background-color: #FF435A;
          top: -3px;
          width: 100%;
        }
      }
    }
    // 信息提交
    &.inf-box {
      margin-top: 20px;
      .com-section__bd {
        background-color: #ffffff;
        height: 535px;
      }
    }
  }
  // 步骤
  .step-box {
    .title {
      height:18px;
      font-size:18px;
      font-family:PingFang-SC-Bold,PingFang-SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:18px;
      text-align: center;
      padding: 12px 0;
    }
    .step-list {
      margin-left: 125px;
    }
  }

  .inf-box {
    .title {
      height:48px;
      line-height: 48px;
      background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
      text-align: center;
      font-size:20px;
      font-family:PingFang-SC-Bold,PingFang-SC;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
    .form {
      margin-top: 20px;
      margin-left: 298px;
    }
    .input-group {
      margin-bottom: 20px;
      label {
        width:50px;
        height:12px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:12px;
      }
      .name {
        display: inline-block;
        width:80px;
        height:12px;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:12px;
        text-align: right;
        margin-right: 20px;
      }
      input {
        height:26px;
        width: 182px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,220,220,1);
        padding-left: 10px;
        margin-right: 20px;
      }
      input {
        &::-webkit-input-placeholder {
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(148,148,148,1);
        }

        ::-moz-input-placeholder {
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(148,148,148,1);
        }

        ::-ms-input-placeholder {
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(148,148,148,1);
        }
      }
      &.account-title {
        input {
          width: 442px;
        }
      }
      .append {
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
    }
  }

  @btnH: 40px;
  .btn-group {
    height: 40px;
    .submit-btn {
      margin-top: 30px;
      width: 200px;
      height: @btnH;
      line-height: 40px;
      background-color: rgb(240, 107, 107);
      outline: none;
      border: none;
      color: #ffffff;
      border-radius: 4px;
      position:absolute;
      left: 50%;
      transform: translateX(-50%);
      width:140px;
      height:40px;
      background:linear-gradient(90deg,rgba(253,48,105,1) 0%,rgba(255,68,89,1) 100%);
      border-radius:2px;
      font-size:16px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,255,255,1);
    }
  }
}
</style>
