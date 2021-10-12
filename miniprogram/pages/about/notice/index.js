const app = getApp();
Page({
  data: {
    notice: "",
    blogTitle: "",
  },
  onLoad: function () { },
  async onShow() {
    var that = this;
    that.setData({
      notice: "",
      blogTitle: app.globalData.blogTitle
    });
  },
});
