<!-- 红人榜 -->
<template>
  <div class="favorite">
    <div class="com-section menu-box">
      <div class="com-section__bd daohang">
        <el-dropdown size="200px" @command="handleCommand">
          <span class="el-dropdown-link">
            所属平台<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in platformData" :command="item.value" :key="item.value">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="sapn">/</span>
        <el-dropdown @command="handleCommand1">
          <span class="el-dropdown-link">
            内容分类<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in contentCategoryData" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="sapn">/</span>
        <el-dropdown @command="handleCommand2">
          <span class="el-dropdown-link">
            粉丝数量<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in fansNumberData" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="sapn">/</span>
        <el-dropdown @command="handleCommand3">
          <span class="el-dropdown-link">
            所在省份<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in provinceData" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>
    <!-- 红人列表 -->
    <div class="com-section favorite-box">
      <div class="com-section__bd" gutter="20px">
        <favorite-list-item class="favorite-list-item" v-for="item in favoriteList" :key="item.id" :item="item"></favorite-list-item>
      </div>
     </div>
     <!-- 分页栏 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="form.row"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import MenuList from '@/components/favorite/MenuList.vue'
import FavoriteListItem from '@/components/favorite/FavoriteListItem.vue'
// import { fetchFavoriteList } from '@/api/favorite'
import { newNohonrlist } from '@/api/newhonrList'
// import { debunce } from '@/utils/debunce-throttle'
// import { search } from '@/api/common'
import { platformData, contentCategoryData, fansFavoriteData, fansNumberData, praisedNumberData, provinceData } from '@/data/common'

export default {
  name: 'Favorite',
  components: {
    // MenuList,
    FavoriteListItem
  },
  data () {
    return {
      favoriteList: [],
      platformData,
      contentCategoryData,
      fansFavoriteData,
      fansNumberData,
      praisedNumberData,
      provinceData,
      total: 0,
      currentPage4: 1,
      form: {
        row: 20,
        page: 1,
        redskinsPlatform: this.$route.query.value2,
        contentType: '',
        fansAmountType: this.$route.query.value,
        province: ''
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      // alert('发送请求')
      newNohonrlist({
        page: this.form.page,
        rows: this.form.row,
        filters: {
          redskinsPlatform: this.form.redskinsPlatform,
          contentType: this.form.contentType,
          fansAmountType: this.form.fansAmountType,
          province: this.form.province,
          fansType: this.$route.query.value1
        }
      }).then(data => {
        this.favoriteList = data.result
        this.favoriteList.contentType = this.favoriteList.contentType.split(',')
        console.log('=====v=====', this.favoriteList)
        this.total = data.totalCount
      }).catch(err => {
        console.log(err)
      })
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.form.row = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.form.page = val
      this.getList()
    },
    handleCommand (command) {
      this.form.redskinsPlatform = command
      this.getList()
    },
    handleCommand1 (command) {
      this.form.contentType = command
      this.getList()
    },
    handleCommand2 (command) {
      this.form.fansAmountType = command
      this.getList()
    },
    handleCommand3 (command) {
      this.form.province = command
      this.getList()
    }
  },
  destroyed () {
    window.pxoveEventListener('scroll', this.debunceWrapHandleScroll)
  }
}
</script>
<style lang="less">
.favorite {
  .menu-box {
    .daohang {
      .el-dropdown-menu {
        overflow-y:hidden;
        overflow-x:auto;
        white-space: nowrap;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.block {
  text-align: center;
}
.favorite {
  background-color: #fff;
  .com-section__bd {
    width: 1600px;
    .favorite-list-item {
      float: left;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .daohang {
    height: 80px;
    line-height: 80px;
    margin-bottom: 80px;
  }
  span {
    margin-right: 10px;
  }
  .favorite-box {
    background-color: #fff;
  }
}
@media (max-width: 1366px) {
  .favorite {
    background-color: #fff;
    .com-section__bd {
      width: 1300px;
    }
  }
}
@media (max-width: 1600px) {
  .favorite {
    background-color: #fff;
    .com-section__bd {
      width: 1300px;
    }
  }
}
</style>
