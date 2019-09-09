const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 数据统计---商品管理列表
  async spuStatListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============商品管理 postData ================', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/spuStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计---今日会员统计头部
  async custTodayStatAction() {
    const postData = this.ctx.request.body.post || {};
    console.log(
      '=============今日会员统计 postData ================',
      postData
    );
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/custTodayStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计---会员统计列表
  async custStatAction() {
    const postData = this.ctx.request.body.post || {};
    console.log(
      '=============会员统计列表 postData ================',
      postData
    );
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/custStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计---今日经营统计
  async businessTodayStatAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============今日经营统计 postData ===============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/businessTodayStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计---经营统计列表
  async businessStatAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============经营统计列表 postData ===============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/businessStat',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 数据统计---支付方式
  async spuStatPayAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/spuStatPay',
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
      baseUrl + '/shop/stat/businessStatExport',
      postData
    );
    this.body = res.body;
  }

  // 数据统计--商品统计-导出
  async spuStatExportAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('============导出postData ================', postData);
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/spuStatExport',
      postData
    );
    this.body = res.body;
  }

  // 数据统计--充值流水查询（含导出）
  async rechargeFlowExcleAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('============导出postData ================', postData);
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/rechargeFlow',
      postData
    );
    this.body = res.body;
  }
  // 数据统计--充值流水非导出
  async rechargeFlowAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/rechargeFlow',
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
      baseUrl + '/shop/stat/payTypeCumulative',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 收款方式列表
  async businessPayTypeCumulativeListAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/businessPayTypeCumulativeList',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 商品票务累计
  async businessGoodsCumulativeAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/businessGoodsCumulative',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 经营统计 商品票务列表
  async businessGoodsCumulativeListAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/stat/businessGoodsCumulativeList',
      postData
    ).then(res => res.json());
    this.body = json;
  }
};
