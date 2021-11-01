import { PersonalInfo } from '../../../config/api'

// 获取应用实例
const app = getApp()

Page({
  data: {
    mail: PersonalInfo.mail
  },
  onLoad: function () {},
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
      title: app.globalData.blogTitle + '免责声明',
      path: '/pages/about/disclaimer/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle + '免责声明',
      imageUrl: app.globalData.logo
    }
  }
})
