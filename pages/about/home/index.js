const app = getApp();
Page({
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    blogTitle: ""
  },
  onLoad: function () { 
    
  },
  async onShow() {
    var that = this;
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      that.getTabBar().setData({
        selected: 3
      })
    }
    that.setData({
      blogTitle: app.globalData.blogTitle
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
   * 跳转到标签页面
   */
  toTagPage() {
    wx.navigateTo({
      url:"/pages/tag/index"
    })
  },
  /**
   * 跳转到归档页面
   */
  toArchivesPage() {
    wx.navigateTo({
      url:"/pages/about/archives/index"
    })
  },
  /**
   * 跳转到留言页面
   */
  toGuestbookPage() {
    wx.navigateTo({
      url:"/pages/about/guestbook/index"
    })
  },
  /**
   * 跳转到日记页面
   */
  toJournalPage() {
    wx.navigateTo({
      url:"/pages/about/journal/index"
    })
  }
})