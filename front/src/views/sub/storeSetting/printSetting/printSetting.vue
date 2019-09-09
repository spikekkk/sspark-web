<template>
  <div class="printSetting">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="订单小票"
        name="first"
      />
      <el-tab-pane
        label="核销小票"
        name="second"
      />
      <el-tab-pane
        label="交班小票"
        name="third"
      />

    </el-tabs>
    <div class="main_box">

      <div class="left_content fl">

        <div class="print_page">

          <div>
            <h3>滨江天街店</h3>
          </div>
          <div>

            <p><span class="single_title">会员名:<span>张三</span></span><span>订单号:<span>12345645645445</span></span></p>
            <p><span class="single_title">手机号:<span>17605587287</span></span><span>收银员:<span>黎明</span></span></p>
          </div>
          <div>
            <p
              v-if="activeName==='second'"
              class="table_item table_tr"
            >
              <span>票种</span>

              <span>票码</span>
            </p>
            <p
              v-if="activeName==='second'"
              class="table_item"
            >
              <span>儿童票</span>
              <span>123456</span>

            </p>
            <p
              v-if="activeName==='second'"
              class="table_item"
            >
              <span>亲子票</span>
              <span>12345456</span>

            </p>
            <p
              v-if="activeName==='first'"
              class="table_item table_tr"
            >
              <span>商品名</span>
              <span>规格</span>
              <span>数量</span>
              <span>单价</span>
            </p>

            <p
              v-if="activeName==='first'"
              class="table_item"
            >
              <span>西装</span>
              <span>红色,M</span>
              <span>3</span>
              <span>12</span>
            </p>
            <p
              v-if="activeName==='first'"
              class="table_item"
            >
              <span>儿童票</span>
              <span> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>3</span>
              <span>120</span>
            </p>
          </div>
          <div class="table_tr">

            <p><span class="single_title">应收金额:<span>252</span></span><span>实收金额:<span>260</span></span></p>
            <p><span class="single_title">优惠:<span>0</span></span><span>找零:<span>8</span></span></p>

          </div>

          <p v-if="activeName==='second'"><span class="single_title">剩余次数:<span>252</span></span><span>会员卡有效期:<span>2018-10-09</span></span></p>

          <div>
            <p v-if="activeName!=='third'"><span class="pl">{{ activeName==='first'?'下单':'核销' }}时间:</span><span>2019-06-18 12:00:02</span></p>
            <p><span class="pl">打印时间:</span><span>2019-06-18 12:00:02</span></p>
          </div>
          <div class="table_tr">
            <p><span class="pl">电话:</span><span>0571-98732342</span></p>
            <p><span class="pl">地址:</span><span>滨康路001号</span></p>
          </div>
          <div class="print_bottom">

            <p><span>{{ noticeText }}</span></p>

            <p>

              <img
                :src="cover||'//img.ishanshan.com/gimg/n/20190318/1c36f4dfa5ed66a7632a216648bf4216'"
                style="width:90px;height:90px"
              >
            </p>
            <p>https://e.lekecloud.cn</p>
            <p>闪宝科技提供技术支持</p>
          </div>
        </div>

      </div>
      <div class="right_content fl">
        <div class="down_load">
          <img src="//img.ishanshan.com/gimg/n/20190319/32774bd3a9698e1e351c7c0ae6ee3476">
          <a
            class="title_notice"
            href="https://mp.weixin.qq.com/s/FGaUdWhYWj7UiotGCNKm5Q"
            target="_blank"
          >请在使用打印机前安装驱动</a>

        </div>
        <div style="margin: 32px 0;">

          <span class="receiptSpec">默认打印机：</span>
          <el-select
            v-model="printValue"
            class="select_print"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in printList"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            />
          </el-select>
        </div>

        <span class="receiptSpec">小票规格：</span>
        <el-radio
          v-for="(item,index) in statusArr"
          v-model="radioType"
          :key="index"
          :label="item.value"
          @change="radioChange"
        >{{ item.label }}</el-radio>

        <div class="right_items">
          <span class="receiptSpec">图片/二维码：</span>
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://imgsrc.ishanshan.com/gimg/upload"
          >
            <img
              v-if="cover"
              :src="cover"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>

        </div>
        <div class="right_items">
          <span class="receiptSpec">图片提示语：</span>
          <el-input
            v-model="noticeText"
            placeholder="请输入图片提示语"
          />
        </div>
        <div
          v-if="activeName==='second'"
          class="right_items"
        >
          <span
            style="width:209px"
            class="receiptSpec"
          >是否与订单小票同步打印：</span>
          <el-radio
            v-model="syncPrint"
            label="1"
          >是</el-radio>
          <el-radio
            v-model="syncPrint"
            label="0"
          >否</el-radio>
        </div>

        <div class="footer_btn">
          <el-button
            size="mini"
            type="primary"
            @click="updatePrintSetting"
          >确定</el-button>
        </div>

      </div>

    </div>
  </div>

</template>

<script src="./printSetting.js"></script>
<style lang="scss" scoped>
.printSetting {
  height: calc(100vh - 84px);
  margin: 0 10px;
  padding: 20px 10px 10px 10px;
  background: #fff;
  .printTitle {
    font-size: 14px;
    margin-bottom: 40px;
  }
  .receiptSpec {
    font-size: 14px;
    padding: 0 10px 0 30px;
    width: 183px;
  }
  .footer_btn {
    margin-left: 32px;
    display: inline-block;
    .el-button--mini {
      border-radius: 5px;
    }
  }
  .el-tabs__item.is-active {
    color: #5d9cec;
  }
  .el-tabs__active-bar {
    background-color: #5d9cec;
    height: 5px;
  }

  .el-tabs__item:hover {
    color: #5d9cec;
  }

  .print_page {
    p {
      width: 380px;
      text-align: left;
    }
    width: 400px;
    border: 1px solid;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .single_title {
    padding-right: 50px;
    padding-left: 10px;
  }
  .table_item {
    display: flex;
    justify-content: space-around;
  }
  .table_tr {
    border-bottom: 1px solid;
    border-top: 1px solid;
    line-height: 40px;
  }
  .print_bottom {
    p {
      text-align: center;
    }
  }
  .main_box {
    overflow: auto;
    height: 100%;
  }
  .right_items {
    display: flex;
    margin: 50px 0;
    align-items: center;
  }
  .pl {
    padding-left: 10px;
  }
  .select_print {
    width: 200px;
  }
  .down_load {
    margin: 32px 32px;
    /* line-height: 9px; */
    display: flex;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
    }
    .title_notice {
      width: 196px;
      display: inline-block;
      background-color: #5d9cec;
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>
