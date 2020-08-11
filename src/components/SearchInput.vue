<!-- 搜索框 -->
<template>
  <div class="search-input">
    <span class="select">搜索项</span>
    <transition name="zoom-in-top">
      <ul class="options">
        <li class="option" v-for="(item, index) in options" :key="index">
          {{item.label}}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    options: {
      type: Array,
      default () {
        return [
          { label: 'a1' },
          { label: 'a2' },
          { label: 'a3' },
          { label: 'a4' }
        ]
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.zoom-in-top-enter-active,.el-zoom-in-top-leave-active{
  opacity:1;
  transform:scaleY(1);
  transition:opacity .3s cubic-bezier(.23,1,.32,1);
  transform-origin:center top
}
.zoom-in-top-enter,.el-zoom-in-top-leave-active{
  opacity:0;
  transform:scaleY(0);
}

.search-input {
  position: relative;
  .options {
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box;
    .option {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .select {
    display: block;
    width: 76px;
    height: 40px;
    line-height: 40px;
    background:rgba(245,245,245,1);
    border:1px solid rgba(224,224,224,1);
    &.down::before {
      display: block;
      content: '>'
    }
    &::before {
      display: block;
      content: '>'
    }
  }
}

</style>
