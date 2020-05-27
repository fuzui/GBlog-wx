const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: event.scene,
      page: event.path,
    })
    // var imgBase64 = "data:" + result.contentType +";base64," + result.buffer.toString('base64');
    // result['imgBase64'] = imgBase64;
    result['event'] = event;
    return result
  } catch (err) {
    return err
  }
}