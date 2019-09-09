<template>
  <div class="storeMgr_container">
    <div class="filter_container">
      <div
        class="search_box"
        style="margin-bottom: 10px;"
      >
        <el-form
          ref="listQuery"
          :inline="true"
          :model="listQuery"
          class="form-inline"
        >
          <el-input
            v-model="listQuery.storeName"
            size="mini"
            placeholder="输入门店名称"
            style="width: 200px;"
            class="filter-item"
            clearable
            @keyup.enter.native="onSearch"
          />
          <el-button
            v-repeatdely="1000"
            type="primary"
            size="mini"
            @click="onSearch"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
          </el-button>
          <el-button
            v-repeatdely="1000"
            class="refresh_btn_style"
            @click="refresh('listQuery')"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
          </el-button>
          <el-button
            class="filter-item new_add_user prue_btn_color"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addStoreFun"
          >新增门店</el-button>
        </el-form>
      </div>
      <div
        v-loading.lock="loading"
        class="table_box_con table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div style="margin-top: 20px;">
          <el-table
            :data="storeList"
            stripe
            style="width: 100%"
          >
            <el-table-column
              label="店名"
              prop="name"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.name || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="城市"
              prop="city"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.city || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="具体地址"
              prop="address"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.address || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="面积（平）"
              prop="shopArea"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.shopArea || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="经营类型"
              prop="manageType"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.manageType | dictFilter(dictInfo['manage_type'],scope.row.genderCn) || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开业时间"
              prop="openingTime"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.openingTime || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="shopStatus"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.shopStatus | dictFilter(dictInfo['shop_status'],scope.row.genderCn) || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  v-show="scope.row.shopStatus == '0' || scope.row.shopStatus == '2'"
                  type="text"
                  @click="isStoreOpen(scope.row, '1')"
                >启用</el-button>
                <el-button
                  v-show="scope.row.shopStatus == '1'"
                  type="text"
                  @click="isStoreOpen(scope.row, '2')"
                >禁用</el-button>
                <el-button
                  type="text"
                  @click="editStoreInfo(scope.row)"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :total="totalCount"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            class="current_page"
            layout="prev, pager, next, sizes,jumper"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </div>
      </div>
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="dialogFormVisible"
        :title="titleNameChange"
        style="width: 100%"
      >
        <el-form
          ref="dataForm"
          :model="storeAddData"
          :rules="rules"
          :label-position="labelPosition"
          label-width="110px"
        >
          <el-form-item
            label="门店名称"
            prop="name"
          >
            <el-input
              v-model="storeAddData.name"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="门店负责人"
            prop="shopOwner"
          >
            <el-input
              v-model="storeAddData.shopOwner"
              :disabled="editShopOwnwe"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="门店地址"
            prop="addressArry"
          >
            <el-cascader
              v-model="storeAddData.addressArry"
              :options="addrlist"
              :props="areaProp"
              style="width:100%"
              popper-class="store_address_style"
              clearable
              @change="handleItemChange"
            />
          </el-form-item>
          <el-form-item
            label="详细地址"
            prop="address"
          >
            <el-input
              v-model="storeAddData.address"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="负责人手机号"
            prop="mobile"
          >
            <el-input
              v-model="storeAddData.mobile"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="经营类型"
            prop="manageType"
          >

            <el-select
              v-model="storeAddData.manageType"
              size="mini"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in dictInfo['manage_type']"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="经营面积"
            prop="shopArea"
          >
            <el-input
              v-model="storeAddData.shopArea"
              size="mini"
              style="width: 93%; margin-right: 5px;"
              clearable
            />平
          </el-form-item>
          <el-form-item
            label="营业时间"
            prop="serviceTime"
          >
            <!-- <el-input
              v-model="storeAddData.serviceTime"
              type="data"
              size="mini"
              placeholder="请输入营业时间，例：09:00-18:00"
              clearable
            /> -->
            <el-time-picker
              v-model="storeAddData.serviceTime"
              style="width:343px"
              value-format="HH:mm"
              format="HH:mm"
              is-range
              size="mini"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择营业时间"
            />

          </el-form-item>
          <el-form-item
            label="联系方式"
            prop="telephone"
          >
            <el-input
              v-model="storeAddData.telephone"
              size="mini"
              clearable
              placeholder="请输入座机号码"
            />
          </el-form-item>
          <!-- @blur="checkValue(storeAddData.telephone)" -->
          <el-form-item
            ref="upload"
            label="门店封面"
            prop="cover"
            class="picture_store_style"
          >

            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="https://imgsrc.ishanshan.com/gimg/upload"
            >
              <img
                v-if="storeAddData.cover"
                :src="storeAddData.cover"
                class="avatar"
              >
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              />
            </el-upload>

          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            class="cancel_btn"
            size="mini"
            @click="cancleDialog"
          >取 消</el-button>
          <el-button
            v-if="dialogStatus == 'create'"
            size="mini"
            type="primary"
            @click="sureAddStoreFun"
          >确定</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="sureEditStore"
          >修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script src='./storeMgr.js'></script>

<style lang="scss" scoped>
.storeMgr_container {
  height: 100%;
  margin: 0 10px 0 10px;

  .search_box /deep/ {
    height: 58px;
    padding: 12px;
    background-color: #fff;
    position: relative;

    .new_add_user {
      position: absolute;
      right: 10px;
      top: 13px;
      width: 92px;
      padding-left: 8px;
    }

    .prue_btn_color {
      // color: #5D9CEC;
      border-color: #5d9cec;
    }

    .el-form .form-inline {
      height: 28px;
    }

    .el-button--primary {
      background-color: #5d9cec;
      border-color: #5d9cec;
    }

    .el-button--mini,
    .el-button--small {
      border-radius: 5px;
      margin-left: 7px;
      padding: 6px 12px;
      height: 28px;
    }

    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 5px !important;
    }
  }

  .table_style_edit /deep/ {
    height: calc(100vh - 158px);
    padding: 10px 10px 0;
    background-color: #fff;

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

    .el-button--text {
      color: #5d9cec;
    }

    .el-table {
      // padding: 0 6px 0 20px;
      overflow: auto;
      height: calc(100vh - 229px);
    }

    .el-table::before {
      background-color: transparent;
    }

    .el-table__header-wrapper {
      // width: calc(100% - 18px);
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

    .el-table__body {
      // margin-left: -6px;
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

  .dialog_style_edit /deep/ {
    .el-dialog {
      width: 500px;
      border-radius: 5px;
    }

    .el-dialog__body {
      height: 550px;
      overflow: auto;
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

    .el-button--mini {
      color: #fff;
      background-color: #5d9cec !important;
      border-radius: 5px;
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

    .cancel_btn {
      color: #606266;
      border: 1px solid #dcdfe6;
      background-color: #fff !important;
    }

    .cancel_btn:hover {
      color: #5d9cec;
      border: 1px solid #5d9cec;
    }

    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner,
    .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #5d9cec;
    }

    .el-form-item--medium .el-form-item__content,
    .el-form-item--medium .el-form-item__label {
      line-height: 28px;
    }

    .el-form--label-left .el-form-item__label {
      text-align: right;
    }
  }

  .picture_store_style /deep/ {
    .el-dialog__header {
      // padding: 0;
      background: none;
    }

    .el-upload--picture-card {
      width: 96px;
      height: 96px;
      line-height: 96px;
      padding: 6px;
      box-sizing: border-box;
    }

    .disabled .el-upload--picture-card {
      display: none;
    }

    .el-upload-list--picture-card .el-upload-list__item {
      width: 96px;
      height: 96px;
      margin: 0;
    }
  }
}
</style>
