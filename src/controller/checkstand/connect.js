import qs from 'qs';
const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');

const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 交接班详情查询
  async connectClassAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.log('postData-----------', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/shift/queryDetail').then(res => res.json());
    this.body = json;
  }
  // 交接班记录新增
  async connectOutAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.log('postData-----------', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/shift/add', postData).then(res => res.json());
    this.body = json;
  }
  // 交接班记录打印
  async connectPrintAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.log('postData-----------', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/shift/print', postData).then(res => res.json());
    this.body = json;
  }

  // 会员注册
  async addCustomerAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.log('postData-----------', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/customer/addCustomer', postData).then(res => res.json());
    this.body = json;
  }
};
