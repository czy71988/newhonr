<!-- 红人菜单共用组件 -->
<template>
  <div class="cpt-menu-list clearfix">
    <label class="title">{{title}}</label>
    <div class="menu-list-wrap">
      <ul class="menu-list">
        <li class="menu-list__item" :class="{active: '' === activedItem}">
          <a href="javascript:;" @click="handleClick('')">全部</a>
        </li>
        <li class="menu-list__item" v-for="item in list" :key="item.value" :class="{active: item.value === activedItem}">
          <a href="javascript:;" @click="handleClick(item.value)">{{item.label}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      activedItem: null
    }
  },
  mounted () {
    this.activedItem = this.value || null
  },
  watch: {
    activedItem (newVal) {
      this.$emit('change', newVal)
    }
  },
  methods: {
    handleClick (item) {
      this.activedItem = item
      this.$emit('input', item)
    }
  }
}
</script>

<style lang="less" scoped>
 .cpt-menu-list {
   width: 100%;
  .title {
    float: left;
    width:58px;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    padding: 13px 0px;
  }
  .menu-list-wrap {
    margin-left: 98px;
  }
  .menu-list {
    width: 100%;
  }
  .menu-list__item {
    float: left;
    margin-right: 40px;
    a {
      display: inline-block;
      padding: 13px 0px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      text-decoration: none;
    }
    &.active {
      a {
        color: red;
      }
    }
  }
}
</style>
