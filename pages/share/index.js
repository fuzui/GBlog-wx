//获取应用实例
const app = getApp();
Page({
  data: {
    shareImage: null,
    path: null
  },
  onLoad: function () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('shareImage', data => {
      this.setData({
        shareImage: data.shareImage,
        path: '/pages/details/index?id=' + data.id
      })
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.blogTitle+'分享海报',
      imageUrl: this.data.shareImage,
      path: this.data.path
    }
  },
  onShareTimeline: function (res) {
    return {
      title: app.globalData.blogTitle+'分享海报',
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
