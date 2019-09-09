const Base = require('./base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');
module.exports = class extends Base {
  // 获取字典的接口
  async loadDictsAction() {
    const postData = this.ctx.request.body.post || {};
  
    const json = await this.postJson(edenServerEureka, baseUrl + '/system/dict/queryDictByCode', postData).then(res => res.json());
    this.body = json;
  }
  // //查询字典的接口
  // async queryDictsAction() {
  //   const postData = this.ctx.request.body.post || {};
  //
  //   const json = await this.postJson(edenServerEureka, baseUrl + ' /system/dict/findDict', postData).then(res => res.json());
  //   this.body = json;
  // }

  // loadUsersAction() {
  //   return this.json({
  //     errorCode: 9000,
  //     errorMessage: 'success',
  //     results: [{
  //       label: '丁丁',
  //       value: '99009301'
  //     },
  //     {
  //       label: '马丽',
  //       value: '99009302'
  //     }]
  //   });
  // }

  // loadDictsAction() {
  //   return this.json({
  //     errorCode: 9000,
  //     errorMessage: 'success',

  //     dicts:[
  //       {
  //         code:"sex",
  //         items:[
  //           {
  //               label:"汉子",
  //               value:"1",
  //               color:"orange"
  //           },
  //           {
  //               label:"妹子",
  //               value:"2",
  //               color:"green"
  //           },
  //           {
  //               label:"未知物种",
  //               value:"0",
  //               color:"red"
  //           }
  //         ]
  //       },
  //     ]
  //     // data: {
  //     //   'sex': [{
  //     //     label: '男',
  //     //     value: '1',
  //     //     color: '#ff0000'
  //     //   },
  //     //   {
  //     //     label: '女',
  //     //     value: '2',
  //     //     color: '#00ff00'
  //     //   }],
  //     //   'order_status': [{
  //     //     label: '未支付',
  //     //     value: '0',
  //     //     color: '#ff0000'
  //     //   },
  //     //   {
  //     //     label: '已支付',
  //     //     value: '1',
  //     //     color: '#00ff00'
  //     //   }],
  //     //   'user_status': [{
  //     //     label: '离职',
  //     //     value: '0',
  //     //     color: '#ff0000'
  //     //   },
  //     //   {
  //     //     label: '在职',
  //     //     value: '1',
  //     //     color: '#00ff00'
  //     //   }]
  //     // }
  //   });
  // }
  // loadUsersAction() {
  //   return this.json({
  //     errorCode: 9000,
  //     errorMessage: 'success',
  //     results: [{
  //       label: '丁丁',
  //       value: '99009301'
  //     },
  //     {
  //       label: '马丽',
  //       value: '99009302'
  //     }]
  //   });
  // }
  // loadRolesAction() {
  //   return this.json({
  //     errorCode: 9000,
  //     errorMessage: 'success',
  //     results: [{
  //       label: '店长',
  //       value: '10000'
  //     },
  //     {
  //       label: '销售主管',
  //       value: '10001'
  //     }]
  //   });
  // }
  // loadDeptsAction() {
  //   return this.json({
  //     errorCode: 9000,
  //     errorMessage: 'success',
  //     results: [{
  //       label: '市场部',
  //       value: '10021'
  //     },
  //     {
  //       label: '财务部',
  //       value: '10022'
  //     }]
  //   });
  // }
};
