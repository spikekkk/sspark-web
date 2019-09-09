<template>
  <div
    id="addGoods"
    :visible.sync="open"
    style="overflow:auto;"
  >
    <h3>{{ dialogTitles }}</h3>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="112px"
      class="dialog-ruleForm"
    >
      <el-form-item
        label="商品分类"
        prop="categoryId"
      >
        <el-select
          v-model="ruleForm.categoryId"
          placeholder="分类"
        >
          <el-option
            v-for="item in classifyChannels"
            :key="item.index"
            :label="item.name"
            :value="item.categoryId"
          />
        </el-select>
        <el-button
          class="addClass cancel_btn"
          @click="addClassify"
        >添加分类</el-button>
      </el-form-item>

      <el-form-item
        label="商品名称"
        prop="name"
      >
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item
        ref="upload"
        label="商品图片"
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
            slot="trigger"
            class="el-icon-plus avatar-uploader-icon"
          />
        </el-upload>
      </el-form-item>

      <el-form-item
        label="商品编码"
        prop="spuNo"
      >
        <el-input v-model="ruleForm.spuNo" />
      </el-form-item>
      <el-form-item
        label="条形码"
        prop="barcode"
      >
        <el-input v-model.number="ruleForm.barcode" />
      </el-form-item>

      <el-form-item
        label="商品规格"
        prop="existSpec"
      >
        <el-radio-group
          v-model="ruleForm.existSpec"
          :disabled="dialogTitles=='编辑商品'"
          @change="selectSpec(ruleForm.existSpec)"
        >
          <el-radio :label="0">不启用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="ruleForm.existSpec=='1'">
        <el-form-item label="规格设置">
          <el-button
            style="margin-bottom:10px"
            class="cancel_btn"
            @click="choiceSpec(ruleForm.skus)"
          >选择/修改规格</el-button>
          <el-table
            :data="ruleForm.skus"
            style="width: 100%"
          >
            <el-table-column
              label="规格组合"
              prop="skuNames"
              width="140"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.skuNames.toString() }}</span>
              </template>
            </el-table-column>

            <el-table-column label="售价">
              <template slot-scope="scope">
                <el-input
                  v-model.number="scope.row.price"
                  type="number"
                  size="small"
                  placeholder="请输入价格"
                  @blur="checkValue(scope.row.price)"
                />
              </template>
            </el-table-column>

            <el-table-column label="进价">
              <template slot-scope="scope">
                <el-input
                  v-model.number="scope.row.oriPrice"
                  type="number"
                  size="small"
                  placeholder="请输入价格"
                  @blur="checkValue(scope.row.oriPrice)"
                />
              </template>
            </el-table-column>
            <el-table-column label="单品编码">
              <template slot-scope="scope">
                <el-input
                  v-model.number="scope.row.skuNo"
                  size="small"
                  placeholder="请输入单品编码"
                />
              </template>
            </el-table-column>
            <el-table-column label="单品条形码">
              <template slot-scope="scope">
                <el-input
                  v-model.number="scope.row.barcode"
                  size="small"
                  placeholder="请输入单品条形码"
                />
              </template>
            </el-table-column>
            <el-table-column label="删除">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="deletSpces(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </template>

      <template v-else-if="ruleForm.existSpec=='0'">
        <el-form-item
          label="售价"
          prop="price"
        >
          <el-input
            v-model.number="ruleForm.price"
            type="number"
            placeholder="请输入价格"
          />
        </el-form-item>

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
      </template>

      <el-form-item
        label="排序值"
        prop="sortOrder"
      >
        <el-input
          v-model.number="ruleForm.sortOrder"
          type="number"
          placeholder="请输入排序值"
        />
      </el-form-item>
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
        label="是否上架"
        prop="saleStatus"
      >
        <el-radio-group v-model="ruleForm.saleStatus">
          <span
            v-for="item in dictInfo.goods_spu_status"
            :key="item.index"
            style="margin-right:5px"
          >
            <el-radio :label="item.value">{{ item.label }}</el-radio>
          </span>
        </el-radio-group>
      </el-form-item>

      <el-form-item style="text-align:end;">
        <el-button
          v-repeatdely="2000"
          size="mini"
          class="cancel_btn"
          @click="resetForm('ruleForm')"
        >取消</el-button>
        <el-button
          v-repeatdely="2000"
          size="mini"
          type="primary"
          @keyup.enter="submitForm('ruleForm')"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加分类start -->
    <div class="dialog_style_edit">
      <el-dialog
        ref="classifydateForm"
        :visible.sync="classifyDialogVisible"
        :before-close="CancleClassify"
        title="添加分类"
      >
        <el-form
          ref="formClassify"
          :model="formClassify"
          label-position="left"
          label-width="80px"
        >
          <el-form-item
            :rules=" [
              { required: true, message: '分类不能为空'},
              { type: 'string', message: '分类'}]"
            label="添加分类"
            prop="name"
          >
            <el-input
              v-model="formClassify.name"
              type="value"
            />
          </el-form-item>

          <el-form-item
            :rules=" [
              { required: true, message: '排序不能为空'},
              { type: 'number', message: '必须为数字'}]"
            label="排序"
          >
            <el-input
              v-model.number="formClassify.sortOrder"
              type="number"
              @keyup.enter.native="submitClassify"
            />
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-repeatdely="2000"
            size="mini"
            class="cancle_btn cancel_btn"
            @click="CancleClassify"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            size="mini"
            type="primary"
            @click="submitClassify"
            @keyup.enter="submitClassify"
          >保存</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加分类end -->
    <!-- 规格值选择--start -->
    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="rulesdialogVisible"
        :before-close="closeSpec"
        :modal="true"
        title="选择规格"
        width="700px"
        center
      >
        <div style="margin-top: 15px">
          <el-button-group class="choice_btn">
            <el-button
              :class="{ active: isActive}"
              plain
              size="mini"
              class="cancel_btn"
              @click="allChoice"
            >全部</el-button>
            <el-button
              :class="{ active: !isActive}"
              plain
              size="mini"
              style="margin-left: 1px;"
              class="cancel_btn"
              @click="selected"
            >已选</el-button>
          </el-button-group>
          <span class="allChoice">（最多可选择3组规格）</span>
          <div
            v-if="dialogTitles == '新增商品'"
            class="addSpecsGroup"
          >
            <el-button
              v-if="choice"
              class="add-icon-plus el-icon-plus"
              type="primary"
              @click="openAddRulesDia"
            >新增规格组</el-button>
          </div>

          <div
            v-if="dialogTitles == '新增商品'&& choice"
            id="choice_rules"
          >
            <span>规格组</span>
            <span>规格值</span>
          </div>
        </div>

        <div
          v-if="choice"
          class="addSpecs"
        >
          <div v-if="dialogTitles == '新增商品'">
            <el-tabs
              v-model="editableTabsValue"
              type="border-card"
              tab-position="left"
              style="
              height:250px;"
              @tab-click="tabClick($event)"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.index"
                :label="item.name"
                :name="item.specId"
              >
                <el-checkbox-group v-model="checkedSpecs">
                  <el-checkbox
                    v-for="data in item.options"
                    :disabled="offTabs"
                    :label="data.optionId"
                    :value="data.name"
                    :key="data.index"
                    @change="checkedItems(item,data)"
                  >{{ data.name }}</el-checkbox>
                </el-checkbox-group>
                <el-button
                  v-repeatdely="2000"
                  type="text"
                  class="el-icon-plus"
                  @click="addSpecItems(item)"
                >新增规格值</el-button>
              </el-tab-pane>
            </el-tabs>
          </div>

          <div
            v-if="dialogTitles == '编辑商品'"
            class="editSpec"
            style="margin-top: 30px;"
          >
            <el-table
              :data="editableTabs"
              border
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="name"
                label="规格组"
                align="center"
                width="180"
              />
              <el-table-column
                prop="name"
                label="规格值"
              >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="checkedSpecs">
                    <el-checkbox
                      v-for="item in scope.row.options"
                      :label="item.optionId"
                      :value="item.name"
                      :key="item.index"
                      @change="checkedItems(scope.row,item)"
                    >{{ item.name }}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="!choice">
          <el-table
            :data="skusItems"
            stripe
            style="width: 100%;margin-top: 30px;"
          >
            <el-table-column
              prop="data"
              label="规格组"
            />
            <el-table-column
              label="规格值"
              prop="listInfo"
            >
              <template slot-scope="scope">
                <span
                  v-for="i in scope.row.listInfo"
                  :key="i.index"
                >{{ i.items }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div
          slot="footer"
          class="dialog-footer"
          style="text-align:end;margin:40px 0 20px"
        >
          <el-button
            v-repeatdely="2000"
            size="mini"
            class="cancle_btn cancel_btn"
            @click="closeSpec"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            size="mini"
            type="primary"
            @keyup.enter="submitSpec"
            @click="submitSpec"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 规格值选择--end-->

    <!-- 新增规格组选项start -->
    <div class="dialog_style_edit">
      <el-dialog
        :before-close="groupCancel"
        :visible.sync="dialogGroupFormVisible"
        :modal-append-to-body="false"
        title="新增规格组"
        width="400px"
        center
        style="margin-top: 12vh;"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="Spec"
          label-width="90px"
        >
          <el-form-item
            label="规格组"
            prop="name"
          >
            <el-input
              v-model="form.name"
              @keyup.enter.native="groupSubmit('form')"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-repeatdely="2000"
            class="cancel_btn"
            size="mini"
            @click="groupCancel('form')"
          >取消</el-button>
          <el-button
            v-repeatdely="2000"
            size="mini"
            type="primary"
            @click="groupSubmit('form')"
            @keyup.enter="groupSubmit('form')"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增规格组选项end -->

    <!-- 新增规格值start -->
    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="dialogValueFormVisible"
        style="margin-top: 12vh;"
        title="添加规格值"
        width="400px"
        center
      >
        <el-form
          ref="formValue"
          :model="formValue"
          :rules="Spec"
          label-width="90px"
        >
          <el-form-item
            label="规格值"
            prop="specValue"
          >
            <el-input
              v-model="formValue.specValue"
              @keyup.enter.native="specValueSubmit('formValue')"
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-repeatdely="2000"
            class="cancel_btn"
            size="mini"
            @click="specValueCancel('formValue')"
          >取消</el-button>
          <el-button
            v-repeatdely="2000"
            type="primary"
            size="mini"
            @click="specValueSubmit('formValue')"
            @keyup.enter="specValueSubmit('formValue')"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增规格值 end-->
  </div>
</template>
<script src="./addGoods.js">
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#addGoods {
  padding: 30px;
  padding-bottom: 0;
  height: calc(100vh - 90px);
  background-color: #fff;

  .cancle_btn {
    color: #606266;
  }

  .addClass {
    padding: 7px 20px;
  }

  .addSpecs {
    overflow: auto;

    .el-checkbox {
      padding: 10px;
      margin-left: 0px !important;
    }
  }

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
}

.el-dialog__header {
  padding: 16px 20px;
  border-radius: 5px 5px 0 0;
  background: #2d3d4c !important;
}

.allChoice {
  display: inline-block;
  padding-left: 8px;
  height: 18px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 18px;
}

.addSpecsGroup {
  float: right;

  .add-icon-plus {
    height: 28px;
    line-height: 9px;
    padding: 0 10px;
    width: 110px !important;
  }

  .el-icon-plus:before {
    content: "\E62B";
    margin-left: -8px;
    margin-right: 6px !important;
  }
}

#choice_rules {
  margin-top: 30px;
  // width: 660px;
  height: 52px;
  line-height: 52px;
  background-color: #eff2f6;

  span {
    width: 42px;
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 14px;
    padding-left: 20px;
    padding-right: 90px;
  }
}

#icon-plus {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.dialog_style_edit /deep/ {
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

  .active {
    border-color: #3a8ee6 !important;
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
</style>
