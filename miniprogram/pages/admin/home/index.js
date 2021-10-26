const app = getApp();
import apiResult from '../../../utils/api-result';
import { adminGetStatistics } from '../../../services/api/admin/statistic';
import { adminGetPostComment } from '../../../services/api/admin/post';
import { adminGetSheetComment } from '../../../services/api/admin/sheet';
import { STORAGE_KEY } from '../../../services/const-data/const-data';
Page({
  data: {
    logo: "",
    statistics: {},
    isLogin: true,
    username: "",
    password: "",
    loginMessage: false,
    noticeCount: 0
  },
  onLoad: function () { 
    var that = this;
    that.setData({
      logo: app.globalData.logo
    })
  },
  async onShow() {
    var that = this;
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
      that.getTabBar().setData({
        selected: 4
      })
    }
    that.setData({
      loadModal:true,
      loginMessage: false
    })
    var token = wx.getStorageSync(STORAGE_KEY.adminToken)
    if(token) {
      const statistics = await adminGetStatistics();
      const noticeCount = await this.getNoticeCount();
      that.setData({
        user: statistics.user,
        statistics: statistics,
        noticeCount: noticeCount,
        isLogin: true
      });
    } else {
      that.setData({
        isLogin: false
      });
    }
    that.setData({
      loadModal:false
    })
  },
  /**
   * 登录后置处理
   */
  async loginSuf(){
    var that = this
    const statistics = await adminGetStatistics();
    const noticeCount = await this.getNoticeCount();
    that.setData({
      user: statistics.user,
      statistics: statistics,
      noticeCount: noticeCount
    });
    that.setData({
      isLogin: true
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
   * 跳转到日记页面
   */
  toJournalPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/journal/home/index"
    })
  },
  /**
   * 跳转到捕捉页面(光影)
   */
  toPhotosPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/photos/home/index"
    })
  },
  /**
   * 跳转到友链管理页面
   */
  toLinksPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/links/home/index"
    })
  },
  /**
   * 跳转到服务器信息页面
   */
  toEnvironmentPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/environments/index"
    })
  },
  /**
   * 跳转到个人信息
   */
  toUserPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/user/index"
    })
  },

  /**
   * 跳转到评论页
   */
  toCommentPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/comment/index"
    })
  },
  toCategoryPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/category/index"
    })
  },
  toTagPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/tag/index"
    })
  },
  toArticlePage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/article/index"
    })
  },
  toAddArticlePage() {
    this.setData({
      modalName: null
    })
    apiResult.warn("请前往PC端");
    // wx.navigateTo({
    //   url:"/pages/admin/article/add/index"
    // })
  },
  toMenuPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/menu/list/index"
    })
  },
  toThemePage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/theme/list/index"
    })
  },
  toAttachmentPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/attachment/home/index"
    })
  },
  toSettingPage() {
    this.setData({
      modalName: null
    })
    wx.navigateTo({
      url:"/pages/admin/setting/index"
    })
  },

  getMessage() {
    var that = this;
    const loginMessage = that.data.loginMessage;
    if(loginMessage){
      that.setData({
        loginMessage: false
      })
    }else{
      that.setData({
        loginMessage: true
      })
    }
  },
  /**
   * 获取消息数量
   */
  async getNoticeCount(){
    const param = {
      page: 1,
      size: 0,
      status: "AUDITING"
    }
    const postResult = await adminGetPostComment(param);
    const sheetResult = await adminGetSheetComment(param);
    return postResult.total+sheetResult.total;
  }
})