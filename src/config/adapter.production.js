const socketio = require('think-websocket-socket.io');
const redis = require('socket.io-redis');
const redisSession = require('think-session-redis');

exports.websocket = {
  type: 'socketio',
  common: {
    // common config
  },
  socketio: {
    handle: socketio,
    // allowOrigin: '127.0.0.1:8360', // 默认所有的域名都允许访问
    // path: '/websocket', // 默认 '/socket.io'
    // adapter: null, // 默认无 adapter
    adapter: redis({
      host: 'r-bp1ac354d5bc6d14.redis.rds.aliyuncs.com',
      port: 6379,
      password: 'Ss541018'
    }),
    messages: {
      open: '/websocket/open',
      close: '/websocket/close',
      join: '/websocket/join',
      leave: '/websocket/leave'
    }
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'redis',
  common: {
    cookie: {
      name: 'thinkjs'
    }
  },
  redis: {
    handle: redisSession,
    host: 'r-bp1ac354d5bc6d14.redis.rds.aliyuncs.com',
    port: 6379,
    password: 'Ss541018',
    maxAge: 3600 * 1000 * 12, // session timeout, if not set, session will be persistent.
    autoUpdate: true // update expired time when get session, default is false
  }
};
