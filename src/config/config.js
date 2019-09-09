// default config
module.exports = {
  workers: 0,
  stickyCluster: true,
  appName: 'sspark-web',
  healthCheckUrl: 'index/health',
  eden_server_eureka: 'eden-server', // 乐园服务
  baseUrl: '/eden-server', // 共用接口头

  eden_game_eureka: 'eden-bargain-game', // 乐园服务游戏
  game_baseUrl: '/game', // 共用游戏接口头
  eureka: {
    host: '192.168.1.56',
    port: 1111,
    tag: '20180913'
  }
};
