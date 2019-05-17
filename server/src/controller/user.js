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
    let _judge_result = await user_model.judgeUserByUsername(username);
    if(!!_judge_result.length){ // 如果有这个用户
      let _data = await user_model.login(password, _judge_result[0])
      if(_data){
        ctx.body = {
          code: 200,
          statusText: 'ok',
          currentAuthority: username,
        };
      }else{
        ctx.body = {
          code: 201,
          message:'密码错误',
        };
      }
    }else{
      ctx.body = {
        code: 401,
        statusText: 'unauthorized',
        currentAuthority: 'guest',
        message:'没有此用户',
      };
    }
  }
  // 注册
  async register(ctx) {
    let _judge_result = await user_model.judgeUserByUsername(ctx.request.body.username);
    console.log(_judge_result,111)
    if(!_judge_result.length){ // 如果没有这个用户
      let _data = await user_model.register(ctx.request.body);
      ctx.body = {
        code:200,
        message:"注册成功"
      }
    }else{
      ctx.body = {
        code:401,
        message:"用户名已经存在"
      }
    }
  }

  async logout(ctx) {
    ctx.body = {
      code: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
    };
  }
}

module.exports = new UserController();
