<template>
  <transition name="slide-fade">

    <div
      v-show="isCreate"
      ref="sideModal"
      class="side-zhezhao"
    >
      <div
        v-show="isCreate"
        class="side-dialog"
      >
        <div
          v-if="topShow"
          class="top"
        >
          <div class="top-left">
            <span class="lan" />
            <span>{{ gameDetail.gameTitle }}</span>
          </div>

          <div class="top-right">
            <Confirm
              :text="'保存'"
              :placement="'top'"
              :content="'确认保存么?'"
              :confirm="save"
              :is-button="true"
              :btn-type="'primary'"
            />
            <Confirm
              :text="'关闭'"
              :placement="'top'"
              :content="'确认关闭么?'"
              :confirm="close"
              :is-button="true"
              :btn-type="'plain'"
            />
          </div>
        </div>

        <editGame ref="editGame" />

      </div>
    </div>
  </transition>
</template>
<script>
import Confirm from '@/components/MiniCommon/Confirm'
import editGame from './editGame'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { Confirm, editGame },

  data() {
    return {

      url: '',
      topShow: true
    }
  },
  computed: {
    ...mapState('microGame', ['isCreate', 'gameDetail'])
  },
  beforeDestroy() {
    this.$refs.editGame.resetForm('ruleForm')
    this.GET_EDIT(false)
  },
  methods: {
    ...mapMutations('microGame', ['GET_EDIT']),
    close() {
      this.$refs.editGame.resetForm('ruleForm')
      this.GET_EDIT(false)
    },
    save() {
      this.$refs.editGame.submitForm('ruleForm')
    }

  }
}
</script>
<style lang="scss" scoped>
// .side-zhezhao {
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   position: fixed;
//   top: 0px;
//   right: 0px;
//   z-index: 2000;
// }

.side-dialog {
  top: 0px;
  right: 0px;
  z-index: 1000;
  width: 100%;
  position: fixed;
  margin-left: -20px;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  // -moz-box-shadow: 2px 2px 5px #333333;
  // -webkit-box-shadow: 2px 2px 5px #333333;
  // box-shadow: 2px 2px 5px #333333;
  .top {
    // width: calc(100vw - 180px) !important;
    min-height: 40px;
    justify-content: space-between;
    border-bottom: 4px solid #5d9cec;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
    .lan {
      background-color: #5d9cec;
      width: 8px;
      height: 14px;
      border-radius: 3px;
      display: inline-block;
      margin-right: 5px;
    }
    // background: pink;
    .top-left {
      display: flex;
      font-size: 16px;
      margin-top: 10px;
    }
    .top-right {
      display: flex;
      .el-button {
        margin-left: 10px;
        margin-bottom: 10px;
      }
    }
  }
  .contBox {
    width: calc(100vw - 150px);
    height: calc(100vh - 60px);
    .cont {
      width: 99%;
      height: 100%;
      border: 0;
    }
  }
  .contBox1 {
    width: calc(100vw - 150px);
    height: calc(100vh);
    .cont {
      width: 99%;
      height: 100%;
      border: 0;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}
</style>
<style lang="scss" >
.tanchukuang {
  z-index: 20000 !important;
  p {
    font-size: 12px;
    color: #666;
  }
}
</style>

