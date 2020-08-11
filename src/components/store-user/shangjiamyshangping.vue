<template>
<div>
  <h2>我的商品</h2>
  <div class="shangchuan-btn" @click="shuangchuan">上传商品</div>
  <div class="conent-danding">
    <el-tabs v-model="activeTabName" @tab-click="handleTabChange">
      <el-tab-pane label="所有商品" name="first">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a4">审核状态</span>
          <span class="a5">备注</span>
          <span class="a6">操作</span>
        </div>
        <div class="dd-conent">
          <ul >
            <li v-for="item in list" :key="item.id">
              <div class="spPP">
                <p class="spP">{{item.sputitle}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.disprice}}</span>
                  <span class="spPS2"><s>¥{{item.orprice}}</s></span>
                </p>
              </div>
              <p class="spP2">{{item.proportion}}%</p>
              <div class="xiangguan">
                {{item.auditStatus | auditStateFilter}}
              </div>
              <div class="dd-btn1">
                {{item.remarks || '无'}}
              </div>
              <div class="sjhfvsdvvfbgn" >
                <span v-if="item.auditStatus === 1">
                  <span class="xiajia-1" @click="xiajia(item)" v-if="item.state === 1">
                    下架
                  </span>
                  <span class="shangjia-1" @click="shangjia(item)" v-else>
                    上架
                  </span>
                </span>
                <span v-else></span>
                <span><el-button type="text" @click="shangpinxiugai(item)">修改</el-button></span>
                <span><el-button type="text" @click="shangpinshanchu(item)">删除</el-button></span>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待审核" name="second">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a4">审核状态</span>
          <span class="a5">备注</span>
          <span class="a6">操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in list" :key="item.id">
              <div class="spPP">
                <p class="spP">{{item.sputitle}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.orprice}}</span>
                  <span class="spPS2"><s>¥{{item.disprice}}</s></span>
                </p>
              </div>
              <p class="spP2">{{item.proportion}}%</p>
              <div class="xiangguan">
                待审核
              </div>
              <div class="dd-btn1">
                {{item.remarks || '后台正在努力审核中。。。。请稍后...'}}
              </div>
              <div class="sjhfvsdvvfbgn">
                <el-button type="text" @click="shangpinxiugai(item)">修改</el-button>
                <el-button type="text" @click="shangpinshanchu(item)">删除</el-button>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="审核通过" name="third">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a4">审核状态</span>
          <span class="a5">操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in list" :key="item.id">
              <div class="spPP">
                <p class="spP">{{item.sputitle}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.orprice}}</span>
                  <span class="spPS2"><s>¥{{item.disprice}}</s></span>
                </p>
              </div>
              <p class="spP2">{{item.proportion}}%</p>
              <div class="xiangguan">
                {{item.auditStatus | auditStateFilter}}
              </div>
              <div class="sjhfvsdvvfbgn" >
                <span v-if="item.auditStatus===1">
                  <span class="xiajia-1" @click="xiajia(item)" v-if="item.state === 1">
                    下架
                  </span>
                  <span class="shangjia-1" @click="shangjia(item)" v-else>
                    上架
                  </span>
                </span>
                <span v-else></span>
                <span><el-button type="text" @click="shangpinxiugai(item)">修改</el-button></span>
                <span><el-button type="text" @click="shangpinshanchu(item)">删除</el-button></span>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        </el-tab-pane>
      <el-tab-pane label="审核不通过" name="fourth">
        <div class="dd-top">
          <span class="a1">商品信息</span>
          <span class="a2">佣金比例</span>
          <span class="a4">审核状态</span>
          <span class="a5">备注</span>
          <span class="a6">操作</span>
        </div>
        <div class="dd-conent">
          <ul>
            <li v-for="item in list" :key="item.id">
              <div class="spPP">
                <p class="spP">{{item.sputitle}}</p>
                <p class="spP1">
                  <span class="spPS1">¥{{item.orprice}}</span>
                  <span class="spPS2"><s>¥{{item.disprice}}</s></span>
                </p>
              </div>
              <p class="spP2">{{item.proportion}}%</p>
              <div class="xiangguan">
                {{item.auditStatus | auditStateFilter}}
              </div>
              <div class="dd-btn1">
                {{item.remarks}}
              </div>
              <div class="sjhfvsdvvfbgn">
                <el-button type="text" @click="shangpinxiugai(item)">修改</el-button>
                <el-button type="text" @click="shangpinshanchu(item)">删除</el-button>
              </div>
            </li>
          </ul>
          <div class="foot">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="searchForm.row"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-dialog
        title="修改"
        :close-on-click-modal="canCloseModal"
        :close-on-press-escape="canCloseModal"
        :visible.sync="centerDialogVisible7676"
        width="70%"
        center>
        <div class="conent-shangchuan">
          <div class="sc-content">
            <el-form ref="form" :model="form" label-width="138px" :rules="rules" @submit.native.prevent>
              <div class="goods-pic-box">
                <el-upload
                  class="goods-pic-uploader"
                  :action="actions.uploadGoodsPic + '&bindId=' + form.id"
                  :show-file-list="false"
                  accept="image/*"
                  :before-upload="handleUploadGoodsPicBefore"
                  :on-error="handleUploadGoodsPicError"
                  :on-success="handleUploadGoodsPicSuccess">
                  <div class="upload-animation-box"
                      v-loading="loading"
                      element-loading-text="拼命上传中">
                    <img v-if="form.goodimg" :src="form.goodimg" class="goods-pic">
                    <i v-else class="el-icon-plus goods-pic-uploader__icon"></i>
                  </div>
                </el-upload>
                <el-upload
                  class="goods-pic-uploader-btn"
                  :action="actions.uploadGoodsPic + '&bindId=' + form.id"
                  list-type="text"
                  accept="image/*"
                  :show-file-list="false"
                  :before-upload="handleUploadGoodsPicBefore"
                  :on-error="handleUploadGoodsPicError"
                  :on-success="handleUploadGoodsPicSuccess">
                  <button class="upload-btn">
                    <p>上传商品展示图</p>
                    <p>(大小为1M以下)</p>
                  </button>
                </el-upload>
              </div>
                <el-form-item label="商品标题">
                  <el-input v-model="form.sputitle" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="上架平台">
                  <el-radio v-model="form.platform" label="拼多多">拼多多</el-radio>
                  <el-radio v-model="form.platform" label="天猫">天猫</el-radio>
                  <el-radio v-model="form.platform" label="淘宝">淘宝</el-radio>
                  <el-radio v-model="form.platform" label="京东">京东</el-radio>
                  <el-radio v-model="form.platform" label="供应商">供应商</el-radio>
                </el-form-item>
                <el-form-item label="商品分类">
                  <el-select v-model="form.cid" multiple placeholder="请选择所属商品分类" class="aj6">
                    <el-option v-for="item in contentCategoryStoreData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <!--  -->
                <el-form-item label="商品规格">
                  <el-input v-model="form.specs" placeholder="规格/大小/尺码/鞋码"></el-input>
                </el-form-item>
                <el-form-item label="店铺价">
                  <el-input v-model="form.orprice" placeholder="推荐价格"></el-input>
                </el-form-item>
                <el-form-item label="劵后价">
                  <el-input v-model="form.disprice" placeholder="卷后价格"></el-input>
                </el-form-item>
                <el-form-item label="优惠劵金额">
                  <el-input v-model="coupon" placeholder="输入优惠劵金额" disabled></el-input>
                </el-form-item>
                <el-form-item label="佣金比例">
                  <el-input v-model="form.proportion" placeholder="输入比例"></el-input>
                </el-form-item>
                <el-form-item label="预计发放优惠劵数量">
                  <el-input v-model="form.couponnumber" placeholder="输入优惠劵数量"></el-input>
                </el-form-item>
                <el-form-item label="商品有效期">
                  <el-input v-model="form.expirationDate" placeholder="展示的有效期（格式为：2020-01-01）"></el-input>
                </el-form-item>
                <el-form-item label="商品链接">
                  <el-input v-model="form.goodsurl" placeholder="该商品在对应平台上商品详情页链接"></el-input>
                </el-form-item>
                <el-form-item label="商品ID">
                  <el-input v-model="form.goodsId" placeholder="该商品在对应平台上的商品ID"></el-input>
                </el-form-item>
                <!--  -->
                <div style="text-align:center;margin-bottom: 10px">商品详情图</div>
                <div class="goods-pic-box">
                  <el-upload
                    v-loading="searching"
                    element-loading-text="正在查询中..."
                    element-loading-background="rgba(255, 255, 255, 0.3)"
                    class="goods-pic-uploader"
                    :action="actions.uploadGoodsPic2 + '&bindId=' + form.id"
                    :show-file-list="true"
                    list-type="picture-card"
                    accept="image/*"
                    :file-list="this.uploader.oldFiles"
                    :before-remove="handleUploadFileRemove"
                    :before-upload="handleUploadFileBefore"
                    :on-error="handleUploadFileError"
                    :on-success="handleUploadFileSuccess">
                    <i class="el-icon-plus goods-pic-uploader__icon"></i>
                  </el-upload>
                </div>
                <!-- <el-form-item label="" prop="type4">
                  <el-checkbox-group v-model="form.type4">
                    <el-checkbox label="本人同意此商品免费寄样" name="1"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item> -->
                <!--  -->
                <!-- <div class="sc-btn" @click="centerDialogVisible7676">
                  提交审核
                </div> -->
              </el-form>
              <!--  -->
              <div class="motai">
                <el-dialog :visible.sync="scBtn">
                  <div class="motai1">
                    <img src="../../assets/微信图片_20200109202826.png" alt="">
                    <h2>您的商品信息已成功提交！</h2>
                    <p>审核期间请保持您的联系方式通畅！平台通过审核后，您的商品将会展示在选品榜中供红人们选择。</p>
                  </div>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="scBtn = false">好 的</el-button>
                  </div>
                </el-dialog>
              </div>
              <!--  -->
            </div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible7676 = false">取消修改</el-button>
          <el-button type="primary" @click="jiaoyan('form')">确认修改</el-button>
        </span>
      </el-dialog>
    </el-tabs>
  </div>
</div>
</template>

<script>
import { fetchMyGoods, updateGoodsState, shanchushangpin, createGoodsId, xiugaishangpin } from '@/api/goods'
import { getState } from '@/utils/auth'
// import { getgoodsshangjia, xiugaigoodsshangjia } from '../../api/user'
import { getGoodsDetail, deleteFile } from '../../api/goods'

// import { getUserId } from '@/utils/auth'
import actions from '@/data/actions'
// import { getgoodsshangjia } from '../../api/user'
import { contentCategoryStoreData } from '@/data/common'
const platformMap = {
  '淘宝': 0,
  '天猫': 1,
  '拼多多': 2,
  '京东': 3,
  '供应商': 4
}
export default {
  data () {
    return {
      activeTabName: 'first',
      currentPage: 1,
      centerDialogVisible7676: false,
      list: [],
      searchForm: {
        page: 1,
        row: 4,
        auditStatus: '', // 状态0待审核1审核通过2审核不通过
        state: ''
      },
      total: 0,
      page: { // page作为分页初始状态,不可修改
        page: 1,
        row: 4
      },
      goodsList: [],
      actions,
      contentCategoryStoreData,
      form: {
        sputitle: '',
        platform: null,
        type4: [],
        specs: '',
        orprice: '',
        disprice: '',
        coupon: '',
        proportion: '',
        expirationDate: '',
        couponnumber: '',
        goodsurl: '',
        goodsId: '',
        goodimg: null,
        id: ''
        // cid: []
      },
      scBtn: false,
      type: ['选中且禁用', '复选框 A'],
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'blur' },
          {
            required: true,
            pattern: /[\u4e00-\u9fa5]/gm,
            message: '请输入正确标题',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '请选择一个上架平台', trigger: 'change' }
        ],
        type4: [
          { type: 'array', required: true, message: '请勾选此选项', trigger: 'change' }
        ],
        specs: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        orprice: [
          { required: true, message: '请输入商品市场价', trigger: 'blur' },
          {
            required: true,
            // pattern: /^\d+$/,
            pattern: /^(\d*)(\.(\d{0,2}))?$/g,
            message: '请输入正确的金额且只能保留2位小数',
            trigger: 'blur'
          }
        ],
        disprice: [
          { required: true, message: '请输入商品券后价', trigger: 'blur' },
          {
            required: true,
            // pattern: /^\d+$/,
            pattern: /^(\d*)(\.(\d{0,2}))?$/g,
            message: '请输入正确的金额且只能保留2位小数',
            trigger: 'blur'
          }
        ],
        coupon: [
          { required: true, message: '请输入商品优惠券金额', trigger: 'blur' },
          {
            required: true,
            // pattern: /^\d+$/,
            pattern: /^(\d*)(\.(\d{0,2}))?$/g,
            message: '请输入正确的金额且只能保留2位小数',
            trigger: 'blur'
          }
        ],
        proportion: [
          { required: true, message: '请输入商品佣金比例', trigger: 'blur' },
          {
            required: true,
            pattern: /^\d+$/,
            message: '请输入正确的比例',
            trigger: 'blur'
          }
        ],
        couponnumber: [
          { required: true, message: '请输入发放的优惠券的数量', trigger: 'blur' },
          {
            required: true,
            pattern: /^\d+$/,
            message: '请输入正确的比例',
            trigger: 'blur'
          }
        ],
        expirationDate: [
          { required: true, message: '请输入发放的优惠券的数量', trigger: 'blur' },
          {
            required: true,
            pattern: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/,
            message: '请输入正确的时间格式',
            trigger: 'blur'
          }
        ],
        goodsurl: [
          { required: true, message: '请输入商品链接', trigger: 'blur' }
        ],
        goodsId: [
          { required: true, message: '请输入商品ID', trigger: 'blur' }
        ]
      },
      goodsImgsList: [],
      loading: false,
      searching: false,
      canCloseModal: false,
      uploader: {
        newFiles: [],
        oldFiles: [],
        removedOldFiles: []
      }
    }
  },
  mounted () {
    this.getGoodsList()
  },
  computed: {
    'coupon' () {
      const { orprice, disprice } = this.form
      if (Number(orprice).toString() === 'NaN') return 0
      if (Number(disprice).toString() === 'NaN') return 0
      return (orprice - disprice).toFixed(2) - 0
    }
  },
  created () {
    this.createGoodsId()
    this.getxinxi()
  },
  watch: {
    centerDialogVisible7676 (val) {
      if (val) {
        this.isUnsubmitStatus = true
        return
      }
      // 若果是未提交状态，则删除新上传的文件
      if (this.isUnsubmitStatus) {
        this.uploader.newFiles.forEach(file => {
          deleteFile(file.fileId, false).then(data => {
            console.log('删除文件成功')
          }).catch(err => {
            console.log('删除文件失败====', err.message)
          })
        })
      }
      // 关闭后清空所上传的文件数据，防止页面显示
      this.uploader.newFiles = []
      this.uploader.oldFiles = []
    }
  },
  methods: {
    // 若商品id不存在则创建商品id,
    createGoodsId () {
      if (this.form.id) {
        return
      }
      createGoodsId().then(data => {
        this.form.id = data
      })
    },
    // 是否只保留了俩位小数
    isOnlyKeepTwoDecimal (val) {
      return /^(\d*)(\.(\d{0,2}))?$/g.test(val)
    },
    getUploadedGoodsDetailFileLength () {
      let lenght = 0
      this.uploader.oldFiles.forEach(item => {
        if (item.status !== 'remove') lenght++
      })
      this.uploader.newFiles.forEach(item => {
        if (item.status !== 'remove') lenght++
      })
      console.log('length', lenght)
      return lenght
    },
    deleteFilesAndListenFilesStatus (files, cb) {
      console.log('==============111')
      console.log(files)
      const sum = files ? files.length : 0
      console.log(files.lenght)
      let hasOperatedNum = 0
      const undeletedFiles = []
      const listen = () => {
        console.log(sum === hasOperatedNum)
        if (typeof cb === 'function' && sum === hasOperatedNum) {
          const result = { success: undeletedFiles.length === 0, undeletedFiles }
          cb(result)
        }
      }
      if (!files || files.length < 1) {
        listen()
        return
      }
      console.log(files)
      files.forEach(file => {
        deleteFile(file.fileId, false).then(data => {
          hasOperatedNum++
          listen()
        }, false).catch(() => {
          console.log('delte file fail')
          hasOperatedNum++
          undeletedFiles.push(file)
          listen()
        })
      })
    },
    // 点击上传整体做个校验
    jiaoyan (form) {
      console.log('点击成功')
      // console.log(getUserId())
      console.log(this.form.type)
      if (this.getUploadedGoodsDetailFileLength() < 1) {
        this.$notify({
          title: '警告',
          message: '请上传商品详情图',
          type: 'warning'
        })
        return
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 删除图片
          const removedFiles = this.uploader.oldFiles.reduce((result, item) => {
            if (item.status === 'remove') {
              result.push(item)
            }
            return result
          }, [])
          console.log('================')
          console.log(removedFiles)
          this.deleteFilesAndListenFilesStatus(removedFiles, ({ success, undeletedFiles }) => {
            if (success) {
              xiugaishangpin({
                sputitle: this.form.sputitle,
                platform: this.form.type && platformMap[this.form.type],
                specs: this.form.specs,
                orprice: this.form.orprice,
                disprice: this.form.disprice,
                coupon: this.coupon,
                proportion: this.form.proportion,
                couponnumber: this.form.couponnumber,
                goodsurl: this.form.goodsurl,
                goodsId: this.form.goodsId,
                // bindId: getUserId(),
                cid: this.form.cid && this.form.cid.join('|'),
                expirationDate: this.form.expirationDate,
                id: this.form.id,
                auditStatus: 0
              }).then(data => {
                console.log('这是返回的数据')
                console.log(data)
                this.getGoodsList()
                this.isUnsubmitStatus = false
                this.centerDialogVisible7676 = false
              })
            } else {
              this.$notify({
                title: '修改失败',
                message: '部分商品详情图片文件删除失败，请重新修改再做提交',
                center: true,
                type: 'warning'
              })
              console.log('修改失败')
              console.log(undeletedFiles)
              // 修改失败，将未删除的文件重新渲染在页面上
              const unRemovedFiles = []
              this.uploader.newFiles.forEach(item => {
                if (item.status !== 'remove') unRemovedFiles.push(item)
              })
              this.uploader.oldFiles.forEach(item => {
                if (item.status !== 'remove') unRemovedFiles.push(item)
              })
              console.log(unRemovedFiles)
              this.uploader.oldFiles = [...undeletedFiles, ...unRemovedFiles].map(item => {
                return Object.assign({}, item, {
                  status: 'success',
                  uid: ''
                })
              })
            }
          })
        }
      })
    },
    resetForm (form) {
      this.$refs[form].jiaoyan()
    },
    handleUploadGoodsPicSuccess (res, file) {
      this.form.goodsPic = URL.createObjectURL(file.raw)
      this.loading = false
    },
    handleUploadGoodsPicError () {
      this.loading = false
      this.$notify({
        title: '警告',
        message: '上传失败, 请重新上传',
        center: true,
        type: 'warning'
      })
    },
    handleUploadGoodsPicBefore (file) {
      console.log(file)
      // 上传的图片不能超过1M
      if (file.size / 1024 / 1024 > 2) {
        this.$notify({
          title: '警告',
          message: '上传失败, 图片尺寸不能超过1M',
          center: true,
          type: 'warning'
        })
        return false
      }
      // 上传前判断商品id是否存在，不存在则上传失败
      if (this.form.id) {
        this.loading = true
        return
      }
      this.$notify({
        title: '警告',
        message: '上传失败, 请重新上传',
        center: true,
        type: 'warning'
      })
      this.createGoodsId()
      return false
    },
    // 获取商品信息
    getxinxi () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    shuangchuan () {
      const state = getState()
      // alert(state)
      if (state !== 1) {
        this.$alert('您的账号还未通过审核哦, 请通过审核后操作', '警告', {
          confirmButtonText: '确定',
          center: true
        })
      } else {
        this.$router.push({ name: 'shangchaun' })
      }
    },
    // tab页切换
    handleTabChange (tab) {
      this.list = []
      // 商品状态 auditStatus// 状态0待审核1审核通过2审核不通过
      // 每次切换tab, 切换到初始化的搜索的page页
      let auditStatus = ''
      switch (tab.name) {
        case 'second': // 待发货
          auditStatus = 0
          break
        case 'third': // 已发货
          auditStatus = 1
          break
        case 'fourth': // 已收货
          auditStatus = 2
          break
      }
      this.searchForm = Object.assign(this.searchForm, this.page, { auditStatus })
      console.log(this.searchForm)
      this.getGoodsList()
    },
    // 处理分页页码改变
    handleCurrentChange (pageNum) {
      this.searchForm.page = pageNum
      this.getGoodsList()
    },
    // 拉取商品列表
    getGoodsList () {
      // let searchForm = this.searchForm
      let date = new Date()
      // searchForm.bindId = getUserId()
      fetchMyGoods(this.searchForm, { createTime: date }).then(data => {
        this.list = data.list
        this.total = data.total
        console.log(this.list)
      })
    },
    // 下架
    xiajia ({ id }) {
      console.log(id)
      updateGoodsState({
        id: id,
        state: 0
      }).then(data => {
        console.log(data)
        console.log('这是数据')
        this.getGoodsList()
        alert('下架成功')
      })
    },
    // 上架
    shangjia ({ id }) {
      console.log(id)
      updateGoodsState({
        id: id,
        state: 1
      }).then(data => {
        console.log(data)
        console.log('这是数据')
        this.getGoodsList()
        alert('上架成功')
      })
    },
    // 商品信息修改
    shangpinxiugai ({ id }) {
      this.$confirm('此操作将修改该商品信息, 是否继续?', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.centerDialogVisible7676 = true
        getGoodsDetail({
          id: id
        }).then(data => {
          console.log('这是商家商品详情')
          console.log(data)
          const platform = data.platform
          for (const key in platformMap) {
            if (platformMap[key] === platform) {
              data.platform = key
              break
            }
          }
          data.cid = data.cid && data.cid.split('|')
          data.type4 = []
          if (data.imageList && Array.isArray(data.imageList)) {
            this.uploader.oldFiles = data.imageList.map(item => {
              return {
                url: item.url,
                status: 'success',
                fileId: item.id
              }
            })
          }
          this.form = data
        })
        // this.$router.push({ name: 'upshangjiashangpin' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    checkSize (file) {
      if (file.size / 1024 / 1024 > 2) {
        this.$notify({
          title: '警告',
          message: '上传失败, 图片尺寸不能超过1M',
          center: true,
          type: 'warning'
        })
        return false
      }
      return true
    },
    handleUploadFileBefore (file) {
      console.log(this.uploader.oldFiles)
      console.log(this.uploader.newFiles)
      if (!this.checkSize(file)) {
        return false
      }
    },
    handleUploadFileError () {
      this.$notify({
        title: '警告',
        message: '上传失败, 请重新上传',
        center: true,
        type: 'warning'
      })
    },
    async handleUploadFileRemove (file) {
      // 若果是最新上传的，直接删除掉
      // 旧的就不删除，等待用户点击确认在删除
      console.log(file.isNew)
      if (file.isNew) {
        try {
          await deleteFile(file.fileId, false)
          file.status = 'remove'
        } catch (error) {
          return false
        }
      }
      file.status = 'remove'
    },
    handleUploadFileSuccess (res, file) {
      file.fileId = res.data.id
      file.isNew = true // 标识是最新上传
      // console.log('succes')
      // console.log(this.uploader.oldFiles)
      this.uploader.newFiles.push(file)
    },
    // 商品删除
    shangpinshanchu ({ id }) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        shanchushangpin({
          id: id
        }).then(data => {
          console.log(data)
          this.getGoodsList()
        }) // 调用商品信息删除接口
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.goods-pic-box {
  .goods-pic-uploader__icon {
    width: 148px !important;
    height: 148px !important;
    line-height: 148px !important;
  }
  .goods-pic-uploader {
    .el-upload {
      border:2px solid #dee0e3;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: rgb(202, 219, 236);
      }
    }
    .el-icon-plus:before {
      font-size: 49px;
    }
  }
}
</style>

<style lang="less" scoped>
.shangchuan-btn {
  width: 156px;
  height: 40px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  border-radius: 5px;
  float: right;
  margin-top: -50px;
  background-color: #fd3269;
}
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-danding {
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
      margin: 0 120px;
    }
    .a2 {
      margin-right: 20px;
    }
    .a3 {
      margin-right: 20px;
    }
    .a4 {
      margin-right: 100px;
    }
    .a5 {
      margin-right: 120px;
    }
  }
  .dd-conent {
    margin-top: 15px;
    ul {
      li {
        width: 100%;
        height: 100px;
        padding: 18px ;
        box-sizing: border-box;
        background-color: #fcfcfc;
        border: 1px solid #cccccc;
        .spP {
          width: 200px;
          font-size: 12px;
          float: left;
          margin-left: 15px;
          color: #565656;display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
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
          width: 40px;
          color: #777777;
          margin-left: 60px;
          text-align: center;
          line-height: 60px;
        }
        .spPP {
          float: left;
        }
        .spP3 {
          float: left;
          font-size: 12px;
          color: #777777;
          width: 60px;
          text-align: center;
          line-height: 60px;
          margin-left: 30px;
        }
        .xiangguan {
          float: left;
          width: 60px;
          font-size: 12px;
          color: #777777;
          text-align: center;
          margin-left: 20px;
          line-height: 60px;
        }
        .dd-btn1 {
          float: left;
          width: 160px;
          height: 100%;
          font-size: 12px;
          text-align: center;
          color: #777777;
          margin-left: 25px;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .sjhfvsdvvfbgn {
          float: left;
          width: 105px;
          height: 100%;
          font-size: 12px;
          color: #777777;
          text-align: center;
          margin-left: 15px;
          line-height: 62px;
          span {
            margin-left: 2px;
            text-decoration: underline
          }
          .xiajia-1 {
            color: #fd3069;
          }
          .shangjia-1 {
            color: blue;
          }
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

<style lang="less">
  .sc-content {
    margin: 0 auto;
    .el-form-item {
      height: 24px;
      margin-bottom: 20px;
    }
    .el-form-item__label {
      font-size: 12px;
      height: 24px;
      color: #323232;
    }
    .el-input__inner {
      font-size: 12px;
      height: 24px;
    }
    .el-checkbox-group {
      float: left;
      font-size: 12px;
      height: 24px;
    }
    .el-form-item__content {
      height: 24px;
      // line-height: 24px;
    }
    .el-checkbox {
      height: 24px;
      font-size: 12px;
      margin-right: 10px;
    }
    .el-checkbox__label {
      font-size: 12px;
      padding-left: 2px;
    }
    .el-checkbox:last-of-type {
      margin-right: 0;
    }
    .el-form-item__error {
      padding-top: 10px;
    }
  }
  .motai {
    .el-dialog {
      padding: 0 50px;
      width: 500px;
      text-align: center;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .el-button {
      background-color: #fe336a;
      color: #fff;
    }
  }
.goods-pic-box {
  .goods-pic-uploader {
    .el-upload {
      border:2px solid #dee0e3;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: rgb(202, 219, 236);
      }
    }
    .el-icon-plus:before {
      font-size: 49px;
    }
  }
}
</style>

<style lang="less" scoped>
h2 {
  height: 60px;
  width: 100%;
  line-height: 60px;
}
.conent-shangchuan {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #dddddd;
  padding: 50px 40px;
  box-sizing: border-box;
  .sc-content {
    width: 600px;
    height: 100%;
    border-right-color: aqua;
  }
  .sc-btn {
    width: 170px;
    height: 45px;
    background-color: #fe336a;
    font-size: 18px;
    text-align: center;
    line-height: 45px;
    border-radius: 5px;
    color: #fff;
    margin: 30px auto;
  }
  .ae {
    width: 200px;
    height: 40px;
    margin-right: 20px;
  }
}
// 商品图片 样式
.goods-pic-box {
  margin-bottom: 25px;
  text-align: center;
  .goods-pic-uploader {
    // display: inline-block;
    // margin-right: 36px;
    vertical-align: bottom;
    // height: 190px;
  }
  @imgW: 180px;
  .goods-pic-uploader__icon {
    font-size: 28px;
    color: #8c939d;
    width:@imgW;
    height:@imgW;
    line-height: @imgW;
    text-align: center;
    font-size: 60px;
    color: #dee0e3;
  }
  .goods-pic {
    width:@imgW;
    height:@imgW;
    display: block;
  }
  .goods-pic-uploader-btn {
    // display: inline-block;
    // vertical-align: bottom;
    .upload-btn {
      width:180px;
      height:40px;
      font-size:14px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      background-color: #fe336a;
      color:#fff;
      line-height:20px;
      letter-spacing: 2px;
      border-radius: 6px;
      p{
        font-size:14px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:#fff;
      }
    }
  }
}
</style>
