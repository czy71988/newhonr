<!-- 流程 -->
<template>
  <ul class="steps">
    <li class="step" v-for="(step, index) in steps" :key="index">
      <!-- {{icons ? icons[index] : ''}} -->
      <div class="step__content">
        <img class="icon" :src="icons[index]" alt="">
        <p class="step__text">step.<label style="font-size:20px;">{{index+1}}</label> {{step}}</p>
      </div>
      <div class="step-line" :style="{width: lineWidth + 'px'}"></div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ComSteps',
  props: {
    steps: {
      type: Array,
      default () {
        return [
          '填写信息提交',
          '专人客服对接',
          '合作流程办理',
          '合作成功'
        ]
      }
    },
    lineWidth: {
      type: Number,
      default: 180
    },
    icons: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      icon: require('@/assets/编组 30.png')
    }
  }
}
</script>

<style lang="less" scoped>

@stepW: 100px;
.steps {
  width: 100%;
  display: flex;
  align-items: flex-start;
  height: 126px;
}
.step {
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    .step-line {
      display: none;
    }
  }

  .step__content {
    position: relative;
    // width: @stepW;
    // height: @stepW;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: linear-gradient(90deg,rgba(244,181,63,1) 0%,rgba(255,68,89,1) 100%) no-repeat center top;
    .icon {
      width: @stepW;
      height: @stepW;
      border-radius: 50%;
    }
  }

  .step-line {
    font-size: 30px;
    height: 1px;
    width: 180px;
    border-top: 2px dotted #C8C8C8;
  }

  .step__text {
    position: absolute;
    bottom: -8px;
    transform: translateY(100%);
    width: 220px;
    height:18px;
    font-size:18px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:18px;
  }
}
</style>
