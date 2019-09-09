const Base = require('./base.js');

const edenServerEureka = think.config('eden_server_eureka');

const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  /* 下载导入模板 */

  async downloadTemplateAction() {
    const postData = this.ctx.request.body.post || {};
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/downloadTemplate',
      postData
    );
    this.body = res.body;
  }

  /* 导入会员：上传first */
  async customerFirstAction() {
    const reqData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerFirst',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员：第二步，查看上传结果. */
  async customerSecondAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerSecond',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员：第三步，执行导入 */
  async customerThirdAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerThird',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员：第四步，查看导入结果 */
  async customerFourthAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerFourth',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  async customerFourthExportAction() {
    const postData = this.ctx.request.body.post || {};
    const res = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerFourth',
      postData
    );
    this.body = res.body;
  }

  /* 获取批次号 */
  async takeBatchNumberAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/takeBatchNumber',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  /* 查询实时导入量 */
  async inTimeImportCountAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/inTimeImportCount',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员卡：上传first */
  async customerResourceFirstAction() {
    const reqData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerResourceFirst',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员卡：第二步，查看上传结果. */
  async customerResourceSecondAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerResourceSecond',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员卡：第三步，执行导入 */
  async customerResourceThirdAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerResourceThird',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员卡：第四步，查看导入结果 */
  async customerResourceFourthAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerResourceFourth',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  /* 导入会员卡：第四步，导出文件 */
  async customerResourceFourthExportAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/thirddata/customerResourceFourth',
      reqData
    );
    this.body = json.body;
  }
};
