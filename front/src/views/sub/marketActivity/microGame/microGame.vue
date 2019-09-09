<template>
  <div class="market_content">

    <el-tabs
      v-model="activeTabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="微游戏"
        name="first"
      >
        <microGame ref="microGame" />
      </el-tab-pane>
      <el-tab-pane
        label="我的游戏"
        name="second"
      >
        <myGame ref="myGame" />
      </el-tab-pane>
    </el-tabs>
    <createGame v-if="isCreate" />
  </div>

</template>
<script>
import microGame from './components/microGame/microGame'
import myGame from './components/myGame/myGame'
import createGame from './components/microGame/components/createGame'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    microGame,
    myGame,
    createGame
  },
  data() {
    return {
      activeTabs: 'first'
    }
  },

  computed: {
    ...mapState('microGame', ['activeName', 'isChange', 'isCreate'])
  },

  watch: {
    activeName(newValue, oldval) {
      if (this.isChange) {
        this.activeTabs = newValue
      }
    },
    activeTabs(newValue, oldval) {
      if (newValue === 'second') {
        this.$refs.myGame.queryMyGame({ status: 1 })
      }
    }
  },

  methods: {
    ...mapMutations('microGame', ['CHANGE_TAB', 'GET_EDIT']),

    handleClick(tab, event) {
      this.CHANGE_TAB(tab.name)
      this.GET_EDIT(false)
      if (tab.name === 'first') {
        // window.location.reload()
        this.$refs.microGame.queryAllLabel()
        this.$refs.microGame.queryGameInfosWithTenants('changeTabs')
        // this.$refs.microGame.showCont()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.market_content /deep/ {
  margin-left: 10px;
  background-color: #ffff;
  .el-tabs__nav-scroll {
    margin-left: 10px;
  }
}
</style>
