const app = getApp();
import {CustomStyle} from '../../../config/api'
Page({
  data: {
    topImage: CustomStyle.topImage,
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
