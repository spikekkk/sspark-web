import qs from 'qs';
const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  /**
   * 票和会员卡查询
   */
  async goodsQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
  
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/goodsQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 零售查询
   */
  async goods2QueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/goods2Query', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 零售规格框列表查询
   */
  async skuQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/skuQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 销售列表查询
   */
  async salesQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/salesQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 零售商品中某个规格显示查询
   */
  async goodsSpecQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/goodsSpecQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 根据电话查询会员
   */
  async getCustByTelAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/getCustByTel', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 零售中的tab查询
   */
  async specQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/goods/specQuery', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 巴枪收银
   */
  async payTradeAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/pay/payTrade', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * pos机和现金
   */
  async createOrderAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/purchase/create', postData).then(res => res.json());
    this.body = json;
  }
  /**
   * 当日入场人数
   */
  async dayVerifyStatAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/stat/dayVerifyStat', postData).then(res => res.json());
    this.body = json;
  }
};
