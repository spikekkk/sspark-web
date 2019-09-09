import qs from 'qs';
const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 商品(储值卡)
  async goodsStoredQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/goods/goodsStoredQuery',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 根据手机号查询用户储值卡
  async cardQueryByMobileAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/stored/cardQueryByMobile',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 储值卡开通
  async storedCreateAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/stored/storedCreate',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 储值卡充值
  async storedRechargeAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/stored/storedRecharge',
      postData
    ).then(res => res.json());
    this.body = json;
  }
};
