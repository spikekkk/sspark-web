<template>
  <div class="pic-container">
    <div
      v-if="data.length>0"
      class="pic-box"
    >
      <div
        v-for="(item,index) of data"
        :key="index"
        class="pic"
      >
        <div
          v-if="index<4"
          class="hotIcon"
        >
          <img
            src="https://img.ishanshan.com/gimg/n/20181008/b98bf7b1365be8676ec3985c0691add8"
            alt=""
          >
        </div>
        <div class="zhezhao">
          <div class="erweimaBox">

            <qrcode
              v-if="item.gameCode==='bargain'||item.gameCode==='raffle'"
              :value="item.demoUrl"
              :options="{ width: 132,height:132,margin:0 }"
              class="QRcode"
            />
            <!-- <div class="lookForward">
              <span>敬请期待</span>
            </div> -->
            <img
              v-if="item.gameCode!='bargain'&&item.gameCode!='raffle'"
              src="https://img.ishanshan.com/gimg/user/n///1557322193.png"
              style="width:132px;height:132px;"
              alt="敬请期待"
            >
          </div>
        </div>
        <div class="main">
          <img
            :src="item.icon"
            alt=""
          >
          <div class="tit">{{ item.gameTitle }}</div>
          <div class="main-bottom">
            <div class="box">
              <svg-icon
                icon-class="icon_sy_ck"
                style="color:#999;font-size:26px;padding-top:6px"
              />
              <span>{{ item.allUsers }}</span>
            </div>
            <el-button
              v-if="item.btnType!=='OFF'"
              type="primary"
              @click="outerDialog(item)"
            >创建</el-button>
          </div>
        </div>
      </div>
      <!-- 弹出框 -->
      <el-dialog
        :visible.sync="outerVisible"
        :append-to-body="true"
        custom-class="creatGameDialog"
      >
        <div class="box">
          <div class="box-left">
            <img
              :src="leftImg"
              alt=""
            >
          </div>
          <div class="box-right">
            <h2>{{ tit }}</h2>
            <div class="modelType">
              <span class="dian" />
              <span class="tit">模板类型:</span>
              <div class="modelTypeCont">
                <div
                  v-if="modelType.length<1"
                  class="btn"
                >其他</div>
                <div
                  v-if="modelType.length>0"
                  class="btnBox"
                >
                  <div
                    v-for="(item,index) of modelType"
                    :key="index"
                    class="btn"
                  >{{ item.label_name }}</div>
                </div>
              </div>
            </div>

            <div class="modelIntro">
              <span class="dian" />
              <span class="tit">模板介绍:</span>
              <el-popover
                :content="gameIntro"
                placement="bottom-start"
                trigger="hover"
              >
                <div slot="reference">{{ gameIntro }}</div>
              </el-popover>
            </div>

            <div class="otherIntro">
              <span class="dian" />
              <span class="tit">其他推荐:</span>
              <div class="introBtn">
                <img
                  v-for="(itm,index) in otherIntro"
                  :key="index"
                  :src="itm.icon"
                  alt=""
                  @click="imgBtn(itm.gameId)"
                >
              </div>
            </div>
            <div class="footer">
              <div class="QRcode">
                <qrcode
                  :options="{ width: 132,height:132,margin:0 }"
                  :value="QRcode"
                />
                <span>扫码试玩</span>
              </div>
              <el-button
                type="primary"
                @click="picDetailBtn()"
              >立即创建</el-button>
            </div>
          </div>
        </div>
      </el-dialog>

    </div>
    <div
      v-if="data.length === 0"
      class="pic-box"
    >
      <div class="zhanwei">
        <img
          style="width:51px;height:51px;"
          src="https://img.ishanshan.com/gimg/n/20190327/88826c90471a228009be72f913981612"
          alt=""
        >
        <p>抱歉 没有符合相应条件的模板</p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { gameChoose } from '@/api/sub/marketActivity'
import { mapMutations, mapState } from 'vuex'
Vue.component(VueQrcode.name, VueQrcode)
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }

  },
  data() {
    return {
      picDetailShow: false,
      // 弹出框参数
      outerVisible: false,
      innerVisible: false,
      // 外层弹窗参数
      tit: '',
      gameIntro: '',
      modelType: [],
      leftImg: '',
      QRcode: '',
      otherIntro: [],
      obj: {}
    }
  },
  computed: {
    ...mapState('microGame', ['isCreate'])
  },

  methods: {
    ...mapMutations('microGame', ['GET_GAME_DETAIL', 'GET_EDIT']),

    picDetailBtn() {
      this.GET_EDIT(true)

      this.$nextTick(() => {
        this.outerVisible = false
      })
    },
    // 弹框方法
    outerDialog(e) {
      this.outerVisible = true
      this.GET_GAME_DETAIL(e)
      this.obj = e
      this.tit = e.gameTitle
      this.modelType = e.labels
      this.leftImg = e.showImg
      this.QRcode = e.demoUrl
      this.gameIntro = e.gameIntro
      const params = { gameId: e.gameId }
      gameChoose(params).then((res) => {
        if (res.errorCode === 9000) {
          this.otherIntro = res.gameList
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    imgBtn(gid) {
      this.outerVisible = false
      this.data.map((val) => {
        if (val.gameId === gid) {
          setTimeout(() => { this.outerDialog(val) }, 300)
          // this.outerDialog(val)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.pic-container {
  height: calc(100vh - 355px);
  overflow: auto;
}
.pic-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  min-height: calc(100vh - 334px);
  background: rgba(240, 242, 245, 0.8);

  .zhanwei {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
    p {
      font-size: 14px;
      line-height: 14px;
      color: #666;
      margin-top: 10px;
    }
  }
}
.pic {
  height: 306px;
  min-width: 240px;
  // border: 1px solid #f00;
  // width: 22%;
  padding: 10px;
  position: relative;
  transition: all 1s;
  border-radius: 5px;
  text-align: left;
  background: rgba(255, 255, 255, 1);
  margin: 15px 15px;
  .hotIcon {
    width: 39px;
    height: 28px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    img {
      width: 100%;
    }
  }
  .zhezhao {
    width: 220px;
    height: 220px;
    position: absolute;
    background: rgba(0, 0, 0, 0);
    transition: background 1s;
    display: flex;
    justify-content: center;
    align-items: center;
    .erweimaBox {
      width: 140px;
      height: 140px;
      padding: 4px;
      background: #fff;
      opacity: 0;
      transition: opacity 1s;
      position: relative;
      .lookForward {
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 58px;
      }
    }
    .QRcode {
      opacity: 0;
      transition: opacity 1s;
    }
  }

  .main {
    img {
      width: 220px;
      height: 220px;
    }

    .tit {
      font-size: 14px;
      text-align: left;
      padding: 15px 0px 5px 0px;
      white-space: nowrap;
      margin-right: 10px;
      margin-left: 10px;
    }

    .main-bottom {
      display: flex;
      justify-content: space-between;
    }

    .box span {
      margin-left: 3px;
      display: inline-block;
      line-height: 25px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      font-size: 12px;
    }
  }
}

.pic:hover .zhezhao {
  background: rgba(0, 0, 0, 0.5);
}
.pic:hover .QRcode {
  opacity: 1;
}
.pic:hover .erweimaBox {
  opacity: 1;
}
.pic:hover {
  box-shadow: 10px 10px 15px 0 #999;
}
</style>
<style lang="scss">
.creatGameDialog {
  width: 700px;
  height: 560px;

  .el-dialog__header {
    margin: 0;
    padding: 0 !important;
    border-bottom: 0;
    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #999;
      }
    }
  }
  .el-dialog__body {
    max-height: 560px !important;
    overflow: hidden;
    .box {
      width: 100%;
      height: 500px;
      padding-top: 15px;
      // padding: 15px;
      // box-sizing: border-box;
      display: flex;
      .box-left {
        // height: 100%;
        // background: #f0f;
        width: 311px;
        // height: 500px;
        overflow: hidden;
        overflow-y: scroll;

        img {
          width: 100%;
          min-height: 1000px;
        }
      }
      .box-right {
        display: flex;
        flex-direction: column;
        width: 329px;
        // height: 500px;
        margin-left: 30px;
        // border: 1px solid #f0f;
        position: relative;
        h2 {
          font-size: 16px;
          color: #333;
          letter-spacing: 2px;
          margin-bottom: 30px;
          font-weight: 900;
          // border: 1px solid #f00;
          margin-top: 0;
        }
        .dian {
          width: 6px;
          height: 6px;
          background: #5d9cec;
          display: inline-block;
          border-radius: 50%;
          // margin-right: 6px;
        }
        .tit {
          font-size: 12px;
          color: #333;
          display: inline-block;
          letter-spacing: 1px;
          margin-bottom: 8px;
          margin-top: 10px;
        }
        .modelType {
          font-size: 12px;
          color: #333;
          letter-spacing: 1px;
          // margin-bottom: 8px;
          margin-top: 10px;
          // border: 1px solid #f00;

          .modelTypeCont {
            font-size: 12px;
            color: #5d9cec;
            padding-left: 13px;
            // margin-bottom: 12px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin-top: 8px;
            .btn {
              padding: 4px 6px;
              background: #e0f1ff;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              border-radius: 4px;
              display: inline-block;
              margin-right: 8px;
              margin-bottom: 8px;
            }
          }
        }
        .modelIntro {
          font-size: 12px;
          color: #999;
          box-sizing: border-box;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          letter-spacing: 1px;
          // border: 1px solid #f00;
          div {
            font-size: 12px;
            color: #999;
            padding-left: 13px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
        .otherIntro .introBtn {
          margin-bottom: 20px;
          padding-left: 13px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          img {
            width: 70px;
            height: 70px;
            background: #ddd;
            display: inline-block;
            margin-right: 10px;
          }
        }
        .footer {
          padding-left: 13px;
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          .QRcode {
            display: flex;
            flex-direction: column;
            span {
              margin-left: 43px;
              margin-top: 10px;
            }
          }
          .el-button {
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }
    }
  }
}
</style>

