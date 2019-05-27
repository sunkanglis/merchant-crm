const mongoose = require('../util/mongoose');
const Moment = require('moment');

// 创建订单表
var OrderModel = mongoose.model('order',new mongoose.Schema({
  paymentMethod:String,
  orderType:Number,
  orderStatus:Number,
  createTime:String,
  settledTime:String,
}))

class OrderModels{

}

module.exports = new OrderModels();