const app = getApp();
import apiService from '../../../services/api/api-service';
import {CustomStyle} from '../../../config/api';
Page({
  data: {
    topImage: CustomStyle.topImage,
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
  toCategoryPage() {
    wx.switchTab({
      url: '/pages/type/index'
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
