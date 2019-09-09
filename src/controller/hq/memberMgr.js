const Base = require('./../base.js');

const edenServerEureka = think.config('eden_server_eureka');

const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 会员信息----数据查询
  async queryMemberListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/customer/queryCustomer',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 会员卡查询
  async queryMemberCardListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/customer/queryCustomerConsumerCard',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 订单查询查询
  async queryOrderListAction() {
    const reqData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/customer/queryCustomerPurchase',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 核销订单查询
  async queryCustomerVerifyAction() {
    const reqData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/customer/queryCustomerVerify',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
};
