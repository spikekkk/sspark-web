/**
 * 二次确认
 * props:
 *    text         String       按钮文案
 *    placement    String       弹窗方向
 *    content      String       弹窗内容
 *    confirm      Function     确认事件
 *    isButton     Bool         开关是否是按钮
 *    btnDisabled  Bool         按钮是否禁用
 *    btnType      str          按钮类型
 *    btnClass     str          按钮样式类名
 *    isVisibleFun bool         是否通过数据控制气泡显隐
 * slot
 */
<template>
  <el-popover
    v-model="visible"
    :placement="placement"
    min-width="124"
  >
    <p class="confirm-content"><i class="el-icon-warning confirm-icon" />{{ content }}</p>
    <div style="text-align: right; margin: 10px 0 0 0;">
      <el-button
        class="cancel_btn"
        @click="cancelHandle"
      >取消</el-button>
      <el-button
        type="primary"
        class="edit_btn"
        @click="confirmHandle"
      >确定</el-button>
    </div>
    <a
      v-if="!isButton"
      slot="reference"
      class="btn-text"
      isVisibleFun="isVisibleFun"
      @click="visibleFunc"
    >{{ text }}</a>
    <el-button
      v-if="isButton"
      slot="reference"
      :disabled="btnDisabled"
      :type="btnType"
      :class="btnClass"
      class="btn-style"
      is-visible-fun="isVisibleFun"
      @click="visibleFunc"
    >{{ text }}</el-button>
  </el-popover>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '删除'
    },
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: '确定删除吗？'
    },
    confirm: {
      type: Function,
      required: true
    },
    isButton: {
      type: Boolean,
      default: false
    },
    btnDisabled: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: ''
    },
    btnClass: {
      type: String,
      default: ''
    },
    selectData: {
      type: Number,
      default: 0
    },
    isVisibleFun: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false
    }
  },
  methods: {
    /* 根据数据控制气泡显示 */
    visibleFunc() {
      if (this.isVisibleFun) {
        if (this.selectData > 0) {
          this.visible = false
        } else {
          this.visible = true
        }
      }
    },
    confirmHandle() {
      this.visible = false
      this.confirm()
    },
    cancelHandle() {
      this.visible = false
      this.$emit('toCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-text {
  color: #46b6ee;
}
.btn-style {
  margin-right: 5px;
}
.confirm-content {
  padding: 0 0 0 0;
}
.confirm-icon {
  font-size: 16px;
  color: #ffaa00;
  margin-right: 5px;
}
</style>
