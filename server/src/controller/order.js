const order_model = require('../model/Order')
class OrderController {
 async getOrderInfo(ctx){
    const { searchQuery,pageIndex } = ctx.request.body
    const _query = {}
    for(var i in searchQuery){
      if(searchQuery[i]!=''){
        _query[i] = searchQuery[i]
      }
    }
    const query = {
        "pageIndex":pageIndex,
        "searchQuery":_query
    }
    let all_data = await order_model.getAllOrderInfo(_query)
    let _data = await order_model.getOrderInfo(query)
    ctx.body = {
        code: 200,
        statusText: 'ok',
        data:_data,
        total:all_data.length
    };
 }
}

module.exports = new OrderController();
