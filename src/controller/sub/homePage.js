const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
module.exports = class extends Base {
  // 查询日营业额走势
  async queryDayTrendChartAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/indexstat/queryDayTrendChart',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询月支付方式营业额占比
  async queryMonthPayBusinessAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/indexstat/queryMonthPayBusiness',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询月营业额走势
  async queryMonthTrendChartAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/indexstat/queryMonthTrendChart',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询经营统计
  async querybusinessStatViewAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/indexstat/querybusinessStatView',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询店铺概况
  async queryShopSurveyStatAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/indexstat/queryShopSurveyStat',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询商品过期概况
  async queryExpireGoodsAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/indexstat/queryExpireGoods',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
};
