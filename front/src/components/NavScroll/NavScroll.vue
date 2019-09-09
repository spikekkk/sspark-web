<template>

  <div :class="scrollOff?'scroll_box':''">
    <div
      v-if="scrollOff"
      class="scrollTitle"
    >
      <marquee
        behavior="scroll"
        direction="left"
        height="30"
        onmouseover="this.stop()"
        onmouseout="this.start()"
        style="color:#F5A623;"
      >{{ messageTitle }}</marquee>
      <i
        v-if="openClose"
        class="el-icon-close"
        @click="closeScroll"
      />
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      openClose: false,
      scrollOff: true,
      messageTitle: ''
    }
  },

  methods: {

    changeTitle(val) {
      // eslint-disable-next-line
      if (val.actionType == 1) {
        this.scrollOff = true
        this.messageTitle = val.systemMessage

        // eslint-disable-next-line
        if (val.allowClose == 1) {
          this.openClose = true
        } else {
          this.openClose = false
        }
      } else {
        this.closeScroll()
      }
    },
    /* 关闭顶部滚动条 */
    closeScroll() {
      this.scrollOff = false
      this.openClose = false
      this.messageTitle = ''
    }

  }

}
</script>

<style lang="scss" scoped>
.scrollTitle {
  display: flex;
  position: absolute;
  left: 11px;
  cursor: pointer;
  width: calc(100vw - 170px);
  .el-icon-close {
    color: #f5a623 !important;
    cursor: pointer;
    line-height: 28px;
  }
}

.scroll_box {
  position: absolute;
  top: 64px;

  width: 88%;
  z-index: 50;
}
</style>
