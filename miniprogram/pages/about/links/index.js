const app = getApp();
import { getLinks } from '../../../services/api/content/link';
import { CustomStyle } from '../../../config/api'
Page({
  data: {
    topImage: CustomStyle.topImage,
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
   * 获取友链
   */
  async getLinks() {
    try {
      const param = {
      };
      const result = await getLinks(param);
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