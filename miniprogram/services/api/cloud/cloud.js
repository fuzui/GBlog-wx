/**
 * 检查敏感词
 */
function checkMessage(content) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'check_message',
      data: {
        content: content
      },
      success(res) {
        resolve(res.result)
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

module.exports = {
  checkMessage
}
