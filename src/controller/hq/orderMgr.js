const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
module.exports = class extends Base {
  // 订单信息----数据获取
  async queryOrderListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/purchase/purchaseQuery', reqData).then(res => res.json());
    this.body = json;
  }

  // 订单信息----员工数据获取
  async queryShopEmployeeListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/purchase/userQuery', reqData).then(res => res.json());
    this.body = json;
  }

   // 订单信息----所属门店数据获取
   async queryShopListAction() {
     const reqData = this.ctx.request.body.post || {};
     const json = await this.postJson(edenServerEureka, baseUrl + '/hq/purchase/shopQuery', reqData).then(res => res.json());
     this.body = json;
   }
 };
