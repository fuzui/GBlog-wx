const app = getApp();
Page({
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    blogTitle: "",
  },
  onLoad: function () { },
  async onShow() {
    var that = this;
    that.setData({
      themeSettings: app.globalData.themeSettings,
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
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    /**
     * 跳转到公告页面
     */
    toNoticePage() {
      wx.navigateTo({
        url:"/pages/about/notice/index"
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