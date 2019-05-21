const mongoose = require('../util/mongoose');
const Moment = require('moment');
// 菜品
var DishesModel = mongoose.model('dishes',new mongoose.Schema({
  foodName:String,
  inventory:Number,
  foodLabels:Array,
  foodPrices:String,
}))