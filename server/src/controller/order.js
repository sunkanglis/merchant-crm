const order_model = require('../model/Order')
class OrderController {
 // 获取所有数据
 async getOrderInfo(ctx){
    let all_data = await order_model.getAllOrderInfo()
    let _data = await order_model.getOrderInfo(ctx.request.body)
    ctx.body = {
        code: 200,
        statusText: 'ok',
        data:_data,
        total:all_data.length
    };
 }
}

module.exports = new OrderController();
