const order_model = require('../model/Order')
class OrderController {
 async getAllOrderInfo(ctx){
    let _data = await order_model.getAllOrderInfo()
    ctx.body = {
        code: 200,
        statusText: 'ok',
        data:_data
    };
 }
}

module.exports = new OrderController();
