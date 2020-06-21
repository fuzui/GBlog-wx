const app = getApp();
import apiService from '../../../utils/api-service'; 
import {ApiBaseUrl,CustomStyle} from '../../../config/api.js';
Page({
  data: {
    url: ApiBaseUrl,
    CustomBar: app.globalData.CustomBar,
    topImage: CustomStyle.topImage,
    statistics: {}
  },
  onLoad: function () { 
    
  },
  async onShow() {
    var that = this;
    that.setData({
      loadModal:true
    })
    const statistics = await this.adminGetStatistics();
    that.setData({
      statistics: statistics,
      loadModal:false
    });
  },
  
  /**
   * 复制
   * @param {*} e 
   */
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
  /**
   * 获取站点及博主信息
   */
  async adminGetStatistics(){
    try {
      const result = await apiService.adminGetStatistics();
      return result;
    } catch (error) {
      return error.message;
    }
  },
})