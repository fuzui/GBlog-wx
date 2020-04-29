const app = getApp();
import apiService from '../../../utils/api-service';
Page({
  data: {
    topImage: app.globalData.topImage,
    logo: "",
    bottomFlag: false,
    links: [],
    bgColor: [
      "green",
      "red",
      "grey",
      "blue",
      "cyan",
      "purple"
    ]
  },
  onLoad: function () { 
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    var links = await this.getLinks();
    that.setData({
      links: links,
      loadModal:false
    });
  },
  /**
   * 获取日记
   */
  async getLinks() {
    try {
      const param = {
      };
      const result = await apiService.getLinks(param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 复制
   * @param {*} e 
   */
  copyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  }
})