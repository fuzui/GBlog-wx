const app = getApp()
Page({
  data: {
    notice: '',
    blogTitle: ''
  },
  onLoad: function () {},
  async onShow() {
    const that = this
    that.setData({
      notice: '',
      blogTitle: app.globalData.blogTitle
    })
  }
})
