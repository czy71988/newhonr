<!-- 下拉选择器 -->
<template>
  <div class="cpt-select-input">
    <label></label>
    <input class="select-input__input" type="text">
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.cpt-select-input {
  .select-input__input {
    width:190px;
    height:26px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(220,220,220,1);
  }
}
</style>
