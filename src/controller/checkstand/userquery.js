import qs from 'qs';
const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  async userIdQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/getCustomer',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userPhoneQueryAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/getCustomerInfo',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userPresentAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData==赠票==>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/cancle/present',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userCeaseCustomerCardAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData==停卡==>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/ceaseCustomerCard',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userOpenCustomerCardAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData==开卡==>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/openCustomerCard',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userRegAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/addCustomer',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userUpdateAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/updateCustomer',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async userWriteOffAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/cancle/consumerCard',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  async recallExchangeAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/counter/customer/revertVerify',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  async uploadImageAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/upload/image',
      postData
      // dataType
    ).then(res => res.json());
    this.body = json;
  }
};
