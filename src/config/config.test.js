// production config, it will load in production enviroment
module.exports = {
  workers: 4,
  port: 8989,
  eureka: {
    host: '192.168.1.56',
    port: 1111,
    tag: '20180913'
  },
  rule: { // 注册中心服务检索规则
    data: '1#offline',
    transferMode: 'overrideFirst'
  }
};
