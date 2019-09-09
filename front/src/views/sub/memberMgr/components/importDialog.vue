<template>
  <div class="import_content">
    <el-dialog
      :visible.sync="switchOff"
      :title="dialogTitle"
      center
      @close="closeDialog"
    >
      <div
        v-loading="flag"
        element-loading-text="正在上传文件"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >

        <el-steps
          :active="activeStep"
          align-center
          finish-status="success"
        >
          <el-step title="上传文件" />

          <el-step title="预览表格" />
          <el-step title="结果查询" />
        </el-steps>

        <FirstStep
          v-if="activeStep === 0"
          ref="firstStep"
          :is-member="dialogTitle"
        />
        <SecondStep
          v-if="activeStep >= 1"
          ref="SecondStep"
        />

        <!-- <ThirdStep
          v-if="activeStep === 2"
          ref="ThirdStep"
        /> -->
        <el-pagination
          v-if="activeStep !== 0"
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="resultCount"
          layout="prev,pager,next,sizes,jumper"
          @size-change="secondSizeChange"
          @current-change="secondCurrentChange"
        />

      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="activeStep === 1"
          class="cancel_btn"
          @click="Laststep"
        >放弃导入</el-button>
        <el-button
          :disabled="loading"
          class="cancel_btn"
          @click="netStep"
        >{{ activeStep===2?'导出失败记录':'下一步' }}</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import FirstStep from './step/FirstStep'
import SecondStep from './step/SecondStep'
// import ThirdStep from './step/ThirdStep'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  components: {
    FirstStep,
    SecondStep
    // ThirdStep
  },
  data() {
    return {
      dialogTitle: '',
      switchOff: false,
      active: 0
    }
  },

  computed: {
    ...mapState('importStep', ['loading', 'flag', 'activeStep', 'isExport', 'pageSize', 'pageIndex', 'resultCount'])
  },

  watch: {
    activeStep(val, oldval) {
      this.active = oldval
    }
  },
  methods: {
    ...mapActions('importStep',
      { takeNumber: 'takeBatchNumbers', queryCount: 'inTimeImportCounts', importFile: 'firstStep', secondSteps: 'secondStep', thirdStep: 'thirdStep', finalyStep: 'fourthStep' }
    ),
    ...mapMutations('importStep', ['DIA_TITLE', 'RESET_DATA', 'PAGE_INDEX', 'PAGE_COUNT', 'RESET_PAGE_COUNT', 'SHOW_LOADING']),
    show(val) {
      this.dialogTitle = val
      this.switchOff = true
      this.DIA_TITLE(val)
    },

    closeDialog() {
      if (this.activeStep === 0) {
        this.$refs.firstStep.reset()
      }
      this.RESET_DATA()
      this.SHOW_LOADING()
    },

    Laststep() {
      this.RESET_DATA()
      this.SHOW_LOADING()
    },
    netStep() {
      if (this.activeStep === 0) {
        this.importFile()
      }
      if (this.activeStep === 1) {
        this.thirdStep()
        this.RESET_PAGE_COUNT()
      }
      if (this.activeStep === 2) {
        this.finalyStep('导出')
      }
    },

    secondSizeChange(val) {
      this.PAGE_COUNT(val)
      if (this.activeStep === 1) {
        this.secondSteps()
      } else {
        this.finalyStep()
      }
    },
    /* 当前页的触发*/
    secondCurrentChange(val) {
      this.PAGE_INDEX(val)
      if (this.activeStep === 1) {
        this.secondSteps()
      } else {
        this.finalyStep()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.import_content /deep/ {
  .el-dialog {
    width: 800px !important;
  }

  .el-loading-parent--relative {
    height: 225px !important;
  }
  .el-loading-mask {
    top: -20px !important;
  }
  .el-loading-spinner .el-loading-text {
    color: #5d9cec !important ;
  }
}
</style>
