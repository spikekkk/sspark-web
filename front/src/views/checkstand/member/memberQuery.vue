<template>
  <div>
    <div class="header_search">
      <el-input
        v-model.number="phoneNum"
        placeholder="输入手机号查询"
        clearable
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-repeatdely="1000"
        type="primary"
        size="mini"
        @click="handleFilter"
      >
        <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
      </el-button>
      <!-- <el-button   v-repeatdely="1000" class="register" size="mini" style="float:right" @click="RegUser">注册</el-button> -->
    </div>

    <template v-if="userDatas">
      <div class="main_content">
        <div class="nav_titile">
          <div>
            <span class="nav_title_item">
              <i class="icon_svg">
                <svg-icon icon-class="icon_vipname" />
              </i>
              <span class="title_tag">姓名：</span>
              {{ userDatas.custName }}
            </span>
            <span class="nav_title_item">
              <i
                class="icon_svg"
                style="vertical-align:middle"
              >
                <img
                  src="https://img.ishanshan.com/gimg/n/20181129/573e371b5221e33d4e6109c52dee5e0b"
                  style="vertical-align:text-top"
                >
                <!-- <svg-icon icon-class="icon_phone"/>  -->
              </i>
              <span class="title_tag">手机号：</span>
              {{ userDatas.mobile }}
            </span>
            <span class="nav_title_item">
              <i class="icon_svg">
                <svg-icon icon-class="icon_time" />
              </i>
              <span class="title_tag">注册时间：</span>
              {{ userDatas.registerTime }}
            </span>
            <span
              style="cursor:pointer"
              class="nav_title_item"
              @click="editUser(userDatas)"
            >
              <i class="icon_svg">
                <svg-icon icon-class="icon_edit" />
              </i>
              <span class="title_tag">编辑会员信息</span>
            </span>
          </div>
          <div class="child_info">
            <div
              v-for="(item,index) in childList"
              :key="index"
              class="child_item"
            >
              <div class="child_photo_name">
                <div class="child_photo">
                  <img src="https://img.ishanshan.com/gimg/n/20190103/fbb44dcd3cf633babaeeb7d15919a21b">
                </div>
                <div class="child_name">
                  宝宝姓名：{{ item.name }}
                </div>
              </div>
              <div class="child_sex_birth">
                <div>生日：{{ item.birthday }}</div>
                <div>性别：{{ item.sex | dictFilter(dictInfo['sex']) || '--' }}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="table_style_edit"
          style="margin: 0 10px;"
        >
          <el-table
            :header-cell-style="{background:'rgba(239,242,246,1)'}"
            :data="userDatas.customerConsumerCards"
            stripe
            style="width: 100%"
            height="calc(100vh - 259px)"
          >
            <el-table-column
              prop="cardName"
              label="会员卡名称"
              show-overflow-tooltip
            />

            <el-table-column
              prop="cardType"
              label="会员卡类型"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cardType | dictFilter(dictInfo['card_type']) || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="ticketName"
              label="票种"
            />

            <el-table-column
              prop="remainTimes"
              label="剩余次数"
            />

            <el-table-column
              prop="status"
              label="状态"
            >
              <template slot-scope="scope">

                <span>{{ scope.row.status | dictFilter(dictInfo['customer_card_status']) || '-' }}</span>

              </template>

            </el-table-column>

            <el-table-column
              prop="transactTime"
              show-overflow-tooltip
              label="办理时间"
            />
            <el-table-column
              prop="validDate"
              show-overflow-tooltip
              label="有效时间"
            />
            <el-table-column
              prop="giveTimes"
              show-overflow-tooltip
              label="赠送次数"
            />

            <el-table-column
              prop="giveStatus"
              label="赠送状态"
            >
              <template slot-scope="scope">

                <span>{{ scope.row.giveStatus | dictFilter(dictInfo['customer_card_give_status']) || '-' }}</span>

              </template>

            </el-table-column>

            <el-table-column
              label="操作"
              width="320"
            >
              <template slot-scope="scope">
                <div class="operation_btn_style">
                  <el-button
                    v-repeatdely="1000"
                    v-if="scope.row.giveStatus== 1"
                    type="text"
                    size="mini"
                    @click="openPresentDialog(scope.row)"
                  >赠票</el-button>

                  <el-button
                    v-repeatdely="1000"
                    v-if="scope.row.status== 0 || scope.row.status== 1"
                    type="text"
                    size="mini"
                    @click="openExchangeDialog(scope.row)"
                  >兑换</el-button>
                  <!-- &&scope.row.verifyTimes>0 -->
                  <el-button
                    v-repeatdely="1000"
                    v-if="scope.row.remainTimes>=0&&scope.row.verifyTimes>0"
                    type="text"
                    size="mini"
                    @click="cancelRedemptionDialogShowMotion(scope.row)"
                  >撤销兑换</el-button>

                  <el-button
                    v-repeatdely="1000"
                    v-if="scope.row.status== 1 || scope.row.status== 3"
                    type="text"
                    size="mini"
                    @click="openSwitchCard(scope.row)"
                  >{{ scope.row.status== 1?'停卡':'开卡' }}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </template>
    <div class="dialog_session">
      <div class="dialogForm">
        <el-dialog
          :title="titleNameChange"
          :before-close="cancleAddShow"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          width="400px"
          left
          class="register"
        >

          <el-form
            ref="dataForm"
            :model="userNav"
            :rules="rules"
            label-position="right"
            label-width="90px"
            style="margin-bottom: 30px;"
            class="formdata"
          >
            <p class="item_title">个人信息</p>
            <el-form-item
              label="姓名"
              prop="name"
            >
              <el-input
                v-model="userNav.name"
                clearable
              />
            </el-form-item>

            <el-form-item
              v-if="titleNameChange == '编辑会员'"
              label="手机号"
              prop="mobile"
            >
              <el-input
                v-model.number="userNav.mobile"
                :disabled="confirmEdit"
              /><i
                v-show="confirmEdit"
                class="el-icon-edit"
                style="position: absolute;
                top: 12px;
                right: 10px;color:#4887E6; cursor: pointer;"
                @click="handleIconClick"
              >修改</i>
            </el-form-item>

            <el-form-item
              label="性别"
              prop="sex"
            >
              <el-radio-group v-model="userNav.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <div
              v-for="(item,index) in userNav.childs"
              :key="item.key"
              class="childTables"
            >
              <div class="middel_line" />
              <div class="babyadd">
                <div class="item_title">宝宝信息</div>
                <div
                  v-repeatdely="1000"
                  class="baby_delete"
                  @click="deletBaby(item)"
                >删除</div>
                <el-form-item
                  :prop="'childs.' + index + '.name'"
                  :rules="{
                    required: true, message: '宝宝姓名不能为空', trigger: 'blur'
                  }"
                  label="宝宝姓名"
                >
                  <el-input
                    v-model="item.name"
                    clearable
                  />
                </el-form-item>
                <el-form-item
                  :prop="'childs.' + index + '.sex'"
                  :rules="{
                    required: true, message: '请选择宝宝性别', trigger: 'blur'
                  }"
                  label="宝宝性别"
                >
                  <el-radio-group v-model="item.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  :prop="'childs.' + index + '.birthday'"
                  :rules="{
                    required: true, message: '请选择宝宝生日', trigger: 'blur'
                  }"
                  label="宝宝生日"
                >
                  <el-date-picker
                    v-model="item.birthday"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择宝宝生日"
                  />
                </el-form-item>
              </div>
            </div>
          </el-form>
          <el-button
            v-repeatdely="1000"
            icon="el-icon-plus"
            plain
            @click="addChild"
          >添加宝宝</el-button>
          <div
            slot="footer"
            class="dialog-footer footer_button"
          >
            <el-button
              class="cancel_btn"
              @click="cancleAddShow"
            >取消</el-button>
            <el-button
              v-repeatdely="1000"
              v-if="dialogStatus=='create'"
              size="mini"
              @click="Register"
            >确定</el-button>
            <el-button
              v-repeatdely="1000"
              v-else
              size="mini"
              type="primary"
              @click="editMemberInfo"
            >修改</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="edit_phoneNum">
        <el-dialog
          :visible.sync="phoneDialog"
          :close="cancleUpdateMobile"
          :close-on-click-modal="false"
          title="修改会员手机号"
          width="400px"
          left
        >
          <el-input
            v-model.number="editPhone"
            clearable
            placeholder="请输入原有手机号"
          />

          <div class="Sec_code">
            <el-input
              v-model="phoneCode"
              placeholder="请输入验证码"
            />
            <el-button @click="getCodeFun(editPhone)">获取验证码</el-button>
          </div>
          <div
            slot="footer"
            class="dialog-footer footer_button"
          >
            <el-button
              class="cancel_btn"
              @click="cancleUpdateMobile"
            >取消</el-button>
            <el-button
              size="mini"
              @click="checkMessageCodeBtn"
            >确定</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="TicDialog">
        <el-dialog
          :visible.sync="ticketDialog"
          :before-close="ticketExchangeCancle"
          :title="ticketDialogTitle"
          width="400px"
          left
        >
          <div
            v-show="ticketDialogTitle=='兑换'"
            class="over_flow"
          >
            <span style="display:inline-block;margin-top: 5px;">兑换</span>
            <div class="addplus">
              <span
                v-if="cardType==1"
                style="padding-right: 20px; color:#888888"
              >剩余{{ surPlusTimes-exchange }}次</span>

              <el-input-number
                v-if="cardType==2"
                v-model="exchangeNum"
                :label="placehoder"
                :disabled="true"
                :min="1"
                :max="1"
                class="addnumber"
              />

              <el-input-number
                v-else
                v-model="exchange"
                :label="placehoder"
                :min="1"
                :max="maxnum"
                :disabled="turnoff"
                class="addnumber"
                @keyup.native="handleInputNumChange($event,maxnum)"
              />
            </div>
          </div>
          <div
            v-show="ticketDialogTitle=='撤销兑换'"
            class="over_flow"
          >
            <span style="display:inline-block;margin-top: 5px;">撤销兑换</span>
            <div class="addplus">
              <span style="padding-right: 20px; color:#888888">已兑换{{ verifyTimes }}次</span>

              <el-input-number
                v-model="timesNum"
                :label="placehoder"
                :min="1"
                :max="parseInt(verifyTimes)"
                :disabled="turnoff"
                class="addnumber"
                @keyup.native="handleInputNumChange($event,verifyTimes)"
              />
            </div>
          </div>
          <div
            v-if="ticketDialogTitle=='赠票'"
            class="over_flow"
          >
            <span style="display: inline-block;margin-top: 5px;">赠票</span>
            <div class="addplus">
              <span style="padding-right: 20px; color:#888888">剩余赠送{{ surPlusTimes-present }}次</span>

              <el-input-number
                v-model="present"
                :min="1"
                :max="maxPresentTimes"
                class="addnumber"
              />
            </div>
          </div>

          <div v-if="ticketDialogTitle=='开停卡'">
            <span style="display:inline-block;margin-top: 5px;color：#333333;    font-weight: bold;">{{ switchCustomerCard }}</span>

            <p style="padding-right: 20px; color:#333">{{ switchCustomerCard=='停卡'?'是否确认停卡？（默认只能停卡一次）':'开卡后不可再停卡，是否确定开卡？' }}</p>

          </div>

          <div
            slot="footer"
            class="dialog-footer footer_button"
            style="margin-top:6px"
          >
            <el-button
              style="padding: 7px 15px;"
              class="cancel_btn"
              @click="ticketExchangeCancle"
            >取 消</el-button>

            <el-button
              v-repeatdely="1000"
              v-if="ticketDialogTitle=='兑换'"
              size="mini"
              type="primary"
              @click="showConfirmPresentTickets"
            >确定</el-button>

            <el-button
              v-repeatdely="1000"
              v-if="ticketDialogTitle=='撤销兑换'"
              size="mini"
              type="primary"
              @click="cancelRedemptionMotion"
            >确定</el-button>

            <el-button
              v-repeatdely="1000"
              v-if="ticketDialogTitle=='赠票'"
              size="mini"
              @click="presentTickets"
            >确定</el-button>
            <el-button
              v-repeatdely="1000"
              v-if="ticketDialogTitle=='开停卡'"
              size="mini"
              @click="switchCard"
            >确定</el-button>

          </div>
          <el-dialog
            :visible.sync="confirmPresentTickets"
            width="400px"
            append-to-body
            title="确认兑换"
          >
            <div style="text-align:center;letter-spacing:3px">
              即将兑换<span style="font-size:20px;color:red">{{ exchange }}</span>次？
            </div>
            <div
              slot="footer"
              class="dialog-footer footer_button"
            >
              <el-button
                style="padding: 7px 15px;"
                class="cancel_btn"
                @click="confirmPresentTicketsCancle"
              >取 消</el-button>
              <el-button
                v-repeatdely="1000"
                size="mini"
                type="primary"
                @click="ticketExchange"
              >确认</el-button>
            </div>
          </el-dialog>
        </el-dialog>
      </div>

      <div class="phoneVerificationDialog">
        <el-dialog
          :visible.sync="phoneVerificationVal"
          title="撤销确认"
          width="400px"
        >
          <div class="sure_vali">
            <div
              class="vali_tel"
              style="margin-bottom:10px"
            >
              会员手机号：{{ userDatas.mobile }}
            </div>
            <div
              class="getValicode"
              style=""
            >
              <el-input
                v-model="valicode"
                placeholder="请输入验证码"
                style="width:220px;margin-right:10px;"
              />
              <el-button
                v-if="isShow"
                type="primary"
                size="mini"
                @click="getPhoneCaptcha"
              >获取验证码</el-button>
              <el-button
                v-if="!isShow"
                size="mini"
                disabled
              >{{ count }}s后重新获取</el-button>
            </div>
          </div>
          <div
            slot="footer"
            class="dialog-footer footer_button"
          >
            <el-button
              style="padding: 7px 15px;"
              class="cancel_btn"
              @click="closePhoneVerificationDialog"
            >取 消</el-button>
            <el-button
              v-repeatdely="1000"
              size="mini"
              type="primary"
              @click="sureCancelExchange"
            >确定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script src='./memberQuery.js'>
</script>
<style lang="scss" scoped>
.header_search /deep/ {
  height: 58px;
  background: rgba(255, 255, 255, 1);
  padding: 15px 10px;

  .filter-item {
    width: 140px !important;
    margin-right: 10px;

    .el-input__inner {
      line-height: 28px;
      height: 28px;
      padding-right: 0px !important;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      border: 1px solid;
      border-color: rgba(224, 224, 224, 1);
    }
  }

  .register {
    width: 56px;
    height: 28px;
    background: rgba(93, 156, 236, 1);
    border-radius: 5px;
    color: aliceblue;
  }
}

.main_content /deep/ {
  height: calc(100vh - 156px);
  background-color: #ffffffff;

  .nav_titile {
    background-color: #ffffffff;
    // line-height: 60px;
    margin-top: 10px;
    padding: 20px 0 20px 10px;
    .child_info {
      font-size: 12px;
      line-height: 17px;
      color: #333;
      display: flex;
      .child_item {
        margin-top: 20px;
        width: 230px;
        height: 70px;
        background: #f5f7fa;
        border-radius: 3px;
        display: inline-block;
        margin-right: 10px;
        padding: 10px;
        .child_photo_name {
          margin-bottom: 3px;
          .child_photo {
            float: left;
            margin-right: 10px;
            img {
              border-radius: 50%;
              border: 1px solid #ccc;
              vertical-align: middle;
            }
          }
          .child_name {
            line-height: 32px;
            height: 32px;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            word-break: break-all;
          }
        }
        .child_sex_birth {
          margin-left: 40px;
        }
        .child_sex_birth > div:first-child {
          display: inline-block;
        }
        .child_sex_birth > div:last-child {
          float: right;
        }
      }
    }
    .child_info > div > span {
      margin-right: 30px;
    }
    .nav_title_item:last-child .title_tag {
      color: #4887e6;
    }

    .nav_title_item {
      margin-right: 30px;
      font-size: 12px;
      font-weight: 500;

      .icon_svg {
        font-size: 20px;
        vertical-align: sub;
        margin-right: 10px;
      }

      .title_tag {
        color: #888888;
      }
    }
  }

  .has-gutter {
    background-color: #ffeff2f6;
  }
}

.dialog_session {
  .el-dialog__header {
    padding: 16px 20px;
    border-radius: 5px 5px 0 0;
    background: #2d3d4c;

    .el-dialog__title {
      font-size: 16px;
      line-height: 14px;
      color: #fff;
    }

    .el-dialog__headerbtn {
      top: 16px;

      .el-dialog__close {
        color: #fff;
      }
    }
  }

  .el-dialog__title {
    line-height: 24px;
    font-size: 16px !important;
    color: #ffffff;
  }

  .dialogForm {
    .register /deep/ {
      .el-dialog {
        .el-dialog__body {
          max-height: 460px !important;
          overflow: auto !important;
        }
      }
    }

    .el-form-item__label {
      color: #333333;
      font-weight: 500;
    }

    .childTables {
      margin-bottom: 30px;
      margin-top: 18px;
    }

    .baby_delete {
      float: right;
      font-size: 12px;
      font-weight: 500;
      color: #5d9cec;
      cursor: pointer;
      line-height: 17px;
    }

    .el-dialog__header {
      border-radius: 5px 5px 0px 0px;
      padding: 13px 20px 13px;
    }

    .el-dialog__body {
      height: 460px !important;
      overflow: auto !important;
      padding: 0px 20px !important;
      color: #606266;
      font-size: 14px;
      overflow: auto;
      max-height: 441px;

      .middel_line {
        width: 340px;
        border: #eee solid 0.5px;
        margin: 20px 0 18px 10px;
      }

      .item_title {
        margin-bottom: 20px;
        font-size: 12px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        display: inline-block;
      }

      .el-form-item {
        margin-bottom: 11px;
      }
    }

    .el-dialog__footer {
      margin-top: 30px;
      .el-button--medium {
        width: 60px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        border: 1px solid #cccccc;
        padding: 6px;
        color: #666666;
        font-size: 12px;
      }

      .el-input-number--medium /deep/ {
        margin-left: 220px;
        width: 139px;
        line-height: 34px;

        .el-input-number__decrease {
          background: #ddd;
          color: #fff;
          border: 0;
          border-radius: 2px;
        }

        .el-input-number__increase {
          width: 28px;
          font-size: 14px;
          background: #4887e6 !important;
          color: #fff;
          border: 0;
          border-radius: 2px;
        }
      }
    }
  }
}

.edit_phoneNum {
  .Sec_code {
    display: flex;
    padding: 10px 0;

    .el-input--medium {
      padding-right: 10px;
    }
  }

  .el-input__inner {
    height: 28px;
    line-height: 36px;
  }

  .el-button--medium {
    padding: 6px 13px !important;
  }
}

.TicDialog {
  .el-dialog__body {
    padding: 20px 20px 75px 20px;
    color: #333333;
    font-size: 14px;

    .addplus /deep/ {
      float: right;

      .el-input-number--medium .el-input-number__decrease,
      .el-input-number--medium .el-input-number__increase {
        width: 20px;
        height: 20px;
        font-size: 10px;
        border-radius: 2px;
        line-height: 24px;
        top: 2px;
      }

      .el-input-number__increase {
        right: 1px;
        top: 1px;
        background-color: #4887e6;
        color: #ffffff;
        border-radius: 2px;
      }

      .el-input-number__decrease {
        background-color: #dddddd;
        color: #ffffff;
        border-radius: 2px;
      }

      .el-input-number--medium {
        width: 80px;
        line-height: 28px;
      }

      .el-input--medium .el-input__inner {
        height: 20px;
        width: 52px;
        background: #f8f8f8;
        border: none;
        padding: 0px;
        margin-left: 17px;
      }

      .el-input--medium {
        font-size: 10px;
      }
    }
  }

  .el-dialog__footer {
    .el-button--medium {
      width: 60px;
      height: 28px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      border: 1px solid #cccccc;
      padding: 6px;
      color: #666666;
      font-size: 12px;
    }
  }
}

.table_style_edit /deep/ {
  /*滚动条样式*/
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 5px;
    background: #c8e2f8;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    border-radius: 0;
    background: #fff;
  }

  .el-table {
    // padding: 0 6px 0 20px;
    overflow: auto;
    max-height: calc(100vh - 200px);
  }

  .el-table::before {
    background-color: transparent;
  }

  .el-table td,
  .el-table th.is-leaf {
    text-align: center;
    border-bottom: 0;
  }

  .el-table th {
    background: #eff2f6;
    font-size: 14px;
    color: #333;
    line-height: 50px;
    padding: 0;
    font-weight: 500;
  }

  .el-table__body .el-table__row:nth-child(2n) td {
    background: #f9fafc;
  }

  .el-table td {
    font-size: 12px;
    color: #666;
    padding: 10px 0;
    font-weight: 400;
  }
}
</style>
