const dishes_model = require('../model/Dishes')

class DishesController{
  // 添加
  async addDishes(ctx){
    console.log('controller:',ctx.request.body)
    let _data = await dishes_model.saveDishes(ctx.request.body);
    ctx.body = {
      code:200,
      data:_data,
      message:"添加成功"
    }
  }

  async dishesList(ctx){
    let _data = await dishes_model.list(ctx.request.body);
    ctx.body = {
      code:200,
      data:_data,
      message:""
    }
  }

  // 删除
  async deleteDishes(ctx){
    let { id } = ctx.query
    let _data = await dishes_model.deleteDishes({id})
    ctx.body = {
      code:200,
      data:_data,
      message:"删除成功"
    }
  }
}

module.exports = new DishesController();