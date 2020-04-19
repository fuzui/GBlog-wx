const app = getApp();
import apiService from '../../../utils/api-service';
Page({
  data: {
    title: "关于",
    topImage: app.globalData.topImage,
    statistics: {}
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
});
