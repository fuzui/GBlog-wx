const app = getApp();
import apiService from '../../../utils/api-service';
Page({
  data: {
    topImage: app.globalData.topImage,
    archives: [],
    categoryNum: 0,
    tagNum: 0,
    articleNum: 0
  },
  onLoad: function () {
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    var archives = await this.getArchives();
    var statistics = await this.getStatistics();
    that.setData({
      archives: archives,
      loadModal:false
    });
    that.setData({
      categoryNum: statistics.categoryCount,
      tagNum: statistics.tagCount,
      articleNum: statistics.postCount
    });
  },
  /**
   * 获取归档
   */
  async getArchives() {
    try {
      const result = await apiService.getArchives();
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
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
