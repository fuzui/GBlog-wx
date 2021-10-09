/**
 * 获取随机图
 */
function getRandomGraph() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "get_random_graph",
      data: {
      },
      success(res) {
        var randomGraphs = new Array()
        res.result.data.forEach(r => {
          randomGraphs.push(r.url)
        });
        resolve(randomGraphs)
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

module.exports = {
  getRandomGraph
}