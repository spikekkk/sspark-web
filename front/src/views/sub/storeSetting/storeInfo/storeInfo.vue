<template>
  <div class="storeInfoWrapper">
    <div v-if="showStorePage">
      <div
        v-loading.lock="loading"
        class="table_box_con table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div>
          <div class="store_head_box">
            <span>门店信息</span>
            <el-button
              type="text"
              class="edit_btn_head"
              @click="editStoreFun(storeList)"
            ><i class="el-icon-edit edit_icon_text" />编辑</el-button>
          </div>
          <div class="store_con_box">
            <div class="store_con_left">
              <p>
                <span>门店名称：</span>
                <span>{{ storeList.name || '-' }}</span>
              </p>
              <p>
                <span>经营面积：</span>
                <span>{{ storeList.shopArea || '-' }}</span>
              </p>
              <p>
                <span>门店地址：</span>
                <span>{{ storeList.province + storeList.city + storeList.district || '-' }}</span>
              </p>
              <p>
                <span>经营时间：</span>
                <span>{{ storeList.serviceTime || '-' }}</span>
              </p>
            </div>
            <div class="store_con_right">
              <p>
                <span>门店负责人：</span>
                <span>{{ storeList.shopOwner || '-' }}</span>
              </p>
              <p>
                <span>门店联系方式：</span>
                <span>{{ storeList.telephone || '-' }}</span>
              </p>
              <p>
                <span>负责人手机号：</span>
                <span>{{ storeList.mobile || '-' }}</span>
              </p>
              <p style="display: flex;">
                <span>门店封面：</span>
                <span class="cover_img_box"><img
                  :src="storeList.cover || 'https://img.ishanshan.com/gimg/n/20181207/fc94fb0c3ed8a8f909dbc7630a0987ff'"
                  style="width: 100%;height:100%;"
                  alt=""
                ></span>
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="isMchCode"
          class="cashier_open_box"
        >
          <div class="cashier_close_box">
            <div style="position: absolute;padding-top: 9px;">
              <img
                src="https://img.ishanshan.com/gimg/n/20181129/d27613a30737b2b120d23a9160f12e85"
                alt=""
              >
            </div>
            <div style="position: absolute;margin-left: 34px">
              <span>收银宝：</span>
            </div>
            <div style="text-align:right;">
              <span style="color:#666;font-weight:500;">未开通</span>
              <el-button
                v-if="dialogStatus=='create'"
                type="primary"
                size="mini"
                @click="openCashier"
              >开通</el-button>
            </div>
          </div>
        </div>

        <div
          v-else
          class="cashier_open_box"
        >
          <div class="cashier_close_box">
            <div style="position: absolute;padding-top: 9px;">
              <img
                src="https://img.ishanshan.com/gimg/n/20181129/d27613a30737b2b120d23a9160f12e85"
                alt=""
              >
            </div>
            <div style="position: absolute;margin-left: 34px">
              <span>收银宝：</span>
            </div>
            <div style="text-align:right;">
              <span>{{ storeList.mchCode }}</span>
              <el-button
                type="primary"
                size="mini"
                @click="editCashier(storeList)"
              >修改</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        v-if="showEditPage"
        class="shop_edit_box"
      >
        <div class="store_head_box">
          <p>门店编辑</p>
        </div>
        <div class="store_con_box">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="storeTemplt"
            :label-position="labelPosition"
            label-width="100px"
            style="padding:10px 10px;box-sizing:border-box;"
          >
            <div class="store_con_left edit_store_top">
              <el-form-item
                label="门店名称"
                prop="name"
              >
                <el-input
                  v-model="storeTemplt.name"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="经营面积"
                prop="shopArea"
              >
                <el-input
                  v-model="storeTemplt.shopArea"
                  size="mini"
                  clearable
                />
              </el-form-item>
              <div>
                <el-form-item
                  label="门店地址"
                  prop="addressArry"
                >
                  <!-- <el-input v-model="storeTemplt.province / storeTemplt.city" :disabled="true" /> -->
                  <el-cascader
                    v-model="addressArry"
                    :options="addrlist"
                    :disabled="true"
                    :props="areaProp"
                    style="width:100%"
                    popper-class="store_address_style"
                    @change="handleItemChange"
                  />
                </el-form-item>
              </div>
              <el-form-item
                label="营业时间"
                prop="serviceTime"
              >
                <el-input
                  v-model="storeTemplt.serviceTime"
                  size="mini"
                  clearable
                />
              </el-form-item>
            </div>
            <!-- <el-form-item label="详细地址" prop="address">
              <el-input v-model="storeTemplt.address" :disabled="true" clearable />
            </el-form-item> -->
            <div class="store_con_right edit_store_top edit_store_behind">
              <el-form-item
                label="门店负责人"
                prop="shopOwner"
              >
                <el-input
                  v-model="storeTemplt.shopOwner"
                  :disabled="true"
                  size="mini"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="负责人手机号"
                prop="mobile"
                class="boss_mobile_input"
              >
                <el-input
                  v-model="storeTemplt.mobile"
                  :disabled="true"
                  size="mini"
                  clearable
                />
                <el-button
                  type="primary"
                  size="small"
                  @click="updateMobile"
                >修改</el-button>
              </el-form-item>
              <el-form-item
                label="门店联系方式"
                prop="telephone"
              >
                <el-input
                  v-model="storeTemplt.telephone"
                  size="mini"
                  clearable
                />
              </el-form-item>
              <el-form-item
                label="门店封面"
                prop="cover"
                class="picture_store_style"
              >
                <!-- <img :src="storeTemplt.picture" alt="" style="width: 80px;"> -->
                <el-upload
                  :class="{'disabled ': sfzFrontVisible}"
                  :limit="1"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  action="https://imgsrc.ishanshan.com/gimg/upload"
                  list-type="picture-card"
                  class="avatar-uploader"
                >
                  <img
                    v-if="storeTemplt.cover"
                    :src="storeTemplt.cover"
                    style="width:100%;height:100%;"
                  >
                  <i class="el-icon-plus" />
                </el-upload>
                <span style="color: #f99;">点击图片更换封面</span>
                <el-dialog
                  :visible.sync="dialogVisible"
                  style="padding:0;background:none;"
                >
                  <img
                    :src="storeTemplt.cover"
                    style="width:100%;height:100%;"
                    alt=""
                  >
                </el-dialog>
              </el-form-item>
            </div>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer footer_button"
          >
            <el-button
              class="cancel_btn"
              size="mini"
              @click="cancleEditShow"
            >取 消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="editStoreInfoFun"
            >确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="dialogFormVisible"
        title="修改手机号"
        style="width: 100%"
      >
        <el-form
          ref="dataForm2"
          :model="newMobile"
          :rules="rulesMobile"
        >
          <el-form-item prop="mobile">
            <el-input
              v-model="newMobile.mobile"
              placeholder="输入新的手机号"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="nowVerifyCode"
            class="security_code "
          >
            <el-input
              v-model="newMobile.nowVerifyCode"
              placeholder="输入验证码"
              clearable
            />
            <!-- <el-button @click="getCodeFun">获取验证码</el-button> -->
            <el-button
              v-show="isShow"
              size="small"
              plain
              @click="getCodeFun"
            >获取验证码</el-button>
            <el-button
              v-show="!isShow"
              style="padding:6px 10px; width: 112px;margin-left: 10px;"
            ><span>{{ count }}</span>s后重新获取</el-button>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            class="cancel_btn"
            size="mini"
            @click="cancleUpdateMobile"
          >取 消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="checkMessageCodeBtn"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="dialog_style_edit dialog_cashier_style">
      <el-dialog
        :visible.sync="dialogFormCashier"
        :title="isOpenEditTitle"
        style="width: 100%"
      >
        <div><img
          src="https://img.ishanshan.com/gimg/n/20181130/97b0471ccf30700ca6cbcc6596e31564"
          alt=""
        ></div>
        <div class="open_cashier_text">
          <p>扫码开通收银宝，注册成功后</p>
          <p>填入商户号即可开通</p>
        </div>
        <div class="open_cashier_imgBox"><img
          :src="qrImgUrl"
          alt=""
          width="100%"
        ></div>
        <div class="open_cashier_con">
          <div class="shoper_num_box">
            <el-form
              ref="cashierFrom"
              :model="cashierModel"
              :rules="rulesCashier"
              label-width="70px"
            >
              <el-form-item
                label="商户号:"
                prop="merchantCode"
              >
                <el-input
                  v-model="cashierModel.merchantCode"
                  placeholder="输入商户号"
                  clearable
                />
              </el-form-item>
            </el-form>
            <div
              slot="footer"
              class="dialog-footer footer_button"
            >
              <el-button
                class="cancel_btn"
                size="mini"
                @click="cancleOpenCashier"
              >取 消</el-button>
              <el-button
                v-if="dialogStatus=='create'"
                size="mini"
                type="primary"
                @click="sureOpenCashier"
              >确定</el-button>
              <el-button
                v-else
                size="mini"
                type="primary"
                @click="sureEditCashier"
              >修改</el-button>
            </div>
          </div>
        </div>
        <!-- <el-button v-if="dialogStatus=='create'" size="mini" style="margin-top:18px" type="primary" @click="sureOpenCashier">保存</el-button>
        <el-button v-else size="mini" type="primary" style="margin-top:18px" @click="sureEditCashier">修改</el-button> -->
      </el-dialog>
    </div>

  </div>
</template>

<script src="./storeInfo.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.storeInfoWrapper /deep/ {
  height: calc(100vh - 84px);
  margin: 0 10px 0 10px;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #ffffff;
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #5d9cec;
  }
}
.el-form-item {
  margin-bottom: 20px;
}
.el-button--small,
.el-button--small.is-round {
  padding: 7px 15px;
}
.el-form-item__label {
  font-size: 13px;
  color: #333;
  font-weight: 100;
}
.store_head_box {
  padding-left: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  margin-top: 20px;
}
.store_con_box /deep/ {
  padding: 10px;
  box-sizing: border-box;
  width: 492px;
  background: #f7f7f7;
  border-radius: 5px;
  .el-form--label-left .el-form-item__label {
    text-align: right;
  }
  label {
    font-weight: 400;
  }
  .el-cascader--medium {
    line-height: 28px;
  }
}
.edit_btn_head {
  margin-left: 65px;
}
.edit_icon_text {
  margin-right: 6px;
}
.store_con_left /deep/ {
  border-bottom: 1px solid #ddd;
  p {
    line-height: 28px;
  }
}
.store_con_right {
  p {
    line-height: 28px;
  }
}
.edit_store_top /deep/ {
  padding: 10px 0;
  box-sizing: border-box;
  .el-form-item--medium .el-form-item__content {
    line-height: 28px;
  }
  .el-form-item--medium .el-form-item__label {
    line-height: 28px;
  }
  .el-input--medium .el-input__inner {
    line-height: 28px;
  }
}
.edit_store_behind {
  margin-top: 17px;
}
p span:nth-child(1) {
  color: #666;
  font-size: 13px;
  line-height: 13px;
  width: 100px;
  text-align: right;
  margin-right: 20px;
  display: inline-block;
}
p span:nth-child(2) {
  color: #333;
  font-size: 13px;
  line-height: 13px;
  display: inline-block;
}
.cover_img_box {
  width: 96px;
  height: 96px;
  border: 1px solid #ddd;
  background: #fff;
  padding: 6px;
  box-sizing: border-box;
  border-radius: 4px;
}
.footer_button {
  text-align: right;
  margin-right: 10px;
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
.dialog_style_edit /deep/ {
  .el-dialog {
    width: 400px;
    border-radius: 5px;
  }
  .el-dialog__body {
    padding-bottom: 10px;
    box-sizing: border-box;
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
.security_code /deep/ {
  .el-input {
    width: 200px;
    margin-right: 30px;
  }

  .el-button {
    color: #5d9cec;
    border-color: #5d9cec;
    margin-left: 10px;
  }
  .el-button:focus,
  .el-button:hover {
    background-color: #fff;
  }
}
.shop_edit_box /deep/ {
  .boss_mobile_input {
    .el-input {
      width: 82%;
    }
  }
}
.cashier_open_box {
  padding: 0 20px;
  margin-top: 20px;
  font-size: 14px;
  box-sizing: border-box;
  color: #333;
  width: 410px;
  height: 64px;
  background: #fbfbfb;
  line-height: 64px;
  position: relative;
  .cashier_close_box {
    span {
      margin-right: 10px;
    }
  }
}
.dialog_cashier_style /deep/ {
  .el-dialog {
    width: 400px;
  }
  .el-dialog__body {
    text-align: center;
  }
  .open_cashier_text {
    font-size: 14px;
    color: #333;
    font-weight: 800;
    margin-top: 20px;
  }
  .open_cashier_imgBox {
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 4px;
    box-sizing: border-box;
    margin-left: 100px;
  }
  .open_cashier_con {
    .shoper_num_box {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss">
.store_address_style {
  .el-cascader-menu::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  .el-cascader-menu::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 5px;
    background: #c8e2f8;
  }
  .el-cascader-menu::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    border-radius: 0;
    background: #fff;
  }
}
</style>
>

