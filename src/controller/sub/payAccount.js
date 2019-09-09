const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
module.exports = class extends Base {
  // 收款方式列表查询
  async queryPaymentAccountListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPaymentAccountList',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 收款方式详细查询
  async getPaymentAccountAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/getPaymentAccount',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 新增支付方式
  async addPaymentAccountAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/addPaymentAccount',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 修改支付方式
  async updatePaymentAccountAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/updatePaymentAccount',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 修改账户状态
  async updateStatusAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/updateStatus',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 删除账户状态
  async deletePaymentAccountAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/deletePaymentAccount',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询账户流水
  async queryPayHistoryAccountListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPayHistoryAccountList',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询支付退款明细
  async queryPayOrderMsgListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPayOrderMsgList',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 统计某一条件下的总数据
  async queryPayOrderTotalAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPayOrderTotal',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询账户信息
  async queryPayAccountMsgAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPayAccountMsg',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询提现记录
  async queryPaySetRecordListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPaySetRecordList',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询安全手机号和银行卡信息
  async queryPayTelBankMsgAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/queryPayTelBankMsg',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询安全手机号和银行卡信息--（新）
  async querySecurtyMobileAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/querySecurtyMobile',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 新增，改绑安全手机号
  async setSecurtyMobileAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/setSecurtyMobile',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 上缴总部
  async turnInAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/turnIn',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 总部校区查询
  async getHqOrganAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/org/getHqOrgan',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 提现申请
  async addSettAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sysBase/payment/addSett',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
};
