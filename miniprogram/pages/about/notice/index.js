import { THEME_SETTING_KEY } from '../../../services/const-data/theme-setting-key'

const app = getApp()
Page({
  data: {
    notice: '',
    blogTitle: ''
  },
  onLoad: function () {},
  async onShow() {
    const that = this
    if (!app.globalData.hasInit) {
      await app.init()
    }
    that.setData({
      notice: '',
      blogTitle: app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE]
    })
  }
})
