<template>
<div class="fapiao">
  <div class="conent-danding">
    <div class="fapiao-bottom">
      <ul>
        <li v-for="item in fapiaolist" :key="item.id">
          <div class="mb-css">
            <div class="div-1"><span class="ttt">发票类型：</span>{{ item.risetype ===1 ? '专用发票' : '普通发票'}}</div>
            <div class="div-2"><span class="ttt">发票抬头：</span>{{item.rise}}</div>
            <div class="div-3"><span class="ttt">税    号：</span>{{item.dutyParagraph}}</div>
            <div class="div-4"><span class="ttt">备注：</span>{{item.invoicepxark}}</div>
          </div>
          <div class="mb-css">
            <div class="div-5"><span class="ttt">物流信息：</span><span>{{item.kuaidi || '--'}}</span><span>{{item.courierNumber || '--'}}</span></div>
            <div class="div-6"><span class="ttt">申请时间：</span>{{item.applyTime || '--'}}</div>
            <div class="div-7"><span class="ttt">开票时间：</span>{{item.invoiceTime || '--'}}</div>
            <div class="div-8"><span class="ttt">状态：</span>已开票</div>
          </div>
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
.fapiao {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .fapiao-bottom {
    li {
      display: block;
      width: 100%;
      height: 130px;
      padding: 5px;
      font-size: 14px;
      background-color: #ffffff;
      display: flex;
      .mb-css {
        flex: 1;
        div {
          margin: 10px 0;
          .ttt {
            display: inline-block;
            width: 70px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
