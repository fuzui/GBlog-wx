//获取应用实例
const app = getApp();
Page({
  data: {
    logo: ""
  },
  async onLoad() { 
    var that = this;
    that.setData({
      logo: app.globalData.logo,
    })
  },
  async onShow() {
  },
  /**
   * 登录后置处理
   */
  async loginSuf(){
    let pages = getCurrentPages();
    let beforePage = pages[pages.length - 2];
    beforePage.onLoad();
    wx.navigateBack({
      delta: 1,
    })
  }
  
})