var PATH = require('path')
var multer = require('koa-multer')


const fileUpload = async (ctx, res, next) => {

  let storage = multer.diskStorage({
    // 存储位置
    destination: (ctx, file, cb) => {
      console.log('file:', ctx.request.body)
      cb(null, PATH.resolve(__dirname, '../public/uploads'))
    },
    // 文件名字
    filename: (ctx, file, cb) => {
      let _originalName = file.originalname // 原名
      let _extName = PATH.extname(_originalName); // 后缀名
      let _baseName = PATH.basename(_originalName, _extName); // 文件名
      let _filename = _baseName + '_' + Date.now() + _extName // 最终的名字，拼上时间戳，防止覆盖

      // 将图片的路径放入到req.body中的，下个中间件就可以取用了
      ctx.request.body.merchantLogo = '/uploads/' + _filename
      cb(null, _filename)
    }
  });

  let upload = multer({
    storage
  }).single('foodImage');
  upload(ctx, res, function (err) {
    if (err) {
      console.log('保存失败')
      ctx.body = {
        code: 400,
        message: err
      }
    } else {
      console.log('保存成功')
      next()
    }
  })
}

module.exports = fileUpload
