//获取应用实例
const app = getApp();
Page({
  data: {
    shareImage: null
  },
  onLoad: function () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('shareImage', data => {
      this.setData({
        shareImage: data.shareImage,
        productId: data.productId
      })
    })
  },
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
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle+'分享海波',
      path: '/pages/about/disclaimer/index'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+'分享海波',
      imageUrl: app.globalData.logo
    }
  },
  saveImage() {
    const { shareImage } = this.data
    if (shareImage) {
      this.saveImageToPhotosAlbum({
        filePath: shareImage,
      }).then(() => {
        wx.showToast({
          icon: 'none',
          title: '海报已保存至相册',
          duration: 2000,
        })
      })
    }
  },
  // 保存图片
  saveImageToPhotosAlbum(option) {
    return new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({
        ...option,
        success: resolve,
        fail: reject,
      })
    })
  },
  backPage(){
    wx.navigateBack({
      delta: 1
    })
  }
});
