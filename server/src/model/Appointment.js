const mongoose = require('../util/mongoose');
const Moment = require('moment');
const fs = require('fs-extra');
const PATH = require('path');

// 创建预约表
var AppointmentModel = mongoose.model('appointment',new mongoose.Schema({
  clientName:String,
  appointmentTime:Number,
  telPhone:Number,
  personNumber:Number,
  reserveService:Number,
  reserveStore:Number,
  description:String,
  createTime:String,
  settledTime:String,
}))

class AppointmentModelS{
  // 保存预约数据
  async saveReserve(body){
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    // body.merchantLogo = body.merchantLogo || default_logo;
    return new AppointmentModel({ 
        ...body,
        createTime: _timestamp,
        settledTime: moment.format("YYYY-MM-DD HH:mm:ss")
    }).save()
      .then((result) => {
        return result
      })
      .catch((err) => {
          return false
      })
  }
  // 返回预约全部数据
  async listAll(_query={}){
    return AppointmentModel.find(_query).sort({createTime: -1}).then((results) => {
      return results
    }).catch((err) => {
      return false
    })
  }

  async list({ reserveTime=[], pageNo = 1}){
    let _query = reserveTime.length ? {
      appointmentTime : {"$gte":reserveTime[0],"$lte":reserveTime[1]}
    } : {}
    let _all_items = await this.listAll(_query)
    return AppointmentModel.find(_query)
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
  async listone({ id }) {
    return AppointmentModel.findById(id).then((results) => {
        return results;
    }).catch((err) => {
        return false;
    }) 
  }

  //更新商家信息
  async update(body){
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    body.createTime = _timestamp;
    body.settledTime = moment.format("YYYY-MM-DD HH:mm:ss");
    return AppointmentModel.findOneAndUpdate( {_id:body._id}, { ...body }).then((results)=>{
      console.log(results)
      return results;
    }).catch((err) => {
      return false;
    })
  }


}

module.exports = new AppointmentModelS();