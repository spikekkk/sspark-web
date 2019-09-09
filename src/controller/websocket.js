const Base = require('./base.js');
module.exports = class extends Base {
  openAction() {
    // console.log(this.wsData);
    // console.log(this.websocket);
    // console.log(this.isWebsocket);
    // console.log('open!');
    // console.log(this.websocket);
    // this.websocket.join('');
    if (this.isWebsocket) {
      const shopId = this.websocket.handshake.query['shopId'];
      if (shopId) {
        console.log('open', 'join to ', shopId);
        this.websocket.join(shopId);
      }
    }
  }

  joinAction() {
    if (this.isWebsocket) {
      console.log('join=====', this.wsData);
      this.websocket.join(this.wsData);
    }
  }

  leaveAction() {
    if (this.isWebsocket) {
      console.log('leave=====', this.wsData);
      this.websocket.leave(this.wsData);
    }
  }

  closeAction() {
    if (this.isWebsocket) {
      const shopId = this.websocket.handshake.query['shopId'];
      if (shopId) {
        this.websocket.leave(shopId);
      }
    }
    console.log('close!', this.websocket.handshake.query);
  }

  messageAction() {
    if (!this.isWebsocket) {
      const room = this.get('room');
      if (room) {
        this.ctx.app.websocket.io.to(room).emit('message', 'zzg');
      }
      // this.ctx.app.websocket.io.sockets.emit('message', 'zzg');
      // console.log(this.ctx.app.websocket.emit);
    }
  }
  // 消息通知
  notifyAction() {
    if (!this.isWebsocket) {
      const reqData = this.ctx.request.body.post || {};
      const room = reqData['room'];
      if (room) {
        delete reqData.room;  
        if (room === 'all') {
            this.ctx.app.websocket.io.emit('message', JSON.stringify(reqData));  
        }else {
            this.ctx.app.websocket.io.to(room).emit('message', JSON.stringify(reqData));
        }
        this.json({
          errorCode: 9000,
          errorMessage: 'success'
        });
      } else {
        this.json({
          errorCode: 3000,
          errorMessage: 'no room argument'
        });
      }
    }
  }
};
