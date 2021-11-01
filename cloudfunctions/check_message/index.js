// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    if (result && result.errCode.toString() === '87014') {
      return {
        code: 300,
        msg: '内容违规',
        data: result
      } //
    } else {
      return {
        code: 200,
        msg: 'ok',
        data: result
      }
    }
  } catch (err) {
    if (err.errCode.toString() === '87014') {
      return {
        code: 300,
        msg: '内容违规',
        data: err
      } //
    }
    return {
      code: 400,
      msg: '安全检查异常',
      data: err
    }
  }
}
