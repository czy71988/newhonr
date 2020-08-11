<template>
  <div class="phoneMe">
    <div class="phoneMe1">
      <p>联 系 电 话 ：13758208900</p>
      <p>公司地址：浙江省杭州市余杭区乐富海邦园14幢202</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="less" scored>
.phoneMe {
  padding-top: 20px;
  box-sizing: border-box;
  .phoneMe1 {
    width: 1200px;
    height: 100%;
    // min-height: 100vh;
    margin: 0 auto;
    font-size: 22px;
    text-align: center;
    padding: 300px 0;
    box-sizing: border-box ;
    background-color: #ffffff;
    p {
      margin-top: 20px;
    }
  }
}
@media screen and (max-width: 800px) {
  .phoneMe {
      font-size: 18px;
    padding: 10px 10px;
    box-sizing: border-box;

    .phoneMe1 {
      width: 100%;
    }
  }
}
</style>
