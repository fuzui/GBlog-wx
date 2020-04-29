const app = getApp();
Page({
  data: {
    topImage: app.globalData.topImage,
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
