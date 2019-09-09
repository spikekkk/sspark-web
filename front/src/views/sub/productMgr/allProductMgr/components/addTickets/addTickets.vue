<template>
  <div class="add_ticket">
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
          label="门票名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <div
          class="userNum"
          style="display:flex"
        >
          <el-form-item
            label="使用人数"
            prop="adultNum"
          >
            <el-input-number
              :disabled="dialogTitles=='编辑门票'"
              v-model.number="ruleForm.adultNum"
              :min="0"
              :max="5"
              type="number"
              size="mini"
              label="大人"
            />
            <span>大人；</span>
          </el-form-item>
          <el-form-item
            class="childNum"
            prop="childNum"
          >
            <el-input-number
              :disabled="dialogTitles=='编辑门票'"
              v-model.number="ruleForm.childNum"
              :min="0"
              :max="5"
              type="number"
              size="mini"
              label="小孩"
            />
            <span>小孩；</span>
          </el-form-item>
        </div>
        <!-- 单独处理封面图 start-->
        <el-form-item
          ref="upload"
          label="封面图"
          prop="cover"
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
            placeholder="请输入售卖价格"
          />
        </el-form-item>

        <el-form-item
          label="销售渠道"
          prop="channels"
        >
          <el-checkbox-group
            v-model="ruleForm.channels"
            :min="0"
            @change="choiceOta(ruleForm.channels)"
          >
            <span
              v-for="item in dictInfo.channel"
              :key="item.index"
              style="margin-right:5px"
            >
              <el-checkbox
                :label="item.value"
                name="type"
              >{{ item.label }}</el-checkbox>
            </span>
          </el-checkbox-group>
          <span style="color: #ffbe00; font-size:10px">OTA渠道与其他渠道互斥，其他渠道可以任意组合</span>
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
            :disabled="dialogTitles=='编辑门票'"
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
          prop="validPeriod"
          label="有效时间："
        >
          <el-input
            v-model.number="ruleForm.validPeriod"
            type="number"
            placeholder="请输入有效时间"
          />
        </el-form-item>
        <el-form-item
          label="门票详情"
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
<script src="./addTickets.js">
</script>

<style rel="stylesheet/scss" lang="scss">
.add_ticket {
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
