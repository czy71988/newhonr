<template>
<div class="fapiao">
  <h2>发票申请</h2>
  <div class="conent-danding">
    <div class="fapiao-top">
      <div class="div-1">发票类型</div>
      <div class="div-2">发票抬头</div>
      <div class="div-3">税号</div>
      <div class="div-4">备注</div>
      <div class="div-5">物流信息</div>
      <div class="div-6">申请时间</div>
      <div class="div-7">开票时间</div>
      <div class="div-8">状态</div>
    </div>
    <div class="fapiao-bottom">
      <ul>
        <li v-for="item in fapiaolist" :key="item.id">
          <div class="div-1">{{ item.risetype ===1 ? '专用发票' : '普通发票'}}</div>
          <div class="div-2">{{item.rise}}</div>
          <div class="div-3">{{item.dutyParagraph}}</div>
          <div class="div-4">{{item.invoicepxark}}</div>
          <div class="div-5">
            <p>{{item.kuaidi || '--'}}</p>
            <p>{{item.courierNumber || '--'}}</p>
          </div>
          <div class="div-6">{{item.applyTime || '--'}}</div>
          <div class="div-7">{{item.invoiceTime || '--'}}</div>
          <div class="div-8">已开票</div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { getInvoice } from '@/api/user'
// import { getUserId } from '@/utils/auth'
export default {
  data () {
    return {
      activeName: 'first',
      fapiaolist: []
    }
  },
  mounted () {
    console.log('-----')
    this.gitxinxi()
  },
  methods: {
    gitxinxi () {
      getInvoice({
        // userId: getUserId(),
        openstate: '',
        page: 1,
        row: 20
      }).then(data => {
        console.log('---这是发票记录信息-----')
        console.log(data)
        // this.data = this.fapiaolist
        this.fapiaolist = data.list
      })
    }
  }
}
</script>

<style lang="less" scoped>
.shangchuan-btn {
  width: 156px;
  height: 40px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  float: right;
  margin-top: -50px;
  background-color: #fd3269;
}
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-danding {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 60px;
  box-sizing: border-box;
  .fapiao-top {
    width: 100%;
    height: 35px;
    background:rgba(245,245,245,1);
    div {
      float: left;
      text-align: center;
      line-height: 35px;
    }
  }
  .fapiao-bottom {
    ul {
      li {
        width: 100%;
        height: 70px;
        border-bottom: 1px solid #E4E7EC;
        display: table;
        div {
          text-align: center;
          display: table-cell;
          vertical-align: middle;
          padding: 0 5px;
          box-sizing: border-box;
        }
      }
    }
  }
  .div-1 {
    width: 105px;
    display:table-cell;
    vertical-align: middle;
  }
  .div-2 {
    width: 120px;
    display:table-cell;
    vertical-align: middle;
  }
  .div-3 {
    width: 140px;
    display:table-cell;
    vertical-align: middle;
  }
  .div-4 {
    width: 110px;
  }
  .div-5 {
    width: 130px;
  }
  .div-6 {
    width: 80px;
  }
  .div-7 {
    width: 80px;
  }
  .div-8 {
    width: 60px;
  }
}
</style>
