import qs from 'qs';
const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 统计---收银统计列表
  async queryCashierListAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/purchase/queryList',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 统计---核销统计列表
  async queryCancelListAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/cancle/queryList',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 数据统计--充值流水查询（含导出）
  async rechargeFlowExcleAction() {
    const postData = this.ctx.request.body.post || {};

    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/stat/rechargeFlow',
      postData
    );
    this.body = res.body;
  }
  // 数据统计--充值流水非导出
  async rechargeFlowAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/stat/rechargeFlow',
      postData
    ).then(res => res.json());
    this.body = json;
  }
};
