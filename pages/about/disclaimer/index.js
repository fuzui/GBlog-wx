const app = getApp();
import {CustomStyle} from '../../../config/api';
Page({
  data: {
    topImage: CustomStyle.topImage
  },
  onLoad: function () { },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
});
