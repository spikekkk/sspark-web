const socketio = require('think-websocket-socket.io');
const redis = require('socket.io-redis');
const fileSession = require('think-session-file');
const path = require('path');

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
      host: '192.168.1.56',
      port: 7001,
      password: 'ss541018'
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
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};
