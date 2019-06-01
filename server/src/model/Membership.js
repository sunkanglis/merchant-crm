// 链接数据库
const mongoose = require('../util/mongoose');
const Moment = require('moment');

// 创建用户表
var MembershipModel = mongoose.model('memberships', new mongoose.Schema({
  membershipName: String, //会员名称
  membershipGrade:String, //会员等级
  MemberBalance: Number, //会员余额(元)
  cumulative: Number, //累计消费(元)
  registerTime: String, //注册时间
  birthdayTime: String, //生日时间
  BelongingToStores: String, //归属门店
}));

class MembershipModels {
  
 //会员管理/添加
 async addMembership(body){
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)
    return MembershipModel({ 
      ...body,
      registerTime:moment.format("YYYY-MM-DD")
    }).save()
    .then(res=>{
      return res
    }).catch(e =>{
      return false
    })
  }

  //会员管理/查询
  async selectMembership(body = {query: {}, vernier: {}}){
    let count = await MembershipModel.find(body.query).count()
    console.log(body)
    return MembershipModel.find(
      body.query,
      null,
      body.vernier
    ).then(res=>{
      let result = {
        array: res,
        count
      }
      return result
    }).catch(e =>{
      return false
    })
  }
  
}

module.exports = new MembershipModels();
