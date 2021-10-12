const app = getApp();
import { getArchives } from '../../../services/api/content/archive';
import { getStatistics } from '../../../services/api/content/statistic';
Page({
  data: {
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
      const result = await getArchives();
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
      const result = await getStatistics();
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  toCategoryPage() {
    wx.switchTab({
      url: '/pages/type/home/index'
    });
  },
  toTagPage() {
    wx.navigateTo({
      url: '/pages/tag/index'
    });
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle+'的归档文章',
      path: '/pages/about/archives/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+'的归档文章',
      imageUrl: app.globalData.logo
    }
  },
});
