const Base = require('./base.js');

const USER_DATA = [{
  'deptName': '市场部',
  'userStatus': '0',
  'gender': '1',
  'avatar': 'https: //img.ishanshan.com/gimg/n/20181014/d44a0318d198df13d7388a21b1959600',
  'roleId': 10001,
  'deptId': 10021,
  'orgName': '木马王国',
  'orgId': 1000,
  'createTime': 1538618544000,
  'phone': '15868484158',
  'name': 'CC003',
  'nickname': '丁丁',
  'id': 99009301,
  'age': 20,
  'email': 'dd@bank.com'
},
{
  'deptName': '财务部',
  'userStatus': '1',
  'gender': '2',
  'avatar': 'https: //img.ishanshan.com/gimg/n/20181014/d44a0318d198df13d7388a21b1959600',
  'roleId': 10000,
  'deptId': 10022,
  'orgName': '木马王国',
  'orgId': 1000,
  'createTime': 1539007030000,
  'phone': '13312345678',
  'name': '马丽',
  'nickname': '马丽',
  'id': 99009302,
  'age': 20,
  'email': '23@qq.com'
}];

module.exports = class extends Base {
  queryListAction() {
    const reqData = this.ctx.request.body.post || {};
    const queryParams = reqData.queryParams || {};
    const data = USER_DATA.filter(item => {
      const roleId = queryParams.roleId;
      const deptId = queryParams.deptId;
      let flag = true;
      if (roleId) {
        flag = flag && (String(item.roleId) === String(roleId));
      }
      if (deptId) {
        flag = flag && (String(item.deptId) === String(deptId));
      }
      return flag;
    });
    return this.json({
      'errorCode': 9000,
      'errorMessage': '',
      'data': {
        'pageSize': 20,
        'start': 0,
        'resultCount': 6,
        'pageIndex': 0,
        'pageCount': 1,
        'newCount': 0
      },
      'results': data
    });
  }
  createAction() {
    const reqData = this.ctx.request.body.post;
    reqData.id = parseInt(100 * Math.random());
    const data = [...USER_DATA, reqData];
    return this.json({
      'errorCode': 9000,
      'errorMessage': '',
      'data': {
        'pageSize': 20,
        'start': 0,
        'resultCount': 6,
        'pageIndex': 0,
        'pageCount': 1,
        'newCount': 0
      },
      'results': data
    });
  }
  updateAction() {
    const reqData = this.ctx.request.body.post;
    reqData.id = parseInt(100 * Math.random());
    const data = [...USER_DATA, reqData];
    return this.json({
      'errorCode': 9000,
      'errorMessage': '',
      'data': {
        'pageSize': 20,
        'start': 0,
        'resultCount': 6,
        'pageIndex': 0,
        'pageCount': 1,
        'newCount': 0
      },
      'results': data
    });
  }
};
