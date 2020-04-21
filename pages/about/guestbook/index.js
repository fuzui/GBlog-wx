const app = getApp();
import apiService from '../../../utils/api-service';
Page({
  data: {
    topImage: app.globalData.topImage,
    logo: "",
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
    // var guestbook = await this.getGuestbook();
    that.setData({
      loadModal:false
    });
  },
  /**
   * 获取留言
   */
  async getGuestbook() {
    try {
      const param = {
      };
      const result = await apiService.getGuestbook(param);
      return result;
    } catch (error) {
      return await Promise.reject(error)
    }
  },
})