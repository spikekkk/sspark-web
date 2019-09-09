import qs from 'qs';

const Base = require('../base.js');

const edenServerEureka = think.config('eden_server_eureka');

const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 商品数据查询
  async queryListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/queryList',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 查询当前门店内所有门票
  async queryTicketInShopAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/ticketInShop',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 删除商品条目
  async deleteAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/delete',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 商品上架
  async onSaleAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/onSale',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 商品下架
  async offSaleAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/offSale',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 商品改价
  async changePriceAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/changePrice',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 门票查询
  async ticketQueryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/ticketQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 新增门票
  async ticketCreateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/ticketCreate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // update门票
  async ticketUpdateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/ticketUpdate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 零售商品查询
  async normalQueryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 零售商品详细价格查询
  async queryDetailPriceAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalPriceQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 零售商品详细价格更改
  async detailPriceUpdateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalPriceChange',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 新增零售商品
  async createGoodsAction() {
    const reqData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalCreate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // update零售商品
  async goodsUpdateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalUpdate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 会员卡查询
  async cardQueryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/consumerCardQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 新增会员卡
  async cardCreateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/consumerCardCreate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // update会员卡
  async cardUpdateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/consumerCardUpdate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 充值卡查询
  async storedPkgQueryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/storedPkgQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 充值套餐创建
  async storedPkgCreateAction() {
    const postData = qs.parse(this.ctx.request.body.post);
    console.info('postData====>', postData);
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/storedPkgCreate',
      postData
    ).then(res => res.json());
    this.body = json;
  }

  // update充值卡
  async storedPkgUpdateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/storedPkgUpdate',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 分类类别----数据获取
  async queryCategoryListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/category/findAll',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 分类------删除
  async deleteCategoryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/category/delete',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 分类----编辑
  async updateCategoryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/category/update',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 分类-----创建
  async createCategoryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/category/create',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格信息------获取
  async querySpecListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/findAll',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格信息----------新增
  async createSpecAction() {
    const reqData = this.ctx.request.body.post || {};

    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/create',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格信息------删除
  async deleteSpecAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/delete',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格信息-------编辑
  async updateSpecAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/update',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格选项值-------新增
  async updateWithOptionAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/updateWithOption',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格选项值-------新增
  async createSpecOptionsAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/option/create',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
  // 规格选项值-------编辑
  async updateSpecOptionsAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/option/update',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 规格选项值-------删除
  async deleteSpecsOptionsAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/spec/option/delete',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 库存管理-------信息查询获取
  async stockQueryListAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/stockQueryList',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 库存管理-------零售商品库存查询
  async goodsStockQueryAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalStockQuery',
      reqData
    ).then(res => res.json());
    this.body = json;
  }

  // 库存管理-------库存更改
  async goodsStockUpdateAction() {
    const reqData = this.ctx.request.body.post || {};
    const json = await this.postJson(
      edenServerEureka,
      baseUrl + '/shop/goods/normalStockChange',
      reqData
    ).then(res => res.json());
    this.body = json;
  }
};
