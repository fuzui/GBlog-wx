import { THEME_SETTING_KEY } from '../../../services/const-data/theme-setting-key'

// 获取应用实例
const app = getApp()

Page({
  data: {
    mail: ''
  },
  async onLoad() {
    const that = this
    if (!app.globalData.hasInit) {
      await app.init()
    }
    that.setData({
      mail: app.themeSettings[THEME_SETTING_KEY.MAIL]
    })
  },
  CopyLink(e) {
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
  onShareAppMessage: function (res) {
    return {
      title: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE] + '免责声明',
      path: '/pages/about/disclaimer/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE] + '免责声明',
      imageUrl: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]
    }
  }
})
