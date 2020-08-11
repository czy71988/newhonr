<template>
  <div class="ahsbivhbhvavavvavaegr" v-html="yyyy">

  </div>
</template>

<script>
import { getonehezuolist } from '@/api/account'
export default {
  data () {
    return {
      yyyy: []
    }
  },
  mounted () {
    this.getanlilist()
    document.getElementsByTagName('body')[0].className = 'add_bg'
  },
  methods: {
    getanlilist () {
      const id = this.$route.query.id
      getonehezuolist({
        id: id
      }).then(data => {
        console.log('这是资讯数据')
        console.log(data)
        this.yyyy = data.content
        console.log('---------')
        console.log(this.yyyy)
      })
    }
  }
}
</script>

<style lang="less">
  .ahsbivhbhvavavvavaegr {
    width: 1200px;
    padding: 50px 200px;
    box-sizing: border-box;
    background-color: #ffffff;
    margin: 0 auto;
    // font-size: 24px;
    img {
      width: 800px;
      margin: 20px 0;
    }
  }
  .add_bg {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 800px) {
    .ahsbivhbhvavavvavaegr {
      width: 100vw;
      padding: 10px 10px;
      box-sizing: border-box;
      font-size: 12px;
    }
  }
</style>
