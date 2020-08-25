<!-- 服务商 -->
<template>
  <div class="service">
    <div class="service_content">
      <div class="sdfhjge">
        <div class="content_1 clearfix">
          <p class="content_1_top">提交信息</p>
          <p class="pp">机构名称</p>
          <el-input οnblur="if(this.value.replace(/^ +| +$/g,'')=='')alert('不能为空!')" v-model="form.organizationName" placeholder="请输入内容"></el-input>
          <p class="pp">服务类型</p>
          <el-input v-model="form.serviceType" placeholder="请输入内容"></el-input>
          <p class="pp">擅长领域</p>
          <el-select v-model="form.adeptField" placeholder="请选择">
            <el-option
              v-for="item in contentCategoryData1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p class="pp">机构简要内容</p>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.institutionsIntroduce">
          </el-input>
        </div>

        <div class="content_1 clearfix">
          <p class="content_1_top">联系方式</p>
          <p class="pp">联系人名称</p>
          <el-input v-model="form.linkmanName" placeholder="请输入内容"></el-input>
          <p class="pp">联系人电话</p>
          <el-input v-model="form.linkmanPhone" placeholder="请输入内容"></el-input>
          <p class="pp">联系人微信号</p>
          <el-input v-model="form.linkmanWechat" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="ntm" @click="addProvider">提交</div>
      <div class="wenan">
        <p class="P_top">我们的优势</p>
        <p class="P_pp">
          1.拥有2亿+线上粉丝，其中主流人群为18-45岁的网购消费者。国人每年使用中通快递超百亿次。
        </p>
        <p class="P_pp">
          2.有30000+服务网点和100000+末端社区门店，超100万的中通人及其家人，覆盖98%的区县、  90%以上的乡镇。中通积分日均30万/UV.
        </p>
        <p class="P_pp">
          3.全国200+云仓，单仓SKU过万；围绕快递服务而积累的强大品牌商家和优质供应链资源；中通目前服务超300万客户。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { fuwushangbiaodan } from '../api/fuwushang'
import { contentCategoryData1 } from '@/data/common'

export default {
  data () {
    return {
      form: {
        organizationName: '', // 机构名称
        serviceType: '', // 服务类型
        adeptField: '', // 擅长领域
        linkmanName: '', // 联系人姓名
        linkmanPhone: '', // 联系人电话
        linkmanWechat: '', // 微信号
        institutionsIntroduce: '' // 机构简要
      },
      contentCategoryData1, // 服务商领域
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        serviceType: [
          { required: true, message: '请输入服务类型', trigger: ['blur', 'change'] }
        ],
        institutionsIntroduce: [
          { required: true, message: '请输入机构简要介绍', trigger: ['blur', 'change'] }
        ],
        adeptField: [
          { required: true, message: '请选择擅长领域', trigger: ['blur', 'change'] }
        ],
        linkmanName: [
          { required: true, message: '请输入练习人姓名', trigger: ['blur', 'change'] }
        ],
        linkmanPhone: [
          { required: true, message: '请输入联系人电话', trigger: ['blur', 'change'] },
          {
            required: true,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        linkmanWechat: [
          { required: true, message: '请输入联系人微信', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    addProvider () {
      if (!this.form) {
        fuwushangbiaodan(this.form).then(data => {
          this.$message({
            showClose: true,
            message: '提交成功',
            type: 'success'
          })
          this.form = {}
        })
      } else {
        this.$message({
          showClose: true,
          message: '提交的信息不能有空值'
        })
      }
    }
  }
}
</script>

<style lang="less">
.foot-center {
  .el-input__inner {
    width:260px;
    height:26px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
  }
  .el-textarea__inner {
    width:260px;
    height:73px;
    background:rgba(255,255,255,1);
    margin: 0 auto;
    border:1px solid rgba(220,220,220,1);
  }
  .el-form-item__label {
    padding: 0;
  }
  .el-form-item {
    margin-bottom: 8px;;
  }
  .el-form-item__error {
    top: 78%;
    left: 20px;
  }
  .el-textarea {
    margin-bottom: 20px;
  }
}
</style>

<style lang="less" scoped>
// ==

    .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
// ==
.service {
  .service_content {
    padding: 80px 375px;
    box-sizing: border-box;
    .sdfhjge {
      height: 465px;
    }
    .content_1 {
      width: 50%;
      padding: 0 82px;
      box-sizing: border-box;
        float: left;
        // display: inline-block;
        margin-bottom: 80px;
      .content_1_top {
        font-size:20px;
        font-family:PingFang SC;
        font-weight:500;
        line-height:37px;
        color:rgba(51,51,51,1);
        opacity:1;
      }
      .pp {
        font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        line-height:37px;
        color:rgba(102,102,102,1);
        opacity:1;
      }
    }
  }
  .ntm {
    width:170px;
    height:50px;
    background:rgba(234,64,57,1);
    opacity:1;
    border-radius:10px;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:50px;
    color:rgba(255,255,255,1);
    opacity:1;
    text-align: center;
    margin: auto;
  }
  .wenan {
    height: 373px;
    width: 100%;
    margin-top: 95px;
    background-image: url('../assets/new/组 643@2x.png');
    background-size: 100% 100%;
    padding: 30px;
    box-sizing: border-box;
    .P_top {
      font-size:20px;
      font-family:PingFang SC;
      font-weight:500;
      // line-height:37px;
      color:rgba(255,255,255,1);
      opacity:1;
      text-align: center;
    }
    .P_pp {
      margin-top: 50px;
      font-size:18px;
      font-family:Source Han Sans CN;
      font-weight:400;
      // line-height:31px;
      color:rgba(255,255,255,1);
      opacity:1;
    }
  }
}

</style>
