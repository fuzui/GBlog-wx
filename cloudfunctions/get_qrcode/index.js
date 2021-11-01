const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: event.scene,
      page: event.path
    })
    result.event = event
    return result
  } catch (err) {
    return err
  }
}
