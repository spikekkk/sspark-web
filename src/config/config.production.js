// production config, it will load in production enviroment
module.exports = {
  port: 8989,
  eureka: {
    host: '172.16.154.159',
    port: 8761,
    tag: '20190629'
  },
  rule: { // 注册中心服务检索规则
    data: '1#20190629',
    transferMode: 'overrideFirst'
  }
};
