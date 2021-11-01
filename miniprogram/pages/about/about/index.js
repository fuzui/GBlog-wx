import { getStatistics } from '../../../services/api/content/statistic'
import { PersonalInfo } from '../../../config/api'

// 获取应用实例
const app = getApp()

Page({
  data: {
    title: '关于',
    statistics: {},
    contact: PersonalInfo
  },
  onLoad: function () {},
  async onShow() {
    const that = this
    const statistics = await this.getStatistics()
    that.setData({
      statistics: statistics
    })
  },
  /**
   * 获取统计信息
   */
  async getStatistics() {
    try {
      const result = await getStatistics()
      return result
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
          duration: 1000
        })
      }
    })
  },
  toArchivesPage() {
    wx.navigateTo({
      url: '/pages/about/archives/index'
    })
  },
  toCategoryPage() {
    wx.switchTab({
      url: '/pages/type/home/index'
    })
  },
  toTagPage() {
    wx.navigateTo({
      url: '/pages/tag/index'
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '关于' + app.globalData.blogTitle,
      path: '/pages/about/about/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: '关于' + app.globalData.blogTitle,
      imageUrl: app.globalData.logo
    }
  }
})
