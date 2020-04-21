const app = getApp();
import apiService from '../../../utils/api-service';
Page({
  data: {
    title: "关于",
    topImage: app.globalData.topImage,
    statistics: {},
    contact: {
      blog: "https://ztool.cloud",
      qq: "229999223",
      wx: "15555542203",
      mail: "i@geekera.cn",
      github: "https://github.com/fuzui",
      gitee: "https://gitee.com/fuzui"
    }
  },
  onLoad: function () { },
  async onShow() {
    var that = this;
    const statistics = await this.getStatistics();
    that.setData({
      statistics: statistics
    });
  },
  /**
   * 获取统计信息
   */
  async getStatistics() {
    try {
      const result = await apiService.getStatistics();
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 复制
   * @param {*} e 
   */
  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
});
