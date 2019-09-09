const Base = require('./base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 登陆接口
  async loginAction() {
    const obj = this.ctx.request.body.post || {};
    const json = await this.postForm(
      edenServerEureka,
      baseUrl + '/auth/login',
      obj
    ).then(res => res.json());
    this.body = json;
    console.log('---------------login data-----------', this.body);
    // const userInfo = await this.session('userInfo');
    await this.session('userInfo', json);
  }

  // 登出接口
  async logoutAction() {
    const json = await this.postForm(
      edenServerEureka,
      baseUrl + '/auth/logout'
    ).then(res => res.json());
    this.body = json;
  }
  // 登陆激活
  async activationPersonAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============激活 postData ============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/system/share/activationPerson',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 密码重置
  async resetPasswordAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============重置 postData ============', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/system/share/resetPassword',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // 切换系统接口
  async changeSystemAction() {
    const obj = this.ctx.request.body.post || {};
    const json = await this.postForm(
      edenServerEureka,
      baseUrl + '/auth/switchSystem',
      obj
    ).then(res => res.json());
    this.body = json;
    // console.log('==============切换系统changeSystem==============', this.body);
    await this.session(null);
    // const userInfo = await this.session('userInfo');
    await this.session('userInfo', json);
  }

  // 保存登陆和切换系统数据的接口
  async infoAction() {
    const obj = this.ctx.request.body.post || {};
    const userInfo = (await this.session('userInfo')) || {};
    // console.log('=======obj=== userinfo =====', obj, userInfo);
    const currentSystem = obj.currentSystem || '1';
    switch (currentSystem) {
      case '1':
        return this.json({
          errorCode: 9000,
          errorMessage: 'success',
          data: {
            currentSystem: '1',
            avatar:
              'http://img4.duitang.com/uploads/item/201602/06/20160206025901_JtzEC.thumb.700_0.jpeg',
            perms: {
              menus: userInfo.menuKeys
            }
          }
        });
      case '2':
        return this.json({
          errorCode: 9000,
          errorMessage: 'success',
          data: {
            currentSystem: '2',
            avatar:
              'http://img4.duitang.com/uploads/item/201602/06/20160206025901_JtzEC.thumb.700_0.jpeg',
            perms: {
              menus: userInfo.menuKeys
            }
          }
        });
      case '3':
        return this.json({
          errorCode: 9000,
          errorMessage: 'success',
          data: {
            currentSystem: '3',
            perms: {
              menus: userInfo.menuKeys
            }
          }
        });
    }
    return this.json({
      errorCode: 3000,
      errorMessage: '无此类型!'
    });
  }

  // 切换门店
  async switchShopAction() {
    const postData = this.ctx.request.body.post || {};
    const json = await this.postForm(
      edenServerEureka,
      baseUrl + '/auth/switchShop',
      postData
    ).then(res => res.json());
    this.body = json;
    await this.session(null);
    // const userInfo = await this.session('userInfo');
    await this.session('userInfo', json);
  }
};
