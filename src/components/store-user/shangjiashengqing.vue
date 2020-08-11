<template>
<div>
  <h2>我的申请</h2>
  <div class="conent-shengqing">
    <el-tabs v-model="activeTabName" @tab-click="handleTabChange">
      <el-tab-pane label="所有订单" name="first">
        <div class="dd-top">
          <span class="a1">账号标题</span>
          <span class="a2">所属平台</span>
          <span class="a3">内容分类</span>
          <span class="a4">粉丝偏向</span>
          <span class="a5">出售价格</span>
          <span class="a6">粉丝数量</span>
          <span class="a7">注册时间</span>
          <span class="a8">其他状态</span>
          <span class="a9">审核状态</span>
          <span class="a10">备注</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in lists" :key="item.id">
              <div class="spPP">
                <p class="spP">日系纯色圆领毛衣男冬季厚款韩版宽松外套</p>
                <!-- <p class="spP1">
                  <span class="spPS1">¥66.80</span>
                  <span class="spPS2"><s>¥98.80</s></span>
                </p> -->
              </div>
              <div class="spP2">抖音</div>
              <div class="spP3">搞笑娱乐</div>
              <div class="xiangguan">
                男女均衡
              </div>
              <div class="dd-btn">
                <span>¥</span>
                <span>99.08</span>
              </div>
              <div class="spP4">12.3W</div>
              <div class="spP5">2018</div>
              <div class="spP6">
                <p><span>开通直播：</span><span>是</span></p>
                <p><span>开通橱窗：</span><span>否</span></p>
                <p><span>认证：</span><span>个人</span></p>
              </div>
              <div class="spP7">待审核</div>
              <div class="spP8">个人</div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
             :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.rowss"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待审核" name="second">
        <div class="dd-top">
          <span class="a1">账号标题</span>
          <span class="a2">所属平台</span>
          <span class="a3">内容分类</span>
          <span class="a4">粉丝偏向</span>
          <span class="a5">出售价格</span>
          <span class="a6">粉丝数量</span>
          <span class="a7">注册时间</span>
          <span class="a8">其他状态</span>
          <span class="a9">审核状态</span>
          <span class="a10">备注</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in lists" :key="item.id">
              <div class="spPP">
                <p class="spP">日系纯色圆领毛衣男冬季厚款韩版宽松外套</p>
                <!-- <p class="spP1">
                  <span class="spPS1">¥66.80</span>
                  <span class="spPS2"><s>¥98.80</s></span>
                </p> -->
              </div>
              <div class="spP2">抖音</div>
              <div class="spP3">搞笑娱乐</div>
              <div class="xiangguan">
                男女均衡
              </div>
              <div class="dd-btn">
                <span>¥</span>
                <span>99.08</span>
              </div>
              <div class="spP4">12.3W</div>
              <div class="spP5">2018</div>
              <div class="spP6">
                <p><span>开通直播：</span><span>是</span></p>
                <p><span>开通橱窗：</span><span>否</span></p>
                <p><span>认证：</span><span>个人</span></p>
              </div>
              <div class="spP7">待审核</div>
              <div class="spP8">个人</div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.rows"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="审核通过" name="third">
        <div class="dd-top">
          <span class="a1">账号标题</span>
          <span class="a2">所属平台</span>
          <span class="a3">内容分类</span>
          <span class="a4">粉丝偏向</span>
          <span class="a5">出售价格</span>
          <span class="a6">粉丝数量</span>
          <span class="a7">注册时间</span>
          <span class="a8">其他状态</span>
          <span class="a9">审核状态</span>
          <span class="a10">备注</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in lists" :key="item.id">
              <div class="spPP">
                <p class="spP">日系纯色圆领毛衣男冬季厚款韩版宽松外套</p>
                <!-- <p class="spP1">
                  <span class="spPS1">¥66.80</span>
                  <span class="spPS2"><s>¥98.80</s></span>
                </p> -->
              </div>
              <div class="spP2">抖音</div>
              <div class="spP3">搞笑娱乐</div>
              <div class="xiangguan">
                男女均衡
              </div>
              <div class="dd-btn">
                <span>¥</span>
                <span>99.08</span>
              </div>
              <div class="spP4">12.3W</div>
              <div class="spP5">2018</div>
              <div class="spP6">
                <p><span>开通直播：</span><span>是</span></p>
                <p><span>开通橱窗：</span><span>否</span></p>
                <p><span>认证：</span><span>个人</span></p>
              </div>
              <div class="spP7">待审核</div>
              <div class="spP8">个人</div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.rows"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="审核不通过" name="fourth">
        <div class="dd-top">
          <span class="a1">账号标题</span>
          <span class="a2">所属平台</span>
          <span class="a3">内容分类</span>
          <span class="a4">粉丝偏向</span>
          <span class="a5">出售价格</span>
          <span class="a6">粉丝数量</span>
          <span class="a7">注册时间</span>
          <span class="a8">其他状态</span>
          <span class="a9">审核状态</span>
          <span class="a10">备注</span>
        </div>
        <div class="dd-conent">
          <ul>
           <li v-for="item in lists" :key="item.id">
              <div class="spPP">
                <p class="spP">日系纯色圆领毛衣男冬季厚款韩版宽松外套</p>
                <!-- <p class="spP1">
                  <span class="spPS1">¥66.80</span>
                  <span class="spPS2"><s>¥98.80</s></span>
                </p> -->
              </div>
              <div class="spP2">抖音</div>
              <div class="spP3">搞笑娱乐</div>
              <div class="xiangguan">
                男女均衡
              </div>
              <div class="dd-btn">
                <span>¥</span>
                <span>99.08</span>
              </div>
              <div class="spP4">12.3W</div>
              <div class="spP5">2018</div>
              <div class="spP6">
                <p><span>开通直播：</span><span>是</span></p>
                <p><span>开通橱窗：</span><span>否</span></p>
                <p><span>认证：</span><span>个人</span></p>
              </div>
              <div class="spP7">待审核</div>
              <div class="spP8">个人</div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchForm.page"
              :page-sizes="[4, 8, 12]"
              :page-size="searchForm.rows"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import { fetchMyApplication } from '@/api/user'
// import { getUserId } from '@/utils/auth'
export default {
  data () {
    return {
      activeTabName: 'first',
      currentPage: 1,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      lists: [],
      page: { // page作为分页初始状态,不可修改
        rows: 4,
        page: 1
      },
      total: 0,
      searchForm: {
        rows: 4,
        page: 1,
        auditStatus: ''
      }
    }
  },
  mounted () {
    this.getdingdan()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    // tab页切换
    handleTabChange (tab) {
      // 审核状态 auditStatus  0待审核 1审核通过 2审核拒绝
      // 每次切换tab, 切换到初始化的搜索的page页
      let auditStatus = ''
      switch (tab.name) {
        case 'second': // 0待审核
          auditStatus = 0
          break
        case 'third': // 1审核通过
          auditStatus = 1
          break
        case 'fourth': // 2审核拒绝
          auditStatus = 2
          break
      }
      this.searchForm = Object.assign(this.searchForm, this.page, { auditStatus })
      console.log(this.searchForm)
      this.getdingdan()
    },
    // 处理分页页码改变
    handleCurrentChange (pageNum) {
      this.searchForm.page = pageNum
      this.getdingdan()
    },
    // 拉取数据
    getdingdan () {
      console.log('我在拉取数据')
      // let searchForm = this.searchForm
      // searchForm.bindId = getUserId()
      fetchMyApplication(this.searchForm).then(data => {
        console.log('拉取了数据')
        console.log(data)
        this.list = data.list
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="less" scoped>
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-shengqing {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 60px;
  box-sizing: border-box;
  .dd-top {
    width: 100%;
    height: 36px;
    background-color: #f5f5f5;
    span {
      color: #333333;
      font-size: 12px;
      font-weight: 500;
      line-height: 36px;
    }
    .a1 {
      // margin: 0 120px;
      margin-left: 33px;
    }
    .a2 {
      // margin-right: 60px;
      margin-left: 35px;
    }
    .a3 {
      // margin-right: 80px;
      margin-left: 28px;
    }
    .a4 {
      // margin-right: 80px;
      margin-left: 33px;
    }
    .a5 {
      // margin-right: 80px;
      margin-left: 33px;
    }
    .a6 {
      // margin-right: 80px;
      margin-left: 33px;
    }
    .a7 {
      // margin-right: 80px;
      margin-left: 33px;
    }
    .a8 {
      // margin-right: 80px;
      margin-left: 33px;
    }
    .a9 {
      // margin-right: 80px;
      margin-left: 33px;
    }
    .a10 {
      // margin-right: 80px;
      margin-left: 33px;
    }
  }
  .dd-conent {
    margin-top: 15px;
    ul {
      li {
        width: 100%;
        height: 100px;
        padding: 18px 0;
        box-sizing: border-box;
        background-color: #fcfcfc;
        border: 1px solid #cccccc;
        .spP {
          width: 90px;
          font-size: 12px;
          float: left;
          margin-left: 10px;
          text-align: center;
          color: #565656;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .spP1 {
          width: 200px;
          .spPS1 {
            display: inline-block;
            font-size: 16px;
            margin-left: 15px;
            margin-top: 10px;
            color: #ff435b;
          }
          .spPS2 {
            font-size: 12px;
            margin-left: 10px;
            color: #999999;
          }
        }
        .spP2 {
          float: left;
          font-size: 12px;
          color: #777777;
          margin-left: 25px;
          line-height: 60px;
        }
        .spPP {
          float: left;
        }
        .spP3 {
          float: left;
          font-size: 12px;
          color: #777777;
          line-height: 60px;
          margin-left: 40px;
        }
        .xiangguan {
          float: left;
          font-size: 12px;
          color: #777777;
          margin-left: 35px;
          line-height: 60px;
        }
        .dd-btn {
          float: left;
          width: 35px;
          height: 100%;
          font-size: 12px;
          line-height: 60px;
          text-align: center;
          color: #777777;
          margin-left: 40px;
        }
        .spP4 {
          float: left;
          width: 40px;
          height: 100%;
          font-size: 12px;
          line-height: 60px;
          text-align: center;
          color: #777777;
          margin-left: 40px;
        }
        .spP5 {
          float: left;
          width: 45px;
          height: 100%;
          font-size: 12px;
          line-height: 60px;
          text-align: center;
          color: #777777;
          margin-left: 40px;
        }
        .spP6 {
          float: left;
          width: 90px;
          height: 100%;
          font-size: 12px;
          text-align: center;
          color: #777777;
          margin-left: 10px;
        }
        .spP7 {
          float: left;
          width: 50px;
          height: 100%;
          font-size: 12px;
          text-align: center;
          color: #777777;
          margin-left: 15px;
        }
        .spP8 {
          float: left;
          width: 50px;
          height: 100%;
          font-size: 12px;
          text-align: center;
          color: #777777;
          margin-left: 20px;
        }
      }
    }
  }
  .foot {
    margin-top: 50px;
    text-align: center;
  }
}

</style>
