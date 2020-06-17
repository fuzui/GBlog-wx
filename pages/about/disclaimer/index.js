const app = getApp();
import {CustomStyle,PersonalInfo} from '../../../config/api';
Page({
  data: {
    topImage: CustomStyle.topImage,
    mail: PersonalInfo.mail
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
