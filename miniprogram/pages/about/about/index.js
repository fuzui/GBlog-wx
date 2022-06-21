import { getStatistics } from '../../../services/api/content/statistic'
import { THEME_SETTING_KEY } from '../../../services/const-data/theme-setting-key'

// 获取应用实例
const app = getApp()

Page({
  data: {
    title: '关于',
    statistics: {},
    contact: {
      blog: '',
      qq: '',
      wx: '',
      mail: '',
      github: '',
      gitee: ''
    }
  },
  onLoad: function () {},
  async onShow() {
    const that = this
    if (!app.globalData.hasInit) {
      await app.init()
    }
    const statistics = await this.getStatistics()
    that.setData({
      statistics: statistics,
      contact: {
        blog: app.themeSettings[THEME_SETTING_KEY.BLOG],
        qq: app.themeSettings[THEME_SETTING_KEY.QQ],
        wx: app.themeSettings[THEME_SETTING_KEY.WX],
        mail: app.themeSettings[THEME_SETTING_KEY.MAIL],
        github: app.themeSettings[THEME_SETTING_KEY.GITHUB],
        gitee: app.themeSettings[THEME_SETTING_KEY.GITEE]
      }
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
      title: '关于' + app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE],
      path: '/pages/about/about/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: '关于' + app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE],
      imageUrl: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]
    }
  }
})
