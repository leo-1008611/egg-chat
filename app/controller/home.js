'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { app, query } = this.ctx;
    console.log(query);
    // 给谁发, socket连接的id
    const id = query.id;
    const nsp = app.io.of('/chat');
    const msg = query.msg;
    if (nsp.sockets[id]) {
      // 通过id给指定socket连接发送消息
      nsp.sockets[id].emit('res', msg);
    }
    this.ctx.body = '发送成功';
  }
}

module.exports = HomeController;
