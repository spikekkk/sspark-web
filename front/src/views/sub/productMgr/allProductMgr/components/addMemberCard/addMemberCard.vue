<template style="width:750px">
  <div class="add_MembershipCard">
    <el-dialog
      :visible.sync="open"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :title="dialogTitles"
      class="addCard"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="112px"
        class="dialog-ruleForm"
      >
        <el-form-item
          label="会员卡名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item
          label="票种"
          prop="ticketId"
        >
          <el-select
            :disabled="dialogTitles == '编辑会员卡'"
            v-model="ruleForm.ticketId"
            placeholder="请选择票种"
          >
            <el-option
              v-for="item in optionsChannels"
              :key="item.index"
              :label="item.ticketName"
              :value="item.ticketId"
              clearable
            />
          </el-select>
        </el-form-item>
        <div style="position:relative">

          <el-form-item
            label="类型"
            prop="cardType"
          >
            <el-radio-group
              :disabled="dialogTitles == '编辑会员卡'"
              v-model="ruleForm.cardType"
            >
              <el-radio :label="2">时段卡</el-radio>
              <el-radio :label="1">次数卡</el-radio>

            </el-radio-group>
          </el-form-item>
          <el-form-item
            :rules="[ {
              pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
              message: '次数不允许小于零'
            }]"
            prop="times"
            class="times_style times_user"
          >
            <el-input
              v-if="ruleForm.cardType=='1'"
              :disabled="dialogTitles == '编辑会员卡'"
              v-model.number="ruleForm.times"
              type="number"
              placeholder="有效次数"
            />

          </el-form-item>
        </div>
        <el-form-item
          v-if="ruleForm.cardType==2"
          prop="intervalCardType"
          label="时段："
          required
        >
          <el-radio-group
            :disabled="dialogTitles == '编辑会员卡'"
            v-model="ruleForm.intervalCardType"
            class="timechecked"
          >
            <!-- <el-radio v-for="item in dictInfo.interval_card_type" :key="item.index" :label="item.label" :value="item.value"></el-radio> -->
            <div>
              <el-radio :label="1">月卡</el-radio>
            </div>
            <div style="padding-left: 10px;">
              <el-radio :label="2">季卡</el-radio>
            </div>
            <div style="padding-left: 10px;">
              <el-radio :label="3">半年卡</el-radio>
            </div>
            <div style="padding-left: 10px;">
              <el-radio :label="4">年卡</el-radio>
            </div>
            <div style="padding: 18px 0 0 0;">
              <el-radio label="9">自定义</el-radio>
            </div>
          </el-radio-group>
          <el-form-item
            v-if="ruleForm.intervalCardType=='9'"
            style="margin-top: 20px;"
            prop="validPeriod"
            label="自定义天数"
          >
            <el-input
              v-model.number="ruleForm.validPeriod"
              placeholder="请输入自定义天数"
            />
          </el-form-item>
        </el-form-item>
        <!-- 次数卡才有 -->
        <el-form-item
          v-else
          prop="validPeriod"
          label="有效期"
        >
          <el-input
            v-model.number="ruleForm.validPeriod"
            type="number"
            placeholder="请输入有效天数"
          />
        </el-form-item>
        <!-- 次数卡才有 -->
        <div
          v-if="ruleForm.cardType=='1'"
          style="position: relative;"
        >
          <el-form-item
            label="是否赠票"
            prop="cardGiveType"
          >
            <el-radio-group
              :disabled="dialogTitles == '编辑会员卡'"
              v-model="ruleForm.cardGiveType"
            >
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>

            </el-radio-group>
          </el-form-item>

          <el-form-item
            v-if="ruleForm.cardGiveType==1"
            prop="giveTimes"
            class="times_style"
          >
            <el-input
              :disabled="dialogTitles == '编辑会员卡'"
              v-model.number="ruleForm.giveTimes"
              type="number"
              placeholder="最大赠送次数"
            />

          </el-form-item>
        </div>

        <el-form-item
          label="原价"
          prop="oriPrice"
        >
          <el-input
            v-model.number="ruleForm.oriPrice"
            type="number"
            placeholder="请输入原价"
          />
        </el-form-item>
        <el-form-item
          label="售卖价格"
          prop="price"
        >
          <el-input
            v-model.number="ruleForm.price"
            type="number"
            placeholder="请输入售价"
          />
        </el-form-item>

        <!-- 单独处理封面图 start-->
        <el-form-item
          ref="upload"
          prop="cover"
          label="封面图"
        >
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://imgsrc.ishanshan.com/gimg/upload"
          >
            <img
              v-if="ruleForm.cover"
              :src="ruleForm.cover"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
        <!-- 单独处理封面图 end-->
        <el-form-item
          label="销售渠道"
          prop="channels"
        >
          <el-checkbox-group
            v-model="ruleForm.channels"
            :min="1"
          >
            <span
              v-for="item in dictInfo.channel"
              :key="item.index"
              style="margin-right:5px"
            >
              <el-checkbox
                v-if="item.value!=9"
                :label="item.value"
                name="type"
              >{{ item.label }}</el-checkbox>
            </span>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item
          prop="sortOrder"
          label="排序值"
        >
          <el-input
            v-model.number="ruleForm.sortOrder"
            type="number"
            placeholder="请输入排序值"
          />
        </el-form-item>

        <el-form-item
          label="是否上架"
          prop="saleStatus"
        >
          <el-radio-group
            v-model="ruleForm.saleStatus"
            :disabled="dialogTitles == '编辑会员卡'"
          >
            <span
              v-for="item in dictInfo.goods_spu_status"
              :key="item.index"
              style="margin-right:5px"
            >
              <el-radio :label="item.value">{{ item.label }}</el-radio>
            </span>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="会员卡详情"
          icon="el-icon-caret-right"
        />
        <el-form-item
          label="购买须知"
          prop="buyNotice"
        >
          <el-input
            v-model="ruleForm.buyNotice"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="使用说明"
          prop="useNotice"
        >
          <el-input
            v-model="ruleForm.useNotice"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          label="退款规则"
          prop="refundNotice"
        >
          <el-input
            v-model="ruleForm.refundNotice"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer footer_button"
      >
        <el-button
          v-repeatdely="2000"
          class="cancel_btn"
          size="mini"
          @click="restForm('ruleForm')"
        >取消</el-button>
        <el-button
          v-repeatdely="2000"
          size="mini"
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="./addMemberCard.js">
</script>

<style rel="stylesheet/scss" lang="scss">
.add_MembershipCard {
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
    border-radius: 5px;
    background: #fff;
  }

  .addCard {
    .el-dialog {
      width: 450px;
    }

    .el-dialog__body {
      height: 550px;
      overflow: auto;
      padding: 20px 10px;
      color: #606266;
      font-size: 14px;
    }

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

    .timechecked {
      line-height: 1;
      vertical-align: middle;
      font-size: 0;
      display: flex;
      width: 281px;
      flex-wrap: wrap;
      justify-content: flex-start;

      .el-radio + .el-radio {
        margin-left: 0px !important;
      }
    }
  }

  .el-dialog__wrapper {
    .el-button--mini {
      color: #fff;

      //    background-color: #5d9cec !important;
      border-radius: 5px span {
        color: #ffffff;
      }
    }

    .cancle_btn {
      background-color: #fff !important;
      color: #606266;
    }

    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
    }

    .box-card {
      width: 294px;
    }
  }
  .times_style {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 250px;
  }
  .times_user {
    .el-form-item__content {
      margin-left: 130px !important;
    }
  }
}
</style>
