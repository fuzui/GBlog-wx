import { THEME_SETTING_KEY } from '../../../services/const-data/theme-setting-key'

// 获取应用实例
const app = getApp()
Page({
  data: {
    logo: ''
  },
  async onLoad() {
    const that = this
    that.setData({
      logo: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]
    })
  },
  async onShow() {},
  /**
   * 登录后置处理
   */
  async loginSuf() {
    const pages = getCurrentPages()
    const beforePage = pages[pages.length - 2]
    beforePage.onLoad()
    wx.navigateBack({
      delta: 1
    })
  }
})
