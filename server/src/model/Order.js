const mongoose = require('../util/mongoose');
const Moment = require('moment');
// 创建订单表
var OrderModel = mongoose.model('order', new mongoose.Schema({
  id: Number, // 订单编号
  goodId: Number, // 菜品编号
  name: String, // 订单名称
  payment: String, // 付款方式
  orderType: String, // 订单类型
  createTime: String, // 创建时间
  state: String, // 订单状态
  transport: String // 物流方式
}))
class OrderModels {
  // 获取所有订单信息
  async getAllOrderInfo(query) {
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
  // 查询菜品列表
  async list({
    pageNo = 1
  }) {
    let _query = {} // 查询的约定条件
    let _all_items = await this.getAllOrderInfo(_query)
    return OrderModel.find(_query)
      .skip((pageNo - 1) * 10) //从哪里开始
      .limit(10) //取几条  必须是number类型
      .sort({
        createTime: -1
      })
      .then((results) => {
        return {
          items: results,
          pageInfo: { //页面信息
            pageNo,
            total: _all_items.length, // 总数
          }
        }
      }).catch((err) => {
        return false
      })
  }
  // 获取某页订单信息
  async getOrderInfo(query){
    const { pageIndex,searchQuery } = query
    const pageSize = 10
    return OrderModel.find(searchQuery)
    .sort({
      createTime: -1
    })
    .skip((pageIndex - 1) * pageSize) //从哪里开始
    .limit(~~pageSize) //截取多少条
    .then((results) => {
        return results;
    }).catch((err) => {
        return false;
    }) 
  }
}

module.exports = new OrderModels();
