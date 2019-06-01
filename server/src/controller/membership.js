
const menbership_model = require('../model/Membership')
class MenbershipController {

  //会员管理/添加
  async addMembership(ctx) {
    console.log('ok');
    
    let _data = await menbership_model.addMembership(ctx.request.body);
    ctx.body = {
      code: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
      data: _data
    };
  }
  
  //会员管理/查询
  async selectMembership(ctx) {
    let _data = await menbership_model.selectMembership(ctx.request.body);
    ctx.body = {
      code: 200,
      statusText: 'ok',
      currentAuthority: 'guest',
      data: _data
    };
  }
}

module.exports = new MenbershipController();
