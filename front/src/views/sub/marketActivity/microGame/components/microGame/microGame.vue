<template>
  <div class="game-box">
    <pull-to :is-top-bounce="true">
      <div class="microGame-container">
        <div class="microGame-top">

          <div class="cont">
            <div
              v-for="(item,index) of navList"
              v-show="flag===true?index<3:index<navList.length"
              :key="index"
              class="jieri"
            >
              <strong class="tit">{{ item.group }}:</strong>
              <div>
                <button
                  ref="listCont"
                  :class="{clickClass:!item.switch}"
                  class="listCont"
                  @click="showCont(item,index)"
                >全部</button>

                <button
                  v-for="(itm,i) of item.value"
                  :key="i"
                  :class="{clickClass:itm.edit}"
                  class="listCont"
                  @click="showContList(item,itm,index)"
                >{{ itm.labelName }}</button>

              </div>

            </div>

          </div>
        </div>
        <div class="microGame-cont">
          <Game :data="list" />

        </div>

      </div>
    </pull-to>
  </div>
</template>
<script>
import Game from './components/games'
import { queryAllLabel, queryGameInfosWithTenant } from '@/api/sub/marketActivity'
import PullTo from 'vue-pull-to'
import Cookies from 'js-cookie'
export default {
  components: {
    Game,
    'pull-to': PullTo
  },
  data() {
    return {
      flag: true,
      navList: [],
      list: [],
      // 弹出框参数
      outerVisible: false,
      innerVisible: false,
      // loadmore组件参数
      pageSize: 20,
      pageIndex: 0,
      // pageArr: [],
      pageCount: 0,
      textInfo: false,
      paramsArr: [],
      group: [],
      searchParams: {
        orgId: Cookies.get('currentShopId'),
        tenantId: Cookies.get('tenantId')
      }
    }
  },
  mounted() {
    this.queryAllLabel()
    this.queryGameInfosWithTenants()
  },
  methods: {
    queryGameInfosWithTenants(data) {
      if (!data) {
        data = this.searchParams
      } else if (data === 'changeTabs') {
        this.searchParams.labelIds = ''
        data = this.searchParams
      }
      queryGameInfosWithTenant(data).then(res => {
        if (res.errorCode === 9000) {
          this.list = Object.assign([], res.results)
          this.pageCount = res.data.pageCount
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    queryAllLabel() {
      const params = {
        product: '2'
      }

      queryAllLabel(params).then(res => {
        if (res.errorCode === 9000) {
          this.navList = res.results
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 导航栏控制函数
    showCont(item, index) {
      // item.switch = !item.switch
      this.navList[index].value.forEach(v => {
        if (v.edit) { v.edit = false; item.switch = !item.switch }
      })
      if (this.group.indexOf(item.group) > -1) {
        this.paramsArr.splice(this.group.indexOf(item.group), 1)
        this.group.splice(this.group.indexOf(item.group), 1)
      }
      const labelIds = this.paramsArr.join(',')
      this.searchParams.labelIds = labelIds

      this.queryGameInfosWithTenants(this.searchParams)
    },

    showContList(item, itm, index) {
      item.switch = true

      item.value.forEach(v => {
        if (v.edit) { delete v['edit'] }
      })
      const tmpe = Object.assign({}, itm)
      const ii = item.value.indexOf(itm)

      tmpe.edit = true
      this.navList[index].value.splice(ii, 1, tmpe)
      if (this.group.indexOf(item.group) === -1) {
        this.group.push(item.group)
        this.paramsArr.push(itm.id)
      } else {
        this.paramsArr.splice(this.group.indexOf(item.group), 1, itm.id)
      }
      this.searchParams.labelIds = this.paramsArr.join(',')
      this.queryGameInfosWithTenants(this.searchParams)
    }

  }
}
</script>

<style lang="scss" scoped>
// .game-box {
//   margin: 10px;
// }
.microGame-container {
  width: 100%;
  background-color: #ffff;
  // margin-left: 10px;
  .microGame-top .cont {
    width: 100%;
    position: relative;
    .jieri {
      display: flex;
      padding-top: 10px;
      button {
        background: #fff;
        cursor: pointer;
        color: rgba(51, 51, 51, 1);
        font-weight: 400;
        font-size: 14px;
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 2px 10px;
        margin: 5px 3px;
        outline: none;
        border-color: transparent;
        box-shadow: none;
      }
      button:hover {
        // padding: 2px 10px;
        // margin: 10px 3px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        border: 1px solid rgba(70, 182, 238, 1);
      }
      .tit {
        // width: 42px;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        min-width: 42px;
        margin: 11px 5px 10px 20px;
      }
      div {
        flex-wrap: wrap;
        align-items: center;
        .clickClass {
          background: #2ea8e6;
          color: #fff;
          border: 0;
        }
        .listCont {
          margin: 5px 14px 5px 0px;
        }
      }
    }
  }
  .microGame-cont {
    height: 100%;
    // height: 300px;
    // min-height: calc(100vh - 200px);
    // background: rgba(240, 242, 245, 0.8);
  }
  .leads-bottom-text {
    text-align: center;
    color: #999;
    width: 100%;
    height: 20px;
  }
}
</style>

