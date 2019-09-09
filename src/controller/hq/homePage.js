const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
module.exports = class extends Base {
  // 查询日营业额走势
  async queryDayTrendChartAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqDayTrendChart',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询月支付方式营业额占比
  async queryMonthPayBusinessAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqMonthPayBusiness',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询月营业额走势
  async queryMonthTrendChartAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqMonthTrendChart',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询经营统计
  async querybusinessStatViewAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqBusinessStatView',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询店铺概况
  async queryShopSurveyStatAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqShopSurveyStat',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询商品过期概况
  async queryExpireGoodsAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqExpireGoods',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询各门店月营业额对比
  async queryHqShopMonthBusinessAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/indexstat/queryHqShopMonthBusiness',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
};
