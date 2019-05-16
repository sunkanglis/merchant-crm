// 链接数据库
const mongoose = require('../util/mongoose');
// 创建用户表
var UserModel = mongoose.model('user', new mongoose.Schema({
  username: String,
  password: String
}));

class UserModels {
  async save({username,password}){
    return new UserModel({
      username,
      password
    }).save()
    .then((res)=>{
      return res
    })
    .catch((error=>{
      return false
    }))
  }
}

module.exports = new UserModels();
