const appointment_model = require('../model/Appointment')

class AppointmentController{
  async addReserve(ctx){
    let _data = await appointment_model.saveReserve(ctx.request.body);
    ctx.body = {
      code:200,
      data:_data,
      message:"添加成功"
    }
  }
  async reserveList(ctx){
    let _data = await appointment_model.list(ctx.request.body);
    ctx.body = {
      code:200,
      data:_data,
      message:""
    }
  }
  async editReserve(ctx){
    let _data = await appointment_model.update(ctx.request.body);
    ctx.body = {
      code:200,
      data:_data,
      message:"重新编辑成功"
    }
  }
}

module.exports = new AppointmentController();