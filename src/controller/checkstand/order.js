import qs from 'qs';
const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  /**
   * 订单列表查询
   */
  async purQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/purchase/purQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 订单详情以及商品列表
   */
  async purDetailQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/purchase/purDetailQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 订单小票数据
   */
  async purPrintQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/order/print', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 核销小票数据
   */
  async cancelPrintQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/consumerCardVerify/print', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 退款
   */
  async refundAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/pay/refund', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 退款确认
   */
  async refundConfirmAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/pay/refundConfirm', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 打印门票核销小票
   */
  async ticketPrintAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/order/ticketPrint', postData).then(res => res.json());
    this.body = json;
  }
};
