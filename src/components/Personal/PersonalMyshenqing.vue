<template>
<!-- 我是信息一栏 -->
  <div class="conent">
    <div class="header">
      <h5>我的申请</h5>
    </div>
    <div class="aa">
      <el-tabs type="border-card" v-model="activeTabName" @tab-click="handleTabChange">
        <el-tab-pane label="所有申请" name="first">
          <div class="top">
            <span class="ololo"></span>
            <span class="span span1">账号标题</span>
            <span class="span">所属平台</span>
            <span class="span">内容分类</span>
            <span class="span">粉丝偏向</span>
            <span class="span">出售价格</span>
            <span class="span">粉丝数量</span>
            <span class="span">注册时间</span>
            <span class="span">其他状态</span>
            <span class="span">审核状态</span>
            <span class="span">备注</span>
          </div>
          <div class="conent" v-for="item of myApplicationList" :key="item.id">
            <div class="biaoti">
              <p>{{item.title}}</p>
            </div>
            <div class="pingtai">{{item.pingtai}}</div>
            <div class="fenlei">{{item.fenlei}}</div>
            <div class="pianxiang">{{item.painxiang}}</div>
            <div class="xianjia">¥{{item.jiage}}</div>
            <div class="shuliang">12.3w</div>
            <div class="shijian">{{item.shijian}}</div>
            <div class="zhuangtai">
              <p>开通直播：是</p>
              <p>开通橱窗：是</p>
              <p>认证：企业</p>
            </div>
            <div class="shenhe">待审核</div>
            <div class="beizhu">哈哈哈哈或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">
          <div class="top">
            <span class="ololo"></span>
            <span class="span span1">账号标题</span>
            <span class="span">所属平台</span>
            <span class="span">内容分类</span>
            <span class="span">粉丝偏向</span>
            <span class="span">出售价格</span>
            <span class="span">粉丝数量</span>
            <span class="span">注册时间</span>
            <span class="span">其他状态</span>
            <span class="span">审核状态</span>
            <span class="span">备注</span>
          </div>
          <div class="conent" v-for="item of myApplicationList" :key="item.id">
            <div class="biaoti">
              <p>{{item.title}}</p>
            </div>
            <div class="pingtai">{{item.pingtai}}</div>
            <div class="fenlei">{{item.fenlei}}</div>
            <div class="pianxiang">{{item.painxiang}}</div>
            <div class="xianjia">¥{{item.jiage}}</div>
            <div class="shuliang">12.3w</div>
            <div class="shijian">{{item.shijian}}</div>
            <div class="zhuangtai">
              <p>开通直播：是</p>
              <p>开通橱窗：是</p>
              <p>认证：企业</p>
            </div>
            <div class="shenhe">待审核</div>
            <div class="beizhu">哈哈哈哈或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或</div>
          </div>
          </el-tab-pane>
        <el-tab-pane label="审核通过" name="third">
          <div class="top">
            <span class="ololo"></span>
            <span class="span span1">账号标题</span>
            <span class="span">所属平台</span>
            <span class="span">内容分类</span>
            <span class="span">粉丝偏向</span>
            <span class="span">出售价格</span>
            <span class="span">粉丝数量</span>
            <span class="span">注册时间</span>
            <span class="span">其他状态</span>
            <span class="span">审核状态</span>
            <span class="span">备注</span>
          </div>
          <div class="conent" v-for="item of myApplicationList" :key="item.id">
            <div class="biaoti">
              <p>{{item.title}}</p>
            </div>
            <div class="pingtai">{{item.pingtai}}</div>
            <div class="fenlei">{{item.fenlei}}</div>
            <div class="pianxiang">{{item.painxiang}}</div>
            <div class="xianjia">¥{{item.jiage}}</div>
            <div class="shuliang">12.3w</div>
            <div class="shijian">{{item.shijian}}</div>
            <div class="zhuangtai">
              <p>开通直播：是</p>
              <p>开通橱窗：是</p>
              <p>认证：企业</p>
            </div>
            <div class="shenhe">待审核</div>
            <div class="beizhu">哈哈哈哈或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或</div>
          </div>
          </el-tab-pane>
        <el-tab-pane label="审核不通过" name="fourth">
          <div class="top">
            <span class="ololo"></span>
            <span class="span span1">账号标题</span>
            <span class="span">所属平台</span>
            <span class="span">内容分类</span>
            <span class="span">粉丝偏向</span>
            <span class="span">出售价格</span>
            <span class="span">粉丝数量</span>
            <span class="span">注册时间</span>
            <span class="span">其他状态</span>
            <span class="span">审核状态</span>
            <span class="span">备注</span>
          </div>
          <div class="conent" v-for="item of myApplicationList" :key="item.id">
            <div class="biaoti">
              <p>{{item.title}}</p>
            </div>
            <div class="pingtai">{{item.pingtai}}</div>
            <div class="fenlei">{{item.fenlei}}</div>
            <div class="pianxiang">{{item.painxiang}}</div>
            <div class="xianjia">¥{{item.jiage}}</div>
            <div class="shuliang">12.3w</div>
            <div class="shijian">{{item.shijian}}</div>
            <div class="zhuangtai">
              <p>开通直播：是</p>
              <p>开通橱窗：是</p>
              <p>认证：企业</p>
            </div>
            <div class="shenhe">待审核</div>
            <div class="beizhu">哈哈哈哈或或或或或或哈哈哈哈哈哈哈哈哈哈或或或或或</div>
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
      lists: [
        { ID: 1, title: '陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英', pingtai: '抖音', fenlei: '搞笑娱乐', painxiang: '女粉多', jiage: '9.90', shijian: '2019' },
        { ID: 2, title: '陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英', pingtai: '抖音', fenlei: '搞笑娱乐', painxiang: '女粉多', jiage: '9.90', shijian: '2019' },
        { ID: 3, title: '陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英', pingtai: '抖音', fenlei: '搞笑娱乐', painxiang: '女粉多', jiage: '9.90', shijian: '2019' },
        { ID: 4, title: '陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英', pingtai: '抖音', fenlei: '搞笑娱乐', painxiang: '女粉多', jiage: '9.90', shijian: '2019' },
        { ID: 5, title: '陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英陈志英', pingtai: '抖音', fenlei: '搞笑娱乐', painxiang: '女粉多', jiage: '9.90', shijian: '2019' }
      ],
      myApplicationList: [],
      searchForm: {
        page: 1,
        rows: 4,
        auditStatus: null
      },
      total: 0,
      page: { // page作为分页初始状态,不可修改
        page: 1,
        rows: 4
      }
    }
  },
  created () {
    this.getMyApplicationList()
  },
  methods: {
    getMyApplicationList () {
      // let searchForm = this.searchForm
      // searchForm.bindId = getUserId()
      fetchMyApplication(this.searchForm).then(data => {
        this.total = data.total
        this.myApplicationList = data.list
        console.group('红人-我的申请')
        console.log(data)
        console.groupEnd()
      })
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
      this.getMyApplicationList()
    },
    // 处理分页页码改变
    handleCurrentChange (pageNum) {
      this.searchForm.page = pageNum
      this.getMyApplicationList()
    }
  }
}
</script>

<style lang="less" scoped>
.conent {
  // width: 100%;
  height: 100%;
  margin-left: 10px;
  .header {
    margin-bottom: 20px;
  }
  .aa {
    // width: 100%;
    // height: 100%;
    border: 2px solid #e3e3e3;
    .top {
      font-size: 12px;
      line-height: 40px;
      width: 100%;
      height: 40px;
      display: inline-flex;
      border: 1px solid #e3e3e3;
      margin-bottom: 20px;
      .span {
        flex: 3;
      }
      .span1 {
        flex:4;
      }
      .ololo {
        width: 50px;
      }
    }
    .conenttert {
      height: 100%;
      float: left;
      width: 100%;
    padding: 8px 10px;
      font-size: 12px;
      // margin: 10px 0 ;
    box-sizing: border-box;
    background-color: #fcfcfc;
    border: 1px solid #cccccc;
      .biaoti {
        float: left;
        width: 130px;
          padding: 20px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .pingtai {
        float: left;
        width: 80px;
        text-align: center;
        line-height: 100px;
      }
      .fenlei {
        float: left;
        width: 60px;
        text-align: center;
        line-height: 100px;
        margin-left: 10px;
      }
      .pianxiang {
        float: left;
        width: 80px;
        text-align: center;
        margin-left: 10px;
        line-height: 100px;
      }
      .xianjia {
        float: left;
        width: 65px;
        text-align: center;
        line-height: 100px;
        margin-left: 15px;
        color: red;
      }
      .shuliang {
        float: left;
        width: 65px;
        text-align: center;
        line-height: 100px;
        margin-left: 15px;
        color: red;
      }
      .shijian {
        float: left;
        width: 60px;
        margin-left: 15px;
        text-align: center;
        line-height: 100px;
      }
      .zhuangtai {
        float: left;
        width: 75px;
        padding: 20px 0;
        margin-left: 20px;
        box-sizing: border-box;
        }
        .shenhe {
        float: left;
        width: 70px;
        text-align: center;
        margin-left: 10px;
        line-height: 100px;
        }
        .beizhu {
          float: left;
          width: 100px;
          padding: 20px 0;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
    }
  }
}
</style>
