<template>
  <div class="pay_select">
    <el-dialog
      :visible.sync="paySelectDialogVisible"
      :modal-append-to-body= "false"
      title="支付方式"
      width="400px"
      center
    >
      <div style="border:1px solid #000;width:303px;height:614px;padding:30px;color:#333">
        <div style="font-size:20px;line-height:20px;font-weight:600;margin-bottom:30px;text-align:center">滨江天街店</div>
        <div style="padding:20px 0 10px;border-bottom:2px solid #999">
          <div style="font-size:12px;line-height:14px;margin-bottom:10px;">
            <div style="display:inline-block">会员名</div>
            <div style="float:right">会员A</div>
          </div>
          <div style="font-size:12px;line-height:14px;">
            <div style="display:inline-block">会员手机号</div>
            <div style="float:right">15778788787</div>
          </div>
        </div>
        <div style="padding:10px 0;border-bottom:2px solid #999;font-size:12px;line-height:14px;">
          <div style="margin-right:55px;float:left">商品名</div>
          <span style="margin-right:55px;">规格</span>
          <span style="margin-right:55px;">数量</span>
          <div style="float:right">单价</div>
        </div>
        <div style="margin:10px 0 0;border-bottom:2px solid #999;">
          <div style="font-size:12px;line-height:14px;margin-bottom:10px;">
            <div style="float:left;width:25%">西装</div>
            <div style="display:inline-block;color:#999;width:25%;">红色:32G:5寸</div>
            <div style="display:inline-block;width:25%;text-align:center">2</div>
            <div style="float:right;">￥12</div>
          </div>
          <div style="color:#999;margin-bottom:10px;font-size:12px;line-height:14px">赠：儿童票2张</div>
        </div>
        <div style="margin-top:21px;border-bottom:2px dashed #999;padding-bottom:20px">
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">应收金额</div>
            <div style="float:right">25</div>
          </div>
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">实收金额</div>
            <div style="float:right">50</div>
          </div>
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">优惠</div>
            <div style="float:right">0</div>
          </div>
          <div style="font-size:12px;line-height:14px;">
            <div style="display:inline-block">找零</div>
            <div style="float:right">25</div>
          </div>
        </div>
        <div style="margin-top:20px;border-bottom:2px dashed #999;padding-bottom:20px">
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">订单号</div>
            <div style="float:right">78545454</div>
          </div>
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">下单时间</div>
            <div style="float:right">2018-02-12 12:09</div>
          </div>
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">打印时间</div>
            <div style="float:right">2018-02-12 12:09</div>
          </div>
          <div style="font-size:12px;line-height:14px;">
            <div style="display:inline-block">收银员</div>
            <div style="float:right">收银员A</div>
          </div>
        </div>
        <div style="margin-top:20px;">
          <div style="font-size:12px;line-height:14px;margin-bottom:10px">
            <div style="display:inline-block">电话</div>
            <div style="float:right">78545454</div>
          </div>
          <div style="font-size:12px;line-height:14px;">
            <div style="display:inline-block">地址</div>
            <div style="float:right">滨和路001号</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paySelectDialogVisible: false
    }
  },
  methods: {
    /* 弹窗显示*/
    show() {
      this.paySelectDialogVisible = true
    }
  }
}
</script>
<style scoped>

</style>
