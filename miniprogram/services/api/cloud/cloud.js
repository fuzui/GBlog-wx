/**
 * 获取随机图
 */
function getRandomGraph() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'get_random_graph',
      data: {},
      success(res) {
        const randomGraphs = []
        res.result.data.forEach(r => {
          randomGraphs.push(r.url)
        })
        resolve(randomGraphs)
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

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
  getRandomGraph,
  checkMessage
}
