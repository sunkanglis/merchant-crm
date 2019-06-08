const mongoose = require('../util/mongoose');
const Moment = require('moment');
const fs = require('fs-extra');
const PATH = require('path');

// 创建菜品表
var DishesModel = mongoose.model('dishes',new mongoose.Schema({
  foodName:String,
  inventory:Number,
  foodLabels:Array,
  foodPrices:String,
  foodImage:String,
  // presellStartTime:String,
  // presellEndTime:String,
  saleSAmount:Number,
  merchantLogo: String,
  sales:Number,
  presellStartTime:Array,
  bookConditions:String,
  show:String,
  createTime:String,
  settledTime:String,
}))

class DishesModelS{

  // 保存菜品数据
  async saveDishes(body){
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    return new DishesModel({ 
      ...body,
      sales:0,
      createTime: _timestamp,
      settledTime: moment.format("YYYY-MM-DD, HH:mm")
    }).save()
      .then((result) => {
        return result
      })
      .catch((err) => {
          return false
      })
  }

  // 返回菜品全部数据
  async listAll(_query={}){
    return DishesModel.find(_query).sort({createTime: -1}).then((results) => {
      return results
    }).catch((err) => {
      return false
    })
  }

  // 查询菜品列表
  async list({ foodName = '', foodLabel = '', pageNo = 1 }){
    let _query = null
    if(foodName == '' && foodLabel == ''){
      _query = {}
    }else if(foodName != '' && foodLabel == ''){
      _query = {foodName:new RegExp(foodName)}
    }else if(foodName == '' && foodLabel != ''){
      _query = {foodLabels : { $in: [foodLabel] }}
    }else {
      _query = {foodLabels : { $in: [foodLabel] },foodName:new RegExp(foodName)}
    }
    let _all_items = await this.listAll(_query)
    return DishesModel.find(_query)
      .skip((pageNo-1) * 10 )//从哪里开始
      .limit(10) //取几条  必须是number类型
      .sort({createTime: -1})
      .then((results) => {
        return {
            items: results,
            pageInfo :{ //页面信息
                pageNo,
                total: _all_items.length, // 总数
            }
        }
      }).catch((err) => {
          return false
      })
  }

  //根据id返回一条数据
  async listone({ id }){
    return DishesModel.findById(id).then((results) => {
      return results;
    }).catch((err) => {
      return false;
    }) 
  }

   // 根据Id 删除商家信息
  async deleteDishes({ id }){
    let _row = await this.listone({ id })
    return DishesModel.deleteOne({_id : id}).then(results => {
      return results
    }).catch(err => {
      return false;
    })
  }
}

module.exports = new DishesModelS();