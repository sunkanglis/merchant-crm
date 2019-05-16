const userService = require('../service/user');
const user_model = require('../model/User')
class UserController {
  async profile(ctx) {
    const res = await userService.profile();
    ctx.body = res.data;
  }
  // 登录
  async login(ctx) {
    const { username, password } = ctx.request.body;
    if (username === 'admin' && password === 'admin') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
        currentAuthority: 'admin',
      };
    } else if (username === 'user' && password === 'user') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
        currentAuthority: 'user',
      };
    } else {
      ctx.body = {
        status: 401,
        statusText: 'unauthorized',
        currentAuthority: 'guest',
      };
    }
  }
  // 注册
  async register(ctx) {
    let _data = await user_model.save(ctx.request.body)
    if(_data){
      ctx.body = {
        status:200,
        message:"注册成功"
      }
    }else{
      ctx.body = {
        status:200,
        message:"注册失败"
      }
    }
  }

  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}

module.exports = new UserController();
