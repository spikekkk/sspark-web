const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.redirect('/index.html');
    // return this.display();
  }
  // async testAction() {
  //   const json = await this.postForm('eden-server', '/eden-server/website/monitor').then(res => res.text());
  //   this.body = json;
  // }
  async healthAction() {
    const json = await this.postJson('eden-server', '/eden-server/website/monitor').then(res => res.json());
    const ret = {
      status: 'UP'
    }
    if (json.errorCode !== 9000) {
      ret.status = 'DOWN';
    }
    this.body = ret;
  }
};
