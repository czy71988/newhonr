<template>
<!-- 账号转让 -->
  <el-tabs type="border-card">
  <el-tab-pane label="我要求购"><AccountTransferBuy/></el-tab-pane>
  <el-tab-pane label="我要出售"><AccountTransferSale/></el-tab-pane>
</el-tabs>
</template>

<script>
import AccountTransferBuy from './AccountTransferBuy'
import AccountTransferSale from './AccountTransferSale'
export default {
  name: 'account',
  components: {
    AccountTransferBuy,
    AccountTransferSale
  },
  data () {
    return {

    }
  }
}
</script>
