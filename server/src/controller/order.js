const order_model = require('../model/Order')
class OrderController {
 async getAllOrderInfo(ctx){
    let _data = await order_model.list(ctx.request.body)
    ctx.body = {
        code: 200,
        message:"",
        data:_data
    };
 }
}

module.exports = new OrderController();
