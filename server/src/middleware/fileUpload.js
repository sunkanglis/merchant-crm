var PATH = require('path')
var multer = require('koa-multer')
var fs = require('fs');

const saveImg = async (ctx, next) => {
  let body = ctx.request.body
  let _originalName = body.foodImage.name // 原名
  let _extName = PATH.extname(_originalName); // 后缀名
  let _baseName = PATH.basename(_originalName, _extName); // 文件名
  let _filename = _baseName + '_' + Date.now() + _extName // 最终的名字，拼上时间戳，防止覆盖
  let path = '../../../cliemt/public/uploads/' + _filename
  var base64 = body.foodImage.imgURL.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
  var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象
  ctx.request.body.merchantLogo = '/uploads/' + _filename
  delete ctx.request.body.foodImage
  await fs.writeFile(path, dataBuffer, async function (err) { //用fs写入文件
    if (err) {
      console.log('保存失败')
      ctx.body = {
        code: 400,
        message: err
      }
    } else {
      console.log('保存成功')
    }
  })
  await next()
}



// const fileUpload = (ctx, res, next) => {
//   console.log('ctx:', ctx.request.body)
//   let storage = multer.diskStorage({
//     // 文件名字
//     filename: (ctx, file, cb) => {
//       console.log('file: ', file)
//       let _originalName = file.originalname // 原名
//       let _extName = PATH.extname(_originalName); // 后缀名
//       let _baseName = PATH.basename(_originalName, _extName); // 文件名
//       let _filename = _baseName + '_' + Date.now() + _extName // 最终的名字，拼上时间戳，防止覆盖

//       // 将图片的路径放入到req.body中的，下个中间件就可以取用了
//       ctx.request.body.merchantLogo = '/uploads/' + _filename
//       cb(null, _filename)
//     },
//     // 存储位置
//     destination: (ctx, file, cb) => {
//       cb(null, PATH.resolve(__dirname, '../public/uploads'))
//     },
//   });
//   // 过滤文件类型
//   function fileFilter(ctx, file, cb) {
//     let _flag = file.mimetype.startsWith('image')
//     cb(_flag ? null : new Error('请上传正确格式的图片'), _flag)
//   }
//   let upload = multer({
//     storage,
//     fileFilter
//   }).single('foodImage');
//   upload(ctx, res, function (err) {
//     if (err) {
//       console.log('保存失败')
//       ctx.body = {
//         code: 400,
//         message: err
//       }
//     } else {
//       console.log('保存成功')
//       next()
//     }
//   })
// }

module.exports = saveImg
