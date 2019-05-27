const mongoose = require('../util/mongoose');
const Moment = require('moment');

// const mockData = Array.from({ length: 10 }).map(() => {
//   return {
//     id: random(1, 100),
//     goodId: random(200, 1000),
//     name: ['淘公仔', '天猫精灵', '蓝牙音响'][random(1, 2)],
//     payment:
//       ['支付宝付款', '银行卡付款', '微信付款'][random(1, 2)] || '支付宝付款',
//     orderType: ['普通订单', '代付订单'][random(0, 1)],
//     createTime: '2018-12-12',
//     state: '派送中',
//     transport: ['快递发货', '上门自提', '同城配送'][random(0, 2)],
//   };
// });
// 创建订单表
var OrderModel = mongoose.model('order',new mongoose.Schema({
  id:Number, // 订单编号
  goodId:Number, // 菜品编号
  name:String,  // 订单名称
  payment:String,  // 付款方式
  orderType:String, // 订单类型
  createTime:String,  // 创建时间
  state:String, // 订单状态
  transport:String // 物流方式
}))
class OrderModels{
  // 获取所有订单信息
  async getAllOrderInfo(query){
    let _query = query || {} // 查询的约定条件
    return OrderModel.find(_query)
        .sort({
            createTime: -1
        })
        .then((results) => {
            return results;
        }).catch((err) => {
            return false;
        })
  }
}

module.exports = new OrderModels();