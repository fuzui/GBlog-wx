//获取应用实例
const app = getApp();
import utils from '../../../utils/utils';
Page({
  data: {
    topImage: app.globalData.topImage,
    logo: "",
    floorstatus: false, //是否显示回到顶端图标
    title: "光影",
    item: {}
  },
  /**
   * 分享
   * @param {*} res 
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.title,
      path: '/pages/photos/home/index'
    }
  },
  async onLoad(options) {
    this.setData({
      logo: app.globalData.logo,
      loadModal:true
    })
    var that = this;
    const item = utils.decodeQuery(options).item
    that.setData({
      item: item
    });
    this.setData({
      loadModal:false
    })
  },
  async onShow() {
  },
  wxmlTagATap(e) {
  },
  
  
  /**
   * 滚动条位置判断，从而隐藏/显示回到顶端图标
   * @param {*} e 
   */
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  /**
   * 
   */
  returnTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  showImage: function (event) {
    const url = event.currentTarget.dataset.url;
    wx.previewImage({
      urls: [url],
      current: url // 当前显示图片的http链接      
    })
  },
});