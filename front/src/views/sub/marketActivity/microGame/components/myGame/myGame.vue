<template>
  <div class="my_game">
    <CommonSearch
      :is-inline="true"
      :params="formInline"
      :forms="formInline"
      @toParent="resetFieldHanle"
    />
    <el-table
      v-loading="loading"
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column
        prop="dataTitle"
        label="游戏名称"
      />
      <el-table-column
        prop="demoUrl"
        label="二维码"
        align="center"
      >
        <template slot-scope="scope">
          <div @click="showQRcode(scope.row) ">
            <svg-icon
              style="color:#5D9CEC"
              icon-class="icon_ym_ewm"
            />
          </div>
        </template>

      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <div style="color:#5D9CEC">{{ scope.row.status==='2'?'已下架':'已上架' }}</div>
        </template>

      </el-table-column>
      <el-table-column
        label="数据详情"
        width="200px"
      >
        <template slot-scope="scope">
          <!-- <div> 有效用户：{{ scope.row.amount }}</div>
          <div> 浏览数：{{ scope.row.views }}</div> -->
          <el-button
            v-if="scope.row.gameCode==='bargain'"
            type="text"
            @click="showDataDetail(scope.row)"
          >查看</el-button>
        </template>

      </el-table-column>
      <el-table-column
        prop="gameTime"
        label="游戏时间"
      >
        <template slot-scope="scope">
          <span> {{ scope.row.startTime }}~</span>
          <span> {{ scope.row.endTime }}</span>

        </template>

      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        prop="gameTitle"
        label="游戏类型"
      />

      <el-table-column
        label="操作"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="findGameBaseInfo(scope.row)"
          >
            编辑
          </el-button>

          <el-popover
            v-model="scope.row.shelves"
            placement="top"
            width="160"
          >
            <div style="line-heigth:16px;margin-bottom:5px">

              确定要<span style="color:#5D9CEC">{{ scope.row.status==='2'?'上架':'下架' }} </span>吗？</div>
            <div style="text-align: right; margin: 0">
              <el-button
                class="cancel_btn"
                @click="scope.row.shelves= false"
              >取消</el-button>
              <el-button
                type="primary"
                @click="obtained(scope.row)"
              >
                确定
              </el-button>
            </div>
            <el-button
              slot="reference"
              type="text"
            >{{ scope.row.status==='2'?'上架':'下架' }}</el-button>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :total="totalCount"
      layout="  prev, pager, next, sizes,jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
    />

    <!-- 二维码弹框 -->
    <el-dialog
      v-if="message!==''"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      custom-class="erweimaBox"
      width="335px"
    >
      <qrcode
        :options="{ width: 300,height:300,padding:0,margin:0 }"
        :value="message"
        class="erweima"
      />
      <p>请使用微信扫一扫</p>
      <div class="erweima-footer">
        <div class="ipt">
          <el-input
            ref="url"
            v-model="message"
            :readonly="true"
          />
        </div>
        <el-button
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="primary"
        >复制地址</el-button>
      </div>
    </el-dialog>

    <side-dialog :visible.sync="sideDialogShow">

      <dataDetail
        :table-data="itemsDetail"
        :game-data="gameItemData"
      />

    </side-dialog>
  </div>
</template>
<script>
// import Confirm from '@/components/MiniCommon/Confirm'
import SideDialog from '@/components/SideDialog'
import DataDetail from './components/dataDetail'
import { mapMutations, mapState } from 'vuex'
import Cookies from 'js-cookie'
// eslint-disable-next-line
import {  queryGameInsts,
  queryGameInfos,
  queryBargainGameInfo,
  queryRaffleGameInfo,
  queryGameInfosWithTenant,
  obtainedGame,
  queryRankInfo,
  obtainedRaffleGame } from '@/api/sub/marketActivity'
import CommonSearch from '@/components/CommonSearch/CommonSearch'

export default {
  components: {
    CommonSearch,
    SideDialog,
    DataDetail
  },
  data() {
    return {
      loading: true,
      tableHeight: 'calc(100vh - 248px)',
      shelves: false,
      sideDialogShow: false,
      gameItemData: {},
      itemsDetail: [],
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      // 二维码弹框数据
      dialogVisible: false,
      message: '',
      formInline: {
        searchMethod: (formValue) => {
          this.searchHandle(formValue, 'single')
        },
        forms: [
          {
            itemType: 'input',
            placeholder: '游戏名称',
            modelValue: 'dataTitle',
            isClearable: true
          },
          {
            itemType: 'select',
            placeholder: '游戏类型',
            modelValue: 'gameCode',
            isClearable: true,
            apiService: queryGameInfos,
            labelKey: 'gameTitle',
            valueKey: 'gameCode',
            params: { status: 1, pageSize: 10000 }
          },
          {
            itemType: 'select',
            placeholder: '状态',
            modelValue: 'status',
            isFilterable: true,
            isClearable: true,
            isVisibleList: true,
            defaultFirst: false,
            default: true,
            itemStyle: 'width:140px',
            selectOption: [
              {
                label: '已上架',
                value: '1'
              }, {
                label: '已下架',
                value: '2'
              }, {
                label: '全部状态',
                value: ''
              }
            ]
          }
        ]
      },
      formValue: {},
      gameInfoList: []
    }
  },

  computed: {
    ...mapState('microGame', ['isCreate'])
  },
  watch: {
    isCreate(newValue, oldValue) {
      // debugger
      this.queryMyGame({ status: 1 })

      this.queryGameInfos()
    }
  },
  mounted() {
    this.queryMyGame({ status: 1 })
    this.queryGameInfos()
  },
  methods: {
    ...mapMutations('microGame', ['GET_GAME_DETAIL', 'GET_EDIT', 'GET_EDIT_GAME_DETAIL']),

    /* 打开数据详情*/
    showDataDetail(val) {
      this.gameItemData = val
      this.sideDialogShow = true
      const data = {
        gameBaseId: val.dataId,
        orgIds: val.orgId,
        pageIndex: 0,
        pageSize: 10
      }
      queryRankInfo(data).then(res => {
        if (res.errorCode === 9000) {
          this.itemsDetail = res.results
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 搜索框搜索重置 */
    resetFieldHanle(formName) {
      // 重置的入参
      const params = {
        status: ''
      }
      this.pageIndex = 1
      this.pageSize = 10
      this.queryMyGame(params)
    },
    /* 搜索的入参*/
    searchHandle(formValue, single) {
      // 搜索的入参
      this.formValue = formValue

      const params = {
        ...this.formValue
      }
      if (single) {
        this.pageIndex = 1
        this.pageSize = 10
      }
      this.queryMyGame(params)
    },
    // 显示二维码
    showQRcode(val) {
      this.dialogVisible = true
      // const params = {
      //   m: 'h5',
      //   gameId: val.gameId,
      //   gameCode: val.gameCode,
      //   dataId: val.dataId,
      //   status: val.status
      // }

      const url = process.env.GAME_DOMAIN

      const gameCode = val.gameCode
      const orgId = Cookies.get('currentShopId')
      const tenantId = Cookies.get('tenantId')
      const dataId = val.dataId
      const pageParam = '0'
      const randomCode = (new Date().getTime() + '').substring(5)
      let gameUrl = url + '/thinknode/game/' + gameCode + '/m/' + tenantId + '/' + orgId + '/' + dataId + '/' + randomCode + '/' + pageParam

      if (gameUrl.startsWith('//')) {
        gameUrl = window.location.protocol + gameUrl
      } else if (!gameUrl.startsWith('http')) {
        gameUrl = 'http://' + gameUrl
      }

      this.message = gameUrl
    },
    onCopy(e) {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      // console.log(this.$refs.url)
      this.$refs.url.style.background = 'rgba(51,141,233,1)'
      this.$refs.url.style.color = '#fff'
    },
    onError(e) {
      this.$message.error('复制失败')
    },
    findGameBaseInfo(val) {
      const _this = this
      this.gameInfoList.forEach(element => {
        if (element.gameCode === val.gameCode) {
          _this.editGame(val, element)
        }
      })
    },
    editGame(val, gamBaseInfo) {
      const data = {
        gameBaseId: val.dataId
      }

      let func
      if (val.gameCode === 'bargain') {
        func = queryBargainGameInfo
      } else {
        func = queryRaffleGameInfo
      }
      func(data).then(res => {
        if (res.errorCode === 9000) {
          this.GET_GAME_DETAIL(gamBaseInfo)
          this.GET_EDIT_GAME_DETAIL(res.data)

          this.GET_EDIT(true) // 跳转到编辑
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    queryMyGame(params) {
      this.loading = true
      const data = {
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
        orgId: Cookies.get('currentShopId'),
        tenantId: Cookies.get('tenantId'),
        ...params
      }
      queryGameInsts(data).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
          if (res.data) {
            this.totalCount = res.data.resultCount
          } else {
            this.totalCount = 0
          }
          this.loading = false
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    queryGameInfos() {
      const params = {
        orgId: Cookies.get('currentShopId'),
        tenantId: Cookies.get('tenantId')
      }
      queryGameInfosWithTenant(params).then(res => {
        if (res.errorCode === 9000) {
          this.gameInfoList = res.results
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 上下架操作*/
    obtained(row) {
      const params = {
        dataId: row.dataId,
        gameCode: row.gameCode,
        gameId: row.gameId,
        m: 'update_status',
        orgId: Cookies.get('currentShopId'),
        tenantId: Cookies.get('tenantId'),
        sstoken: Cookies.get('Admin-Token')
      }
      if (row.status === '1') {
        params.status = '2'
      } else {
        params.status = '1'
      }

      const obtainedQuery = row.gameCode === 'bargain' ? obtainedGame : obtainedRaffleGame
      // obtainedRaffleGame

      obtainedQuery(params).then((res) => {
        if (res.errorCode === 9000) {
          this.resetFieldHanle()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.searchHandle(this.formValue)
    },

    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.searchHandle(this.formValue)
    }

  }
}
</script>
<style lang="scss" scoped>
.my_game /deep/ {
  padding: 10px;
  background-color: #ffffff;
  // .el-table {
  //   height: calc(100vh - 248px);
  // }
}
.el-dialog__wrapper /deep/ {
  .el-dialog.erweimaBox {
    text-align: center !important;
    width: 1000px;
    .el-dialog__header {
      background-color: #fff;
      .el-icon-close {
        color: #333;
      }
    }
    .erweima-footer {
      padding-bottom: 18px;
    }
    .ipt {
      width: 200px;
      float: left;
    }
  }
}

.side-dialog {
  width: 900px !important;
  height: calc(100vh - 147px) !important;
  top: 3px !important;
}
</style>
