// 链接数据库
const mongoose = require('../util/mongoose');
const bcrypt = require('bcrypt');
const Moment = require('moment');

// 创建用户表
var UserModel = mongoose.model('user', new mongoose.Schema({
  username: String,
  email:String,
  password: String,
  registerTime: String
}));

class UserModels {
  // 注册
  async register(body){
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds)
    //获取hash值
    var hash = bcrypt.hashSync(body.password, salt)
    //把hash值赋值给password变量
    let _password = hash
    body.password = _password
    return new UserModel({
      ...body,
      registerTime:moment.format("YYYY-MM-DD, HH:mm")
    }).save()
    .then((res)=>{
      let { _id, username } = res
      return { _id, username }
    })
    .catch(error=>{
      return false
    })
  }
  // 登录
  async login(pwd,{password}){
    return bcrypt.compareSync(pwd, password);
  }
  // 通过用户名验证是否有这个用户
  async judgeUserByUsername(username){
    return UserModel.find({username}).then(res=>{
      return res
    }).catch(e =>{
      return false
    })
  }
  
}

module.exports = new UserModels();
