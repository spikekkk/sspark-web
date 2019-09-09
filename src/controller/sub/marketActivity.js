const Base = require('../base.js');

const edenServerEureka = think.config('eden_server_eureka');

const baseUrl = think.config('baseUrl');

const edenGameServerEureka = think.config('eden_game_eureka');
const baseGameUrl = think.config('game_baseUrl');
module.exports = class extends Base {
  // 获取游戏label----微游戏
  async queryAllLabelAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/mic/ProductLabelQueryService/queryAllLabel',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 获取游戏Info----微游戏
  async queryGameInfosWithTenantAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/mic/GameQueryService/queryGameInfosWithTenant',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 选择游戏Info----微游戏
  async gameChooseAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/mic/GameQueryService/gameChoose',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // myGameList----微游戏
  async queryGameInstsAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/mic/GameQueryService/queryGameInsts',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  //  游戏下拉列表
  async queryGameInfosAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/mic/GameQueryService/queryGameInfos',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 添加游戏实例---抽奖-微游戏
  async addGameInfoAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/cjPc/addGameInfo',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 添加游戏实例---砍价-微游戏
  async addBargainGameInfoAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/addGameInfo',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 编辑游戏实例---砍价-微游戏
  async bargainUpdateGameInfoAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/updateGameInfo',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 编辑游戏实例---抽奖-微游戏
  async raffleUpdateGameInfoAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/cjPc/updateGameInfo',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询游戏实例---砍价----微游戏
  async queryConfigAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/queryConfig',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询游戏实例--详细信息-砍价----微游戏
  async queryGameInfoAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/queryGameInfo',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 查询---砍价数据详情
  async queryRankInfoAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/queryRankInfo',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询---砍价----退款操作
  async payRefundAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/payRefund',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询游戏实例--详细信息-抽奖----微游戏
  async queryGameInfoRaffleAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/cjPc/getGameDetail',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 编辑抽奖查询表单
  async queryFormConfigAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/cjPc/queryFormConfig',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 我的游戏--下架游戏--砍价
  async obtainedGameAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/bargain/action',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 抽奖下架
  async obtainedRaffleGameAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenGameServerEureka,
      baseGameUrl + '/pApi/cjPc/action',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // // 更新游戏状态---微游戏
  // async updateStatusAction() {
  //   const reqData = this.ctx.request.body.post || {};
  //   const json = await this.postJson(
  //     '/web-node-server/thinknode/game/transpond/action',
  //     reqData
  //   ).then(res => res.json());
  //   this.body = json;
  // }
};
