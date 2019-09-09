const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
module.exports = class extends Base {
  // 订单信息----数据获取
  async queryOrderListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/purchase/query',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 订单信息----员工数据获取
  async queryUserListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/purchase/userQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
};
