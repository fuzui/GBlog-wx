import { adminGetEnvironments } from '../../../services/api/admin/environment'
const app = getApp()
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    environments: {}
  },
  onLoad: function () {},
  async onShow() {
    const that = this
    that.setData({
      loadModal: true
    })
    const environments = await this.adminGetEnvironments()
    that.setData({
      environments: environments,
      loadModal: false
    })
  },

  /**
   * 复制
   * @param {*} e
   */
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
  /**
   * 获取服务器配置信息
   */
  async adminGetEnvironments() {
    try {
      const result = await adminGetEnvironments()
      return result
    } catch (error) {
      return error.message
    }
  }
})
