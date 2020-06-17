const app = getApp();
import apiService from '../../../utils/api-service';
import  {PersonalInfo,CustomStyle} from '../../../config/api'
Page({
  data: {
    title: "关于",
    topImage: CustomStyle.topImage,
    statistics: {},
    contact: PersonalInfo
  },
  onLoad: function () { },
  async onShow() {
    var that = this;
    const statistics = await this.getStatistics();
    that.setData({
      statistics: statistics
    });
  },
  /**
   * 获取统计信息
   */
  async getStatistics() {
    try {
      const result = await apiService.getStatistics();
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
  },
  toArchivesPage(){
    wx.navigateTo({
      url: '/pages/about/archives/index'
    });
  },
  toCategoryPage() {
    wx.switchTab({
      url: '/pages/type/index'
    });
  },
  toTagPage() {
    wx.navigateTo({
      url: '/pages/tag/index'
    });
  }
});
