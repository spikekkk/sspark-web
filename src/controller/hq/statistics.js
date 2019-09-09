const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
// const fs = require('fs');

module.exports = class extends Base {
  // 数据统计---今日经营统计
  async businessTodayStatAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============今日经营 postData ================', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessTodayStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计---经营统计列表
  async businessStatAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 数据统计---商品统计列表
  async spuStatAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/spuStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计---零售商品分类查询
  async categoryQueryAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/statQuery/categoryQuery',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 数据统计---会员统计列表--today
  async custTodayStatAction() {
    const postData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/custTodayStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 数据统计---会员统计列表--not_today
  async custStatAction() {
    const postData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/custStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 数据统计---支付方式
  async spuStatPayAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/spuStatPay',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 数据统计--经营统计-导出
  async businessStatExportAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('============导出postData ================', postData);
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessStatExport',
      postData
    );
    for (const p of res.headers) {
      this.header(p[0], p[1]);
    }
    this.body = res.body;
  }

  // 数据统计--商品统计-导出
  async spuStatExportAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('============导出postData ================', postData);
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/spuStatExport',
      postData
    );
    for (const p of res.headers) {
      this.header(p[0], p[1]);
    }
    this.body = res.body;
  }
  // 数据统计--充值流水查询（含导出）
  async rechargeFlowExcleAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('============导出postData ================', postData);
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/rechargeFlow',
      postData
    );
    this.body = res.body;
  }
  // 数据统计--充值流水非导出
  async rechargeFlowAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/rechargeFlow',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 收款方式累计
  async payTypeCumulativeAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============经营统计列表 postData ===============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessPayTypeCumulative',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 收款方式列表
  async businessPayTypeCumulativeListAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessPayTypeCumulativeList',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 商品票务累计
  async businessGoodsCumulativeAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessGoodsCumulative',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 商品票务列表
  async businessGoodsCumulativeListAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/stat/businessGoodsCumulativeList',
      postData
    ).then(res => res.json());
    this.body = json;
  }
};
