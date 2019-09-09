const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 门店设置---门店信息列表
  async queryStoreListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log(
      '=============门店信息列表 postData ================',
      postData
    );
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/shop/getHqShop',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 门店设置---编辑更新门店
  async updateStoreInfoAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============编辑门店 postData ================', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/hq/shop/updateHqShop',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 门店设置---门店地址省市区
  async citySelectChangeAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============门店地址省市区 postData =============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/share/area/queryArea',
      postData,
      {
        timeout: 30000
      }
    ).then(res => res.json());
    this.body = json;
  }

  // 门店设置---个人信息列表
  async queryPersonListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============个人信息 postData =============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/system/personal/getPersonInfo',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 门店设置---编辑个人信息
  async updatePersonInfoAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============修改用户名 postData ============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/system/personal/updateLoginName',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // 门店设置---修改登陆密码
  async updatePasswordAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============修改登陆密码 postData ============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/system/personal/updatePassword',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 门店设置---发送验证码
  async sendMessageCodeAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============发送验证码 postData ============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sms/sendMessage',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 门店设置---校验验证码修改手机号
  async checkMessageCodeAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============校验验证码修改手机号 postData =======', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/sms/checkVerifyCode',
      postData
    ).then(res => res.json());
    this.body = json;
  }
  // // 门店设置---获取收银宝开通二维码
  // async cashierOpenQrAction() {
  //   const postData = this.ctx.request.body.post || {};
  //   console.log('=============获取收银宝开通二维码 postData =======', postData);
  //   const json = await this.postJson(edenServerEureka, baseUrl + '/shop/shouyinbao/createShouYinQrImg', postData).then(res => res.json());
  //   this.body = json;
  // }
  // // 门店设置---收银宝开通
  // async cashierOpenSureAction() {
  //   const postData = this.ctx.request.body.post || {};
  //   console.log('=============收银宝开通 postData =======', postData);
  //   const json = await this.postJson(edenServerEureka, baseUrl + '/shop/shouyinbao/addShouYinBao', postData).then(res => res.json());
  //   this.body = json;
  // }
  // // 门店设置---编辑收银宝开通
  // async cashierEditSureAction() {
  //   const postData = this.ctx.request.body.post || {};
  //   console.log('=============编辑收银宝开通 postData =======', postData);
  //   const json = await this.postJson(edenServerEureka, baseUrl + '/shop/shouyinbao/updateShouYinBao', postData).then(res => res.json());
  //   this.body = json;
  // }
};
