<template>
  <div class="recharge">
    <el-dialog
      :visible.sync="opendialog"
      :close-on-click-modal="false"
      :title="dialogTitles"
      :before-close="resetForm"
      lock-scroll
    >
      <el-form
        ref="ruleForms"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        style="line-height: 40px;"
        class="dialog-ruleForm"
      >
        <el-form-item
          label="套餐名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="充值金额"
          prop="rechargeAmount"
          class="money"
        >
          <el-input
            v-model.number="ruleForm.rechargeAmount"
            :disabled="dialogTitles == '编辑套餐'"
            type="number"
            placeholder="请输入充值金额"
          > <template slot="append">元</template>
          </el-input>
        </el-form-item>

        <el-form-item
          label="赠送金额"
          prop="donationAmount"
          class="money"
        >
          <el-input
            v-model.number="ruleForm.donationAmount	"
            :disabled="dialogTitles == '编辑套餐'"
            placeholder="请输入赠送金额"
            type="number"
          > <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="赠送门票"
          prop="ticketId"
        >
          <el-select
            :disabled="dialogTitles == '编辑套餐'"
            v-model="ruleForm.ticketId"
            placeholder="请选择赠送门票"
            clearable
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
        <el-form-item
          prop="date"
          label="销售有效期"
        >

          <el-date-picker
            v-model="ruleForm.date"
            :picker-options="dialogTitles=='编辑充值卡'?false:startDatePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />

        </el-form-item>
        <el-form-item
          label="是否上架"
          prop="saleStatus"
        >
          <el-radio-group
            v-model="ruleForm.saleStatus"
            :disabled="dialogTitles=='编辑充值卡'"
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

      </el-form>
      <div
        slot="footer"
        class="dialog-footer footer_button"
      >
        <el-button
          v-repeatdely="2000"
          class="cancel_btn"
          size="mini"
          @click="resetForm"
        >取消</el-button>
        <el-button
          v-repeatdely="2000"
          size="mini"
          type="primary"
          @click="submitForm"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script  src="./recharge.js" >

</script>

<style rel="stylesheet/scss" lang="scss">
.recharge {
  .money /deep/ {
    .el-input {
      width: 156px;
      margin-right: 5px;
    }
  }

  .el-input-group__append {
    padding: 0 7px;
    background-color: #e9e9e9;
    color: #333333;
    font-weight: 400;
  }
  .el-input__inner {
    padding: 0 0 0 15px;
  }
  .el-select > .el-input {
    width: 310px !important;
  }
  .el-range-editor--mini.el-input__inner {
    width: 310px;
  }
  .el-date-editor .el-range-separator {
    padding: 0;
  }

  .el-dialog {
    width: 450px;
  }

  .el-dialog__body {
    min-height: 200px;
    max-height: 550px;
    height: auto;
    overflow: auto;
    padding: 20px 20px;
    color: #606266;
    font-size: 14px;

    .userNum {
      .childNum {
        .el-form-item__content {
          margin-left: 0px !important;
        }
      }
    }
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

  .el-input-number--mini {
    width: 100px;
    line-height: 26px;
  }

  .buttom_btn {
    position: absolute;

    bottom: 0px;
    right: 20px;
  }
}
</style>
